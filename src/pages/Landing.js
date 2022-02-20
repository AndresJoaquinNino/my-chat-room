import { NavLink } from "react-router-dom"

const Landing = () => {
    return(
        <>
        <header>
            <h1>Welcome to My Chat Room</h1>
        </header>
        <section>
            <p>
                This is a project for my portafolio
            </p>
            <p>
                Go to <NavLink to='/Login'> Login Page </NavLink>
            </p>
        </section>
        </>
    )
}
export default Landing