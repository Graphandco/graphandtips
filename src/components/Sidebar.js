import React from 'react'
import Accordeon from './Accordeon';

const Sidebar = ({tips, handleSearch}) => {


    const tipsByType =[... new Set(tips.map(tip => tip.acf.langage)) ]
    tipsByType.sort((a, b) =>{
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    })


    return (
        <div className="sidebar">
            <div className="header">Graph & Tips</div>
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
