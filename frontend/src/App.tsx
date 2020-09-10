import React from 'react';
import './App.css';
import MinoristaView from './view/MinoristaView';
import MayoristaView from './view/MayoristaView';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom';

function App() {

  return (
    <div className="App">
      {/*<header className="App-header"></header> */}
      <Router>
        <header>
          <Navbar bg="dark" variant="light" expand="sm">
            <Nav className="mr-auto">
            <Form inline>
            <Nav.Link href="/">Minorista</Nav.Link>
            <Nav.Link href="user">Mayorista</Nav.Link>
            </Form>
            </Nav>
          </Navbar>
        </header>
          <Switch>
            <Route path="/" exact>
              <MinoristaView />
            </Route>
            <Route path="/user">
              <MayoristaView />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
