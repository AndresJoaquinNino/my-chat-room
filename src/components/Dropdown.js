import './Dropdown.scss';
import { auth, database } from '../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import ReplyIcon from '@mui/icons-material/Reply';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Dropdown = ({messageData,changeState}) =>{

    const userId = auth.currentUser.uid;
    const isUserMessage = userId === messageData.author.uid;

    const copyInClipboard = () => {
        const { message } = messageData;
        navigator.clipboard.writeText(message);
        changeState(false);
    }

    const toggleInteraction =  (sendInteraction) => {
        const { msgId, likes, dislikes } = messageData
        const messageRef = doc(database, "messages", msgId);
        const isInLikes = likes.includes(userId)
        const isInDislikes = dislikes.includes(userId)
        const objUpdate = {};
        if(sendInteraction === 'likes'){
            objUpdate.likes = isInLikes ? arrayRemove(userId) : arrayUnion(userId)
            if(isInDislikes) objUpdate.dislikes = arrayRemove(userId)
        }
        if(sendInteraction === 'dislikes'){
            objUpdate.dislikes = isInDislikes ? arrayRemove(userId) : arrayUnion(userId)
            if(isInLikes) objUpdate.likes = arrayRemove(userId)
        }
        updateDoc(messageRef, objUpdate);
    }

    const customStyle = { fontSize: '1rem' };

    return(
        <div className={isUserMessage ? 'dropdown-user' : 'dropdown'}>
            <button className='option'>
                <ReplyIcon sx={customStyle}/>
            </button>
            <button className='option' onClick={copyInClipboard}>
                <ContentCopyIcon sx={customStyle}/>
            </button>
            <button className='option' onClick={() => toggleInteraction('likes')}>
                <ThumbUpIcon   sx={customStyle}/>
            </button>
            <button className='option' onClick={() => toggleInteraction('dislikes')}>
                <ThumbDownIcon  sx={customStyle}/>
            </button>
        </div>
    )
}

export default Dropdown;