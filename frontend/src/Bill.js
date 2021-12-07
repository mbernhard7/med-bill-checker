import "./Bill.css"
import {useState} from "react";
import PatientUploadForm from "./PatientUploadForm";

function Bill(props) {

    function arrayBufferToBase64( buffer ) {
        let binary = '';
        const bytes = new Uint8Array( buffer );
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    const billStates = {
        DOCTOR_BROWSING: 'doctor_browsing',
        DOCTOR_OWNER: 'doctor_owner',
        PATIENT_OWNER: 'patient_owner',
        EDITING_BILL: 'editing_bill'
    }

    const [billState, setBillState] = useState(null);
    const base64String = arrayBufferToBase64(props.bill.img.data.data);
    console.log(props.user);
    console.log(props.bill.owner);
    return <>{billState === billStates.EDITING_BILL ?
        <PatientUploadForm edit={true}
                           cancelUpdate={(refresh=false)=> {
                               setBillState(null)
                               if (refresh) {
                                   props.refreshList();
                               }
                           }}
                           id={props.bill._id}
                           oldImage={'data:' + props.bill.img.contentType + ';base64,' + base64String}
                           name={props.bill.name}
                           description={props.bill.desc}
        />
        :
        <div className='bill'>
            <h1>{props.bill.name}</h1>
            <div className="billImageBox">
                <img src={'data:' + props.bill.img.contentType + ';base64,' + base64String}/>
            </div>
            <p>{props.bill.desc}</p>
            {props?.user === props.bill.owner && <div className='buttonRow'>
                <button className="editButton" onClick={() => setBillState(billStates.EDITING_BILL)}>Edit</button>
                <button className="deleteButton" onClick={() => props.deleteBill(props.bill._id)}>Delete</button>
            </div>}
        </div>
    }</>
}

export default Bill;