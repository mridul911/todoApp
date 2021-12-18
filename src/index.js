import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ToDo from 'layouts/Todo.js';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/todo" render={(props) => <ToDo {...props} />} />
        <Redirect from="/" to="todo" />
      </Switch>
    </BrowserRouter>
  );
};
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href =
  'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
