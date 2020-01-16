import React from 'react';
import ReactDOM from 'react-dom';
import "bootswatch/dist/flatly/bootstrap.min.css";
import './index.css';
import {App} from './pages/App';
import {Provider} from 'react-redux';
import {storeFactory} from "./reducers";


const initialState = {};
export const store = storeFactory(initialState);


const render = () => ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));

store.subscribe(render);
render();

