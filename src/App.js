import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import './App.scss';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

function App() {

    const [tips, setTips] = useState([]);
    const [showTips, setShowTips] = useState(false);
    const [searchText, setSearchText] = useState('zzzzz');
    const [isLoading, setIsLoading] = useState(false);

    /*****************************
    GETTING TIPS
    *****************************/
    useEffect(() => {
        const handleTipListing = async () => {
            setIsLoading(true);
            try {
                const response = await Axios.get(
                    'https://www.graphandco.com/coding-tips/wp-json/wp/v2/coding-tips'
                );
                // console.log(response.data);
                setTips(response.data);
                setIsLoading(false);
            } catch (e) {
                console.log(
                    'Une erreur est survenue lors de la récupération des Tips'
                );
            }
        };
        handleTipListing();
    }, [setTips]);

    /*****************************
    TIPS BY TYPE
    *****************************/
    const tipsByType =[... new Set(tips.map(tip => tip.acf.langage)) ]
    tipsByType.sort((a, b) =>{
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    })

    /*****************************
    SEARCHING TIPS
    *****************************/
    const handleSearch = (e)=> {
        setSearchText(e.target.value)
        setShowTips(true)
    }

    /*****************************
    HIDE CONTENT TIPS IF SEARCH EMPTY
    *****************************/
    useEffect(() => {
        const hideTips = async () => {
            await searchText.length === 0 && setShowTips(false)
        };
        hideTips();
    }, [searchText]);

    /*****************************
    FILTER TIPS
    *****************************/
    const filteredTips = tips.filter((tip) => {
        return (
            tip.title.rendered
                .toLowerCase()
                .includes(searchText.toLowerCase())
        );
    });

    return (
        <div className="App">
            <Sidebar tips={tips} handleSearch={handleSearch}  />




            <Content tips={filteredTips} showTips={showTips}/>
        </div>
    );
}

export default App;

