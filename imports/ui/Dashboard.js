import React from 'react';

// import { Links } from '../api/links';
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
//-----------------------Components------------------------------
// Containerized component
// Passing a single props which is title -> line 13
//-------------------------------------------------------------------
const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
    <div className="page-content">
      <NoteList />
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
