import "./App.css";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { AuthContext } from "./context/AuthContext";
import { RouteGuard } from "./components/Shared/RouteGuard";

import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import ProfileEdit from "./components/Profile/ProfileEdit";
import PageNotFound from "./components/Shared/PageNotFound";

function App() {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const [user, setUser] = useState(null);

    const valueContext = {
        auth,
        setAuth,
        user,
        setUser,
        isAuthenticated: auth.length > 0,
    };

    return (
        <>
            <AuthContext.Provider value={valueContext}>
                <Routes>

                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    <Route element={<RouteGuard />} >
                        <Route path="/user-profile" element={<Profile />} />
                        <Route path="/edit" element={<ProfileEdit />}/>
                    </Route>
                </Routes>

                <ToastContainer position="bottom-right"/>
            </AuthContext.Provider>
        </>
    );
};

export default App;
