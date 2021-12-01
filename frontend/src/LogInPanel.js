import {UserTypes} from "./App";
import './LogInPanel.css';

function LogInPanel(props) {
    return <div id='login'>
        <h1>Log In</h1>
        <button id='patient' type='button' onClick={()=>props.setUserType(UserTypes.PATIENT)}>Patient</button>
        <button id='doctor' type='button' onClick={()=>props.setUserType(UserTypes.DOCTOR)}>Doctor</button>
    </div>
}

export default LogInPanel;