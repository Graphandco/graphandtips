import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.scss';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

function App() {

    const [tips, setTips] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    const tipsByType =[... new Set(tips.map(tip => tip.acf.langage)) ]
    tipsByType.sort((a, b) =>{
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    })

    return (
        <div className="App">
            <Sidebar tips={tips} />
            <Content tips={tips} />
        </div>
    );
}

export default App;
