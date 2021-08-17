import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { DialogActions } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';

class CustomerDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    deleteCustomer = (id) => {
        const url = '/api/customers/delete/' + id;
        fetch(url, {
            method: 'DELETE'

        });
        // App 컴포넌트가 가지는 메소드 state를 리프레시한다.
        this.props.stateRefresh();
    }

    handleClickOpen = () => {
        console.log("모달창 오픈");
        this.setState({
            open: true
        });
    }
    
    handleClose = () => {
        this.setState({
            open: false
        });
    }

    render() {
        return (
            <div>
                <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} varient="contained" onClose={this.handleClose}>
                    <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={ e => this.deleteCustomer(this.props.id)}>
                            예
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.handleClose}>
                            아니오
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CustomerDelete;