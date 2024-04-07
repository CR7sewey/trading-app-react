import React, { useContext, useEffect, useState } from "react";
import finnHub from "./apis/finnHub";
const AppContext = React.createContext();

//https://finnhub.io/docs/api
//const urlStocks = 'https://finnhub.io/api/v1/quote?'
const AppProvider = ({ children }) => {

    const [stock, setStock] = useState({});
    const [watchList, setWatchList] = useState(["AAPL","GOOGL","MSFT","AMZ"]);

    const fetchStocks = async() => {
        let isMounted = true;
        try {
            /*const {data} = await finnHub.get('/quote',{
                params: {
                    symbol: "GOOGL"
                }
            })*/

            const promises = Promise.all([ // faster than doing a cicle or something like that
                finnHub.get('/quote',{
                    params: {
                        symbol: "GOOGL"
                    }
                }),
                finnHub.get('/quote',{
                    params: {
                        symbol: "META"
                    }
                }),
                finnHub.get('/quote',{
                    params: {
                        symbol: "AAPL"
                    }
                })
            ]);
            if (isMounted) {
                setStock(promises);
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
        fetchStocks()
    }, [])


    return (
        <AppContext.Provider value={{watchList}} >
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