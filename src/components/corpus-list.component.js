import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Table } from "react-bootstrap";

const Term = props => {
    let singlishTerms = ""
    props.term.singlishTerm.map(singlishTerm => {
        singlishTerms += `${singlishTerm.text},`
    })
    singlishTerms = singlishTerms.slice(0, -1); 
    return (
        <tr>
        <td>{props.term.englishTerm}</td>
        <td>{props.term.definition}</td>
        <td>{singlishTerms}</td>
        <td>
          <Link to={"/edit/"+props.term._id}>edit</Link>
        </td>
      </tr>
    )
}

export default class CorpusList extends Component {
    constructor(props) {
        super(props);
        this.state = {terms: []};
    } 

    componentDidMount() {
        axios.get('/terms/getTerms')
            .then(response => {
                console.log(response)
                this.setState({ terms: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    termsList() {
        return this.state.terms.map(currentTerm => {
          return <Term term={currentTerm} key={currentTerm._id}/>;
        })
    }


    render() {
        return (
            <div>
            {/* <h3>Terms</h3> */}
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Chim Terms</th>
                <th>Definition</th>
                <th>Singlish</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { this.termsList() }
            </tbody>
            </Table>
        </div>
        )
    }

}
