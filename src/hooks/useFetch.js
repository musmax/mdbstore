import { useEffect, useState } from "react";

const useFetch = (apiPath) => {
const url = `https://api.themoviedb.org/3/movie/${apiPath}?api_key=${import.meta.env.VITE_API_KEY}`

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response) {
                    throw new Error('No response from server');
                }
                const json = await response.json();
                setData(json.results);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchData();
    }, [url])

    return {
        data,
        error
    }
}

export default useFetch;