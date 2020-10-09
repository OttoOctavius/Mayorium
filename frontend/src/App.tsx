import React, { useState } from 'react';
import './App.css';
import MinoristaView from './view/MinoristaView';
import MayoristaView from './view/MayoristaView';
import Login from './view/Login';
import SignUp from './view/SignUp';
//import history from "./utils/history";
import { Navbar, Nav, Form } from 'react-bootstrap';
import { Switch, Route, useHistory, BrowserRouter as Router} from 'react-router-dom';
import { User, UserLogin, cargarUsuario } from './types/User';

const App : React.FC = (props:any) => {
  //let history = useHistory();
  const [ruta, setRuta] = useState<string>("/");
  const [esMayorista, setEsMayorista] = useState<boolean|undefined>();
  const [usuario, setUsuario] = useState<User|undefined>();
  //let location = useLocation();

  const logeo = (n:number,a:object) => {
     //(n,usuario)=>{console.log(usuario)}
  }

  React.useEffect(() => {
    //history.push(ruta)
    if(esMayorista===undefined)
      setUsuario(undefined);
    else
      setUsuario(cargarUsuario())
  }, [esMayorista]);//ruta

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
              {esMayorista && <Nav.Link href="user">Mayorista</Nav.Link>}
              <Nav.Link href="/">Minorista</Nav.Link>
            </Form>
          </Nav>
          <Navbar.Brand href="mr-auto">
              {usuario===undefined?
                <>
                  <Nav.Link href="sign-in">Login</Nav.Link>
                  <Nav.Link href="sign-up">Sign up</Nav.Link>
                </>:
                <>
                  <Navbar.Text>
                    Usuario: {usuario.username}
                  </Navbar.Text>
                  <Nav.Link href="/" onClick={()=>setEsMayorista(undefined)}>Log-out {usuario.email}</Nav.Link>
                </>
              }
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
            <Route path="/sign-in">
             <Login logeado={setEsMayorista}></Login>
            </Route>
            <Route path="/sign-up" component={SignUp} />
        </Switch>

      </Router>
    </div>
  );
}
//logeado={(a,b)=> setRuta("/user")}
export default App;
