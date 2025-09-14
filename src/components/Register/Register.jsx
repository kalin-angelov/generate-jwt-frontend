import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuthStore } from "../../store/store"; 

const Register = () => {
    const navigate = useNavigate();
    const { createAuth } = useAuthStore();
    const [togglePassword, setTogglePassword] = useState(false);
    const [newUser, setNewUser] = useState({
        email: "",
        username: "",
        password: "",
        confPassword: ""
    });

    const onTogglePassword = (e) => {

        e.preventDefault();
        setTogglePassword(!togglePassword);
        
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const { success, message } = await createAuth(newUser);
        
        if (!success) {
            toast.error(message);
        } else {
            toast.success(message);

            setNewUser({
                email: "",
                username: "",
                password: "",
                confPassword: ""
            });
            navigate("/login");
        }
       
    };

    return (
        <main>
        
            <article className="container">

                <h3 className="form-header">SignUp Now</h3>

                <form className="form">

                    <input className="input-field" type="text" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />

                    <input className="input-field" type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} />

                    <fieldset className="password-filed-container">
                        <input 
                            className="input-field" 
                            type={togglePassword ? "text" : "password"} 
                            placeholder="Password" 
                            value={newUser.password} 
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                        />

                        <button className="toggle-btn" onClick={(e) => onTogglePassword(e)}>
                            {togglePassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </button>
                    </fieldset>
                    
                    <fieldset className="password-filed-container">
                        <input 
                            className="input-field" 
                            type={togglePassword ? "text" : "password"} 
                            placeholder="Confirm Password" 
                            value={newUser.confPassword} onChange={(e) => setNewUser({...newUser, confPassword: e.target.value})}
                        />   

                        <button className="toggle-btn" onClick={(e) => onTogglePassword(e)}>
                            {togglePassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </button>
                    </fieldset>
                    
                </form>

                <button type="submit" onClick={(e) => {handleRegister(e)}} className="btn submit-btn">Sign Up</button>

            </article>
            
        </main>
    )
}

export default Register;
