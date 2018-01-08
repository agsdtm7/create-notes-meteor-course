import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Signup } from './Signup';

// Test case for Login
if (Meteor.isClient){
  describe('Signup',function(){

    it('should show error messages', function(){
      const error = 'this is not working';
      const wrapper = mount( <Signup createUser = {() => {}}/>); // to mount a component, we need to import it

      wrapper.setState({error});
      // select wrapper p tags. get text value. Expect it to equal "error" variable above
      const errorMessage = wrapper.find('p').text();
      expect(errorMessage).toBe(error);
      // or another way is
      // expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' }); // we need to set the error as empty
      expect(wrapper.find('p').length).toBe(0);
    });
    // Refer to Signup.js, testing lines 27-33 by simulating form submit (lines 43-47)
    it('should call createUser with the form data', function(){
      // this test case is gonna make sure when we supply the form data and
      // submit the form, loginWithPassword gets that data
      const email = 'agus@test.com';
      const password = '123456789';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser = {spy}/>);

      // taking value of the email ref element
      wrapper.ref('email').node.value = email;
      // taking value of the password ref element
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });

    it('should set error if short password', function(){
      // this test case is gonna make sure when we supply the form data and
      // submit the form, loginWithPassword gets that data
      const email = 'agus@test.com';
      const password = '123                       ';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser = {spy}/>);

      // taking value of the email ref element
      wrapper.ref('email').node.value = email;
      // taking value of the password ref element
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');
      // we expect that the error state value is not empty or the length is not 0
      expect(wrapper.state('error').length).toNotBe(0);
    });

    it('should set createUser callback errors', function(){
      const password = 'password123';
      const reason = 'this is why it failed';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser = {spy}/>);
      //http://airbnb.io/enzyme/docs/api/ReactWrapper/ref.html
      // taking value of the password ref element
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({ reason }); // provide reason prop
      expect(wrapper.state('error')).toBe(reason); // error state equal reason above
      // or expect(wrapper.state('error').length).toNotBe(0);

      // call the third argument with no arguments
      spy.calls[0].arguments[1]();
      // expect the error state to be '' after the above
      expect(wrapper.state('error').length).toBe(0);

    });

  });
}
