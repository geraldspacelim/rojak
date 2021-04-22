import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";
import axios from 'axios'
import '../App.css'

export default class AddSauce extends Component {
    constructor(props) {
        super(props);

        this.onChangePoetName = this.onChangePoetName.bind(this);
        this.onChangePoemTitle = this.onChangePoemTitle.bind(this);
        this.onChangePoem = this.onChangePoem.bind(this);
        this.onChangeTranslation = this.onChangeTranslation.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

        
        this.state = {
            poetName: "", 
            poemTitle: "",
            poem: "", 
            translation: "" 
        }
        
    } 

    onSubmit(e) {
        e.preventDefault()
        const newSauce = {
            poetName: this.state.poetName,
            poemTitle: this.state.poemTitle,
            poem: this.state.poem,
            translation: this.state.translation,
        }

        // console.log(rojakPoem)
        axios.post('/poems/addSauce', newSauce)
        .then(res => console.log(res.data));

        window.location = '/'
    }

    onChangePoetName(e) {
        this.setState({
            poetName: e.target.value
        }) 
     }

     onChangePoemTitle(e) {
        this.setState({
            poemTitle: e.target.value
        }) 
     }

     onChangePoem(e) {
        this.setState({
            poem: e.target.value
        }) 
     }

     onChangeTranslation(e) {
        this.setState({
            translation: e.target.value
        }) 
     }


    render() {
        return (
            <div>
            {/* <h3>Add Sauce</h3> */}
            <br></br>
            <br></br>
            <h5>Suggest a poem and we will add it into the repository poems.</h5>
            <br></br>
            <Form onSubmit={this.onSubmit}>
                <Form.Group>
                    <Form.Label>Poet Name: </Form.Label>
                        <Form.Control required type="text" placeholder="Emily Dickinson" value={this.state.poetName}
                        onChange={this.onChangePoetName}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Poem Title</Form.Label>
                        <Form.Control required type="text" placeholder="Wild nights - Wild nights!" value={this.state.onChangePoemTitle}
                        onChange={this.onChangePoemTitle}/>
                    </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Paste your poem here: </Form.Label>
                <Form.Control as="textarea" rows={5} value={this.state.poem} onChange={this.onChangePoem}/>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Provide some singlish translation here: </Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Flatter (angkat): cause (someone) to feel honoured and pleased" value={this.state.translation} onChange={this.onChangeTranslation}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            
          </div>
        )
    }

}