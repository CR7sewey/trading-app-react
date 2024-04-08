import { useState, useEffect } from "react"
import finnHub from "../apis/finnHub";
import { useGlobalContext } from "../context/context";

const AutoComplete = () => {

    const [searchValue, setSearchValue] = useState('');
    const [foundValues, setFoundValues] = useState([]);
    const {watchList, setWatchList} = useGlobalContext();


    const renderDropdown = () => {
        return !searchValue ? "dropdown-menu":"dropdown-menu show";
    }

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
        try{
            console.log(searchValue)
            const response = await finnHub.get('/search',{
                params: {
                    q: searchValue
                }
            })
            const { data } = response
            if (isMounted) {
                setFoundValues(data.result)
            }
            
        }
        catch(e) {
            console.log(e);
        }
    }
    if (searchValue.length > 0) {
        fetchData()
        console.log(foundValues)
    }
    else {
        setFoundValues([])
    }
    //setFoundValues(fetchData());
    //console.log(foundValues.value,'ze')
    return () => isMounted = false;
}, [searchValue]);

    const addToStocksShown = (e) => {
        const newStock = e.target.innerText.split(" ").slice(-1)[0];
        /*let exists = false;
        watchList.map((values) => {
            if(newStock === values) {
                exists = true;
                return;
            }
        })
        if (exists) {
            console.log('Já existes!')
            return;
        }*/
        if (watchList.indexOf(newStock) === -1) {
            setWatchList([...watchList,newStock])
            setSearchValue('');

        }
        //console.log('AQUUUUUUI',e.target.innerText)
        //console.log('AJJJ',watchList)
        //setWatchList([...watchList,newStock])
    }


    return (
        <div className="w-50 p-5 rounded mx-auto">
            <div className="form-floating dropdown">
            <input type="text" style={{backgroundColor: 'rgba(145, 158, 171, 0.04'}}
            id = 'search' className="form-control" placeholder="Search" autoComplete="off"
            value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <label htmlFor="search">Search</label>
            <ul style={{
                height: '500px',
                overflowY: 'scroll',
                overflowX: 'hidden',
                cursor: 'pointer'
            }} className={renderDropdown()}>
                {foundValues.map((value) => (
                    <li key={value.symbol} onClick={addToStocksShown}>{value.description} - {value.symbol}</li>
                ))}
            </ul>
           </div>
        </div>
    )
}

export default AutoComplete