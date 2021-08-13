import React from 'react';
// UI 요소 
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell'


class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render () {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt='profile'/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
            </TableRow>
        );
    }
}


export default Customer;
