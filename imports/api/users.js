import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

export const validateNewUser = (user) => {
  const email = user.emails[0].address;
  // Note that the validation doesn't use try catch after we configure the simple schema error
  //try{
  new SimpleSchema({
    email:{
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ email });
  return true;
}

if(Meteor.isServer){
  Accounts.validateNewUser(validateNewUser);
}
