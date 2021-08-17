import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    hidden : {
        display: "none"
    },
});

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false, // model 팝업여부
        };
    }

    // 모달 팝업 이벤트
    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
    }
    
    // 핸들링 함수 서밋,파일,값
    handleFormSubmit = e => {
        e.preventDefault(); // 값 전송시 이벤트로 인한 오류 방지
        this.addCustomer().then(response => {
            console.log(response.data);
            this.props.stateRefresh();
            this.handleClose();
        });

        // 스테이트 초기화
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        });
    }

    handleFileChange = e => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        });
    } 

    handleValueChange = e => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer() {
        const url = '/api/customers/add'
        const formData = new FormData();

        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        }

        return post(url, formData, config);
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객추가</DialogTitle>
                    <DialogContent>
                        <input
                            className={classes.hidden}
                            accept="image/*" // 이미지 파일만 받도록
                            id="raised-button-file"
                            type="file" 
                            file={this.state.file} 
                            value={this.state.fileName}
                            onChange={this.handleFileChange}/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label> <br/>
                        <TextField
                            label="이름"
                            type="text"
                            name="userName"
                            value={this.state.userName} onChange={this.handleValueChange}/> <br/>
                        <TextField
                            label="생년월일"
                            type="text"
                            name="birthday"
                            value={this.state.birthday}
                            onChange={this.handleValueChange}/> <br/>
                        <TextField
                            label="성별"
                            type="text"
                            name="gender"
                            vlaue={this.state.gender}
                            onChange={this.handleValueChange}/> <br/>
                        <TextField
                            label="직업"
                            type="text"
                            name="job"
                            vlaue={this.state.job}
                            onChange={this.handleValueChange}/> <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            variant="contained" // varient는 디자인 설정
                            color="primary" 
                            onClick={this.handleFormSubmit}>
                            추가하기
                        </Button>
                        <Button 
                            variant="outlined" // varient는 디자인 설정
                            color="primary" 
                            onClick={this.handleClose}>
                            창닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(CustomerAdd);