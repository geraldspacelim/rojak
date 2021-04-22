import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";
import axios from 'axios'
import '../App.css'

export default class AboutUs extends Component {
    constructor(props) {
        super(props);
    } 

directToRepo() {
  window.location = 'https://github.com/geraldspacelim/rojak'
}

render() {
        return (
          <div className="Container">
          <br></br>
          <br></br>  
          <h5>Do you find poems difficult to understand? Do you want to make poems to read in your own interpretation?Do you want to share your interpretation with others? Come join us in reinterpreting poems, by "translating" them into a language you understand better. This website aims to provide definitions to words in poems that seem difficult to understand at first glance, and suggest substitutions that you can use to understand the context of the poem better. We encourage you to use as much slang and Singlish as possible, to make this poem more personal to you and to help us populate our Singlish Database</h5>
          <br></br>
          <br></br>
          <p>Done By: Hazel and Gerald</p>
          <Button variant="dark" onClick={() => {this.directToRepo()}}>
              Github Repo
          </Button>
          </div>
        )
        
  }
}