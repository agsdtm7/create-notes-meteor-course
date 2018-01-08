import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// in notes.js we set it up as name export
import { Notes } from '../api/notes';

import NoteListHeader from './NoteListHeader';

import NoteListItem from './NoteListItem';
export const NoteList = (props) => {
  return (
    <div>
    <NoteListHeader />
    {props.notes.map((note) => {
      return <NoteListItem key={note._id} note={note}/>;
    })}
    {
      /**
      Use map method to cover notes array into jsx array
      Set Up key props equal to ID
      Setup note prop
     */
   }

      NoteList { props.notes.length }
    </div>
  );
};

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};

// REMEMBER createContainer is REACTIVE, similar to Tracker.Autorun
// if there is anything changes the code re-runs, re-rendering NoteList above
export default createContainer(() => {
  // we want to fetch the notes, meaning we subscribe at notes.js
  Meteor.subscribe('notes');
  // return followed with { } meaning we return an object
  return {
    // returning an ARRAY!!!! to be used in the line 15
      notes: Notes.find().fetch()
  };
}, NoteList);
