import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Login } from './Login';

// Test case for Login
if (Meteor.isClient){
  describe('login',function(){

    it('should show error messages', function(){
      const error = 'this is not working';
      const wrapper = mount( <Login loginWithPassword = {() => {}}/>); // to mount a component, we need to import it

      wrapper.setState({error});
      // select wrapper p tags. get text value. Expect it to equal "error" variable above
      const errorMessage = wrapper.find('p').text();
      expect(errorMessage).toBe(error);
      // or another way is
      // expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' }); // we need to set the error as empty
      expect(wrapper.find('p').length).toBe(0);
    });
    // Refer to Login.js, testing lines 21-28 by simulating form submit (lines 37-41)
    it('should call loginWithPassword with the form data', function(){
      // this test case is gonna make sure when we supply the form data and
      // submit the form, loginWithPassword gets that data
      const email = 'agus@test.com';
      const password = '123456789';
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword = {spy}/>);
      // taking value of the email ref element
      wrapper.ref('email').node.value = email;
      // taking value of the password ref element
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      // check that the second argument is the password from above
      expect(spy.calls[0].arguments[1]).toBe( password );
    });

    it('should set loginWithPassword callback error', function(){
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword = {spy}/>);
      //http://airbnb.io/enzyme/docs/api/ReactWrapper/ref.html
      wrapper.find('form').simulate('submit');
      spy.calls[0].arguments[2]({});
      expect(wrapper.state('error')).toNotBe('');
      // or expect(wrapper.state('error').length).toNotBe(0);

      // call the third argument with no arguments
      spy.calls[0].arguments[2]();
      // expect the error state to be ''
      expect(wrapper.state('error')).toBe('');

    });

  });
}
