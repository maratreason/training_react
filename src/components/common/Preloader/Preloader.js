import React from "react";
import preloader from "../../../assets/img/Spinner.svg";

let Preloader = (props) => {
    return <div>
        <img src={preloader} style={{width: 100, height: 100}} alt="preloader" />
    </div>
}

export default Preloader;