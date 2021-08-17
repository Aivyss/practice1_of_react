import './App.css';
// Components
import React from 'react';
import Customer from './components/Customer';
import LoadingBar from './components/LoadingBar';
import CustomerAdd from './components/CustomerAdd';

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

// App bar 컴포넌트 임포트 makeStyles는 React hook에서 쓰는 것이라 뺌, fade는 deprecated.
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import { fade } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
    minWidth: 1080,
  },
  tableHead: {
    backgroundColor: "black",
    color: "white",
    fontSize: "1.3rem",
  },
  paper: {
    marginLeft: 18,
    marginRight: 18,
  },
  progress: {
    margin: theme.spacing(2)
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
});

/*
  컴포넌트 라이프 사이클
  constructor() -> componentWillMount() -> render() -> componentDidMount()

  props나 state 변경시
  shouldComponentUpdate() -> render()
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: null,
      completed: 0,
      searchKeyword: '',
    };
  }

  // 컴포넌트가 구성된 후 실행되는 메소드로 api로부터 정보요청에 주로 씀.
  componentDidMount() {
    console.log("componentDidMount 실행");
    this.timer = setInterval(this.progress, 200);
    this.callApi().then(res => {
      this.setState({ customers: res });
      clearInterval(this.timer);
    }).catch(err => console.log(err));
  }

  callApi = async () => {
    const res = await fetch('/api/customers');
    const body = await res.json();

    return body;
  };

  // state를 초기화 하는 함수.
  stateRefresh = () => {
    this.setState({
      customer: null,
      completed: 0,
      searchKeyword: '',
    });

    this.callApi().then(res => {
      this.setState({ customers: res });
      clearInterval(this.timer);
    }).catch(err => console.log(err));
  }

  progress = () => {
    const { completed } = this.state;
    console.log(completed);
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })
  }

  // 값 감지 이벤트 함수
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    
  }

  render() {
    const { classes } = this.props ? this.props : null;
    const cellList = ['번호', '프로필', '이름', '생년월일', '성별', '직업', '삭제'];
    const filteredComponents = (data) => {
      /*
        검색 키워드의 글자수가 0개 이상
      */
      data = data.filter(curr => curr.NAME.indexOf(this.state.searchKeyword) > -1);

      return data.map(current => {
        return (
          <Customer
              key={current.ID}
              id={current.ID}
              image={current.IMAGE}
              name={current.NAME}
              birthday={current.BIRTHDAY}
              gender={current.GENDER}
              job={current.JOB}
              stateRefresh={this.stateRefresh}
          />
        );
      });
    };

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
            <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              고객 관리 시스템
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>

        <Paper className={classes.paper}>
          <Table>
            <TableHead>
              <TableRow>
                {cellList.map(curr => <TableCell className={classes.tableHead}>{curr}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.customers ? filteredComponents(this.state.customers)
                  : <LoadingBar className={classes.progress} completed={this.state.completed} /> 
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}


export default withStyles(styles)(App);