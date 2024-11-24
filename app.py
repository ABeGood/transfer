from flask import Flask, render_template, request, send_from_directory
import os

app = Flask(__name__, 
            template_folder='template',  # Point to your existing template folder
            static_folder='template/assets')  # Point to your existing assets folder

# Configure supported languages
LANGUAGES = {
    'en': 'English',
    'cs': 'Česky',
    'ru': 'Русский'
}

@app.route('/')
def index():
    # Get current language from URL parameter, default to English
    lang = request.args.get('lang', 'en')
    if lang not in LANGUAGES:
        lang = 'en'
    
    return render_template('index.html', 
                         current_lang=lang,
                         languages=LANGUAGES)

# Special route to serve files from template root (if needed)
@app.route('/template/<path:path>')
def send_template(path):
    return send_from_directory('template', path)

if __name__ == '__main__':
    app.run(debug=True)