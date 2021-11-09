import TabBar from "./TabBar";
import {useState} from "react";
import BillList from "./BillList";

function DoctorView(props) {

    const tabs = {
        BROWSE_BILLS: 'Browse Bills',
        MY_BILLS: 'My Bills',
        ACCOUNT: 'Account',
    }
    const [activeTab, setActiveTab] = useState(tabs.BROWSE_BILLS);

    return <>
        <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} setUserType={props.setUserType}/>
        {activeTab===tabs.BROWSE_BILLS && <BillList/>}
        {activeTab===tabs.MY_BILLS && <BillList/>}
        {activeTab===tabs.ACCOUNT && <></>}
    </>
}

export default DoctorView;