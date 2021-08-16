// 서버 실행을 위한 자바스크립트 파일
const express = require('express');
// const bodyParser = require('body-parser'); --> deprecated express 함수로 모든게 가능
const app = express();
const port = process.env.PORT || 5000;

// mysql 설정
const fs = require('fs');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const connection = mysql.createConnection({
    // mysql 연결객체에 해당
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
            console.log("왜안돼 ㅠㅠㅠ");
            console.log(JSON.parse(JSON.stringify(rows)));
            res.send(rows);
        }
    ); // 처리가 완료되어 돌아오는 반환값은 row에 존재
});

app.listen(port, () => console.log(`Listening on port ${port}`));