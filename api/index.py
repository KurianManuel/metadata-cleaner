from flask import Flask, render_template, request, send_file
from PIL import Image
from io import BytesIO

app = Flask(__name__, template_folder='../templates', static_folder='../static')

# Set max file size for Vercel (4MB limit)
app.config['MAX_CONTENT_LENGTH'] = 4 * 1024 * 1024

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return "No file uploaded", 400
        
        file = request.files['file']
        if file.filename == '':
            return "No file selected", 400
        
        try:
            # Open the image and remove metadata
            img = Image.open(file.stream)
            data = list(img.getdata())
            img_without_exif = Image.new(img.mode, img.size)
            img_without_exif.putdata(data)
            
            # Save the cleaned image to a BytesIO object
            cleaned_image = BytesIO()
            
            # Use the original format or default to PNG if not available
            img_format = img.format if img.format else 'PNG'
            img_without_exif.save(cleaned_image, format=img_format)
            cleaned_image.seek(0)
            
            return send_file(
                cleaned_image, 
                download_name=f"cleaned_{file.filename}", 
                as_attachment=True,
                mimetype=f'image/{img_format.lower()}'
            )
        except Exception as e:
            return f"Error processing image: {str(e)}", 500
    
    return render_template('index.html')

# Health check endpoint for Vercel
@app.route('/api/health')
def health():
    return {'status': 'ok'}, 200

# This is required for Vercel
if __name__ == '__main__':
    app.run()