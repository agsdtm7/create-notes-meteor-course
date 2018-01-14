import React from 'react';

// import { Links } from '../api/links';
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import  Editor  from './Editor';
//-----------------------Components------------------------------
// Containerized component
// Passing a single props which is title -> line 13
//-------------------------------------------------------------------
const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Notes" />
    <div className="page-content">
      <div className="page-content__sidebar"><NoteList /></div>
      <div className="page-content__main"><Editor /></div>

    </div>
  </div>
  );
};
// If a component doesn't have any name (anonymous),
// react developer tool will recognize it as 'unknown' component
//https://stackoverflow.com/questions/43458971/react-dev-tools-show-my-component-as-unknown#
export default Dashboard;

// set max width equal to our config value
// set margin to auto on sides to center
// padding equal to our space value

// export default class Link extends React.Component{
//   render(){
//     return(
//       <div>
//         <PrivateHeader title="Your Links"/>
//         <LinksList/>
//         <AddLink/>
//       </div>
//     );
//   }
// }
