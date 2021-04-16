import React, { Component } from 'react';
import axios from 'axios'
import { Form, Button, Row, Col } from "react-bootstrap";

const PoemLine = props => (
    <Form>
         <Form.Group>
        <Row>
            <Col>
            <Form.Label column sm="8">
                {/* {props.poemLine.text} */}
                {props.dataLabel[props.poemLine.line-1].text}
            </Form.Label>
            </Col>
            <Col>
            {props.poemLine.text != "" &&
                <Form.Control value={props.poemLine.text} onChange={(e) => props.onChangePoemLine(props.poemLine.line, e)}/>
            }
            </Col>
        </Row>
        </Form.Group>
    </Form>
)

export default class CreateRojak extends Component {
    constructor(props) {
        super(props);

        this.onNext = this.onNext.bind(this);
        this.onChangeProjectAuthor = this.onChangeProjectAuthor.bind(this);
        this.onChangeProjectTitle = this.onChangeProjectTitle.bind(this);
        this.onChangePoemLine = this.onChangePoemLine.bind(this);

        this.state = {
            credentialsState: true,
            projectAuthor: "",
            projectTitle: "",
            actualPoem: [], 
            dataLabel: [],
        };

    } 


    componentDidMount() {
        axios.get('http://localhost:5000/poems/getActualPoem')
            .then(response => {
                this.setState(
                    { 
                        actualPoem: response.data[0].actualPoem,
                    }
                )
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeProjectAuthor(e) {
        this.setState({
            projectAuthor: e.target.value
        }) 
     }

     onChangeProjectTitle(e) {
        this.setState({
            projectTitle: e.target.value
        }) 
     }

     onChangePoemLine(id, e) {
        //  console.log(e)
         let tempActualPoem = [...this.state.actualPoem]
         tempActualPoem[id-1].text = e.target.value
         this.setState({
            actualPoem: tempActualPoem
         })
        //  console.log(this.state.toBeSubmittedPoem[id-1].text)
     }

     PoemLinesList() {
        //  console.log(this.state.actualPoem.actualPoem)
        // let dataLabel = this.state.actualPoem.slice()
        return this.state.actualPoem.map(currentpoemLine => {
          return <PoemLine poemLine={currentpoemLine} dataLabel= {this.state.dataLabel} onChangePoemLine={this.onChangePoemLine} key ={currentpoemLine.line}/>;
        })
    }


    onNext(e) {
       this.setState({ 
           credentialsState: false 
       })
    }

    render() {
        this.state.dataLabel = this.state.actualPoem.slice()
        // console.log(this.state.dataLabel == this.state.actualPoem)
        if (this.state.credentialsState) {
            return (
                <div>
                   <Form onSubmit={this.onNext}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="text" placeholder="Emily Dickinson" value={this.state.projectAuthor}
                        onChange={this.onChangeProjectAuthor}/>
                        <Form.Text className="text-muted">
                        We want to know the proud author of this project
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Project Title</Form.Label>
                        <Form.Control required type="text" placeholder="A project like no other" value={this.state.projectTitle}
                        onChange={this.onChangeProjectTitle}/>
                        <Form.Text className="text-muted">
                        Give your project a unique name
                    </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Next
                    </Button>
                    </Form>
                </div>
            )
        }
        return (
            <div>
                {this.PoemLinesList()}
          </div>
        )
    }

}