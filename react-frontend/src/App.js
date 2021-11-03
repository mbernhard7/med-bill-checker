import './App.css';
import {useState} from 'react'
import PatientView from "./PatientView";
import LogInPanel from "./LogInPanel";
import DoctorView from "./DoctorView";

export const UserTypes = {
    NONE: 'none',
    DOCTOR: 'doctor',
    PATIENT: 'patient',
}

function App() {
    const [userType, setUserType] = useState(UserTypes.NONE);

    return <>
        <div id="header">
            <h1>Medical Bill Checker</h1>
        </div>
        <div id='background'>
            {userType === UserTypes.NONE && <LogInPanel setUserType={setUserType}/>}
            {userType === UserTypes.DOCTOR && <DoctorView setUserType={setUserType}/>}
            {userType === UserTypes.PATIENT && <PatientView setUserType={setUserType}/>}
        </div>
    </>
}

export default App;
