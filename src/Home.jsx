import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import './index.css';
import Container from 'react-bootstrap/Container';
import CreateForm from './CreateForm';

class App extends React.Component {

  componentDidMount() {
    const { path_id } = this.props.match.params;
    Axios.get('http://localhost:3000/api/url/' + path_id)
      .then(response => {
        window.location.href = response.data;
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <>
        <Container className="myContainer">
        <h1>Url Shortener</h1>
        
        <CreateForm></CreateForm>
        </Container>
      </>
    )
  }


}

export default withRouter(App);