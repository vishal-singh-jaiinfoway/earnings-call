// 📚 /app/api/fetch-cfo/route.js
import axios from "axios";
import { google } from "googleapis";


// 🎯 Initialize OpenAI with OpenRouter API Key
import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
});

// 📚 Apollo API URL
const APOLLO_API_URL = "https://api.apollo.io/v1/mixed_people/search";
const APOLLO_API_KEY=process.env.APOLLO_API_KEY;


// 🎯 Extract JSON from response text
const extractJSON = (text) => {
  const match = text.match(/```json\n([\s\S]*?)\n```/);
  return match ? match[1] : "No valid JSON found";
};



// 🎯 Insert or Update CFO Profiles into Google Sheets
async function insertCFOProfilesToSheet(cfoProfiles,googleSheetIdFetch,googleSheetIdUpdate) {
  try {
    const sheets = google.sheets({ version: "v4", auth: await authenticateGoogleSheets() });
    const spreadsheetId =googleSheetIdFetch|| "12NnB8xDwn4dYZb9SVd8U7_okdtFDZ_KllzafZPVEnbw"; // Your Sheet ID
    const emailRange = "Sheet1!D2:D"; // Email column

    // Step 1️⃣: Fetch Existing Emails to Identify Duplicates
    const existingEmailsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: emailRange,
    });

    const existingEmails = existingEmailsResponse.data.values
      ? existingEmailsResponse.data.values.flat()
      : [];

    console.log(`🔍 Found ${existingEmails.length} existing emails.`);

    // Step 2️⃣: Separate New and Existing Profiles
    const newCfoProfiles = [];
    const duplicateCfoProfiles = [];

    for (const profile of cfoProfiles) {
      if (existingEmails.includes(profile.email)) {
        duplicateCfoProfiles.push(profile); // Update these
      } else {
        newCfoProfiles.push(profile); // Insert these
      }
    }

    // Step 3️⃣: Update Existing CFO Profiles (if any)
    if (duplicateCfoProfiles.length > 0) {
      console.log(`🔄 Updating ${duplicateCfoProfiles.length} existing CFO profiles...`);
      await updateCFOProfilesInSheet(duplicateCfoProfiles,googleSheetIdUpdate);
    }

    // Step 4️⃣: Insert New Profiles
    if (newCfoProfiles.length > 0) {
      const values = newCfoProfiles.map(profile => [
        profile.name,
        profile.title,
        profile.linkedin_url,
        profile.email,
        profile.organization.name,
        profile.organization.market_cap,
        profile.organization.industry,
      ]);

      const insertRange = "Sheet1!A2:G"; // Adjusted to match your sheet layout

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: insertRange,
        valueInputOption: "RAW",
        resource: { values },
      });

      console.log(`✅ Inserted ${newCfoProfiles.length} new CFO profiles.`);
    } else {
      console.log("✅ No new CFO profiles to insert.");
    }
  } catch (error) {
    console.error("❌ Error inserting/updating CFO profiles in Google Sheets:", error.message);
  }
}

// 🎯 Update CFO Profiles in Google Sheets (Based on Email)
async function updateCFOProfilesInSheet(cfoProfiles,googleSheetIdUpdate) {
  try {
    const sheets = google.sheets({ version: "v4", auth: await authenticateGoogleSheets() });
    const spreadsheetId =googleSheetIdUpdate || "12NnB8xDwn4dYZb9SVd8U7_okdtFDZ_KllzafZPVEnbw"; // Your Sheet ID
    const emailRange = "Sheet1!D2:D"; // Email column

    // Step 1️⃣: Fetch Existing Emails to Find Matching Rows
    const existingEmailsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: emailRange,
    });

    const existingEmails = existingEmailsResponse.data.values
      ? existingEmailsResponse.data.values.flat()
      : [];

    // Step 2️⃣: Update Matching Records
    for (const profile of cfoProfiles) {
      const rowIndex = existingEmails.indexOf(profile.email);
      if (rowIndex !== -1) {
        const rowNumber = rowIndex + 2; // Adjust for header row

        const values = [
          [
            profile.name,
            profile.title,
            profile.linkedin_url,
            profile.email,
            profile.organization.name,
            profile.organization.market_cap,
            profile.organization.industry,
          ],
        ];

        const range = `Sheet1!A${rowNumber}:G${rowNumber}`; // Update row data

        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range,
          valueInputOption: "RAW",
          resource: { values },
        });

        console.log(`🔄 Updated record for ${profile.email} at row ${rowNumber}`);
      }
    }
  } catch (error) {
    console.error("❌ Error updating records in Google Sheets:", error.message);
  }
}

// 🎯 Authenticate with Google Sheets API
async function authenticateGoogleSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CRED),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();
  return client;
}

// 🎯 Fetch CFO Info from Apollo API
async function fetchCFOInfo(domains, apiKey) {
  try {
    console.log(`🔍 Searching for CFO at ${domains}...`);
    const response = await axios.post(
      APOLLO_API_URL,
      {
        q_organization_domains_list: domains,
        person_titles: ["Chief Financial Officer", "CFO"],
        page: 1,
        per_page: domains.length || 10,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apiKey,
        },
      }
    );

    // ✅ Check if CFO is Found
    const people = response.data.people || [];
    console.log("people============>", people)

    if (people.length > 0) {
      return people.map((cfo) => ({
        id: cfo.id,
        first_name: cfo.first_name,
        last_name: cfo.last_name,
        domain: cfo.organization.website_url,
        name: `${cfo.first_name} ${cfo.last_name}`,
        linkedin: cfo.linkedin_url || "N/A",
      }))

    } else {
      console.warn(`⚠️ No CFO found for ${''}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error fetching CFO for ${''}:`, error.response.headers);
    return null;
  }
}

// 🎯 Enrich Multiple CFOs using Bulk API
async function bulkEnrichCFOs(cfoDetails) {
  try {
    console.log("🔍 Bulk enriching CFOs...", cfoDetails);

    // Remove invalid entries (null, undefined, or empty)
    const validCfoDetails = cfoDetails.filter(item => item != null && item !== '' && item !== undefined);

    if (validCfoDetails.length === 0) {
      console.warn("⚠️ No valid CFO details to enrich.");
      return [];
    }
    //console.log("validCfoDetails",validCfoDetails)
    // Batch processing: Process 10 companies at a time
    const batchSize = 10;
    const enrichedResults = [];

    for (let i = 0; i < validCfoDetails.length; i += batchSize) {
      const batch = validCfoDetails.slice(i, i + batchSize);

      // Perform the bulk enrichment for this batch
      const response = await axios.post(
        "https://api.apollo.io/api/v1/people/bulk_match?reveal_personal_emails=true",
        {
          details: batch,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.APOLLO_API_KEY,
          },
        }
      );

      const matches = response.data.matches || [];
      // Keep only those CFOs who have an email
      const enrichedBatch = matches
        .filter(m => m.email_status.toUpperCase() === "VERIFIED") // Only include CFOs with an email
        .map(m => ({
          id: m.id,
          name: m.name,
          linkedin_url: m.linkedin_url,
          title: m.title,
          email: m.email, // Ensuring email is included
          email_status: m.email_status,
          photo_url: m.photo_url,
          twitter_url: m.twitter_url,
          github_url: m.github_url,
          facebook_url: m.facebook_url,
          organization_id: m.organization_id,
          state: m.state,
          city: m.city,
          country: m.country,
          organization: {
            id: m.organization.id,
            name: m.organization.name,
            website_url: m.organization.website_url,
            linkedin_url: m.organization.linkedin_url,
            twitter_url: m.organization.twitter_url,
            facebook_url: m.organization.facebook_url,
            primary_domain: m.organization.primary_domain,
            market_cap: m.organization.market_cap,
            industry: m.organization.industry,
          },
        }));

      enrichedResults.push(...enrichedBatch);
    }

    console.log(`✅ Enriched ${enrichedResults.length} CFO profiles.`);
    return enrichedResults;

  } catch (error) {
    console.error(`❌ Error enriching CFOs:`, error.message);
    return [];
  }
}

export async function getCompanyDomains(tickers) {
  try {
    console.log(`🔍 Fetching domains for tickers: ${tickers.join(", ")}...`);

    const prompt = `You are an AI assistant that helps identify the official domain of companies based on their stock ticker. Provide the domain names of the following companies with their respective tickers: ${tickers.join(", ")}. Return the result strictly in the following JSON format:

    {
      "TICKER1": "example1.com",
      "TICKER2": "example2.com",
      ...
    }
    `;

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-small-3.1-24b-instruct:free",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable assistant that returns the domain names of companies based on stock tickers in strict JSON format.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 300,
      temperature: 0.2,
    });

    const responseText = completion.choices[0]?.message?.content?.trim();

    // Extract only JSON from response
    const jsonMatch = extractJSON(responseText);
    const domains = jsonMatch ? JSON.parse(jsonMatch) : {};

    // console.log("✅ Domains found:", domains);
    return domains;
  } catch (error) {
    console.error("❌ Error fetching domains:", error.message);
    return null;
  }
}


// Function to dynamically fetch companies with query parameters
async function fetchCompanies(params) {
  // Base URL for the NASDAQ API
  const baseUrl = 'https://api.nasdaq.com/api/screener/stocks';

  try {
    // Make GET request with dynamic query parameters
    const response = await axios.get(baseUrl, {
      params: params, // Pass the dynamic params here
      headers: {
        'User-Agent': 'Mozilla/5.0',  // Required by the API (some APIs check for user agents)
      },
    });

    // Handle the successful response
    if (response.status === 200) {
      const companies = response.data.data.table.rows; // Access the companies data
      return companies; // Return the list of companies
    } else {
      console.error('Failed to fetch data:', response.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// 📚 POST Method for Fetching Companies and CFO Info
export async function POST(req) {
  try {
    console.log("🚀 Fetching CFO Info...");
    const APOLLO_API_KEY = process.env.APOLLO_API_KEY;
    const SEC_USER_AGENT = process.env.SEC_USER_AGENT;

    if (!APOLLO_API_KEY) {
      return Response.json(
        { error: "Missing API keys. Check .env.local configuration." },
        { status: 500 }
      );
    }

    // 📚 Parse request body
    const payload = await req.json();
    console.log("📦 Received payload:", payload);
    const { jobTitle,industrySize="micro|nano",
      country= 'united_states',sector,offset=20,limit=20,googleSheetIdFetch,googleSheetIdUpdate } = payload;
    // Call the function with dynamic params
    console.log("📚 Fetching company list from SEC...");
    const params = {
      tableonly: false,
      offset: 695+offset,
      limit: 20,
      exchange: 'NASDAQ',
      marketcap: industrySize,
      country
    };
    const companies = await fetchCompanies(params);

    // Apply batching: Process 10 companies at a time
    const batchSize = 20;
    const batchResults = [];

    // Loop through the companies in batches
    for (let i = 0; i < companies.length; i += batchSize) {
      const batch = companies.slice(i, i + batchSize);

      // Process the batch
      const batchData = await processBatch(batch);
      batchResults.push(...batchData);
    }

    console.log(`✅ Processed all batches. Total companies processed: ${batchResults.length}`);

   

    // After processing all batches, proceed with the rest of the logic
    const cfoProfiles = await bulkEnrichCFOs(batchResults);
    await insertCFOProfilesToSheet(cfoProfiles,googleSheetIdFetch,googleSheetIdUpdate);
    const googleSheetLink= `https://docs.google.com/spreadsheets/d/${googleSheetIdUpdate}/edit?gid=0#gid=0`
    return Response.json({
      success: true,
      status:"success",
      cfoProfiles: cfoProfiles,
      message: `<p><strong>${cfoProfiles.length}</strong> ${jobTitle} profiles fetched and processed successfully.</p>
<p>✅ <a href="${googleSheetLink}" style="color: #007bff; text-decoration: underline; font-weight: bold;">View Updated Google Sheet</a></p>
`,
      totalCompaniesProcessed: batchResults.length,
      
    });

  } catch (error) {
    console.error("❌ Error fetching data:", error.message);
    return Response.json({ error: "Failed to retrieve data.", status:"error", }, { status: 500 });
  }
}

 // Function to process a batch of companies
 async function processBatch(batch) {
  const results = [];
  console.log(`🔍 Processing batch of ${batch.length} companies...`, batch);
  const domains = await getCompanyDomains(batch.map(c => c.symbol)); // Adjust if needed
  console.log("domains", Object.values(domains));
  const cfoInfo = await fetchCFOInfo(Object.values(domains), APOLLO_API_KEY);
  console.log("cfoInfo", cfoInfo);
  if (cfoInfo.length) {
    results.push(...cfoInfo);
  }
  return results;
}