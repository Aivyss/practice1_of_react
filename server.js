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

//멀터 객체
const multer = require('multer');
const upload = multer({dest : './upload'});
// 클라이언트가 확인할 수 있도록 경로지정, 클라이언트는 /image로 접근 매핑이 ./upload로 됨.
app.use('/image', express.static('./upload')); 


app.use(express.json());
app.use(express.urlencoded({extended: true}));


// 첫페이지 요청(회원정보 요청)
app.get('/api/customers', (req, res) => {
    let sql = `SELECT
                     * 
                FROM 
                    CUSTOMER
                WHERE
                    ISDELETED = 0`;
    connection.query(sql, (err, rows, fields) => {
        console.log(JSON.parse(JSON.stringify(rows)));
        res.send(rows);
    }); // 처리가 완료되어 돌아오는 반환값은 row에 존재
});

// 파일이 들어가있는 요청
app.post('/api/customers/add', upload.single('image') , (req, res) => {
    let sql = "INSERT INTO CUSTOMER (ID, IMAGE, NAME, BIRTHDAY, GENDER, JOB, ISDELETED, CREATEDATE ) VALUES (null, ?, ?, ?, ?, ?, 0, null )";
    let image = `/image/${req.file.filename}`; // multer 라이브러리가 이름을 무작위로 바꾸어줌
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    console.log(params);

    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    })
});

app.delete('/api/customers/delete/:id', (req,res) => {
    let sql = `UPDATE CUSTOMER SET 
                    ISDELETED = 1
                WHERE
                    ID = ?`;
    let params = [req.params.id];

    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
        console.log(err);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));