import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useUserStore } from "../store/user";
import { AuthContext } from "../context/AuthContext";
import { useAuthStore } from "../store/store";

const Profile = () => {
    const navigate = useNavigate();
    const { getUser } = useUserStore();
    const { logout } = useAuthStore();
    const { setAuth, user, setUser } = useContext(AuthContext);

    useEffect(() => {
        
        getUser()
            .then(data => setUser(data))
            .catch(() => {setAuth({}), navigate("/login")})
            
    },[]);
    
    const onLogout = async() => {
        const { success, message } = await logout();

        if (!success) {
            toast.error(message);
        } else {
            setAuth({});
            toast.success(message);
            navigate("/login");
        }
    }


    return (
        <main>
            <div className="userContainer">
                {!user ? 
                    <div>Loading...</div> 
                    :
                    <>
                        <div className="profileCard">
                            <figure className="profileImgContainer">
                                <img className="defaultProfileImg" src={user.imgUrl ? user.imgUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="profile img" />
                            </figure>

                            <ul className="user-info">       
                                <ul className="user-details">
                                    <li>Role: <span>{user.role}</span></li>
                                    <li>Active: <span>{user.active ? "Yes": "No"}</span></li>
                                </ul>                
                            
                                {!user.lastName && !user.firstName 
                                    ? 
                                        null 
                                    :
                                    <ul className="user-details">
                                        {user.firstName ? <li>First name: <span>{user.firstName}</span></li> : null}
                                        {user.lastName ? <li>Last name: <span>{user.lastName}</span></li> : null}
                                    </ul>  
                                } 

                                <li>Username: <span>{user.username}</span></li>
                                <li>Email: <span>{user.email}</span></li>

                            </ul>

                        </div>
                    
                        <button className="btn edit-btn" onClick={() => navigate("/edit")}>Edit</button>
                        <button className="btn logout-btn" onClick={onLogout}>Logout</button>
                    </>
                }
            </div>
        </main>
    )
};

export default Profile;
