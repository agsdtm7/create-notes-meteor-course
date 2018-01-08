import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import { NoteListHeader } from './NoteListHeader';


// 1. create spy
// 2. render component with spy
// 3. simulate button click
// 4. assert spy was called correctly

if(Meteor.isClient){
  describe('NoteListHeader', function(){
    // #1 test
    it('should call MeteorCall on click', function(){
      // create spy
      const spy = expect.createSpy();
      // create wrapper using mount
      const wrapper = mount( <NoteListHeader meteorCall={spy} /> );
      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled('notes.insert');
    });

  });
}
