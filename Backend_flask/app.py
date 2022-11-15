from flask import Flask, request, jsonify
from models import summary, wordrank
from models_selection import softmax, weighted_initial_user_weight, attention_recommendation

app = Flask(__name__)

@app.route('/') ## 통신 가능
def main():
    return "hello world!"  

@app.route('/test' , methods=['POST',"GET"])
def test():
    if request.method == 'POST':
        lists = request.args['article']
        text = lists.replace('\n', ' ')
        res_summary = summary(text)
        res_keywords = wordrank(text)
        data = {
            "Summary": res_summary,
            "Keywords": res_keywords
        }
        return jsonify(data)


### 추천 알고리즘 제작
@app.route("/recommend", methods=['POST', 'GET'])
def recommend():
    if request.method == "POST":
        company_list = request.args.to_dict()
        # print(company_list.getlist(1))
        # console.log(request)
        # result = attention_recommendation(company_list)
        # print(request.args)
        # print(request.args.to_dict())
        company_list = list(company_list.values())
        result = attention_recommendation(company_list)
        return jsonify(result)

if __name__ == '__main__':
    app.run()