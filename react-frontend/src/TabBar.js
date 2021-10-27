import {UserTypes} from "./App";
import './TabBar.css';

function TabBar(props) {

    return <>
        <h1>Medical Bill Checker</h1>
        <div id="tab-bar">
            <button id="doctor-button" onClick={() => props.setUserType(UserTypes.DOCTOR)}>Doctor</button>
            <button id="patient-button" onClick={() => props.setUserType(UserTypes.PATIENT)}>Patient</button>
        </div>
    </>
}

export default TabBar;