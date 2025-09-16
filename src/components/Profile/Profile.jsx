import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { useUserStore } from "../../store/user";
import { AuthContext } from "../../context/AuthContext";

import LogoutBtn from "../Shared/LogoutBtn";

const Profile = () => {
    const { getUser } = useUserStore();
    const { setAuth, user, setUser } = useContext(AuthContext);

    useEffect(() => {
        
        getUser()
            .then(data => setUser(data))
            .catch(() => {setAuth({}), navigate("/login")})
            
    },[]);
    
    return (
        <main>
            <LogoutBtn />
            <>
                {!user ? 
                    <div>Loading...</div> 
                    :
                    <>
                        <article className="container profile-container">

                            <div className="circle"></div>
                            <h2 className="profile-header">My Pass</h2>

                            <figure className="img-container">
                                <img className="profile-img" src={user.imgUrl ? user.imgUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} width={120} alt="profile img" />
                            </figure>

                            <h3 className="username-header">{user.username}</h3>

                            <ul className="user-info">

                                <li>Role : <span>{user.role}</span></li>
                                {user.firstName ? <li>First name : <span>{user.firstName}</span></li> : <li>First name : <span>Null</span></li>}
                                {user.lastName ? <li>Last name : <span>{user.lastName}</span></li> : <li>Last name : <span>Null</span></li>}
                                <li>Email : <span>{user.email}</span></li>

                            </ul>

                            <Link to={"/edit"}>
                                <button className="btn" type="button">
                                    Edit
                                </button>
                            </Link>
                        </article>
                    
                    </>
                }
            </>
        </main>
    )
};

export default Profile;
