import Bill from "./Bill";
import {useState} from "react";
import './BillList.css'

function BillList(props) {

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
        const url = props?.user ? 'http://localhost:3001/readBills'+'/'+props.user : 'http://localhost:3001/readBills';
        fetch(url).then(response => {
            if (response.ok) {
                response.json().then(a => setBills(a));
            } else {
                console.log(response.statusText);
                throw new Error(response.statusText);
            }
            setLoading(false);
        })
    }

    const bill_components = bills?.map(b =>
        <Bill key={b._id} deleteBill={deleteBill} bill={b} user={props.user} refreshList={refreshList}/>
    );
    return <>
        <button id="loadingButton"
                onClick={refreshList}
                disabled={loading}
        >{bills ?
            (loading ? 'Refreshing...' : 'Refresh')
            : (loading ? 'Loading...': 'Load Bills')
        }
        </button>
        {(bills!==null && !loading) && bill_components}
        {bills?.length === 0 && <h1 id='noBillsMessage'>No bills found...</h1>}
    </>
}

export default BillList;