const mongoose = require('mongoose');

// 1. 날짜 →  type Date, default = Date.now
// 2. 기사명:
// 3. 기자명:
// 4. 기사 이미지:
// 5. 기사전체:
// 6. 기사 요약:
// 7. 기사 키워드:

const imageSchema = new mongoose.Schema({
    width : Number,
    height : Number,
  });


const Article_schema = mongoose.Schema({
    Date : {
      type: "Date",
      default: Date.now
    },
    article_name : {
      type: "String",
      required: true
    },
    reporter : {
      type: "String",
      required: true
    },
    image : imageSchema,
    article_main : {
      type: "String",
      required: true
    },
    article_summary : {
      type: "String",
      default: null
    }, // 요약본을 딥 서버에서 돌린건데 required true 하면 입력시에 동시에 입력 안한다고 에러를 출력할듯??
    keywords : {
      type: "String",
      required: true
    }
})

/// 모델 생성

const Article = mongoose.model('Article', Article_schema);
module.exports = { Article }; 