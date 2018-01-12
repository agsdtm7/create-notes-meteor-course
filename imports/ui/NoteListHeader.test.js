import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import { NoteListHeader } from './NoteListHeader';
import { notes } from '../fixtures/fixtures';

// 1. create spy
// 2. render component with spy
// 3. simulate button click
// 4. assert spy was called correctly

if(Meteor.isClient){
  describe('NoteListHeader', function(){
    let meteorCall;
    let Session;

    beforeEach(function(){
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy()
      }
    });
    // #1 test
    it('should call MeteorCall on click', function(){
      // create wrapper using mount
      const wrapper = mount( <NoteListHeader meteorCall={meteorCall} Session={Session}/> );
      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](undefined, notes[0]._id);

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });

    it('should not set session for failed insert', function(){
      const wrapper = mount( <NoteListHeader meteorCall={meteorCall} Session={Session}/> );
      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1]({}, undefined);

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toNotHaveBeenCalled();
    });
















  });
}
