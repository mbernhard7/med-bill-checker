let doctor_button = document.getElementById('doctor-button');
let patient_button = document.getElementById('patient-button');
let default_view = document.getElementById('default-view');
let patient_view = document.getElementById('patient-view');
let doctor_view = document.getElementById('doctor-view');
let image_file = document.getElementById('image-file');
let bill_description =document.getElementById('bill-description');
let remove_button = document.getElementById('remove-button');
let bill_upload = document.getElementById("bill-upload");
let result_text = document.getElementById('result-text');
let refresh_button = document.getElementById('refresh-button');
let refresh_response = document.getElementById('refresh-response');
let bill_list = document.getElementById('bill-list');


refresh_button.addEventListener('click', function() {
    fetch('http://localhost:3000/get-bills')
        .then(response => {
            if (response.ok) {
                refresh_response.innerText = '';
                return response.json();
            } else {
                console.log(response.statusText);
                refresh_response.innerText = 'Error: '+response.statusText;
            }
        })
        .then(data => {
            bill_list.innerHTML = '';
            console.log(data);
            data.bills.forEach(function (bill, index) {
                let li = document.createElement("li");
                let img = document.createElement('img');
                img.src = 'http://localhost:3000'+bill['url'];
                let span = document.createElement('span');
                span.innerText = bill['description'];
                li.appendChild(img);
                li.appendChild(document.createElement('br'))
                li.appendChild(span);
                bill_list.appendChild(li);
            });
        });
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

function uploadBill() {
    let photo = image_file.files[0];
    let filename = image_file.value.split('\\').last();
    let formData = new FormData();

    formData.append("bill", photo);
    formData.append("bill-description", bill_description.value)
    fetch('http://localhost:3000/upload-bill', {method: "POST", body: formData})
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            result_text.style.color = 'green';
            result_text.innerText = 'Success: uploaded '+ filename;
            bill_upload.reset();
            remove_button.disabled = true;
        })
        .catch(error => {
            console.error('Error:', error);
            result_text.style.color = 'red';
            result_text.innerText = 'Error uploading '+filename+':\n'+error;
            bill_upload.reset();
            remove_button.disabled = true;
        });
    return false;
};

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
}
