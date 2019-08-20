import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import App from './Views/App';
import Create from './Views/create';
import Update from './Views/update';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <div>
          <Route exact path='/' component={App} />
          <Route path='/create' component={Create} />
          <Route path='/update/:id' component={Update} />
        </div>
    </Router>,
    document.getElementById('root')
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
