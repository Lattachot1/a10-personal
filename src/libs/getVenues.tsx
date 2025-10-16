export default async function getVenues(){
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    const response = await fetch('https://a08-venue-explorer-backend.vercel.app/api/v1/venues');
    if(!response.ok){
        throw new Error('Failed to fetch venues');
    }
    const data = await response.json();
    return data;
}