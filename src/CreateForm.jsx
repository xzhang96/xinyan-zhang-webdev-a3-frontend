import React from 'react'
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';



export default class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            branded: false,
            originalUrl: "",
            shortenedUrl: "",
          }
    }

    onChange(key, event) {
        if (key === "branded") {
            this.setState({
            [key]: event.target.checked
            })
        } else {
            this.setState({
            [key]: event.target.value
            })
        }
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({response: null});
        Axios.post('http://localhost:3000/api/url',
            {
                originalUrl: this.state.originalUrl,
                shortenedUrl: this.state.shortenedUrl,
                branded: this.state.branded
            })
            .then(response => {
                this.setState({response: response.data})
            })
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({
                    originalUrl: "",
                    shortenedUrl: "",
                    branded: false
                });
                document.getElementById("branded").checked = false;
                document.getElementById("original").value = "";
            })
    }

    render() {
        return (
            <>
            <Form id="myForm">
                <input type="checkbox" id="branded" name="branded" onChange={(e) => this.onChange('branded', e)}/>
                <label htmlFor="branded" style={{padding: "10px"}}>Branded</label>
                <br/>
                <Form.Group as={Row}>
                    <Col sm="2"><Form.Label>Original Url: </Form.Label></Col>
                    <Col sm="10"><Form.Control type="text" id="original" onChange={(e) => this.onChange('originalUrl', e)}></Form.Control></Col>
                </Form.Group>
                <div style={this.state.branded ? {display: "block"} : {display: "none"}}>
                    <Form.Group as={Row}>
                        <Col sm="2"><Form.Label>Custom Url: </Form.Label></Col>
                        <Col sm="10"><Form.Control type="text" id="shortened" onChange={(e) => this.onChange('shortenedUrl', e)}></Form.Control></Col>
                    </Form.Group>
                </div>
                <br/>
                <Button type="submit" onClick={(e) => this.onSubmit(e)}>Submit</Button>
            </Form>
            <br/>
            <Alert variant="info" style={this.state.response !== null ? {display: "block"} : {display: "none"}}>
                <h3>Your shortened url: </h3>
                <h5><strong>http://localhost:3000/api/url/{this.state.response}</strong></h5>
            </Alert>
            </>
        )   
    }

}