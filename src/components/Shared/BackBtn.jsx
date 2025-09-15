import { useNavigate } from "react-router-dom"

const BackBtn = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button className="back-btn" type="button" title="Go back" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>
        </div>
    );
};

export default BackBtn;
