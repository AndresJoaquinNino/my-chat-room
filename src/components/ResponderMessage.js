import './ResponderMessage.scss';

const ResponderMessage = () => {
    return(
        <section className="response-message">
            <div className="container-message">
                <div className='border'></div>
                <div className='content'>
                    <span className='content-header'>
                        Andrés
                    </span>
                    <span className='content-text'>
                        Es momento de que respondas este mensaje jovencito.
                    </span>
                </div>
                <div className="relative">
                    <div className="circle-icon">X</div>
                </div>
            </div>
        </section>
    )
}
export default ResponderMessage