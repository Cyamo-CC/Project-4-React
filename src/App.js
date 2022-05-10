// UseState allows things to change, without switching the index file
//useEffect makes AJAX api call just ONCE and store your data 
import React, {useState, useEffect } from  'react';
import './styles.css'
/* When you write just html you can have const App = () => (<div></div>)
When you want to use Javascript use {} anr return() statement
Everything MUST be within <div></div> elements, you can have multiple layers of divs but everything must be within master divs. */
const App = () => {
    const[restaurants, setRestaurants] = useState([])
    const[filteredData, setFilteredData] = useState([]);

  //initial call
  useEffect (() =>{
    fetch("http://localhost:3000/api/getall")
    //here it handes data receiving. This can be used to make chain reaction
    .then((result)=>{
        console.log(result)
        return result.json();
    })
    .then((data)=>{
        console.log(data)
        setRestaurants(data)
    });
    },[]); 

    const handleFilter = (event) =>{
        const searchWord = event.target.value
        const newFilter = restaurants.filter((value)=>{
            //this makes sure no matter if person searches in lower case. it will find
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        setFilteredData(newFilter); 
    };
    
    const putData = () => {
        fetch("http://localhost:3000/api/add",{
            method: 'PUT',
        })
        .then((result)=>{
            console.log(result)
            return result.json();
        });
    }

    return(
        <>
           <div>
               <div className='head'>
                   <div className='row'>
                        <h1>Restaurant list</h1>
                    </div>
                        <div className="container-fluid">
                            <div className="row">
                            <nav className='navbar bg-dark col-md-12'>
                                <ul className='navbar nav'>
                                    <li className='nav-item'>
                                        <button className='nav-link' onClick={handleFilter}>Näytä kaikki</button>
                                    </li>
                                    <li className='nav-item'>
                                        <button className='nav-link' hred="#">Etsi Cuisinen mukaan</button>
                                    </li>
                                    <li className='nav-item'>
                                        <button className='nav-link' OnClick="#">Lisää ravintola</button>
                                    </li>
                                    <li className='nav-item'>
                                        <button className='nav-link' hred="#">Poista ravintola</button>
                                    </li>
                                </ul>
                            </nav>
                            </div>
                                <div className="searchInput row">
                                    <input type="text" placeholder="Etsi ravintola nimellä" data={restaurants} onChange={handleFilter}/>
                                </div>
                        </div>
                </div>
                    <div className='row'>
                        <table className='table table-striped table-bordered '>
                            <thead>
                                    <tr>
                                        <th >Restaurant name</th>
                                        <th >Cuisine</th>
                                        <th >Borough</th>
                                        <th >Street</th>
                                    </tr>
                            </thead>
                            <tbody >
                                    {filteredData.map((data, i) => (
                                        <tr>
                                            <td className='resName' key={i}>{data.name} </td>
                                            <td className='Cus' >{data.cuisine}</td> 
                                            <td>{data.borough}</td> 
                                            <td>{data.street}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
            </div>
        </>
        )
    }

    export default App;