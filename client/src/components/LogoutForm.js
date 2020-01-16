import React from "react";

import {store} from "../index";
import {setJwtToken} from "../actions";
import {Button, Form, FormText} from "react-bootstrap";

export class LogoutForm extends React.Component {
    onSubmit() {
        store.dispatch(setJwtToken(null));
    };

    render() {
        return (
            <Form inline>
                <FormText className="mr-sm-2">Logged in as: {this.props.username}</FormText>
                <Button variant="outline-primary" onClick={this.onSubmit}>Logout</Button>
            </Form>
    );
    }
}
