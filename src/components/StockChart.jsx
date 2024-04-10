import Chart from 'react-apexcharts'
import { useState } from 'react';

export const StockChart = ({chartData, symbol}) => {
    const { day, week, year} = chartData;
    /*const day = {
        x: [9,10,11,12,13,14,15,16,17,18],
        y: [9,10,11,12,13,14,15,16,17,18]
    }
    const week = {
        x: [8,10,11,12,13,14,15,16,17,18],
        y: [9,10,11,12,13,14,15,16,17,18]
    }
    const year = {
        x: [7,10,11,12,13,14,15,16,17,18],
        y: [9,10,11,12,13,14,15,16,17,18]
    }*/
    const [actualDataShown, setActualDataShown] = useState("24h");

    const determineTimeFormat = () => {
        switch (actualDataShown) {
            case "24h":
                return day
            case "7d":
                return week
            case "1y":
                return year
            default:
                return day  
        }
    }

    const color = determineTimeFormat()[determineTimeFormat().length-1].y - determineTimeFormat()[0].y >0 ? "#26C281":"#ed3419"

    console.log(actualDataShown,'aaaaaaaaaaaaaaaaaaaaaaaa')
    const options = {
        colors:  [color],
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px"
            }
        },
        chart: {
            id: "stock data",
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: "datetime",
        },
        tooltip: {
            x: {
                format: "MMM dd HH:MM"
            }
        }
    }

    const series = [{       
        name: symbol,
        data: determineTimeFormat()
    }]

    console.log(series[0].data,'bbbbbbbb')

    const renderButtonSelect = (button) => {
        const classes = "btn m-1 "
        if (button === actualDataShown) {
            return classes + "btn-primary"
        }
        return classes + "btn-outline-primary"
    }
    
    return (
        <div style={{backgroundColor: "rgba(145,158,171,0.04"}} className='mt-5 p-4 shadow-sm bg-white'>
            <Chart options={options} series={series} type='area' width="100%" />
            <div>
                
                    <button className={renderButtonSelect("24h")} onClick={() => setActualDataShown("24h")}>24h</button>
                    <button className={renderButtonSelect("7d")} onClick={() => setActualDataShown("7d")}>7d</button>
                    <button className={renderButtonSelect("1y")} onClick={() => setActualDataShown("1y")}>1y</button>
         
            </div>
        </div>
    )
}