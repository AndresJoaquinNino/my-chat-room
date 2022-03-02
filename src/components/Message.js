import './Message.scss'
import { auth } from '../config/firebase';
import { useRef, useState } from "react";
import useClickOutside from '../hooks/useClickOutside';
import { useLongPress } from 'use-long-press';
import Dropdown from '../components/Dropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';

const Message = ({messageData}) => {
    const { message, createAt, author, interactions } = messageData;
    const { uid, photoURL, displayName } = author;
    console.log(interactions.likes)
    const messageDate = createAt ? createAt.toDate() : new Date();
    const messageTime = moment(messageDate).format('hh:mm A');
    const userId = auth.currentUser.uid;
    const isUserMessage = userId === uid;
    const avatarPhoto = photoURL || '../img/avatardefault.png';

    const [showDropdown,setShowDropdown] = useState(false);
    const [showMoreIcon,setShowMoreIcon] = useState(false);

    const bind = useLongPress(() => {
        alert('Long pressed!');
    },{detect: 'touch',threshold:500});

    const dropdownRef = useRef(null)
    useClickOutside(dropdownRef, () => setShowDropdown(false))

    return(
        <li className={isUserMessage ? 'message-send':'message-received'}>
            <img className='avatar' src={avatarPhoto} alt=''/>
            <article className={isUserMessage ? 'message-section-send':'message-section'}
            onMouseEnter={() => setShowMoreIcon(true)} onMouseLeave={() => setShowMoreIcon(false)}>
                <section className={isUserMessage ? 'message-box-send':'message-box'} {...bind}>
                    { !isUserMessage && <span className='message-header'> { displayName } </span> }
                    <p> { message } </p>
                    <span className='message-time align-self-end'>{messageTime}</span>
                </section>
                {
                    showMoreIcon && !showDropdown
                    &&
                    <span className='message-option' onClick={() => setShowDropdown(true)}>
                        <MoreVertIcon/>
                    </span>
                }
                {
                    showDropdown && <span ref={dropdownRef}><Dropdown messageData={messageData} changeState={setShowDropdown}/></span>
                }
            </article>
        </li>
    )
}

export default Message;