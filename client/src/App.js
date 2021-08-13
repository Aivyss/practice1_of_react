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
import { withStyles } from '@material-ui/core/styles';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers : null,
    };
  }

  // 컴포넌트가 구성된 후 실행되는 메소드로 api로부터 정보요청에 주로 씀.
  componentDidMount() {
    console.log("componentDidMount 실행");
    this.callApi().then(res => this.setState({ customers: res })).catch(err => console.log(err));
  }

  callApi = async () => {
    const res = await fetch('/api/customers');
    const body = await res.json();

    return body;
  };

  render() {
    const { classes } = this.props ? this.props : null;

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
            {this.state.customers ? this.state.customers.map(current => {
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
            }): 'loading'}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}


export default withStyles(styles)(App);
//export default App;
