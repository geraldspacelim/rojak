import React, { Component } from 'react';
import axios from 'axios'
import { Form, Button, Row, Col, OverlayTrigger, Container, Popover  } from "react-bootstrap";
import Highlighter from "react-highlight-words";

const PoemLine = (props) => {

    if (props.poemLine.text != "blank") {
        let tooltipEn = ""
        let tooltipDef = ""
        let tooltipSg = ""
        let prev = 0;
        let extraTerm;
        props.termsDict.forEach(term => {
            if (props.poemLine.line == term.lineNum) {
                tooltipEn += `${term.englishTerm}, `
                if (term.lineNum != prev) {
                    tooltipDef = term.definition
                    term.singlishTerm.forEach(sgTerm => {
                        tooltipSg += `${sgTerm.text},`
                    })
                    tooltipSg = tooltipSg.slice(0, -1);  
                } else {
                    let sgExtraTerms = ""
                    term.singlishTerm.forEach(sgTerm => {
                        sgExtraTerms += `${sgTerm.text},`
                    })
                    sgExtraTerms = sgExtraTerms.slice(0, -1);  
                    extraTerm =  <Popover.Content>
                    <strong>Definition: </strong>{term.definition}<br/>
                    <strong>Singlish Terms: </strong>{sgExtraTerms}<br/>                                           
                    </Popover.Content>
                }
                prev = term.lineNum
            }
        });
        tooltipEn = tooltipEn.slice(0, -2);
        return  (
            <Form>
                <Form.Group>
                    <Row>
                        <Col>
                                {props.poemLine.searchText.length > 0 ? 
                                 <Form.Label column sm="12">
                                    <OverlayTrigger
                                        key={"top"}
                                        placement={"right"}
                                        overlay={
                                            <Popover id="popover-basic">
                                                <Popover.Title as="h3">{tooltipEn}</Popover.Title>
                                                <Popover.Content>
                                                    <strong>Definition: </strong>{tooltipDef}<br/>
                                                    <strong>Singlish Terms: </strong>{tooltipSg}<br/>                                           
                                                </Popover.Content>
                                                {extraTerm}
                                            </Popover>
                                        }
                                        >
                                        <Highlighter searchWords={props.poemLine.searchText} caseSensitive={false} textToHighlight={props.dataLabel[props.poemLine.line-1].text}/>
                                    </OverlayTrigger>
                                    </Form.Label>
                                    :  <Form.Label column sm="12">{props.dataLabel[props.poemLine.line-1].text}</Form.Label>
                                }
                        </Col>
                        <Col>
                            <Form.Control type="text" required={true} value={props.poemLine.text} onChange={(e) => props.onChangePoemLine(props.poemLine.line, e)}/>
                        </Col>
                    </Row>
            </Form.Group>
       </Form>
        )    
    }  else {
        return (
            <div></div>
        )
    }
}

export default class CreateRojak extends Component {
    constructor(props) {
        super(props);

        this.onNext = this.onNext.bind(this);
        this.onChangeProjectAuthor = this.onChangeProjectAuthor.bind(this);
        this.onChangeProjectTitle = this.onChangeProjectTitle.bind(this);
        this.onChangeProjectDescription = this.onChangeProjectDescription.bind(this);
        this.onChangePoemLine = this.onChangePoemLine.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            credentialsState: false,
            projectAuthor: "",
            projectTitle: "",
            englishTerms: [],
            terms: [],
            actualPoem: [], 
            caseSensitive: false,
            projectDescription: "", 
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
                // console.log(response.data[0].actualPoem)
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
                // console.log(response)
                this.setState(
                    {
                        terms: response.data,
                    }
                )
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    onChangeProjectDescription(e) {
        this.setState({
            projectDescription: e.target.value
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
        //  console.log(this.state.actualPoem)
         let tempActualPoem = [...this.state.actualPoem]
         tempActualPoem[id-1].text = e.target.value
         this.setState({
            actualPoem: tempActualPoem
         })
        //  console.log(this.state.toBeSubmittedPoem[id-1].text)
     }

     PoemLinesList() {
        return this.state.actualPoem.map(currentpoemLine => {
          return <PoemLine poemLine={currentpoemLine} dataLabel= {this.state.dataLabel} onChangePoemLine={this.onChangePoemLine} key ={currentpoemLine.line} termsDict = {this.state.terms} onSubmit={this.onNext}/>;
        })
    }


    onNext(e) {
        e.preventDefault()
       this.setState({ 
           credentialsState: true 
       })
    }

    backToPrevious() {
        // e.preventDefault();
        this.setState({
            credentialsState: false
        })
    }

    discardChanges() {
        window.location = '/'
    }

    onSubmit(e) {
        e.preventDefault()
        const rojakPoem = {
            projectName: this.state.projectTitle,
            author: this.state.projectAuthor,
            rojakPoem: this.state.actualPoem,
            projectDescription: this.state.projectDescription,
        }

        console.log(rojakPoem)
        axios.post('http://localhost:5000/poems/addRojakPoem', rojakPoem)
        .then(res => console.log(res.data));

        window.location = '/'
    }


    render() {
        if (this.state.credentialsState) {
            return (
                <div>
                   <Form onSubmit={this.onSubmit}>
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
                    <Form.Group>
                        <Form.Label>Project Description</Form.Label>
                        <Form.Control required type="text" placeholder="Lorem Ipsum" value={this.state.projectDescription} onChange={this.onChangeProjectDescription} as="textarea" rows={2} />
                        <Form.Text className="text-muted">
                        Tell me more about this project 
                    </Form.Text>
                    </Form.Group>
                     <Row>
                            <Col md={1}>
                            <Button variant="danger" onClick={() => {this.backToPrevious()}}>
                                Previous
                            </Button>
                            </Col>
                            <Col md={{ span: 2, offset: 0.5 }}>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            )
        }
        return (
            <div>
                {this.PoemLinesList()}
                  <Form onSubmit={this.onNext}>
                    <Container>
                        <Row>
                            <Col md={1}>
                            <Button variant="primary" type="submit">
                                Continue
                            </Button>
                            </Col>
                            <Col md={{ span: 2, offset: 0.5 }}>
                            <Button variant="danger" onClick={() => {this.discardChanges()}}>
                                Discard Changes
                            </Button>
                            </Col>
                        </Row>
                    </Container>
                  </Form>
          </div>
        )
    }

}