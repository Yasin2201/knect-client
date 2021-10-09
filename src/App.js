import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { useEffect, useState } from 'react';

const App = () => {
  const [userAuthorised, setUserAuthorised] = useState(false)

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
              <Login setUserAuthorised={setUserAuthorised} />
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
