import TabBar from "./TabBar";
import {useState} from "react";
import PatientUploadForm from "./PatientUploadForm";

function PatientView(props) {

    const tabs = {
        MY_BILLS: 'My Bills',
        NEW_BILL: 'New Bill',
        ACCOUNT: 'Account',
    }
    const [activeTab, setActiveTab] = useState(tabs.MY_BILLS);

    return <>
        <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} setUserType={props.setUserType}/>
        {activeTab===tabs.MY_BILLS && <></>}
        {activeTab===tabs.NEW_BILL && <PatientUploadForm/>}
        {activeTab===tabs.ACCOUNT && <></>}
    </>
}

export default PatientView;