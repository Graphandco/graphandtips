import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { BsChevronLeft } from 'react-icons/bs';
import { AiOutlineCopy } from 'react-icons/ai';

const TipSingle = () => {
    const { id } = useParams();
    const [tipACF, setTipACF] = useState([]);
    const [tipACFCode, setTipACFCode] = useState([]);
    const [tipTitle, setTipTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    //GETTING ONE TIP
    useEffect(() => {
        const handleTip = async () => {
            setIsLoading(true);
            try {
                const response = await Axios.get(
                    `https://www.graphandco.com/coding-tips/wp-json/wp/v2/coding-tips/${id}`
                );
                // setTip(response.data);
                setTipTitle(response.data.title.rendered);
                setTipACF(response.data.acf);
                setTipACFCode(response.data.acf.code);
                setIsLoading(false);
            } catch (e) {
                console.log(
                    'Une erreur est survenue lors de la récupération des Tips'
                );
            }
        };
        handleTip();
    }, [id]);

    //COPY TO CLIPBOARD
    const copyClipboard = (text) => {
        navigator.clipboard.writeText(text)
        notify()
      }

    //NOTIFY
    const notify = () => toast.dark('Texte copié !', {
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: true,
		closeOnClick: false,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
	});

    return (
        !isLoading &&
            <div className='tip-wrapper'>
                <div className="tip-header">
                    <h1>{tipTitle}</h1>
                    <div className="tip-subheader">
                        <NavLink to='/' exact>
                            <button className='back'><BsChevronLeft />Retour</button>
                        </NavLink>
                        <div className='langage'>
                            <span>{tipACF.langage}</span>
                        </div>
                    </div>
                </div>
                <div className="tip-content">
                    {tipACFCode.map((code, index) => (
                        <>
                        <div key={index} className="tip-details">
                            <p className='desc' dangerouslySetInnerHTML={{__html: code.description_du_code}}/>
                            <div className="code">                                
                                <SyntaxHighlighter
                                    style={atomDark}
                                    language={tipACF.langage.toLowerCase()==='prestashop' ? 'php' : tipACF.langage.toLowerCase()}
                                >
                                    {code.contenu_du_code}
                                </SyntaxHighlighter>
                                <button className='copy' onClick={()=> {
                                    copyClipboard(code.contenu_du_code)}} 
                                    >
                                    <AiOutlineCopy />
                                </button>
                                <ToastContainer />
                            </div>
                        </div>
                        </>
                    ))}
                </div>
            </div>
            
    )
}

export default TipSingle

