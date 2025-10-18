
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');
const submitBtn = document.getElementById('submitBtn');
const uploadArea = document.getElementById('uploadArea');
const uploadForm = document.getElementById('uploadForm');


uploadArea.addEventListener('click', function() {
    fileInput.click();
});


fileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        fileName.textContent = '📄 ' + this.files[0].name;
        submitBtn.disabled = false;
    }
});


uploadForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    
    const formData = new FormData(uploadForm);
    
    
    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Upload failed');
        }
        return response.blob();
    })
    .then(blob => {
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cleaned_' + fileInput.files[0].name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        
        submitBtn.textContent = 'Clean Metadata';
        submitBtn.disabled = false;
        fileName.textContent = '';
        fileInput.value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        submitBtn.textContent = 'Error - Try Again';
        submitBtn.disabled = false;
        
        
        setTimeout(function() {
            submitBtn.textContent = 'Clean Metadata';
        }, 2000);
    });
});


uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadArea.style.borderColor = '#764ba2';
    uploadArea.style.background = '#f8f9ff';
});

uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    uploadArea.style.borderColor = '#667eea';
    uploadArea.style.background = '';
});

uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadArea.style.borderColor = '#667eea';
    uploadArea.style.background = '';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        fileName.textContent = '📄 ' + files[0].name;
        submitBtn.disabled = false;
    }
});