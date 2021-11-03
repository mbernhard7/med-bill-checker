import TabBar from "./TabBar";
import {useState} from "react";

function DoctorView(props) {

    const tabs = {
        BROWSE_BILLS: 'Browse Bills',
        MY_BILLS: 'My Bills',
        ACCOUNT: 'Account',
    }
    const [activeTab, setActiveTab] = useState(tabs.MY_BILLS);

    return <>
        <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} setUserType={props.setUserType}/>
    </>
}

export default DoctorView;