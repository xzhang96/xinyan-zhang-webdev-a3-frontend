import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import './index.css';
import Container from 'react-bootstrap/Container';
import CreateForm from './CreateForm';
import ErrorPage from './ErrorPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorCode: null,
      errorMsg: null,
    }
  }

  componentDidMount() {
    this.setState({
      errorMsg: null,
      errorCode: null,
    })
    const path_id = this.props.match.params.path_id;
    if (path_id !== undefined) {
      Axios.get('https://xinyan-zhang-webdev-a3-backend.herokuapp.com/api/url/' + path_id)
        .then(response => {
          window.location.href = response.data;
        })
        .catch(error => this.setState({
          errorCode: error.response.status,
          errorMsg: error.response.statusText
        }));
    }
  }

  render() {
    if (this.state.errorCode !== null) {
      return (<ErrorPage code={this.state.errorCode} msg={this.state.errorMsg}/>);
    }
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