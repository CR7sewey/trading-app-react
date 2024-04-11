import axios from 'axios';


const urlStocks = 'https://finnhub.io/api/v1/'
const TOKEN = import.meta.env.API_KEY || "co8oiahr01qj5gtiv0m0co8oiahr01qj5gtiv0mg" 

export default axios.create({
    baseURL: urlStocks,
    params: {
        token: TOKEN
    }
})