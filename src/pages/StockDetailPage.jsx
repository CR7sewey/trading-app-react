import { useParams } from "react-router-dom"
import finnHub from "../apis/finnHub";
import { useState, useEffect } from "react";
import { StockChart } from "../components/StockChart";

const formatData = (data) => {
    return data.t.map((value,index) => {
        return {
            x: value*1000,
            y: Math.floor(data.c[index])
        }
    })
}

const StockDetailPage = () => {

    const {symbol} = useParams();
    //const [stocks, setStocks] = useState([]); 
    const [chartData, setChartData] = useState({});

    
    useEffect(() => {
        const fetchData = async () => { // resolution (time), from, to (data - UNIX timestamp)
        try{
            const resolution = 30;
            const date = new Date();
            const currentTime = Math.floor(date.getTime()/1000); // return in mili thats why /1000
            let previousTime; // one week ago
            if (date.getDay() === 6) { // saturday ( no stock market)
                previousTime = currentTime - 2*60*60*24;
            }
            else if (date.getDay() === 0) { // sunday (no stock market)
                previousTime = currentTime - 3*60*60*24;
            }
            else {
                previousTime = currentTime - 60*60*24;
            }
            const oneWeek = currentTime - 7*24*60*60
            const oneYear = currentTime - 365*24*360;
            /*const responseDay = await finnHub.get('/stock/candle', {
                params: {
                    symbol, 
                    resolution, 
                    from: previousTime, 
                    to: currentTime // candles on API documentation
                }
            }) 
            const responseWeek = await finnHub.get('/stock/candle', {
                params: {
                    symbol, 
                    resolution: 60, 
                    from: oneWeek, 
                    to: currentTime // candles on API documentation
                }
            }) 
            const responseYear = await finnHub.get('/stock/candle', {
                params: {
                    symbol, 
                    resolution: "W", 
                    from: oneYear, 
                    to: currentTime // candles on API documentation
                }
            })*/

            const responses = await Promise.all( // to fire at once
                [finnHub.get('/stock/candle', {
                    params: {
                        symbol, 
                        resolution, 
                        from: previousTime, 
                        to: currentTime // candles on API documentation
                    }
                }),
                finnHub.get('/stock/candle', {
                    params: {
                        symbol, 
                        resolution: 60, 
                        from: oneWeek, 
                        to: currentTime // candles on API documentation
                    }
                }),
                finnHub.get('/stock/candle', {
                    params: {
                        symbol, 
                        resolution: "W", 
                        from: oneYear, 
                        to: currentTime // candles on API documentation
                    }
                })
            ])
            //const formatedData = formatData(responses);
            setChartData({
                day: formatData(responses[0].data),
                week: formatData(responses[1].data),
                year: formatData(responses[2].data)
            })
        }
        catch(e) {
            console.log(e);
        }
    }
    
    fetchData()

    //return () => isMounted = false;
}, [symbol]);


    return (
        <>
        {chartData && 
        <div>
            <StockChart chartData={chartData} symbol={symbol} />
        </div>}
        </>
    )
}

export default StockDetailPage