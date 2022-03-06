import './Message.scss'
import { useRef, useState } from "react";
import Dropdown from '../components/Dropdown';
import ReactionBar from './ReactionBar';
import { auth } from '../config/firebase';
import useClickOutside from '../hooks/useClickOutside';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';

const Message = ({messageData}) => {
    const { message, createAt, author, likes, dislikes } = messageData;
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
                        <Dropdown messageData={messageData} changeState={setShowMenu}/>
                    </div>
                }
            </article>
        </li>
    )
}

export default Message;