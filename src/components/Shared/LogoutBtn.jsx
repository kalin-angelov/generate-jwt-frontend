import { useAuthStore } from "../../store/store";
import { AuthContext } from "../../context/AuthContext";

import { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const { setAuth } = useContext(AuthContext);
    
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
        <div className="logout-container">
            <button className="logout-btn" type="button" title="Logout" onClick={onLogout}>
                <i className="fa-solid fa-power-off"></i>
            </button>
        </div>
    ) 
};

export default LogoutBtn;
