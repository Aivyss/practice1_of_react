import React from 'react';

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render () {
        return (
            <div>
                <CustomerProfile id={this.props.id} name={this.props.name} image={this.props.image}/>
                <CustomerInfo job= {this.props.job} gender={this.props.gender}/>
            </div>
        );
    }
}

function CustomerProfile(props) {
    return (
        <div>
            <img src={props.image} alt="profile"/>
            <h2>{props.name}({props.id})</h2>
        </div>
    );
}

function CustomerInfo(props) {
    return(
        <div>
            <p>{props.birthday}</p>
            <p>{props.gender}</p>
            <p>{props.job}</p>
        </div>

    );
}


export default Customer;
