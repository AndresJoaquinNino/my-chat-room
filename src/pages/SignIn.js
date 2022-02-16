import './SignIn.css';
import ChatIcon from '@mui/icons-material/Chat';
import useAuthContext from "../hooks/useAuthContext";
import { auth } from '../config/firebase'
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { NavLink } from "react-router-dom";

const SignIn = () => {
    const [login] = useAuthContext();
    console.log("login = ",login)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(auth)
    }

    const googleAuth = () =>{
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth,provider);
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
                        <NavLink to='/ForgotPassword' className="link-blue">Forgot password?</NavLink>
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
                    <button className="card-auth" onClick={googleAuth}>
                        <img className="card-icon" src='https://img.icons8.com/color/48/000000/google-logo.png' alt='Google Icon' />
                        Sign in With Google
                    </button>
                </footer>
            </div>
            <div className="card padding-card-tiny">
                <p>
                    Don't have account? <NavLink to='/Register' className="link-blue">Register</NavLink>
                </p>
            </div>
        </div>
    )
}

export default SignIn