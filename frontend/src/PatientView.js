import TabBar from "./TabBar";
import {useState} from "react";
import PatientUploadForm from "./PatientUploadForm";
import BillList from "./BillList";

function PatientView(props) {

    const tabs = {
        MY_BILLS: 'My Bills',
        NEW_BILL: 'New Bill',
        ACCOUNT: 'Account',
    }
    const [activeTab, setActiveTab] = useState(tabs.MY_BILLS);

    return <>
        <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} setUserType={props.setUserType}/>
        {activeTab===tabs.MY_BILLS && <BillList/>}
        {activeTab===tabs.NEW_BILL && <PatientUploadForm/>}
        {activeTab===tabs.ACCOUNT && <></>}
    </>
}

export default PatientView;