from flask import Flask
app = Flask(__name__)


@app.route("/")
def hello_world():
  return "Hello, this is OmNom 0.1!"