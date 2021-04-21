import React, { Component } from 'react';
import { Card, Col  } from "react-bootstrap";
import axios from 'axios'

const CardPoem = props => {
    return (
        // <Col lg="4">
            props.poem.author
        // </Col>
    )
    // <div className='col lg-4' key={props.poem._id}>
    // </div>
}

export default class PoemsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            rojakPoems: [],
        }
    } 

    componentDidMount() {
        axios.get('http://localhost:5000/poems/getRojakPoems/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    rojakPoems: response.data,
                  })    
            }  
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    rojakList() {
        return this.state.rojakPoems.map(currentPoem => {
            console.log(currentPoem)
          return <CardPoem poem={currentPoem} key={currentPoem._id}/>;
        })
    }

// { <div class="card" style="width: 18rem;">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="card-link">Card link</a>
//     <a href="#" class="card-link">Another link</a>
//   </div>
// </div> }


    render() {
        return (
            <div>
            <h3>Poems List</h3>
                <Col>
                    {this.rojakList()}
                </Col>
                <Col>
                    {this.rojakList()}
                </Col>
                <Col>
                    {this.rojakList()}
                </Col>
          </div>
        )
    }

}