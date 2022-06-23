import React from "react";
import './Header.css'
import CloseButton from 'react-bootstrap/CloseButton'
import Chatbot from "./Chatbot";

function Header() {
    return (
        <div className="top_menu">
            <div className="buttons">
                <CloseButton onClick={window.close}/>
                <div className="button minimize"/>
                <div className="button maximize"/>
            </div>
            <div className="title">Conversation with Gustoso</div>
        </div>
    )
}

export {Header}