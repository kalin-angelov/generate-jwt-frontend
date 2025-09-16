import { useState } from 'react';

import BackBtn from '../Shared/BackBtn';
import LogoutBtn from '../Shared/LogoutBtn';

function PasswordEdit() {
    const [togglePassword, setTogglePassword] = useState(false);
    const [passwordEdit, setPasswordEdit] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const onTogglePassword = (e) => {

        e.preventDefault();
        setTogglePassword(!togglePassword);
        
    };

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
                            
                        />
                    
                        <button className="toggle-btn" type="button" tabIndex={-1} onClick={(e) => onTogglePassword(e)}>
                            {togglePassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </button>
                    </fieldset>

                    <button className="btn password-btn" type="submit">Save</button>
                </form>
                
            </article>
        </main>
    );
}

export default PasswordEdit
