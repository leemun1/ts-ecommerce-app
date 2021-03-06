import React, { Dispatch } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/Home/Home';
import ShopPage from './pages/Shop/Shop';
import CheckoutPage from './pages/Checkout/Checkout';
import AuthenticatePage from './pages/Authenticate/Authenticate';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { RootActionTypes, RootState } from './redux/rootReducer';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
export type User = firebase.firestore.DocumentData & { id?: string };

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
type State = {};

class App extends React.Component<Props, State> {
  unsubscribeFromAuth: Function | null = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        if (userRef) {
          userRef.onSnapshot((snapShot) => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data(),
            });
          });
        }
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
      console.log('unsubscribed');
    }
  }

  render() {
    return (
      <div className='app'>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <AuthenticatePage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch<RootActionTypes>) => ({
  setCurrentUser: (user: User | null) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
