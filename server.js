// 서버 실행을 위한 자바스크립트 파일
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/hello', (req, res) => {
    res.send({message: "Hello Express!"});
});

app.listen(port, () => console.log(`Listening on port ${port}`));