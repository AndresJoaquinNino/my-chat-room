import './Chat.scss';
import Message from '../components/Message';
import { useState } from "react";
import { query, orderBy, serverTimestamp, addDoc } from "firebase/firestore";
import { messagesCollection, auth } from '../config/firebase';
import useCollection from '../hooks/useCollection';
import useAuthContext from '../hooks/useAuthContext';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import ScrollToBottom from '../components/ScrollToBottom'


const Chat = () => {

    const [isLog, logout] = useAuthContext();
    const customOrder = orderBy("createAt","asc");
    const customQuery = query(messagesCollection,customOrder);
    const [messages, loading] = useCollection(customQuery)
    const [message, setMessage] = useState("");

    const handleChange = ({target}) => {
        const { value } = target;
        setMessage(value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const { uid, photoURL, displayName } = auth.currentUser;
        const data = {
            createAt : serverTimestamp(),
            message,
            likes:[],
            dislikes:[],
            author:{
                uid,
                photoURL,
                displayName,
            }
        }
        addDoc(messagesCollection,data);
        setMessage('');
    }

    return(
        <main className='chat'>
            <header className='chat-header'>
                <h2> Main Chat </h2>
                <button onClick={logout} className='button-transparent'>
                    <LogoutIcon/>
                </button>
            </header>
            <ul className="chat-body">
                {
                    loading
                    ? <h1>Loading...</h1>
                    : messages.map((doc) => <Message key={doc.id} messageData={{...doc.data(), msgId: doc.id}}/>)
                }
                <ScrollToBottom dependence={messages}/>
            </ul>
            <form className='chat-footer' onSubmit={handleSubmit}>
                <input type="text" className='chat-input' onChange={handleChange}
                    value={message} placeholder='Write a message'/>
                <button className='button-circle'>
                    <SendIcon sx={{ fontSize: "1.5rem" }}/>
                </button>
            </form>
        </main>
    );
}



export default Chat;