import useAuthContext from "../hooks/useAuthContext";
import './SignIn.css';
import ChatIcon from '@mui/icons-material/Chat';
import LoginIcon from '@mui/icons-material/Login';
const SignIn = () => {
    const { isLog, setLog } = useAuthContext();

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <div className="wrapper">
            <div className="card">
                <header className="card-header">
                    <h1>My Chat Room</h1> <ChatIcon sx={{ fontSize: '2rem' }} />
                </header>
                <form className="card-body" onSubmit={handleSubmit}>
                    <fieldset className="form-group">
                        <label className="form-label" htmlFor="email">Email:</label>
                        <input className="form-input" type="text" name='email' placeholder="..."/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label className="form-label" htmlFor="password">Password:</label>
                        <input className="form-input" type="text" name='password' placeholder="..."/>
                        <span className="link-blue">Forgot password?</span>
                    </fieldset>
                    <button className="button-blue" type="submit">
                        Sign In
                    </button>
                </form>
                <footer className="card-footer">
                    <span className='dividers-row'>
                        <hr/>
                        o
                        <hr/>
                    </span>
                    <button className="card-auth">
                        <img className="card-icon" src='https://img.icons8.com/color/48/000000/google-logo.png' alt='Google Icon' />
                        Sign in With Google
                    </button>
                </footer>
            </div>
            <div className="card padding-card-tiny">
                <p>
                    Don't have account? <span className="link-blue">Register</span>
                </p>
            </div>
        </div>
    )
}

export default SignIn