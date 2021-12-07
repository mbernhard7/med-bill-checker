import "./DoctorAccount.css"


function DoctorAccount(props) {
    return <>
        <select value={props?.user || 'doctor1'} onChange={(e) => props.setUser(e.target.value)}>
            <option value='doctor1'>Doctor 1</option>
            <option value='doctor2'>Doctor 2</option>
            <option value='doctor3'>Doctor 3</option>
        </select>
    </>
}

export default DoctorAccount;