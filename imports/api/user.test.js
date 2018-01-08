import { Meteor } from 'meteor/meteor';
import expect from 'expect'; // from expectJS meteor npm install expect@1.20.2
// https://github.com/mjackson/expect

import { validateNewUser } from './users';

if(Meteor.isServer){
  describe('users', function(){


    it('should allow valid email address', function(){
      const testUser = {
        emails: [
          {
            address: 'Test@example.com'
          }
        ]
      };
      const rest = validateNewUser(testUser);

      expect(rest).toBe(true);
    });

    it('should reject invalid email', function(){
      // create testUser -> but use invalid email
      const testUser = {
        emails: [
          {
            address: 'fake'
          }
        ]
      }
      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    });
  });
}


//  const add = (a, b) => {
//   if (typeof b !== 'number'){
//     return a + a;
//   }
//   return a + b;
// };
//
// const square = (a) => a *a
//
// // To group a function we use describe command
// // describe command has two parameters, a string and a function
// describe('add', function(){
//   // it has two parameters first one is a string, next one is a function
//   it('should add two number', function(){
//     const res = add(11, 9);
//
//     expect(res).toBe(20);
//
//     // if (res !== 20){
//     //   throw new Error('Sum was not equal to expected value');
//     // }
//   });
//
//   it('should double a single number', function(){
//     const res = add(44);
//
//     expect(res).toBe(88);
//     // if(res !== 88){
//     //   throw new Error('number was not double');
//     // }
//   })
// })
//
// describe('square', function(){
//   it('should square a number', function(){
//     const res = square(11);
//
//     expect(res).toBe(121);
//     if(res !== 121){
//       throw new Error('did not square number');
//     }
//   });
// });


// it should square a number
  // call square with some value (save the result)
  // check that the value is correct

// it('should fail', function(){
//   throw new Error('It failed because I said so');
// });
