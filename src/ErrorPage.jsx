import React from 'react';
import Container from 'react-bootstrap/Container';
import './index.css';

export default class ErrorPage extends React.Component {

    render() {
        return (
            <>
                <Container className="myContainer">
                    <div className="error">
                        <h1>Error {this.props.code}</h1>
                        <hr/>
                        <h3>{this.props.msg}</h3>
                    </div>
                    <br/>
                    <p>Click here to redirect to <a href="/">Home</a>...</p>
                </Container>
            </>
        )
    }
}