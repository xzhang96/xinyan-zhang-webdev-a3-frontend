import React from 'react';
import  { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Edit from './Edit';

export default class App extends React.Component {
    render() {
        return (
            <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/url/:path_id" component={Home}/>
                    <Route exact path="/url/:path_id/edit" component={Edit}/>
                </Switch>
            </Router>
            </>
        )
    }
}