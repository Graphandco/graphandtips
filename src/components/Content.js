import React from 'react'
import Home from './Home'
import { Switch, Route, useLocation } from 'react-router-dom';
import TipSingle from './TipSingle';
import { Link } from 'react-router-dom';


const Content = ({tips, showTips}) => {

    const location = useLocation();

    return (
        <div className="content">

            <Switch location={location} key={location.pathname}>
                <Route path='/' exact>
                    {showTips ? tips.map(tip => (
                        <Link to={`/tip/${tip.id}`} exact key={tip.id}>
                            <span className='tip-item'>{tip.title.rendered}</span>
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
