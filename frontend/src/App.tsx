import React from 'react';
import './App.css';
import MinoristaView from './view/MinoristaView';
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
            <Nav.Link href="/"></Nav.Link>
            </Form>
            </Nav>
          </Navbar>
        </header>
        <body>
          <Switch>
            <Route path="/" component={MinoristaView}/>
          </Switch>
        </body>
      </Router>
    </div>
  );
}

export default App;
