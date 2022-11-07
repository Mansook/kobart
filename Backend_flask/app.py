from flask import Flask, request, jsonify
from models import summary

app = Flask(__name__)

@app.route('/') ## 통신 가능
def main():
    return "hello world!"  

@app.route('/test' , methods=['POST',"GET"])
def test():
    if request.method == 'POST':
        lists = request.args['article']
        text = lists.replace('\n', ' ')
        res = summary(text)
        print(res)
        return jsonify(res)

if __name__ == '__main__':
    app.run()