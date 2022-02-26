import './Chat.css';
import { useState } from "react";
import { query, where, orderBy, serverTimestamp, addDoc } from "firebase/firestore";
import { messagesCollection, auth } from '../config/firebase';
import useCollection from '../hooks/useCollection';
import useAuthContext from '../hooks/useAuthContext';
import { useLongPress } from 'use-long-press';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import ScrollToBottom from '../components/ScrollToBottom'
import moment from 'moment';


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
                        loading
                        ? <h1>Loading...</h1>
                        : messages.map((doc) => <Message key={doc.id} messageData={doc.data()}/>)
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
    const isUserMessage = userId === uid;
    const avatarPhoto = photoURL || '../img/avatardefault.png';

    const bind = useLongPress(() => {
        alert('Long pressed!');
    },{detect: 'touch',threshold:500});

    return(
        <li className={`container-message ${isUserMessage ? 'container-message-user':''}`}>
            <img className='avatar' src={avatarPhoto} alt=''/>
            <p className={`box-message ${isUserMessage ? 'box-message-user':''}`} {...bind}>
                {
                    !isUserMessage
                    &&
                    <span className='user-message'>{displayName}</span>
                }
                <span>{message}</span>
                <span className={`label-message ${isUserMessage ? 'label-message-user':''}`}>{messageTime}</span>
            </p>
        </li>
    )
}

export default Chat;