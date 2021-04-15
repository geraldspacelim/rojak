import React, { Component } from 'react';
import axios from 'axios'
import { Form, Button, FormGroup, FormControl, ControlLabel, InputGroup } from "react-bootstrap";

const PoemLine = props => (
    <Form>
    <Row>
        <Col>
        <Form.Label column sm="2">
        Email
        </Form.Label>
        </Col>
        <Col>
        <Form.Control placeholder="Last name" />
        </Col>
    </Row>
</Form>
)

export default class CreateRojak extends Component {
    constructor(props) {
        super(props);

        this.onNext = this.onNext.bind(this);
        this.onChangeProjectAuthor = this.onChangeProjectAuthor.bind(this);
        this.onChangeProjectTitle = this.onChangeProjectTitle.bind(this);

        this.state = {
            credentialsState: true,
            projectAuthor: "",
            projectTitle: "",
            actualPoem: {}, 
        };

    } 


    componentDidMount() {
        axios.get('http://localhost:5000/poems/getActualPoem')
            .then(response => {
                this.setState(
                    { 
                        actualPoem: response.data[0]
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

     exerciseList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }


    onNext(e) {
       this.setState({ 
           credentialsState: false 
       })
    }

    render() {
        if (this.state.credentialsState) {
            return (
                <div>
                   <Form onSubmit={this.onNext}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="text" placeholder="Emily Dickinson" value={this.state.projectAuthor}
                        onChange={this.onChangeProjectAuthor}/>
                        <Form.Text className="text-muted">
                        We want to know the proud author of this project
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
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
                {}
          </div>
        )
    }

}