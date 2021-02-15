import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Accordeon = ({tipCategory, tips}) => {
    const [active, setActive] = useState('');
    const [height, setHeight] = useState('0px');

    const toggleAccordion = () => {
        setActive(active === '' ? 'active' : '');
        setHeight(
            active === 'active' ? '0px' : `${content.current.scrollHeight}px`
        );
        // setRotate(
        //     active === 'active' ? 'accordion__icon' : 'accordion__icon rotate'
        // );
        //console.log(content.current.scrollHeight);
    };

    const content = useRef(null);

    const filteredTips = tips.filter((tip) => {
        return (
            tip.acf.langage.includes(tipCategory)
        );
    });

    return (
        <div 
            className={'accordeon ' + (active && 'active')}
            onClick={toggleAccordion}
        >
            <div className="accordeon-title">
                <p className='accordion__title'>
                    {/* {props.image && <img src={props.image} alt='logo' />}
                    <span>{props.title}</span> */}
                    {tipCategory}
                </p>
                <svg
                    className={'accordion__icon ' + (active && 'rotate')}
                    viewBox='0 0 320 512'
                >
                    <path d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'></path>
                </svg>
            </div>
            <div
                ref={content}
                style={{ maxHeight: `${height}` }}
                //style={{ maxHeight: `active ? '0px' : ${height}` }}
                className='accordeon-content'
            >                
                {filteredTips.map(filteredTip => (
                    <div className='accordeon-text'
                    key={filteredTip.id}>
                        <Link to={`/tip/${filteredTip.id}`} key={filteredTip.id}>
                            <span className='tip-item'>{filteredTip.title.rendered}</span>
                        </Link>
                        
                </div>
                ))}
            </div>
        </div>
    );
};

export default Accordeon;