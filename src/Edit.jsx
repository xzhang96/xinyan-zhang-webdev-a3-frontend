import React from 'react';
import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Alert from 'react-bootstrap/Alert';
import './index.css';
import { withRouter } from 'react-router-dom';

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            originalUrl: "",
            shortenedUrl: this.props.match.params.path_id,
        }
    }

    onChange(key, event) {
        this.setState({
            [key]: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({response: null});
        Axios.put('https://xinyan-zhang-webdev-a3-backend.herokuapp.com/api/url/' + this.state.shortenedUrl + '/edit',
        {
            originalUrl: this.state.originalUrl
        })
        .then(response => this.setState({
            response: response.status === 200 ? 'Success!' : 'Error'
        }))
        .catch(error => console.log(error))
        .finally(() => {
            this.setState({
                originalUrl: ""
            });
            document.getElementById("original").value = "";
        })
    }

    onDelete(event) {
        event.preventDefault();
        Axios.delete('https://xinyan-zhang-webdev-a3-backend.herokuapp.com/api/url/' + this.state.shortenedUrl + '/edit')
            .then(response => {
                if (response.status === 200) {
                    this.props.history.push('/');
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <>
            <Container className="myContainer">
               <h1>Edit your url</h1>
                <hr/>
                <Form>
                    <Form.Group as={Row}>
                        <Col sm="2"><Form.Label>New Url:</Form.Label></Col>
                        <Col sm="8"><Form.Control type="text" id="original" onChange={(e) => this.onChange('originalUrl', e)}></Form.Control></Col>
                        <Col sm="2"><Button variant="outline-primary" onClick={(e) => this.onSubmit(e)}>Update</Button></Col>
                    </Form.Group>
                </Form>
                <br/>
                <span>Don't want your url anymore?  </span><Button variant="outline-danger" onClick={(e) => this.onDelete(e)}>Delete Url</Button>
                <br/>
                <Alert variant="info" style={this.state.response !== null ? {display: "block"} : {display: "none"}}>
                    <h3>{this.state.response}</h3>
                </Alert>
            </Container>
            
            </>
        )
    }
}

export default withRouter(Edit);