import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = () => {
  // when user logs in do the following
  if(Meteor.userId()){
    // we replace 'push' with 'replace' in order to fix the go back problem
    browserHistory.replace('/dashboard');
  }
};

const onEnterPrivatePage = () => {
  // when user doesn't log in do the following
  if(!Meteor.userId()){
    browserHistory.replace('/');
  }
};

// #138
const onEnterNotePage = (nextState) => {
  // when user doesn't log in do the following
  if(!Meteor.userId()){
    browserHistory.replace('/');
  }else{
    console.log(nextState);
    Session.set('selectedNoteId', nextState.params.id);
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
  // The includes() method determines whether an array includes a certain element, returning true or false as appropriate.
  const IsUnauthenticatedPage = unauthenticatedPages.includes(pathname); // '/','/signup'
  const isAuthenticatedPage = authenticatedPages.includes(pathname); // '/links'

  console.log('isAuthenticated', isAuthenticated);

  if(IsUnauthenticatedPage && isAuthenticated){
    browserHistory.replace('/dashboard');
  }else if(isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter ={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter ={onEnterPublicPage}/>
    <Route path="/dashboard" component={Dashboard} onEnter ={onEnterPrivatePage}/>
    <Route path="/dashboard/:id" component={Dashboard} onEnter ={onEnterNotePage}/>
    <Route path="/login" component={Login}/>
    <Route path="*" component={NotFound}/>
  </Router>
);
