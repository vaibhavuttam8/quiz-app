export async function apiData(){
    const apiUrl = 'https://opentdb.com/api.php?amount=10&category=12'
    try {
        const response = await fetch(apiUrl)
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch(error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}