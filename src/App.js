import './App.css';
import React from 'react';
import Customer from './components/Customer';

// 서버에서 받았다고 가정하는 부분
const customer = {
  name: '이한결',
  birthday: '1992-10-24',
  gender: 'Male',
  job: '무직백수',
};


class App extends React.Component {
  render () {
    return (
      <Customer
        name={customer.name}
        birthday={customer.birthday}
        gender={customer.gender}
        job={customer.job}
      />
    );
  }
}


export default App;
