import { useGlobalContext } from "../context"
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs'
const StockList = () => {
    const {stock} = useGlobalContext();
    //console.log(watchList)
    return (
        <table className="table hover mt-5">
        <thead style={{color: 'rgb(79,89,102'}}>
            <tr>
                <th scope="col">Stock</th>
                <th scope="col">Last</th>
                <th scope="col">Chg</th>
                <th scope="col">Chg %</th>
                <th scope="col">High</th>
                <th scope="col">Low</th>
                <th scope="col">Open</th>
                <th scope="col">Pclose</th> 
            </tr>
        </thead>
        <tbody>
            {stock.map((stockValue) => {
                return(
                 <tr className="table-row" key={stockValue.symbol}>
                 <th scope="row">{stockValue.symbol}</th>
                 <td>{stockValue.data.c}</td>
                 <td className={`${stockValue.data.d >=0 ? "text-success":"text-danger"}`}>{stockValue.data.d} 
                 {stockValue.data.dp >=0 ? <BsFillCaretUpFill />:<BsFillCaretDownFill />}</td>
                 <td className={`${stockValue.data.d >=0 ? "text-success":"text-danger"}`}>
                    {stockValue.data.dp} {stockValue.data.dp >=0 ? <BsFillCaretUpFill />:<BsFillCaretDownFill />}</td>
                 <td>{stockValue.data.h}</td>
                 <td>{stockValue.data.l}</td>
                 <td>{stockValue.data.o}</td>
                 <td>{stockValue.data.pc}</td>
                 </tr>
            )})}
        </tbody>
        </table>
    )
}

export default StockList