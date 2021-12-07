import './App.css';
import {useState} from 'react'
import PatientView, {PatientTabs} from "./PatientView";
import LogInPanel from "./LogInPanel";
import DoctorView, {DoctorTabs} from "./DoctorView";
import TabBar from "./TabBar";

export const UserTypes = {
    NONE: {DEFAULT: ''},
    DOCTOR: DoctorTabs,
    PATIENT: PatientTabs,
}

function App() {
    const [userType, setUserType] = useState(UserTypes.NONE);
    const [activeTab, setActiveTab] = useState(userType.DEFAULT);
    const [user, setUser] = useState(null);

    return <>
        <div id="header">
            <h1>Medical Bill Checker</h1>
            {userType !== UserTypes.NONE && <TabBar
                tabs={userType}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setUserType={(type) => {
                    setUserType(type);
                    setActiveTab(type.DEFAULT);
                    if (type===UserTypes.DOCTOR) {
                        setUser('doctor1');
                    } else if (type===UserTypes.PATIENT) {
                        setUser('patient1');
                    } else {
                        setUser(null);
                    }
                }}
            />}
        </div>
        <div id='background'>
            {userType === UserTypes.NONE &&
                <LogInPanel setUserType={(type) => {
                    setUserType(type);
                    setActiveTab(type.DEFAULT);
                    if (type===UserTypes.DOCTOR) {
                        setUser('doctor1');
                    } else if (type===UserTypes.PATIENT) {
                        setUser('patient1');
                    } else {
                        setUser(null);
                    }
                }}/>
            }
            {userType === UserTypes.DOCTOR &&
                <DoctorView activeTab={activeTab} user={user} setUser={setUser}/>
            }
            {userType === UserTypes.PATIENT &&
                <PatientView activeTab={activeTab} user={user} setUser={setUser}/>
            }
        </div>
    </>
}

export default App;
