import './Dropdown.scss';
import { auth, database } from '../config/firebase';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
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

    const toggleInteraction =  (interaction) => {
        const { msgId, interactions } = messageData
        console.log('interactions = ',interactions)
        const messageRef = doc(database, "messages", msgId);
        /*
            updateDoc(messageRef, {
                interactions:{
                    likes: arrayUnion(auth.currentUser.uid)
                }
            });
        */
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
                <button className='option'>
                    <ThumbDownIcon  sx={customStyle}/>
                </button>
            </div>
        </div>
    )
}

export default Dropdown;