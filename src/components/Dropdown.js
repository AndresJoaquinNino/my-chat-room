import './Dropdown.scss';
import { auth, database } from '../config/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import ReplyIcon from '@mui/icons-material/Reply';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Dropdown = ({messageData,changeState}) =>{
    const customStyle = {
        fontSize: '1rem'
    }

    const copyInClipboard = () => {
        const { message } = messageData;
        navigator.clipboard.writeText(message);
        changeState(false);
    }

    const toggleInteraction =  (sendInteraction) => {
        const { msgId, likes, dislikes } = messageData
        const messageRef = doc(database, "messages", msgId);
        const userId = auth.currentUser.uid
        const isInLikes = likes.includes(userId)
        const isInDislikes = dislikes.includes(userId)
        if(sendInteraction === 'likes'){
            const objUpdate = {
                likes: isInLikes ? arrayRemove(userId) : arrayUnion(userId)
            }
            if(isInDislikes) objUpdate.dislikes = arrayRemove(userId)
            updateDoc(messageRef, objUpdate);
        }
        if(sendInteraction === 'dislikes'){
            const objUpdate = {
                dislikes: isInDislikes ? arrayRemove(userId) : arrayUnion(userId)
            }
            if(isInLikes) objUpdate.likes = arrayRemove(userId)
            updateDoc(messageRef, objUpdate);
        }
    }

    return(
        <div className="relative">
            <div className="dropdown">
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
        </div>
    )
}

export default Dropdown;