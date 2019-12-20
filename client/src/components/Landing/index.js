import React, { Component } from 'react';
// import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
// import { Link } from 'react-router-dom';
import "./style.css";

class Landing extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="hero-image">
                    <div className="hero-text">
                    </div>
                </div>
                <div className="texty">
                    <h1>Luxury fragrances without the cost. Explore the advantages of our perfume exchange.</h1>
                </div> 
            </div>
             
        )
    }
}


export default Landing;