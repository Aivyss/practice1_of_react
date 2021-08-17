import React from 'react';

class CustomerDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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

    render() {
        return (
            <button onClick={e => {this.deleteCustomer(this.props.id)}}>삭제</button>
        );
    }
}

export default CustomerDelete;