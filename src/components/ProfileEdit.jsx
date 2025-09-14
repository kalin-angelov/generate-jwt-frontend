import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { useUserStore } from "../store/user";

const ProfileEdit = () => {
    const navigate = useNavigate();
    const { user, setAuth } = useContext(AuthContext);
    const { formValue, onFormValueChange } = useForm(user);
    const { editUser } = useUserStore();

    const editProfile = async (e) => {
        e.preventDefault();
        const id = user.id;
        
        const { success } = await editUser(formValue, id);
       
        if (success) {
            toast.success("Profile successfully edit.");

            navigate("/me");
        }

        if (!success) {
            setAuth({});
            navigate("/login");
        }
        
    }

    return (
        <main className="container">
            <div className="userContainer">
                <div className="profileCard">
                    <>
                        <figure className="profileImgContainer">
                            <img className="defaultProfileImg" src={!formValue.imgUrl ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : formValue.imgUrl} alt="profile img" />
                        </figure>
                    </>

                    <form className="form">
                        <p>My profile</p>

                        <input type="text" placeholder="First name" name="firstName" value={formValue.firstName} onChange={onFormValueChange}/>
                        <input type="text" placeholder="Last name" name="lastName" value={formValue.lastName} onChange={onFormValueChange}/>
                        <input type="text" name="email" value={formValue.email} onChange={onFormValueChange}/>
                        <input 
                            type="text" 
                            name="imgUrl" 
                            value={!formValue.imgUrl ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : formValue.imgUrl} 
                            onChange={onFormValueChange}
                        />

                        <button className="btn form-btn" type="submit" onClick={(e) => editProfile(e)}>Save</button>
                    </form>

                </div>
            </div>

            <button className="back" onClick={() => navigate(-1)}>Back</button>
        </main>
    );
};

export default ProfileEdit;
