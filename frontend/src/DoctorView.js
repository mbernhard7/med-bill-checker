import BillList from "./BillList";
import DoctorAccount from "./DoctorAccount";

export const DoctorTabs = {
    DEFAULT: 'Browse Bills',
    MY_BILLS: 'My Bills',
    ACCOUNT: 'Account',
}

function DoctorView(props) {
    return <>
        {props.activeTab===DoctorTabs.DEFAULT && <BillList/>}
        {props.activeTab===DoctorTabs.MY_BILLS && <BillList user={props.user}/>}
        {props.activeTab===DoctorTabs.ACCOUNT && <DoctorAccount user={props.user} setUser={props.setUser}/>}
    </>
}

export default DoctorView;