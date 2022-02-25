import './Chat.css';
import { useState } from "react";
import { query, where, orderBy, serverTimestamp, addDoc } from "firebase/firestore";
import { messagesCollection, auth } from '../config/firebase';
import useCollection from '../hooks/useCollection';
import useAuthContext from '../hooks/useAuthContext';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import ScrollToBottom from '../components/ScrollToBottom'
import moment from 'moment';

const usersColor = {};

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
            <header className='chat-header'>
                <div className='text-header'>
                    <h2> Main Chat </h2>
                    <button onClick={logout} className='button-icon'>
                        <LogoutIcon/>
                    </button>
                </div>
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
                    <ScrollToBottom dependence={messages}/>
                </ul>
            </section>
            <form className='chat-footer' onSubmit={handleSubmit}>
                <input type="text" className='chat-input' onChange={handleChange}
                    value={message} placeholder='Write a message'/>
                <button className='chat-button'>
                    <SendIcon sx={{ fontSize: "1.5rem" }}/>
                </button>
            </form>
        </div>
    );
}

const Message = ({messageData}) => {
    const { message, photoURL, uid, createAt, displayName } = messageData;
    const messageDate = createAt ? createAt.toDate() : new Date();
    const messageTime = moment(messageDate).format('hh:mm A');
    const userId = auth.currentUser.uid;
    const userMessage = userId === uid;
    usersColor[uid] = usersColor[uid] ? usersColor[uid] : getRandomColor();

    return(
        <li className={`message ${userMessage ? 'message-user':''}`}>
            <img className='avatar' src={photoURL || '../img/avatardefault.png'} alt=''/>
            <p className={`text-message ${userMessage ? 'text-message-user':''}`} >
                {
                    !userMessage
                    &&
                    <span className='user-message' style={{'color': usersColor[uid]}}>{displayName}</span>
                }
                <span>{message}</span>
                <span className={`label-message ${userMessage ? 'label-message-user':''}`}>{messageTime}</span>
            </p>
        </li>
    )
}

const getRandomColor = () => {
    const characters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++){
        color += characters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default Chat;