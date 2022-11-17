const express = require("express"); //express 사용
const app = express(); // 앱 생성
const port = 8000; //포트번호 설정
const { Article } = require("./models/Article"); // Article DB 모델을 사용한다.
const { User } = require("./models/User"); // User DB 모델을 사용한다.
const { auth } = require("./middleware/auth");

const cookieParser = require("cookie-parser"); // 쿠키 제작 용
const config = require("./config/key");

/// 플라스크와 연동하기 위한 import
const request = require("request");
const router = express.Router();

// body parser 설정해서 사용하기
const bodyParser = require("body-parser");
// application/x-www-fprm-unlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser()); // 쿠키 사용

// 몽구스를 통해서 몽고 디비 연결하기
const mongoose = require("mongoose"); //몽구스 메소드를 사용한다.

mongoose
  .connect(config.mongoURI, {
    // 몽고디비 연결 주소를 넣어주도록 한다.
    useNewUrlParser: true,
    useUnifiedTopology: true, //옵션 -> 에러를 막아준다.
  })
  .then(() => console.log("MongoDB Connected...")) // 연결될 경우에 던져주기
  .catch((err) => console.log(err)); //에러를 출력

// mongodb+srv://junseokim:<password>@summarize-news-app.r1swyoi.mongodb.net/?retryWrites=true&w=majority
//junseokim
//!!save0506rl

app.get("/", (req, res) => res.send("Hello, world!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//기사 작성 메소드
app.post("/article/write", (req, res) => {
  const article = new Article(req.body); // 클라이언트에서 보낸 request 를 담은 Article 모델을 article로 설정한다.
  // let summarization  = null
  // Article 모델을 제작하기 위해서 클라이언트에서 받아온 req.body 에서 요약을 진행할 문장을 flask 서버로 던져준다.

  //flask 에서 다시 던져준 결과를 Article에 있는 article_summary에 저장한다.
  // console.log(article.article_main); //이런 식으로 던져줄 수 있을듯 -> 노드에서 어떻게 axios를 통해서 flask랑 통신이 가능한지 찾아보면 될 것 같다.

  // 딥러닝 서버에 연동해서 callback 으로 받아오는 함수
  //callback 함수는 단순히 아래의 함수가 실행이 되었을 때(정확히는 특정 이벤트가 발생했거나. 특정 시점에 도달했을 때,), 시스템에서 호출하는 함수를 의미한다.
  const summarize_article = (callback) => {
    const options = {
      method: "POST",
      url: "http://211.201.200.70:1127/test",
      qs: {
        article: article.article_main,
      },
    };
    request(options, function (err, res, body) {
      callback(undefined, {
        result: body,
      });
    });
  };

  // 딥러닝 서버 연동 함수 실행 -> DB에 저장까지
  summarize_article((err, { result } = {}) => {
    if (err) {
      console.log("error!!!");
      result.send({
        message: "fail",
        status: "fail",
      });
    }
    // 성공햇을 때
    // console.log(json)
    const json = JSON.parse(result);
    // console.log(json)
    summarization = json.Summary;
    keywords = json.Keywords;
    // console.log(summarization)
    // console.log(summarization.Summary);
    //article을 DB에 저장하도록 하자
    article.article_summary = summarization;
    article.keywords = keywords;
    article.save((err, data) => {
      if (err) {
        return res.send({ success: false, err });
      }
      return res.status(200).json({
        success: true,
      });
    });
  });
  // //article을 DB에 저장하도록 하자
  // article.save((err, data) => {
  //     if(err){
  //         return res.send({success : false, err})}
  //     return res.status(200).json({
  //         success : true
  //     })
  // })
});

// // 로그인 했을 때, 기업칸이 비어있으면, 선택하는 화면 보이기
app.patch("/article/api/users/select", (req, res) => {
  console.log(req.body.company);
  const recommend_article = (callback) => {
    const options = {
      method: "POST",
      url: "http://211.201.200.70:1127/recommend",
      qs: req.body.company,
    };
    request(options, function (err, res, body) {
      callback(undefined, {
        result: body,
      });
    });
  };
  // 딥러닝 서버 연동 함수 실행 -> DB에 저장까지
  recommend_article((err, { result } = {}) => {
    if (err) {
      console.log("error!!!");
      result.send({
        message: "fail",
        status: "fail",
      });
    }
    // 성공햇을 때
    // console.log(json)
    console.log(result);
    const json = JSON.parse(result);
    console.log(json);
    recommendation = json;
    // console.log(recommendation)
    User.updateOne(
      { _id: req.body._id },
      { $set: { company: req.body.company, recommendation: recommendation } },
      (err, user) => {
        if (err) {
          return res.json({
            Success: false,
            message: "회사 정보 업데이트 및 추천 실패",
          });
        } else {
          return res.json({
            Success: true,
            message: "회사 정보 업데이트 및 추천 성공",
            data: json,
          });
        }
      }
    );
  });
});
/// 이제는 DB 내용들을 다 던져주는 것을 하면 될듯???
// const { Article } = require('./models/Article'); // Article DB 모델을 사용한다.

// app.post("/article/post", (req, res) => {
//     // 클라이언트에서 보낸 request 를 담은 Article 모델을 article로 설정한다.
//    api_posting = Article.find({_id: 0, __v: 0});
//    console.log(api_posting.pretty)
//    //  console.log(data)
//    res.status(200).json({
//        success : true,
//    })
// })

// 전체를 출력해주는 api
app.post("/article/post_all", (req, res) => {
  // const total = await Post.countDocument({}); // 총 게시글 수 세기
  // const posts = await Post.find({})
  // .sort({ createdAt: -1 }) // createdAt는 timestamps로 생성한 시간을 역순으로 정렬 === 데이터를 최근 순으로 정렬
  // .skip(perPage * (page - 1)) // 아래 설명 보기
  // .limit(perPage);
  // const totalPage = Math.ceil(total / perPage); // 만약 전체 게시글 99개고 perPage가 10개면 값은 9.9 그래서 총 페이지수는 10개가 되어야 한다. 그래서 올림을 해준다.

  Article.find((error, article_api) => {
    //에러가 발생할 경우
    if (error) {
      console.log(error);
      return res.send({ success: false, err });
      //에러가 발생 안할 경우에
    } else {
      data = article_api; //api 데이터를 data 변수에 담는다.
      res.status(200).json({
        // 에러가 발생 안했으므로. json으로 던져준다.
        success: true,
        data: data,
      });
    }
  });
});

// Index
app.get("/article/post", async function (req, res) {
  // 1: await 키워드를 사용하는데, await 키워드를 사용하는 함수는 반드시 async 키워드를 function 키워드 앞에 붙여야 함
  var page = Math.max(1, parseInt(req.query.page)); // 2: parseInt함수를 사용한 이유: Query string은 문자열로 전달되기 때문에 숫자가 아닐 수도 있고, 정수(소수점이 없음)를 읽어내기 위해 사용
  var limit = Math.max(1, parseInt(req.query.limit)); // 2: Math.max함수를 사용한 이유: page, limit은 양수여야 합니다 최소 1이 되어야 함
  // 3. page, limit에 오는 경우 기본값을 설정해 줍니다. 이 값은 해당 query string이 없는 경우에도 사용됨
  page = !isNaN(page) ? page : 1; // 3
  //limit = 10; // 3

  var skip = (page - 1) * limit; // 4: 무시할 게시물의 수를 담는 변수. 페이지당 10개의 게시물이 있고, 현재 3번째 페이지를 만들려면, DB에서 처음 20개의 게시물을 무시하고 21번째부터 10개의 게시물을 보여주는 것
  var count = await Article.countDocuments({}); // 5: Promise 앞에 await키워드를 사용하면, 해당 Promise가 완료될 때까지 다음 코드로 진행하지 않고 기다렸다가 해당 Promise가 완료되면 resolve된 값을 반환(return)
  var maxPage = Math.ceil(count / limit); // 6:  전체 게시물 수(count)를 알고, 한페이지당 표시되야 할 게시물의 수(limit)을 알면, 전체 페이지 수를 계산
  var posts = await Article.find({}) // 7: await를 사용하여 검색된 Article을 변수에 담을 수 있게 함
    //   .populate("_id", "article_name", "reporter", "article_main", "article_summary", "keywords", "Date")
    .sort("-createdAt")
    .skip(skip) // 8
    .limit(limit) // 8
    .exec();

  try {
    data = posts; //api 데이터를 data 변수에 담는다.
    res.status(200).json({
      // 에러가 발생 안했으므로. json으로 던져준다.
      success: true,
      data: data,
      currentPage: page, // 9: 현재 페이지 번호(currentPage), 마지막 페이지번호(maxPage), 페이지당 보여줄 게시물 수(limit)를 프론트에서 사용할 수 있게 한다.
      maxPage: maxPage, // 9
      limit: limit, // 9
    });
  } catch (err) {
    console.log(err);
    return res.send({ success: false, err });
  }
});

//추천 기사만 출력
app.post("/article/post_recommend", async (req, res) => {
  const user = await User.findOne({ _id: req.body._id });
  Article.find({ _id: { $in: user.recommendation } }, (error, article_api) => {
    //에러가 발생할 경우
    if (error) {
      console.log(error);
      return res.send({ success: false, err });
      //에러가 발생 안할 경우에
    } else {
      data = article_api; //api 데이터를 data 변수에 담는다.
      res.status(200).json({
        // 에러가 발생 안했으므로. json으로 던져준다.
        success: true,
        data: data,
      });
    }
  });
});

// register api 제작
app.post("/article/api/users/register", async (req, res) => {
  //라우트 제작 완료
  //회원가입 할 때 필요한 정보들을 client 에서 가져오면

  const email = req.body.email;
  let users = await User.findOne({ email: email });
  if (users) {
    return res.status(400).json({ errors: [{ msg: "User already exists" }] });
  }

  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body); //instance 만들기, request 에서 넘오는 정보를 가지고 User db 모델을 만든다.
  //save 전에 비밀번호를 암호화해야 한다. -> User.js 로 가서 userschema.pre method 사용
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  }); //몽고db method
});

//login api 제작
app.post("/article/api/users/login", (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //요청한 email이 데이터 베이스에 있다면 비밀번호가 일치하는지를 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      //비밀번호까지 같다면 token을 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err); //에러 메시지를 client로 보내준다.
        //토큰을 저장한다. 어디에?? -> 쿠키, 로컬 스토리지, 세션 등등... -> 여기서는 쿠키에 진행
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, Data: user });
      });
    });
  });
});

//auth는 로그인 만큼 복잡하다.
//middleware에서 오류가 있다고 하면, error 를 발생해서 탈출하게 된다. -> 여기까지 오지 못한다.
app.get("/article/api/users/auth", auth, (req, res) => {
  //auth 라는 middleware를 설치한다.
  //여기까지 미들웨어를 통과해 왔다는 이야기는 authentication이 True라는 이야기이다.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, //0이면 false 아니면 true -> false 일때 관리자가 아니다.
    //지금 상황은 role이 0이면 일반 유져이고 나머지이면, 관리자이다.
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    company: req.user.company,
    image: req.user.image,
  });
});

//로그아웃 기능 생성
app.get("/article/api/users/logout", auth, (req, res) => {
  //로그아웃 하려는 정보를 model 에서 찾는다.
  User.findOneAndUpdate(
    { _id: req.user._id }, //auth middleware에서 가져와서 찾는다.
    { token: "" }, //token을 지워준다.
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});
