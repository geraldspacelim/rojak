import React, { Component } from 'react';
// import { Col  } from "react-bootstrap";
import axios from 'axios'
// import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';

import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader,
    Button,
    CardActions
} from '@material-ui/core/'


export default class PoemsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            rojakPoems: [],
        }
    } 

    componentDidMount() {
        axios.get('/poems/getRojakPoems/')
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

    render() {
        // const classes = useStyles();
        return (
            <div>
            {/* <h3>Poems List</h3> */}
            <div>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {this.state.rojakPoems.map(p => (
                    <Grid item xs={12} sm={6} md={3} key={p._id}>
                        <Card>
                            <CardHeader
                                title={p.projectName}
                                // title={`quarter : ${elem.quarter}`}
                                subheader={`By: ${p.author}`}
                            />
                            <CardContent>
                                <Typography gutterBottom>
                                    {p.projectDescription}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">
                                    <Link to={"/view/"+p._id} style={{ textDecoration: 'none' }}>Read more</Link>
                                </Button>
                            </CardActions>
                        </Card>
                     </Grid>
                ))}
            </Grid>
        </div>
          </div>
        )
    }

}