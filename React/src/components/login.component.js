import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import CryptoJS from "react-native-crypto-js";
import { codes } from "../secrets/secrets.js";
//import { authService } from "./modules/authService";
import { BehaviorSubject } from 'rxjs';

export default class Login extends Component {
    
    constructor(props) {
        super(props);
		//redirects to home if already logged in
/*		if (authService.currentUserValue){
			this.props.history.push('/');
		} */
        this.state = {
          uname: '',
          psw: '',
        };
      }
	  
	handleUsername = event => {
        this.setState({
            email: event.target.value
        });
    }

    handlePassword = event => {
        this.setState({
            psw: event.target.value
        })
    }
	
    onSubmit = event => {
        event.preventDefault();
        CryptoJS.pad.NoPadding = {pad: function(){}, unpad: function(){}};
		  
        var encrypted = CryptoJS.AES.encrypt(this.state.email, codes.staff, {iv: codes.iv});
        var pass = CryptoJS.AES.encrypt(this.state.psw, codes.staffPass);
        const user = {
            username: encrypted.toString(),
            password: pass.toString()
        };
        axios.post('http://localhost:4000/auth/login', user)
            .then(function(res){
                if(res.status === 200 ){
                    if(typeof res.data.user.role === "undefined"){
                        document.location.href = 'http://localhost:3000/trainee-details/'+res.data.user._id
                    }
					else if(res.data.user.role === "admin"){
                        document.location.href = 'http://localhost:3000/admin';
                    }else{
                        document.location.href = 'http://localhost:3000/';
                    }
                }
				else if(res.status === 204){
					console.log('email and password do not match');
					alert('Username or Password does not match')
                }else{
                    console.log('Account does not exist');
					alert("Email does not exist");
                }
            })
            .catch(error => {
                alert("Invalid Email/Password");
                console.log(error.response)
            });
    }
    
    render() {
        return (
            <div className="Login">
                    <form onSubmit={this.onSubmit}>

                        <label className="uname"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" onChange={this.handleUsername} required/>

                        <label className="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" onChange={this.handlePassword} required/>
                        

                        <input type="submit" value="Login"/>
                    </form>
                    
            </div>
        )
    }
}