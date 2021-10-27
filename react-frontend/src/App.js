import './App.css';
import {useState} from 'react'
import TabBar from "./TabBar";
import PatientUploadForm from "./PatientUploadForm";

export const UserTypes = {
    NOT_SELECTED: 'not_selected',
    DOCTOR: 'doctor',
    PATIENT: 'patient',
    ADMIN: 'admin'
}

function App() {
    const [userType, setUserType] = useState(UserTypes.NOT_SELECTED);

    return <>
        <TabBar setUserType={setUserType}/>
        {userType === UserTypes.PATIENT && <PatientUploadForm></PatientUploadForm>}
    </>
}

export default App;
