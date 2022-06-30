import React from "react";
import './Header.css'
import CloseButton from 'react-bootstrap/CloseButton'
import Chatbot from "./Chatbot";
const container = document.getElementById('chatbot');

function Header() {
    function closeChat () {
		if (window.confirm("Do you want to close Gustoso?") == true) {
			container.style.display = "none";
		}
    }
    return (
        <div className="top_menu">
            <div className="buttons">
                <CloseButton onClick={closeChat}/>
                <div className="button minimize"/>
                <div className="button maximize"/>
            </div>
            <div className="title">Conversation with Gustoso</div>
        </div>   
    )
}

export {Header}