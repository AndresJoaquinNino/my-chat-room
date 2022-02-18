import useAuthContext from '../hooks/useAuthContext';

const Chat = () => {
    const [isLog, logout] = useAuthContext();
    console.log("isLog = ",isLog)
    return(
        <>
            <h1>This is a Chat</h1>
            {isLog && <button onClick={logout}>Logout</button>}
        </>
    );
}

export default Chat;