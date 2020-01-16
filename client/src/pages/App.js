import React from 'react';
import './App.css';
import {SharePage} from "./SharePage";
import HomePage from "./HomePage";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from "react-redux";


class _App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isLoggedIn : false }
    }

    isLoggedIn = () => {
        return !!this.props.token;
    };

    render() {
        return (
            <div className='App'>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/'>
                            {this.isLoggedIn() ? <Redirect to="/chat"/> : <HomePage/>}
                        </Route>
                        {!this.isLoggedIn() && <Redirect to="/"/>}
                        <Route path="/chat">
                            <SharePage/>
                        </Route>
                        <Redirect from="*" to="/"/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}



export const App = connect(
    store => ({
        token: store.jwtToken,
    }))(_App);
