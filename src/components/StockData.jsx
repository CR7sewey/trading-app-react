import { useEffect, useState } from "react";
import finnHub from "../apis/finnHub";

export const StockData = ({symbol}) => {

    const [stock, setStock] = useState({});

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => { // resolution (time), from, to (data - UNIX timestamp)
        try{
            const response = await finnHub.get('/stock/profile2', {
                    params: {
                        symbol,
                    }
                })
                if (isMounted) {
                    setStock(response.data)
                }
        }
        catch(e) {
            console.log(e);
        }
    }
    
    fetchData()
    return () => (isMounted = false)
    //return () => isMounted = false;
}, [symbol]);


    return (
        <>
        {stock && (
            <div className="row border bg-white rounded shadow-sm p-4 mt-5">
            <div className="col">
              <div>
                <span className="fw-bold">name: </span>
                {stock.name}
              </div>
              <div>
                <span className="fw-bold">country: </span>
                {stock.country}
              </div>
              <div>
                <span className="fw-bold">ticker: </span>
                {stock.ticker}
              </div>
            </div>
            <div className="col">
              <div>
                <span className="fw-bold">Exchange: </span>
                {stock.exchange}
              </div>
              <div>
                <span className="fw-bold">Industry: </span>
                {stock.finnhubIndustry}
              </div>
              <div>
                <span className="fw-bold">IPO: </span>
                {stock.ipo}
              </div>
            </div>
            <div className="col">
              <div>
                <span className="fw-bold">MarketCap: </span>
                {stock.marketCapitalization}
              </div>
              <div>
                <span className="fw-bold">Shares Outstanding: </span>
                {stock.shareOutstanding}
              </div>
              <div>
                <span className="fw-bold">url: </span>
                <a href={stock.weburl}>{stock.weburl}</a>
              </div>
            </div>
          </div>
        )}
        </>
    )
}