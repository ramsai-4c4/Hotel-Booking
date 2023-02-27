import {useState,useEffect} from "react";

const useFetch=(url)=>{
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)
    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true)
            try{
                const response=await fetch(url)
                const data=await response.json()
                setData(data)
            }
            catch(err){
                setError(err)
            }
            setLoading(false)
        }
        fetchData();
    },[url]);
    const reFetch=async()=>{
        setLoading(true)
            try{
                const response=await fetch(url)
                const data=await response.json()
                setData(data)
            }
            catch(err){
                setError(err)
            }
            setLoading(false)

    }
    return {data,loading,error,reFetch}
}
export default useFetch;