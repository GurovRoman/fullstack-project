import React from 'react';
import ChatNavbar from '../components/ChatNavbar'
import {connect} from "react-redux";
import {Share} from "../components/Share";


function _SharePage(props) {
    return (
        <div>
            <ChatNavbar username={props.username}/>
            <div className='Page'>
                <Share/>
            </div>
        </div>
    );
}


export const SharePage = connect(
    store => ({
        username: store.username
    }))(_SharePage);
