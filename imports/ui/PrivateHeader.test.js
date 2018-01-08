import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { PrivateHeader } from './PrivateHeader';

if (Meteor.isClient){
  describe('PrivateHeader', function(){
    // we test if button test is equal 'Logout'
    it('should set button text to logout', function(){
      // we use 'mount' to test react component
      const wrapper = mount( <PrivateHeader title="Test title" handleLogout={() => {}}/> )
      // wrapper is the building block of your ezyme assertion
      const buttonText = wrapper.find('button').text();  // this is like jquery selector but it is not jquery
      // we use expect to assert the value of buttonText
      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', function(){
      const title = 'test title here';
      // use mount to render private header with header__title
      const wrapper = mount( <PrivateHeader title = {title} handleLogout={() => {}}/>)
      const header = wrapper.find('h1').text();
      // use find to find h1 = get its value store in fweq
      expect(header).toBe(title);

    });

    it('should call the function with string argument', function(){
        const spy = expect.createSpy();
        //spy(3,2,123);
        spy('Agus')
        //debugger; // to pause the program so we can test/check our program
        //expect(spy).toHaveBeenCalled();
        //expect(spy).toNotHaveBeenCalled(); // assertion that ensure spy is not supposed to be called
        expect(spy).toHaveBeenCalledWith('Agus'); // assertion that specify arguments if you care
    });

    it('should call handleLogout on click', function(){
      const spy = expect.createSpy();
      const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/>);

      wrapper.find('button').simulate('click');  // simulate takes event you are trying to simulate
      // so if line 44 is commented out.. that means click never been called..
      expect(spy).toHaveBeenCalled();
    });



  });
}
