import './PatientUploadForm.css';
import {useState} from "react";

function PatientUploadForm(props) {
    const [formData, setFormData] = useState({
        image: null,
        name: props?.name || '',
        description: props?.description || ''
    });
    const [result, setResult] = useState({text: null, color: null});
    const [isLoading, setIsLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState(props?.oldImage);

    if (!Array.prototype.last){
        Array.prototype.last = function(){
            return this[this.length - 1];
        };
    }

    async function uploadBill(e, update=false) {
        setIsLoading(true);
        e.preventDefault();
        let formDataObject = new FormData();
        formDataObject.append("edit", update);
        if (!update || formData.image) {
            formDataObject.append("image", formData.image);
        }
        formDataObject.append("name", formData.name);
        formDataObject.append("desc", formData.description);
        let url = update ? 'http://localhost:3001/editBill/'+props.id : 'http://localhost:3001/createBill';
        try {
            const result = await fetch(url, {method: "POST", body: formDataObject}).then(response => response.json())
            console.log('Success:', result);
            if (update) {
                props.cancelUpdate(true);
            } else {
                setResult({text:'Success: uploaded bill', color: 'green'})
                setIsLoading(false);
                setCurrentImage(null);
                setFormData({image: null, name: '', description: ''});
                document.getElementById('bill-upload').reset();
            }
        } catch (e) {
            console.error('Error:', e);
            setResult({text:'Error uploading bill:\n' + e, color: 'red'})
            setIsLoading(false);
        }
    }

    function removeImage() {
        setFormData({...formData, image:null});
        document.getElementById('image-file').value=''
    }

    function handleImageChange(e) {
        setFormData({
            ...formData,
            image: e.target.files[0],
        })
        setCurrentImage(URL.createObjectURL(e.target.files[0]));
    }

    return <div id="upload">
        <h1>{props?.edit ? "Edit Bill" : "Upload Bill"}</h1>
        <form id="bill-upload" action="#">
            <label htmlFor="bill-name">Bill Name:</label>
            <input
                type="text"
                id="bill-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
            />
            <br/>
            <div className="billImageBox">
                <img src={currentImage} alt="Upload Bill"/>
            </div>
            <br/>
            <label htmlFor="image-file">{props?.edit ? "New Image:" : "Bill Image:"}</label>
            <input
                type="file"
                id="image-file"
                onChange={handleImageChange}
                required
            />
            <button
                type='button'
                id="remove-button"
                disabled={!formData.image || isLoading}
                onClick={removeImage}
            >Remove Image</button>
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
            {props?.edit ?
                <>
                    <button onClick={() => props.cancelUpdate()}>Cancel</button>
                    <input
                        type="submit"
                        id='submit-bill'
                        onClick={(e)=>uploadBill(e, true)}
                        disabled={
                            !formData.name.length > 0 ||
                            !formData.description.length > 0 ||
                            isLoading ||
                            (formData.image===null &&
                                formData.name === props.name &&
                                formData.description === props.description
                            )}
                        value="Update"
                    />
                </>
                :
                <input
                    type="submit"
                    id='submit-bill'
                    onClick={uploadBill}
                    disabled={!formData.image || !formData.name.length > 0 || !formData.description.length > 0 || isLoading}
                    value="Submit"
                />
            }
        </form>
        {result.text && <span id="result-text" style={result.color && {color: result.color}}>{result.text}</span>}
    </div>
}

export default PatientUploadForm;