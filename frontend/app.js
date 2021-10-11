let doctor_button = document.getElementById('doctor-button');
let patient_button = document.getElementById('patient-button');
let default_view = document.getElementById('default-view');
let patient_view = document.getElementById('patient-view');
let doctor_view = document.getElementById('doctor-view');
let image_file = document.getElementById('image-file');
let bill_description =document.getElementById('bill-description');
let bill_name =document.getElementById('bill-name');
let remove_button = document.getElementById('remove-button');
let bill_upload = document.getElementById("bill-upload");
let submit_bill = document.getElementById("submit-bill");
let result_text = document.getElementById('result-text');
let refresh_button = document.getElementById('refresh-button');
let refresh_response = document.getElementById('refresh-response');
let bill_list = document.getElementById('bill-list');

/*https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string*/
function arrayBufferToBase64( buffer ) {
    let binary = '';
    const bytes = new Uint8Array( buffer );
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

refresh_button.addEventListener('click', async function() {
    refresh_button.disabled = true;
    try {
        const data = await fetch('http://localhost:3000/readBills').then(response => {
            if (response.ok) {
                refresh_response.innerText = '';
                return response.json();
            } else {
                console.log(response.statusText);
                refresh_response.innerText = 'Error: ' + response.statusText;
                throw new Error(response.statusText);
            }
        })
        bill_list.innerHTML = '';
        data.forEach(function (object,) {
            let li = document.createElement("li");
            let img = document.createElement('img');
            let bill = document.createElement('div');
            bill.className='bill';
            const base64String = arrayBufferToBase64(object.img.data.data);
            img.src = 'data:' + object.img.contentType + ';base64,' + base64String;
            let name = document.createElement('h3');
            name.innerText = object?.name;
            let desc = document.createElement('span');
            desc.innerText = object?.desc;
            bill.appendChild(name);
            bill.appendChild(img);
            bill.appendChild(desc);
            li.appendChild(bill);
            bill_list.appendChild(li);
        });
        refresh_button.disabled = false;
    } catch (e) {
        refresh_button.disabled = false;
        console.log(e);
        refresh_response.innerText = 'Error: ' + e;
    }
})

doctor_button.addEventListener('click', function() {
    default_view.style.display = 'none';
    patient_view.style.display = 'none';
    doctor_view.style.display = 'flex';
});

patient_button.addEventListener('click', function() {
    default_view.style.display = 'none';
    patient_view.style.display = 'flex';
    doctor_view.style.display = 'none';
});

image_file.addEventListener('change', function(){
    remove_button.disabled = image_file.files[0] == null;
})

remove_button.addEventListener('click', function () {
    bill_upload.reset();
    remove_button.disabled = true;
})

async function uploadBill() {
    submit_bill.disabled = true;
    let photo = image_file.files[0];
    let filename = image_file.value.split('\\').last();
    let formData = new FormData();
    formData.append("image", photo);
    formData.append("desc", bill_description.value)
    formData.append("name", bill_name.value)
    if (photo && bill_description.value && bill_name.value) {
        try {
            const result = await fetch('http://localhost:3000/createBill', {method: "POST", body: formData})
                .then(response => response.json())
            console.log('Success:', result);
            result_text.style.color = 'green';
            result_text.innerText = 'Success: uploaded ' + filename;
            bill_upload.reset();
            remove_button.disabled = true;
            submit_bill.disabled = false;
        } catch (e) {
            console.error('Error:', e);
            result_text.style.color = 'red';
            result_text.innerText = 'Error uploading ' + filename + ':\n' + e;
            bill_upload.reset();
            remove_button.disabled = true;
            submit_bill.disabled = false;
        }
    } else {
        result_text.style.color = 'red';
        result_text.innerText = 'All fields are required';
        remove_button.disabled = true;
        submit_bill.disabled = false;
    }
}

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
}
