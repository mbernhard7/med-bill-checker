import "./PatientAccount.css"


function PatientAccount(props) {
    return <>
        <select value={props?.user || 'patient1'} onChange={(e) => props.setUser(e.target.value)}>
            <option value='patient1'>Patient 1</option>
            <option value='patient2'>Patient 2</option>
            <option value='patient3'>Patient 3</option>
        </select>
    </>
}

export default PatientAccount;