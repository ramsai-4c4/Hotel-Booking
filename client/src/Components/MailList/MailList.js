import React, { Component } from 'react';
import "./MailList.css"
class MailList extends Component{
    render(){
        return  <div className="mail">
                    <h1 className="mailTitle">Save time, save money!</h1>
                    <span className="mailDesc">Sign up and we'll send the best deals to you</span>
                    <div className="mailInputContainer">
                    <input type="text" placeholder="Your Email" className='mail-input' />
                    <button>Subscribe</button>
                    </div>
                </div>
    }
}
export default MailList;