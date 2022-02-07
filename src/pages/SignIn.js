import useAuthContext from "../hooks/useAuthContext";

const SignIn = () => {
    const { isLog, setLog } = useAuthContext();

    const handleClick = (logState) => {
        setLog(logState)
    }
    return (
        <>
        <p>
            User log = {isLog.toString()}
        </p>
        {isLog && <button onClick={() => handleClick(false)}>Log out</button>}
        {!isLog && <button onClick={() => handleClick(true)}>Log in</button>}
        </>
    )
}

export default SignIn