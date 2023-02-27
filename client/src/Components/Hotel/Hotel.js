import React, { Component } from 'react';
import Header from '../Header/Header';
import List from '../../Pages/List/List';
class Hotel extends Component{
    render(){
        return <div>
            <Header type="list"/>
            <List/>
        </div>
    }
}
export default Hotel;