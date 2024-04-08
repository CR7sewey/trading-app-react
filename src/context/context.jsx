import React, { useContext, useEffect, useState } from "react";
import finnHub from "../apis/finnHub";


const AppContext = React.createContext();

//https://finnhub.io/docs/api
//const urlStocks = 'https://finnhub.io/api/v1/quote?'
const AppProvider = ({ children }) => {

    const [stock, setStock] = useState([]);
    const [watchList, setWatchList] = useState(["AAPL","GOOGL","MSFT","AMZN"]);

    const fetchStocks = async() => {
        
        let isMounted = true;
        try {
            /*const {data} = await finnHub.get('/quote',{
                params: {
                    symbol: "GOOGL"
                }
            })*/
            
            const promises = await Promise.all( // faster than doing a cicle or something like that
                watchList.map((value) => {
                    console.log('AQUI4')
                    return finnHub.get('/quote',{
                        params: {
                            symbol: value
                        }
                })
                }));

            const data = promises.map((value) => {
                return {data: value.data, symbol: value.config.params.symbol}
            }) //to get an object with data and sigla
            console.log(data)
            if (isMounted) {
                setStock(data);
                console.log(stock)
            }
           // console.log(data)
           return () => (isMounted = false)
        }
        catch(e) {
            console.log(e.response)
        }
    }

    useEffect(() => {
        console.log('AQIU')
        fetchStocks()
    }, [watchList])


    return (
        <AppContext.Provider value={{watchList, stock, setWatchList}} >
            { children }
        </AppContext.Provider>
    )
}

// CUSTOM HOOK
export const useGlobalContext = () => {
    return useContext(AppContext);
}

export default AppContext
export { AppProvider }