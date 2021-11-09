import "./Bill.css"
import {useState} from "react";

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
        PATIENT_OWNER: 'patient_owner'
    }

    const [billState, setBillState] = useState(null);
    const base64String = arrayBufferToBase64(props.bill.img.data.data);

    return <div className='bill'>
        <h1>{props.bill.name}</h1>
        <img src={'data:'+props.bill.img.contentType + ';base64,' + base64String}/>
        <p>{props.bill.desc}</p>
        <button onClick={()=>props.deleteBill(props.bill._id)}>Delete</button>
    </div>
}

export default Bill;