import './Message.scss'
import { useRef, useState } from "react";
import Dropdown from './Dropdown';
import ReactionBar from './ReactionBar';
import { auth, database } from '../config/firebase';
import useDocument from '../hooks/useDocument';
import useClickOutside from '../hooks/useClickOutside';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';


const Message = ({ messageData, responseMessage}) => {
    const { message, createAt, author, likes, dislikes, responseTo } = messageData;
    const [document,loading] = useDocument(database,responseTo);
    const { uid, photoURL, displayName } = author;
    const messageDate = createAt ? createAt.toDate() : new Date();
    const messageTime = moment(messageDate).format('hh:mm A');
    const userId = auth.currentUser.uid;
    const isUserMessage = userId === uid;
    const avatarPhoto = photoURL || '../img/avatardefault.png';


    const [showMenu,setShowMenu] = useState(false);
    const [showMoreIcon,setShowMoreIcon] = useState(false);

    const dropdownRef = useRef(null)
    useClickOutside(dropdownRef, () => setShowMenu(false))

    return(
        <li className={isUserMessage ? 'message-send':'message-received'}>
            <img className='avatar' src={avatarPhoto} alt=''/>
            <article className={isUserMessage ? 'message-section-send':'message-section'} onMouseEnter={() => setShowMoreIcon(true)} onMouseLeave={() => setShowMoreIcon(false)}>
                <section className={isUserMessage ? 'message-box-send':'message-box'}>
                    {
                        responseTo != false && !loading
                        &&
                        <TinyResponderMessage messageData={document}/>
                    }
                    {
                        !isUserMessage
                        &&
                        <span className='message-header'> { displayName } </span>
                    }
                    <p> { message } </p>
                    <span className='message-time align-self-end'> { messageTime } </span>
                    <ReactionBar likes={likes} dislikes={dislikes}/>
                </section>
                {
                    showMoreIcon
                    &&
                    !showMenu
                    &&
                    <span className='message-option' onClick={() => setShowMenu(true)}>
                        <MoreVertIcon/>
                    </span>
                }
                {
                    showMenu
                    &&
                    <div ref={dropdownRef} className='relative'>
                        <Dropdown messageData={messageData} changeState={setShowMenu} responseMessage={responseMessage}/>
                    </div>
                }
            </article>
        </li>
    )
}

const TinyResponderMessage = ({messageData}) => {
    console.log(messageData)
    const { message, author } = messageData;
    const { uid, displayName } = author;
    const userId = auth.currentUser.uid;
    const isCurrentUser = userId === uid;
    return (
        <div className='tiny-responder'>
            <div className='tiny-responder-border'></div>
            <div className='tiny-responder-container'>
                <div className='tiny-responder-header'>
                    { isCurrentUser ? 'Me' : displayName }
                </div>
                <div className='tiny-responder-content'>
                    { message }
                </div>
            </div>
        </div>
    )
}

export default Message;