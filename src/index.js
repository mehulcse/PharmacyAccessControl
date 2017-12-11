import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "./app.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import Login from "./containers/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./containers/Dashboard";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div className="App-intro">
        <Header/>
        <Route exact path="/" component={Login}/>
        <Route exact path="/Dashboard" component={Dashboard}/>
        <Footer/>
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
