import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

// Testing which happens in the server side
if (Meteor.isServer){
  describe('notes',function(){
    const noteOne = {
      _id: 'testNoteSampleId',
      title:'Mytitle',
      body: 'My body for note',
      updatedAt: 0,
      userId: 'testSampleId'
    };

    const noteTwo = {
      _id: 'testNoteSampleId2',
      title:'Note Crypto',
      body: 'Trx Xvg',
      updatedAt: 0,
      userId: 'testSampleId2'
    };

    beforeEach(function(){
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    // #1 testing: insertion testing with user id
    it('should insert new note', function(){

      const userId = 'testid';
      // apply is javascript feature
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });

      expect(Notes.findOne({ _id, userId})).toExist();
    });

    // #2 testing:
    it('should not insert note if not authenticated', function(){
      expect(()=> {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note',function(){
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);

      expect(Notes.findOne({ _id: noteOne._id })).toNotExist();
    });

    it('should not remove note if unauthenticated', function(){
      expect(() => {
          Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid _id', function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
      }).toThrow();
    });

    it('should update note', function(){
      const title = 'This is an updated title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);
      // using expectjs command 'toBeGreaterThan' and 'toInclude'
      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title,
        body: noteOne.body
      });
    });

    // it should throw error if extra updates
    // expect some function to toThrowc
    // call notes.update with extra update
    it('should throw error if extra updates provided', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        }, [
          noteOne._id,
          { title: 'new title', name: 'andre' }
        ]);
      }).toThrow();
    });

    // testing if a random userId update the note
    it('should not update if user is not the note creator', function(){
      const title = 'This is an updated title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'testId'   // just random id
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);
      // using expectjs command 'toBeGreaterThan' and 'toInclude'
      expect(note).toInclude(noteOne);
    })


    it('should not update note if unauthenticated', function(){
      expect(() => {
          Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not update note if invalid _id', function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
      }).toThrow();
    });

    it('should return a user notes', function(){
      const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId }); // object notation is not needed as 'notes' doesn't have any special character
      const notes = res.fetch(); // this will only work with 'find' not 'findOne' (refer to notes.js line 11)

      expect(notes.length).toBe(1); // we only expect the length of the node is 1, if not, there is something wrong
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return no notes for user that has none', function(){
      const res = Meteor.server.publish_handlers.notes.apply({ userId: 'testUserId' }); // object notation is not needed as 'notes' doesn't have any special character
      const notes = res.fetch();

      expect(notes.length).toBe(0);
    });

  });
}
