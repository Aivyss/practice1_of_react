import './App.css';
import React from 'react';
import Customer from './components/Customer';

// Material UIs
// Table 컴포넌트들
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';

// 컴포넌트의 외부를 감싸기 위해서 사용하는 컴포넌트
import { Paper } from '@material-ui/core';
// CSS 스타일 결정을 위해 사용
import {withStyles} from '@material-ui/core/styles';

//클래스명 복수개 적용
import classNames from 'classnames';

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
    marginTop: theme.spacing(3) 
  },
  table: {
    minWidth: 1080
  }
});

// const styles = {
//   root: {
//     width: "75%",
//     overflowX: "auto"
//   },
//   talbe: {
//     minWidth: 1080
//   }
// };

// 서버에서 받았다고 가정하는 부분
const customers = [
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
];

class App extends React.Component {
  render () {
    const {classes} = this.props? this.props : null;

    return (
      <Paper>
        <Table className={classNames(classes.root, classes.table)}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>프로필</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map(current => {
              return (
                  <Customer
                    key={current.id}
                    id={current.id}
                    image={current.image}
                    name={current.name}
                    birthday={current.birthday}
                    gender={current.gender}
                    job={current.job}
                  />
                  );
                })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}


export default withStyles(styles)(App);
//export default App;
