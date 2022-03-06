import './ReactionBar.scss';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const ReactionBar = ({ likes, dislikes }) => {

    return(
        <span className='relative'>
            <div className='reactions'>
                {
                    likes.length > 0
                    &&
                    <div className='circle'>
                        <ThumbUpIcon sx={{ fontSize: '0.8rem' }}/>
                        <span> { likes.length } </span>
                    </div>
                }
                {
                    dislikes.length > 0
                    &&
                    <div className='circle'>
                        <ThumbDownIcon sx={{ fontSize: '0.75rem' }}/>
                        <span> { dislikes.length }</span>
                    </div>
                }
            </div>
        </span>
    )
}

export default ReactionBar;