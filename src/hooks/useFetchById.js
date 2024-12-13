import { useEffect, useState } from "react";


const useFetchById = (id) => {
const [data, setData] = useState({});
const [error, setError] = useState(null);


useEffect(() => {
    async function useFetchById() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=47281e2e173d2f8277f56ca26e113818`);
            if (!response) {
                throw new Error('Failed to fetch data');
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error.message);
        }
    }
    useFetchById();
}, [])
return {
    data,
    error
}
}

export default useFetchById;