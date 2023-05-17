from flask import Flask
app = Flask(__name__)

@app.route('/number_detection', methods=['POST'])
def other_project():
    # for number_detection
    pass

@app.route('/sign_language_detection', methods=['POST'])
def sign_language_detection():
    # for sign_language_detection
    pass

