import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Home from './components/Home';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

const App = () => {
  const [userAuthorised, setUserAuthorised] = useState(false)
  const [currUser, setCurrUser] = useState()

  useEffect(() => {
    const userAuth = sessionStorage.getItem('userAuth')
    const currUserID = sessionStorage.getItem('currUser')

    if (userAuth) {
      setUserAuthorised(true)
      setCurrUser(currUserID)
    } else {
      setUserAuthorised(false)
      setCurrUser()
    }
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Navbar userAuthorised={userAuthorised} setUserAuthorised={setUserAuthorised} setCurrUser={setCurrUser} />

        {!userAuthorised && !currUser ?
          <Switch>
            <Route exact path='/'>
              <Login setUserAuthorised={setUserAuthorised} setCurrUser={setCurrUser} />
            </Route>

            <Route exact path='/sign-up'>
              <Signup />
            </Route>
          </Switch>
          :
          <Switch>
            <Route exact path='/'>
              <Redirect to='/home' />
            </Route>

            <Route exact path='/home'>
              <Home currUser={currUser} />
            </Route>
          </Switch>
        }

      </BrowserRouter>
    </div>
  );
}

export default App;
