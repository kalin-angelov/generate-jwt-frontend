import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuthStore } from "../../store/store"; 
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const [togglePassword, setTogglePassword] = useState(false);
    const { setAuth } = useContext(AuthContext);
    const { singInAuth } = useAuthStore();
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const onTogglePassword = (e) => {

        e.preventDefault();
        setTogglePassword(!togglePassword);
        
    };

    const login = async (e) => {
        e.preventDefault();

        const { success, message, token } = await singInAuth(user);
        
        if (!success) {
            toast.error(message);
        } else {
            setAuth(token);
            toast.success(message);
            
            setUser({
                username: "",
                password: "",
            });

            navigate("/user-profile");
        }
    };

    return (
        <main>

            <article className="container">

                <h3 className="form-header">Login Now</h3>

                <form className="form" >

                    <input className="input-field" type="text" placeholder="Username" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})}/>
                  
                
                    <fieldset className="password-filed-container">
                    
                        <input 
                            className="input-field"
                            type={togglePassword ? "text" : "password"} 
                            placeholder="Password" 
                            value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}
                        />
                    
                        <button className="toggle-btn" type="button" tabIndex={-1} onClick={(e) => onTogglePassword(e)}>
                            {togglePassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </button>
                    </fieldset>

                    <button type="submit" onClick={(e) => login(e)} className="btn login-btn">Login</button>
                </form>

                <div className="mini-container">
                    <p className="message">Don't have an account?</p>

                    <Link to={"/register"}>
                        <button className="btn">Sign Up</button>
                    </Link>
                    
                </div>
                
            </article>
            

        </main>
    );
};

export default Login;
