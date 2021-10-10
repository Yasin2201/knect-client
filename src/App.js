import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect, useState } from 'react';

const App = () => {
  const [userAuthorised, setUserAuthorised] = useState(false)
  const [currUser, setCurrUser] = useState(undefined)

  useEffect(() => {
    const userAuth = sessionStorage.getItem('userAuth')
    if (userAuth) {
      setUserAuthorised(true)
    } else {
      setUserAuthorised(false)
    }
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Navbar userAuthorised={userAuthorised} setUserAuthorised={setUserAuthorised} />

        {!userAuthorised ?
          <Switch>
            <Route exact path='/'>
              <Login setUserAuthorised={setUserAuthorised} setCurrUser={setCurrUser} />
            </Route>

            <Route exact path='/sign-up'>
              <Signup />
            </Route>
          </Switch>
          :
          <div>
            LOGGED IN!
          </div>
        }

      </BrowserRouter>
    </div>
  );
}

export default App;
