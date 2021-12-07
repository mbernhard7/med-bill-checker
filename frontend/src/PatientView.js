import PatientUploadForm from "./PatientUploadForm";
import BillList from "./BillList";
import PatientAccount from "./PatientAccount";

export const PatientTabs = {
    DEFAULT: 'My Bills',
    NEW_BILL: 'New Bill',
    ACCOUNT: 'Account',
}

function PatientView(props) {
    return <>
        {props.activeTab===PatientTabs.DEFAULT && <BillList user={props.user}/>}
        {props.activeTab===PatientTabs.NEW_BILL && <PatientUploadForm user={props.user}/>}
        {props.activeTab===PatientTabs.ACCOUNT && <PatientAccount user={props.user} setUser={props.setUser}/>}
    </>
}

export default PatientView;