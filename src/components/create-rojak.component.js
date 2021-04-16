import React, { Component } from 'react';
import axios from 'axios'
import { Form, Button, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "../App.css"
import Highlighter from "react-highlight-words";
// import Highlighter from "react-highlight-words";


const PoemLine = props => (
    <Form>
         <Form.Group>
        <Row>
            <Col>
            {props.poemLine.text != "" &&
                <Form.Label column sm="12">
                    {/* {props.dataLabel[props.poemLine.line-1].text} */}
                    {props.poemLine.text.searchText != [] &&
                         <OverlayTrigger
                         key={"top"}
                         placement={"right"}
                         overlay={
                             <Tooltip>
                              hello
                             </Tooltip>
                         }
                         >
                         <Highlighter searchWords={props.poemLine.searchText} caseSensitive={false} textToHighlight={props.dataLabel[props.poemLine.line-1].text}/>
                        </OverlayTrigger>
                    }
            </Form.Label>
            }
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
            credentialsState: false,
            projectAuthor: "",
            projectTitle: "",
            englishTerms: [],
            terms: [],
            actualPoem: [], 
            caseSensitive: false,
            dataLabel: [{"line": 1,"text": "I met him down upon the pier;"},{"line": 2,"text": "His eyes were wild and sad,"},{"line": 3,"text": "And something in them made me fear"},{"line": 4,"text": "That he was going mad."},{"line": 5,"text": ""},{"line": 6,"text": "So, being of a prudent sort,"},{"line": 7,"text": "I stood some distance off,"},{"line": 8,"text": "And before speaking gave a short"},{"line": 9,"text": "Conciliatory cough."},{"line": 10,"text": ""},{"line": 11,"text": "I then observed, 'What makes you look"},{"line": 12,"text": "So singularly glum?'"},{"line": 13,"text": "No notice of my words he took."},{"line": 14,
            "text": "I said, 'Pray, are you dumb?'"},{"line": 15,"text": ""},{"line": 16,"text": "'Oh no!' he said, 'I do not think"},{
            "line": 17,"text": "My power of speech is lost,"},{"line": 18,"text": "But when one's hopes are black as ink,"},{"line": 19,"text": "Why, talking is a frost."},{"line": 20,"text": ""},{"line": 21,"text": "'You see, I'm in for Math. again,"},{"line": 22,
            "text": "And certain to be ploughed."},{"line": 23,"text": "Please tell me where I could obtain"},{"line": 24,"text": "An inexpensive shroud.'"},{"line": 25,"text": ""},{"line": 26,"text": "I told him where such things are had,"},{"line": 27,"text": "Well made, and not too dear;"},{"line": 28,"text": "And, feeling really very sad,"},{"line": 29,"text": "I left him on the pier"}],
        };

    } 


    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        axios.get('http://localhost:5000/poems/getActualPoem')
        .then(response => {
            if (response.data[0].actualPoem.length > 0 ) {
                console.log(response.data[0].actualPoem)
                this.setState(
                    {
                        actualPoem: response.data[0].actualPoem,
                    }
                )
            }
        })
        .catch((error) => {
            console.log(error);
        })

        axios.get('http://localhost:5000/terms/getTerms')
        .then(response => {
            if (response.data.length > 0 ) {
                // console.log(response.data)
                // let tempArray = []
                // response.data.forEach(term => {
                //     tempArray.push(term.englishTerm)
                // })
                this.setState(
                    {
                        terms: response.data,
                        // englishTerms: tempArray
                    }
                )
            }
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
        //  console.log(this.state.dataLabel)
         let tempActualPoem = [...this.state.actualPoem]
         tempActualPoem[id-1].text = e.target.value
         this.setState({
            actualPoem: tempActualPoem
         })
        //  console.log(this.state.toBeSubmittedPoem[id-1].text)
     }

     PoemLinesList() {
        return this.state.actualPoem.map(currentpoemLine => {
          return <PoemLine poemLine={currentpoemLine} dataLabel= {this.state.dataLabel} onChangePoemLine={this.onChangePoemLine} key ={currentpoemLine.line}/>;
        })
    }


    onNext(e) {
        e.preventDefault()
       this.setState({ 
           credentialsState: false 
       })
    }

    render() {
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
        // if this.
        // console.log(this.state.actualPoem[0])
        return (
            <div>
                {this.PoemLinesList()}
          </div>
        )
    }

}