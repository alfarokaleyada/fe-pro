import React from 'react';
import { Route } from 'react-router-dom';
import {Container} from 'reactstrap';
import {Login } from "./components/login"
import { Registration} from "./components/registration"
import {About} from "./components/home"
import {Start} from "./components/start"
import { NavBar } from './components/home';
import Auth from "./components/auth/auth"
import Test from "./components/test/test1"
import { Home  } from './components/home';
import { Footer  } from './components';

function App() {
  return (
    <div>
      <Route path='/' component={Start} exact/>
      <Container>
      <NavBar/>
        <Route path='/home' component={Home} exact />
      <Route path='/Registration' component={Registration} exact />
      <Route path='/About' component={About} exact />
      <Route path='/Login' component = {Login} exact />
      <Route path='/Auth' component={Auth} exact / >
      <Route path='/Test' component={Test} exact/>
      <Footer/>
      </Container>
    </div>
    );
}

export default App;
