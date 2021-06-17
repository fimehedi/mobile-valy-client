import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminRoute from './components/AdminRoute/AdminRoute';
import ShopRoute from './components/ShopRoute/ShopRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';

export const UserContext = createContext();

function App() {
   const [loggedInUser, setLoggedInUser] = useState({});

   return (
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
         <Router>
            <Switch>

               <PrivateRoute path="/admin">
                  <AdminRoute />
               </PrivateRoute>

               <Route path="/">
                  <ShopRoute />
               </Route>

            </Switch>
         </Router>
      </UserContext.Provider>
   );
}

export default App;
