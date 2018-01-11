import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';


// #138
const onEnterNotePage = (nextState) => {
  // when user doesn't log in do the following
    Session.set('selectedNoteId', nextState.params.id);
};

const onLeaveNotePage = () => {
  Session.set('selectedNoteId', undefined);
}

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const IsUnauthenticatedPage = currentPagePrivacy === 'unauth'; // '/','/signup'
  const isAuthenticatedPage = currentPagePrivacy === 'auth'; // '/links'

  if(IsUnauthenticatedPage && isAuthenticated){
    browserHistory.replace('/dashboard');
  }else if(isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

//DYNAMIC ROUTE #141 & 142
export const globalOnChange = (prevState, nextState) => {
//  console.log('globalOnChange');
  globalOnEnter(nextState);
};
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
//  console.log('globalOnEnter');
//  debugger;
};
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange = {globalOnChange}>
      <Route path="/" component={Login} privacy="unauth" />
      <Route path="/signup" component={Signup} privacy="unauth" />
      <Route path="/dashboard" component={Dashboard} privacy="auth"/>
      <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter ={onEnterNotePage}  onLeave={onLeaveNotePage}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
