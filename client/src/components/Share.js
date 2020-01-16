import React from "react";

import {store} from "../index";
import {Button, Card, Form, FormControl, Image, InputGroup} from "react-bootstrap";
import {setJwtToken} from "../actions";


export class Share extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            inProgress: false,
            rewardId: null
        };
    }

    onSubmit = event => {
        event.preventDefault();
        this.setState({inProgress: true});
        let file = this.fileInput.current.files[0];
        let token = store.getState().jwtToken.tokenType + ' ' + store.getState().jwtToken.accessToken;

        const formData = new FormData();
        formData.append('file',file)

        fetch("http://localhost:8080/api/upload", {
                method: 'post',
                headers: {'Authorization': token},
                body: formData
            }
        ).then(
            (result) => {
                if (result.status === 401) {
                    store.dispatch(setJwtToken(null))
                }
                else if (result.status !== 200) {

                }
                else {
                    result.json().then((result) => {
                        console.log(result);
                        this.setState({rewardId: result.reward_id});
                    });
                }
                this.setState({inProgress: false});
            }
        )
    };


    render() {
        let imagePath = "http://localhost:8080/api/getImage/" + this.state.rewardId;
        return (
            <div className="Share-page row">
                <Card className="bg-dark text-white">
                    {this.state.rewardId &&
                    <a href={imagePath}>
                        <Card.Img className="Card-img" src={imagePath} alt="Card image"/>
                    </a>}
                </Card>
                <br/>
                <Form onSubmit={this.onSubmit} className="frame">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <FormControl disabled={this.state.inProgress} required type='file' id="file" label='Upload' accept='image/jpeg,image/png' ref={this.fileInput}/>
                        </InputGroup.Prepend>
                        <Button className="file" type="submit" disabled={this.state.inProgress}>Submit</Button>
                    </InputGroup>
                </Form>
            </div>
        );
    }
}
