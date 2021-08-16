import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        };
    }
    
    // 핸들링 함수 서밋,파일,값
    handleFormSubmit = e => {
        e.preventDefault(); // 값 전송시 이벤트로 인한 오류 방지
        this.addCustomer().then(response => {console.log(response.data)});

        // 실제로 이렇게 코딩하면 안됨. 테스트용
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        });
        window.location.reload();
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
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input 
                type="file" 
                name="file" 
                file={this.state.file} 
                value={this.state.fileName}
                onChange={this.handleFileChange}/> <br/>
                이름 : <input
                    type="text"
                    name="userName"
                    value={this.state.userName} onChange={this.handleValueChange}/> <br/>
                생년월일 : <input
                type="text"
                name="birthday"
                value={this.state.birthday}
                onChange={this.handleValueChange}/> <br/>
                성별 : <input
                type="text"
                name="gender"
                vlaue={this.state.gender}
                onChange={this.handleValueChange}/> <br/>
                직업 : <input
                type="text"
                name="job"
                vlaue={this.state.job}
                onChange={this.handleValueChange}/> <br/>

                <button type="submit">추가하기</button>
            </form>
        );
    }
}

export default CustomerAdd;