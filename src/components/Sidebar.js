import React from 'react'
import Accordeon from './Accordeon';
import { NavLink } from 'react-router-dom';

const Sidebar = ({tips, handleSearch}) => {

    console.log(tips);

    const tipsByType =[... new Set(tips.map(tip => tip.acf.langage)) ]
    tipsByType.sort((a, b) =>{
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    })


    return (
        <div className="sidebar">
            <NavLink to='/' exact id='logo'>
                <div className="header">Graph & Tips</div>
            </NavLink>
            
            <div className="search">
                <input type="text" id="name" name="name" placeholder="Rechercher un tip..."
                size="20" onChange={handleSearch}>
                </input>
            </div>
            {tipsByType.map(tipByType => (
                <Accordeon key={tipByType} tipCategory={tipByType} tips={tips}/>
            ))}
        </div>
    )
}

export default Sidebar
