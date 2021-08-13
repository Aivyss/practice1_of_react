// 서버 실행을 위한 자바스크립트 파일
const express = require('express');
// const bodyParser = require('body-parser'); --> deprecated express 함수로 모든게 가능
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
        {
            id: 1,
            image: 'https://placeimg.com/64/64/1',
            name: '이한결',
            birthday: '1992-10-24',
            gender: 'Male',
            job: '무직백수',
        },
        {
            id: 2,
            image: 'https://placeimg.com/64/64/2',
            name: '홍길동',
            birthday: '1600-01-01',
            gender: 'Male',
            job: '도적',
        },
        {
            id: 3,
            image: 'https://placeimg.com/64/64/3',
            name: '돌쇠',
            birthday: '1900-02-02',
            gender: 'Male',
            job: '노비',
        }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));