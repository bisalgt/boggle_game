from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    print(__name__)
    return 'hey there'
