import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import { notes } from '../fixtures/fixtures';
import { NoteListItem } from './NoteListItem';

if (Meteor.isClient){
  describe('NoteListItem', function(){
    let Session;

    beforeEach(() => {
        Session = {
          set: expect.createSpy()
        };
    });

    it('should render title and timestamp', function(){
      // this is updated at lecture #137
      const wrapper = mount( <NoteListItem note={ notes[0]} Session ={Session}/> );
      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      expect(wrapper.find('p').text()).toBe('1/08/18');
    });

    it('should set default title if no title set', function(){
      const wrapper = mount( <NoteListItem note={ notes[1] } Session = {Session}/> );
      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });

    it('should call set on click', function(){
      // Render NoteListItem using either note and Session
      const wrapper = mount( <NoteListItem note={ notes[0]} Session ={Session}/> );
      // Find div and simulate click event
      wrapper.find('div').simulate('click');
      // Expect Session.set to have been called with some arguments
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });
  });
}
