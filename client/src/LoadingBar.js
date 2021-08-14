import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';



class LoadingBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            // completed: props.completed
        };
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.completed !== prevProps.completed) {
    //         console.log("props 변경으로 업데이트");
    //         this.setState({
    //             completed: this.props.completed
    //         });
    //         console.log("현재 자식 state의 값: " + this.state.completed);
    //     }
    // }

    render() {
        console.log(this.props.completed);

        return (
            <TableRow>
                <TableCell colSpan="6" align="center">
                    <CircularProgress className={this.props.className} variant="determinate" value={this.props.completed}/>
                </TableCell>
            </TableRow>
        );
    }
}

export default LoadingBar;