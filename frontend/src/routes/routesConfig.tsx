import React           from "react";
import {Route, Routes} from 'react-router-dom'
import Login           from "../pages/user/login/Login";
import Register        from "../pages/user/register/UserRegister";
import Home            from "../pages/home/Home";

function RoutesConfig() {

    return (
        <Routes>
            <Route path={'login'} element={<Login/>} />
            <Route path={'register'} element={<Register/>} />
            <Route path={'home'} element={<Home/>}/>
        </Routes>
    )
}

export default RoutesConfig
