import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { notes } from '../api/notes';
import { Session } from 'meteor/session';

// NoteListHeader

// 1 create NoteListHeader functional Component
// 2 render a button to the screen Create Note
// 3 setup onclick handler for button
// 4 props.meteorCall trigger notes.insert meteor method
// 5 render container component in NoteList
export const NoteListHeader = (props) => {
  return (
    <div>
      <button onClick={() => {
        props.meteorCall('notes.insert', (err, res) => {
          if(res){
            props.Session.set('selectedNoteId', res);
          }
        });

      }
      }>Create Note</button>
    </div>
  );
};

NoteListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, NoteListHeader);
