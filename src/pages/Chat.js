import './Chat.scss';
import LogoutIcon from '@mui/icons-material/Logout';
import SendIcon from '@mui/icons-material/Send';
import { messagesCollection, auth } from '../config/firebase';
import { query, orderBy,  serverTimestamp, addDoc } from "firebase/firestore";
import useCollection from '../hooks/useCollection';
import Message from '../components/Message';

const Chat = () => {
    const customOrder = orderBy("createAt","asc");
    const customQuery = query(messagesCollection,customOrder);
    const [messages, loading] = useCollection(customQuery)

    const handleSubmit = (event) => {
        event.preventDefault();
        const { uid, photoURL, displayName } = auth.currentUser;
        const message = event.target.msgText;
        const data = {
            createAt : serverTimestamp(),
            message: message.value,
            likes:[],
            dislikes:[],
            author:{
                uid,
                photoURL,
                displayName,
            }
        }
        addDoc(messagesCollection,data);
        message.value = ''
    }
    return(
        <div className='chat'>
            <main className='chat-content'>
                <header className='chat-header'>
                    <h2>Main Chat</h2>
                    <LogoutIcon/>
                </header>
                <ul className='chat-list-messages'>
                    {
                        loading
                        ? <h1>Loading...</h1>
                        : messages.map((doc) =>
                        <Message key={doc.id} msgData={{...doc.data(), msgId: doc.id}}/>)
                    }
                </ul>
                <form className='chat-footer' onSubmit={handleSubmit}>
                    <input type="text" className='chat-input' name='msgText' placeholder='Write a message!'/>
                    <button className='button-circle'>
                        <SendIcon/>
                    </button>
                </form>
            </main>
        </div>
    );
}

export default Chat;

