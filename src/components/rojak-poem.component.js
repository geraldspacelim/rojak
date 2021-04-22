import React, { Component } from 'react';
import axios from 'axios'
import '../App.css'

export default class RojakPoem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "", 
            projectName: "",
            rojakPoem: []
        }
        
    } 

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/poems/view/'+this.props.match.params.id)
        .then(response => {
            console.log(response)
          this.setState({
            author: response.data.author,
            projectName: response.data.projectName,
            rojakPoem: response.data.rojakPoem,
          })   
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    poemFormat() {
        return this.state.rojakPoem.map(poemLine => {
            if (poemLine.text == "blank") {
                return (<br></br>)
            } else {
                return (
                    <p>{poemLine.text}</p>
                )
            }
        })
    }

    render() {
        return (
            <div>
            <h3>{this.state.projectName}</h3>
            <h5>BY <u>{this.state.author}</u></h5>
            <br></br>
            <br></br>
            {this.poemFormat()}
          </div>
        )
    }

}