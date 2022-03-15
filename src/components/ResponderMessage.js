import './ResponderMessage.scss';
import { auth } from '../config/firebase';
const ResponderMessage = ({ messageData, responseMessage = '' }) => {
    const { author, message } = messageData;
    const isCurrentUser = author.uid === auth.currentUser.uid
    return(
        <div className="responder">
            <div className="responder-container">
                <div className='responder-border'></div>
                <section className='responder-content'>
                    <header className='responder-header'>
                        { isCurrentUser ? 'Me' : author.displayName }
                    </header>
                    <span> { message } </span>
                </section>
                <div className="relative">
                    <button className="circle-icon" onClick={() => responseMessage({ status: false, data: {} })}>
                        X
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ResponderMessage