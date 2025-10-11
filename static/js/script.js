// Get DOM elements
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');
const submitBtn = document.getElementById('submitBtn');
const uploadArea = document.getElementById('uploadArea');
const uploadForm = document.getElementById('uploadForm');

// Click upload area to trigger file input
uploadArea.addEventListener('click', function() {
    fileInput.click();
});

// Display selected file name
fileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        fileName.textContent = '📄 ' + this.files[0].name;
        submitBtn.disabled = false;
    }
});

// Handle form submission
uploadForm.addEventListener('submit', function() {
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
});

// Drag and drop functionality (bonus feature!)
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