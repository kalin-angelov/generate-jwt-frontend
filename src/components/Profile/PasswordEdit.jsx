import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from "../../store/user";
import { useAuthStore } from '../../store/store';
import { AuthContext } from "../../context/AuthContext";

import BackBtn from '../Shared/BackBtn';
import LogoutBtn from '../Shared/LogoutBtn';


function PasswordEdit() {
    const navigate = useNavigate();
    const [togglePassword, setTogglePassword] = useState(false);
    const { user, setAuth } = useContext(AuthContext);
    const { logout } = useAuthStore();
    const { changePassword } = useUserStore();
    const [passwordEdit, setPasswordEdit] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const onTogglePassword = (e) => {
        e.preventDefault();
        setTogglePassword(!togglePassword);
    };

    const onChangePassword = async (e) => {
        e.preventDefault();
        
        const userId = user.id;
        const { success, message } = await changePassword(passwordEdit, userId);

        if (success) {
            toast.success(message);
            await logout();

            setAuth({});
            navigate("/login");
        } else {
            toast.error(message);
        }

    }

    return (
        <main>
            
            <article className="container profile-container">

                <BackBtn />
                <LogoutBtn />

                <div className="circle"></div>
                <h2 className="profile-header">Password Change</h2>

                <figure className="img-container">
                    <img src="/images/password-change-W.png" width={150} alt="key change img" />
                </figure>

                <form className="form">

                    <fieldset className="password-filed-container">
                    
                        <input 
                            className="input-field"
                            type={togglePassword ? "text" : "password"} 
                            placeholder="Old password" 
                            value={passwordEdit.oldPassword}
                            onChange={(e) => setPasswordEdit({...passwordEdit, oldPassword: e.target.value})}
                        />
                    
                        <button className="toggle-btn" type="button" tabIndex={-1} onClick={(e) => onTogglePassword(e)}>
                            {togglePassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </button>
                    </fieldset>

                    <fieldset className="password-filed-container">
                    
                        <input 
                            className="input-field"
                            type={togglePassword ? "text" : "password"} 
                            placeholder="New password" 
                            value={passwordEdit.newPassword}
                            onChange={(e) => setPasswordEdit({...passwordEdit, newPassword: e.target.value})}
                        />
                    
                        <button className="toggle-btn" type="button" tabIndex={-1} onClick={(e) => onTogglePassword(e)}>
                            {togglePassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </button>
                    </fieldset>

                    <fieldset className="password-filed-container">
                    
                        <input 
                            className="input-field"
                            type={togglePassword ? "text" : "password"} 
                            placeholder="Confirm password" 
                            value={passwordEdit.confirmPassword}
                            onChange={(e) => setPasswordEdit({...passwordEdit, confirmPassword: e.target.value})}
                        />
                    
                        <button className="toggle-btn" type="button" tabIndex={-1} onClick={(e) => onTogglePassword(e)}>
                            {togglePassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </button>
                    </fieldset>

                    <button className="btn password-btn" type="submit" onClick={(e) => onChangePassword(e)}>Save</button>
                </form>
                
            </article>
        </main>
    );
}

export default PasswordEdit
