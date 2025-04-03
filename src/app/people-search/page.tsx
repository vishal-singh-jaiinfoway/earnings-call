'use client';

import { useState } from 'react';
import Select from 'react-select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Snackbar, Alert,CircularProgress } from '@mui/material';

const industrySizeOptions = [
    { value: 'medium', label: 'Medium ($2B-$10B)' },
    { value: 'small', label: 'Small ($300M-$2B)' },
    { value: 'micro', label: 'Micro ($50M-$300M)' },
    { value: 'nano', label: 'Nano (<$50M)' }
];

const countryOptions = [
    { value: 'united_states', label: 'USA' },
    { value: 'canada', label: 'Canada' },
    { value: 'united_kingdom', label: 'UK' }
];

const sectorOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'health_care', label: 'Healthcare' },
    { value: 'all', label: 'All' }
];
export default function PeopleSearch() {
    const [jobTitle, setJobTitle] = useState('');
    const [industrySize, setIndustrySize] = useState([]);
    const [country, setCountry] = useState([]);
    const [sector, setSector] = useState([]);
    const [offset, setOffset] = useState();
    const [limit, setLimit] = useState();
    const [googleSheetIdFetch, setGoogleSheetIdFetch] = useState('');
    const [googleSheetIdUpdate, setGoogleSheetIdUpdate] = useState('');
    const [googleSheetRange, setGoogleSheetRange] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [loading, setLoading] = useState(false); // Loading state

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowSnackbar(false);


        if (!googleSheetIdFetch?.trim()?.length || !googleSheetIdUpdate?.trim()?.length) {
            setSnackbarMessage("Google Sheet ID (Fetch),and Google Sheet ID (Update) are required.");
            setSnackbarSeverity("error");
            setShowSnackbar(true);
            return;
        }
        setLoading(true); // Stop loading

        const payload = {
            jobTitle,
            industrySize: industrySize.map(item => item.value),
            country: country.map(item => item.value),
            sector: sector.map(item => item.value),
            offset: Number(offset),
            limit: Number(limit),
            googleSheetIdFetch,
            googleSheetIdUpdate,
            googleSheetRange,
        };

        console.log('Sending request with payload:', payload);

        try {
            const response = await fetch('/api/people-details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            setSnackbarMessage(data.message);
            setSnackbarSeverity(data.status);
            setShowSnackbar(true);
        } catch (error) {
            console.error('Error fetching job data:', error);
            setSnackbarMessage(error?.message);
            setSnackbarSeverity('error');
            setShowSnackbar(false);
        }finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto z-[5000]">
            <h1 className="text-xl font-bold mb-4">People Search API Request</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />

                <Select
                    isMulti
                    options={industrySizeOptions}
                    value={industrySize}
                    onChange={setIndustrySize}
                    placeholder="Select Industry Size"
                />

                <Select
                    isMulti
                    options={countryOptions}
                    value={country}
                    onChange={setCountry}
                    placeholder="Select Country"
                />

                <Select
                    isMulti
                    options={sectorOptions}
                    value={sector}
                    onChange={setSector}
                    placeholder="Select Sector"
                />

                <Input type="number" placeholder="Offset" value={offset} onChange={(e) => setOffset(e.target.value)} />
                <Input 
    type="number" 
    placeholder="Limit (Max: 20)" 
    value={limit} 
    onChange={(e) => setLimit(Math.min(20, Number(e.target.value)))} 
    max={20}
/>

                <Input placeholder="Google Sheet ID (Fetch)" value={googleSheetIdFetch} onChange={(e) => setGoogleSheetIdFetch(e.target.value)} />
                <Input placeholder="Google Sheet ID (Update)" value={googleSheetIdUpdate} onChange={(e) => setGoogleSheetIdUpdate(e.target.value)} />
                {/* <Input placeholder="Google Sheet Range" value={googleSheetRange} onChange={(e) => setGoogleSheetRange(e.target.value)} /> */}
                
                <Button 
    type="submit" 
    disabled={loading} 
    className="w-full max-w-[200px] flex items-center justify-center"
>
    {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
</Button>
      </form>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={4000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: 'center' }}
            >
                 <Alert onClose={() => setShowSnackbar(false)}
                    severity={snackbarSeverity} sx={{ width: '100%' }}>
                    <span dangerouslySetInnerHTML={{ __html: snackbarMessage }} />
                </Alert>
            </Snackbar>
        </div>
    );
}