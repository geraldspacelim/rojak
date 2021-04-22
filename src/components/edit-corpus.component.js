import React, { Component } from 'react';
import axios from 'axios'
import { Badge, Form, Button } from "react-bootstrap";

export default class EditCorpus extends Component {
    constructor(props) {
        super(props);

        this.onChangeNewSinglishTerm = this.onChangeNewSinglishTerm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            lineNum: 0,
            singlishTerm: [],
            englishTerm: '',
            definition: '',
            newSinglishTerm: ""
          }
        
    } 

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/terms/getTerm/'+this.props.match.params.id)
        .then(response => {
          this.setState({
            singlishTerm: response.data.singlishTerm,
            englishTerm: response.data.englishTerm,
            definition: response.data.definition,
            lineNum: response.data.lineNum
          })   
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    corpusList() {
        return this.state.singlishTerm.map(sgTerm => {
            return (<Badge pill variant="primary" key={sgTerm._id}>
                {sgTerm.text}
            </Badge>)
        })
    }

    onChangeNewSinglishTerm(e) {
        this.setState({
            newSinglishTerm: e.target.value
        }) 
     }

    onSubmit(e) {
        e.preventDefault()
        let tempSinglishTerms = [...this.state.singlishTerm] 
        const newSinglishTermObj = {
            id: tempSinglishTerms.length,
            text: this.state.newSinglishTerm 
        }
        tempSinglishTerms.push(newSinglishTermObj)
        const term = {
            singlishTerm: tempSinglishTerms, 
            englishTerm: this.state.englishTerm, 
            lineNum: this.state.lineNum, 
            definition: this.state.definition
        }

        axios.post('/terms/update/' + this.props.match.params.id, term)
        .then(res => console.log(res.data));

        window.location = '/'
    }


    render() {
        return (
            <div>
            <h3>{this.state.englishTerm}</h3>
            <h10><strong>Definition:</strong>{this.state.definition}</h10><br/>
            {this.corpusList()}
            <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Label>Add a new singlish term: </Form.Label>
                        <Form.Control required type="text" placeholder="Your singlish term here" value={this.state.newSinglishTerm}
                        onChange={this.onChangeNewSinglishTerm}/>
                     <br></br>
                     <Button variant="primary" type="submit">
                                Submit
                    </Button>
            </Form.Group>
            </Form>
          </div>
        )
    }

}