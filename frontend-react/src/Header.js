import React,{useState} from 'react'
import './Header.css'
import CloseButton from 'react-bootstrap/CloseButton'

import { setGlobalState, useGlobalState } from './index';
const container = document.getElementById('chatbot');


function Header() {
    const [show,setShow]=useState(true);
    function closeChat () {
		if (window.confirm("Do you want to close Gustoso?") == true) {
			container.style.display = "none";
		}
    }

    function hideChat () {
    
        let root = container.firstChild;
        let childArr = root.childNodes;
        let c1 = childArr[1];
        let c2 = childArr[2];
        if(show==true)
        {
        c1.style.display = "none";
        c2.style.display = "none";
        root.style = "background: none;" 
        }
        if(show==false)
        {
        c1.style.display = "default";
        c2.style.display = "default";
        root.style = "background: default;" 
        }
        setShow(!show)
    }
    
    return (
        <div className="top_menu">
            <div className="buttons">
                <div className="button close" onClick={closeChat}/>
                <div className="button minimize" onClick={hideChat}/>
                <div className="button maximize"/>
            </div>
            <div className="title">Conversation with Gustoso</div>
        </div>   
    )
}
export {Header}