import React from 'react'
import Home from './Home'
import { Switch, Route, useLocation } from 'react-router-dom';
import TipSingle from './TipSingle';
import { Link } from 'react-router-dom';

import { FaPhp } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
import { SiPrestashop } from 'react-icons/si';
import { SiCss3 } from 'react-icons/si';

const Content = ({tips, showTips}) => {

    const location = useLocation();

    function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const tipA = a.acf.langage.toUpperCase();
        const tipB = b.acf.langage.toUpperCase();
      
        let comparison = 0;
        if (tipA > tipB) {
          comparison = 1;
        } else if (tipA < tipB) {
          comparison = -1;
        }
        return comparison;
    }
    tips.sort(compare);

    console.log(tips);
    return (
        <div className="content">
            <Switch location={location} key={location.pathname}>
                <Route path='/' exact>
                    {showTips ? tips.map(tip => (
                        <Link to={`/tip/${tip.id}`} key={tip.id}>
                            <div className='tip-item' >
                                {tip.acf.langage === 'php' && <span><FaPhp /></span>}                                
                                {tip.acf.langage === 'javascript' && <span><SiJavascript /></span>}                                
                                {tip.acf.langage === 'prestashop' && <span><SiPrestashop /></span>}                                
                                {tip.acf.langage === 'css' && <span><SiCss3 /></span>}                                
                                <span dangerouslySetInnerHTML={{__html: tip.title.rendered}}/>
                            </div>
                        </Link>
                    )) : <Home />}
                </Route>
                <Route path='/tip/:id' exact>
                    <TipSingle />
                </Route>
            </Switch>
        </div>
    )
}

export default Content
