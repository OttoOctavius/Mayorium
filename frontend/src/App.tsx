import React from 'react';
import './App.css';
import MinoristaView from './view/MinoristaView';
import MayoristaView from './view/MayoristaView';
import Login from './view/Login';
import SignUp from './view/SignUp';

import { Navbar, Nav, Form } from 'react-bootstrap';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom';

function App() {

  return (
    <div className="App">
      {
        /*
      width="75" height="75"
      <header className="App-header"></header>
      <img src="./favicon.png" className="App-logo" alt="logo" />*/
      }
      <Router>
        <header>
          <Navbar bg="dark" variant="light" expand="sm">
          <Navbar.Brand href="user">
            <img
              alt=""
              src="./logo_transparent.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            /> {' '}
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Form inline>
              <Nav.Link href="user">Mayorista</Nav.Link>
              <Nav.Link href="/">Minorista</Nav.Link>
            </Form>
          </Nav>
          <Navbar.Brand href="mr-auto">
              <Nav.Link href="sign-in">Login</Nav.Link>
              <Nav.Link href="sign-up">Sign up</Nav.Link>
          </Navbar.Brand>
          </Navbar>
        </header>
        
          <Switch>
            <Route path="/" exact>
              <MinoristaView />
            </Route>
            <Route path="/user">
              <MayoristaView />
            </Route>
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>

      </Router>
    </div>
  );
}

export default App;
