import React, {useEffect, useState} from "react";
import './Chatbot.css';

import {Header} from "./Header";
import {UserInput} from "./UserInput";
import {MessageArea} from "./MessageArea";
import { setGlobalState, useGlobalState } from "./index";
import {io} from "socket.io-client";

const socket = io();

function Chatbot() {
    /*
      Handle messages
     */
    const [messages, setMessages] = useState([{
        text: "Welcome to our restaurant, This is Gustoso, your personal assistant. You can ask me general questions or you can start ordering straight away!",
        position: "left"
    }]);
    const tog = useGlobalState("Toggle")
    useEffect(() => {
        //if last message is a non-empty question, ask the server
        let lastMessage = messages[messages.length - 1]
        if (lastMessage.text !== "" && lastMessage.position === "right") {
            socket.emit('question', lastMessage.text);
        }

        //handle server responses
        socket.on("answer", (data) => {
            setMessages([...messages, {text: data, position: "left"}])
        });

    }, [messages]);

    function onSubmitMessage(inputText) {
        setMessages([...messages, {text: inputText, position: "right"}])
    }
    

    /*
      Render HTML
    */


    return (
        <div className="chat_window" data-closable>
          <Header />
            <MessageArea messages={messages} />
            <UserInput onSubmitMessage={onSubmitMessage} />
        </div>
    ); 
    
}

export default Chatbot;