import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Notes } from '../api/notes';
// create a name export Editor that is an ES6 class component
export class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }
  handleTitleChange(e){
    const title = e.target.value;
    this.setState({ title });
    this.props.call('notes.update', this.props.note._id, { title });
  }
  handleBodyChange(e){
    const body = e.target.value;
    this.setState({ body });
    this.props.call('notes.update', this.props.note._id, { body });
  }
  // #143
  handleDeleteNote(){
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.push('/dashboard');
  }
  // this is lifecycle method #143
  // if you switch to notes it will be updated
  componentDidUpdate(prevProps, prevState){
    const currentNoteId = this.props.note? this.props.note._id : undefined;
    const prevNoteId = prevProps.note? prevProps.note._id : undefined;

    if(currentNoteId && currentNoteId !== prevNoteId){
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }
  // ------------------------
  render(){
    if(this.props.note){
          return(
            <div>
              <input value={this.state.title} placeholder="Your Note Title" onChange={this.handleTitleChange.bind(this)} /> {/*setup value, placeholder and onchange. then create handleTitleChange*/}
              <textarea value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
              <button onClick={this.handleDeleteNote.bind(this)}>Delete Note</button>
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
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return{
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);
