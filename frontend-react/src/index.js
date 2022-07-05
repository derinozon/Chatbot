import * as ReactDOM from 'react-dom/client';
import Chatbot from './Chatbot';
import "./index.css"
import {createGlobalState} from 'react-hooks-global-state';

const container = document.getElementById('chatbot');
const cb = ReactDOM.createRoot(container);
cb.render(<Chatbot />)

function closeChat () {
    container.style.display = "none";
}

export {closeChat}

const { setGlobalState, useGlobalState } = createGlobalState({Toggle: true});

export { setGlobalState, useGlobalState }