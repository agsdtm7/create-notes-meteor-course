import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

import { Notes } from '../api/notes';
// create a name export Editor that is an ES6 class component
export class Editor extends React.Component{
  handleTitleChange(e){
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    });
  }
  handleBodyChange(e){
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    });
  }
  render(){
    if(this.props.note){
          return(
            <div>
              <input value={this.props.note.title} placeholder="Your Note Title" onChange={this.handleTitleChange.bind(this)} /> {/*setup value, placeholder and onchange. then create handleTitleChange*/}

              <textarea value={this.props.note.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
              <button>Delete Note</button>
            </div>
            );
        }else{
          return (
          <p>{ this.props.selectedNoteId? 'Note not found' : 'Pick or create a note to get started'}</p>
        );
        }
/*    if(this.props.note){
      return(
        <p>We got the note</p>
      );
    }else if(this.props.selectedNoteId){
      return (
        <p>Note not found</p>
      );
    }else {
      return(
        <p>Pick or create a note to get started.</p>
      );
    }*/
  }
}

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string,

};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return{
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
}, Editor);
