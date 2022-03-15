import './Message.scss';
import { auth } from '../config/firebase';
import moment from 'moment';

const Message = ({ msgData }) => {
    const { author, message, createAt } = msgData;
    const messageDate = createAt ? createAt.toDate() : new Date();
    const messageTime = moment(messageDate).format('hh:mm A');
    const userId = auth.currentUser.uid;
    const isMsgSended = userId === author.uid;
    const msgClass = isMsgSended ? 'message-send' : 'message';
    return (
        <li className={msgClass}>
            <img className='avatar' src={author.photoURL} alt="" />
            <section className='content'>
                {
                    !isMsgSended
                    &&
                    <header className='header'> { author.displayName } </header>
                }
                <p> { message } </p>
                <footer className='footer'> { messageTime } </footer>
            </section>
        </li>
    )
}

export default Message;
