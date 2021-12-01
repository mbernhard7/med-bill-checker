import Bill from "./Bill";
import {useState} from "react";
import './BillList.css'

function BillList() {

    const [loading, setLoading] = useState(false);
    const [bills, setBills] = useState(null);

    async function deleteBill(id) {
        try {
            const result = await fetch('http://localhost:3001/deleteBill/'+id,
                {method: "DELETE"})
                .then(response => console.log(response.status))
        } catch (e) {
            console.log(e);
        } finally {
            refreshList();
        }
    }

    function refreshList() {
        setLoading(true);
        fetch('http://localhost:3001/readBills').then(response => {
            if (response.ok) {
                response.json().then(a => setBills(a));
            } else {
                console.log(response.statusText);
                throw new Error(response.statusText);
            }
            setLoading(false);
        })
    }

    return <>
        <button id="loadingButton"
                onClick={refreshList}
                disabled={loading}
        >{bills ?
            (loading ? 'Refreshing...' : 'Refresh')
            : (loading ? 'Loading...': 'Load Bills')
        }
        </button>
        {bills?.map(b => <Bill key={b._id} deleteBill={deleteBill} bill={b} refreshList={refreshList}/>)}
        {bills?.length === 0 && <h1 id='noBillsMessage'>No bills found...</h1>}
    </>
}

export default BillList;