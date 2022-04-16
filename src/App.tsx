import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './app/layout/components/NavBar';
import { Route, Switch } from 'react-router-dom';
import HomePage from './app/layout/pages/HomePage';
import RegisterPage from './app/layout/pages/RegisterPage';
import LoginPage from './app/layout/pages/LoginPage';
import { useStore } from './app/stores/store';
import LoadingComponent from './app/layout/components/LoadingComponents';
import { observer } from 'mobx-react-lite';
import UsersPage from './app/layout/pages/UsersPage';
import RolesPage from './app/layout/pages/RolesPage';
import ProductsPage from './app/layout/pages/ProductsPage';
import ProductCart from './app/layout/pages/ProductCart';
import TestErrors from './app/layout/pages/errors/TestErrors';
import { ToastContainer } from 'react-toastify';
import NotFound from './app/layout/pages/errors/NotFound';
import ServerError from './app/layout/pages/errors/ServerError';
import NetworkError from './app/layout/pages/errors/NetworkError';
import OrdersAdminPage from './app/layout/pages/OrdersAdminPage';

function App() {

  const {commonStore, userStore} = useStore();
  useEffect(() => {
      userStore.getUser().finally(() => commonStore.setApploaded());

  }, [commonStore, userStore])

  

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app...'/>

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Route exact path='/' component={HomePage}/>
      <Route
        path={'/(.+)'}
        render = {() => (
          <>
            <NavBar/>
            <Container>
              <Switch>
                <Route exact path={'/admin/users'} component={UsersPage}/>    
                <Route exact path={'/admin/roles'} component={RolesPage}/>    
                <Route exact path={'/admin/errors'} component={TestErrors}/>    
                <Route exact path={'/admin/orders'} component={OrdersAdminPage}/>    

                {/* ERROR PAGES */}
                <Route exact path={'/error/NotFound'} component={NotFound}/>    
                <Route exact path={'/error/server-error'} component={ServerError}/>    
                <Route exact path={'/error/network-error'} component={NetworkError}/>    
                
                
                {/* <Route exact path={'/ships'} component={ShipsList}/> */}
                <Route exact path={'/Products'} component={ProductsPage}/>    
                <Route exact path={'/Register'} component={RegisterPage}/>    
                <Route exact path={'/ProductCart'} component={ProductCart}/>    
                <Route exact path={'/Login'} component={LoginPage}/>    
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);

