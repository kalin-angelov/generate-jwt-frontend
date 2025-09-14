import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const RouteGuard = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("auth");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }

        if (token) {
            navigate("/me")
        }
    },[]);

    return <Outlet/>
};