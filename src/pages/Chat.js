import './Chat.css';
import { useState } from "react";
import { query, where, orderBy, serverTimestamp, addDoc } from "firebase/firestore";
import { messagesCollection, auth } from '../config/firebase';
import useCollection from '../hooks/useCollection';
import useAuthContext from '../hooks/useAuthContext';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';

const Chat = () => {
    const [isLog, logout] = useAuthContext();
    const customOrder = orderBy("createAt","asc");
    const customWhere = where("createAt","!=","");
    const customQuery = query(messagesCollection,customWhere,customOrder);
    const [messages, loading] = useCollection(customQuery)

    const [message, setMessage] = useState("");

    const handleChange = ({target}) => {
        const { value } = target;
        setMessage(value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const {uid, photoURL, displayName, email} = auth.currentUser;
        const data = {
            message,
            createAt : serverTimestamp(),
            photoURL,
            uid,
            displayName,
            email
        }
        addDoc(messagesCollection,data);
        setMessage('');
    }

    return(
        <div className='chat-wrapper'>
            <main className='chat-container'>
                <header className='chat-header'>
                    <h2 className='text-header'>
                        Main Chat
                    </h2>
                    <button onClick={logout} className='button-icon'>
                        <LogoutIcon/>
                    </button>
                </header>
                <section className="chat-body">
                    <ul className="chat-messages">
                        {
                            !loading
                            &&
                            messages.map((doc) => <Message key={doc.id} messageData={doc.data()}/>)
                        }
                        {
                            loading
                            &&
                            <h1>Loading...</h1>
                        }
                    </ul>
                </section>
                <form className='chat-footer' onSubmit={handleSubmit}>
                    <input type="text" className='chat-input' onChange={handleChange}
                     value={message} placeholder='Write a message'/>
                    <button className='chat-button'>
                        <SendIcon sx={{ fontSize: "1.5rem" }}/>
                    </button>
                </form>
            </main>
        </div>
    );
}

const Message = ({messageData}) => {
    const { message, photoURL, uid } = messageData;
    const userId = auth.currentUser.uid;
    const userMessage = userId === uid;
    return(
        <li className={`message ${userMessage ? 'message-user':''}`}>
            <img className='avatar' src={photoURL} />
            <span className={`text-message ${userMessage ? 'text-message-user':''}`}>
                {message}
            </span>
        </li>
    )
}
export default Chat;