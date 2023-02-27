import React, { Component } from 'react';
import Header from "../Header/Header"
import Featured from '../Featured/Featured';
import PropertyList from '../PropertyList/PropertyList';
import FeaturedProp from '../FeaturedProp/FeaturedProp';

import "./Home.css"
import MailList from '../MailList/MailList';
import Footer from '../Footer/Footer';
class Home extends Component{
    render(){
        return <div>
            <Header/>
            <div className='homeContainer'>
                <Featured/>
                <h1 className='homeTitle'>Browse By Property</h1>
                <PropertyList/>
                <h1 className='homeTitle'>Home Guests Love</h1>
                <FeaturedProp/>
                <MailList/>
                <Footer/>
                
            </div>
        </div>
    }
}
export default Home;