import Login from './components/Login';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"
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

        {!userAuthorised ?
          <Switch>
            <Route exact path='/login'>
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
