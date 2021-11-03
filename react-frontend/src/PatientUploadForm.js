import './PatientUploadForm.css';
import {useState} from "react";

function PatientUploadForm() {
    const [formData, setFormData] = useState({image: null, filename: '', name: '', description: ''});
    const [result, setResult] = useState({text: null, color: null});
    const [isLoading, setIsLoading] = useState(false);

    if (!Array.prototype.last){
        Array.prototype.last = function(){
            return this[this.length - 1];
        };
    }

    async function uploadBill(e) {
        setIsLoading(true);
        e.preventDefault();
        let formDataObject = new FormData();
        formDataObject.append("image", formData.image);
        formDataObject.append("name", formData.name);
        formDataObject.append("desc", formData.description);
        try {
            const result = await fetch('http://localhost:3001/createBill',
                {method: "POST", body: formDataObject})
                .then(response => response.json())
            console.log('Success:', result);
            setResult({text:'Success: uploaded ' + formData.filename, color: 'green'})
            setIsLoading(false);
            setFormData({image: null, filename: '', name: '', description: ''});
            document.getElementById('bill-upload').reset();
        } catch (e) {
            console.error('Error:', e);
            setResult({text:'Error uploading ' + formData.filename + ':\n' + e, color: 'red'})
            setIsLoading(false);
        }
    }

    function removeImage() {
        setFormData({...formData, image:null, filename: null});
        document.getElementById('image-file').value=''
    }

    return <div id="upload">
        <h1>Upload Bill</h1>
        <form id="bill-upload" action="#">
            <label htmlFor="image-file">Bill Image:</label>
            <input
                type="file"
                id="image-file"
                onChange={(e) => setFormData({
                    ...formData,
                    image: e.target.files[0],
                    filename: e.target.value.split('\\').last(),
                })}
                required
            />
            <button
                type='button'
                id="remove-button"
                disabled={!formData.image || isLoading}
                onClick={removeImage}
            >Remove Image</button>
            <br/>
            <label htmlFor="bill-name">Bill Name:</label>
            <input
                type="text"
                id="bill-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
            />
            <br/>
            <label htmlFor="bill-description">Bill Description:</label>
            <input
                type="text"
                id="bill-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
            />
            <br/>
            <input
                type="submit"
                id='submit-bill'
                onClick={uploadBill}
                disabled={!formData.image || !formData.name.length>0 || !formData.description.length>0 || isLoading}
                value="Submit"
            />
        </form>
        {result.text && <span id="result-text" style={result.color && {color: result.color}}>{result.text}</span>}
    </div>
}

export default PatientUploadForm;