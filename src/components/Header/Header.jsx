import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const Header = (props) => {
    return (
        <header className={classes.header}>
            <img
                src="https://www.pngfind.com/pngs/m/56-560150_600-x-600-2-shield-check-icon-png.png"
                alt=""
            />

            <div className={classes.loginBlock}>
                { props.isAuth 
                    ? <div>{props.login}<br/><button onClick={props.logout}>Logout</button> </div>
                    : <NavLink to={"/login"}>Login</NavLink> 
                }
            </div>
        </header>
    );
};

export default Header;
