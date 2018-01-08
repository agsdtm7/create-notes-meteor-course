// CHECK ON NOTES/fromUI/LinkBeforeLecture79.
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from  'meteor/react-meteor-data';

// this pattern is very common
//-----------------------Components------------------------------
// - line 13 -> function & data are passed in as props
// - no global dependencies
//-------------------------------------------------------------------
export const PrivateHeader = (props) => {
  return(
      <div className="header">
        <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
          <button className="button button--link-text" onClick= {() => props.handleLogout()}>Logout</button>
        </div>
      </div>
  );
};
// PrivateHeader requires 2 props: title and handleLogout
PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleLogout: React.PropTypes.func.isRequired
};
//-------------------------------------------------------------------
// props handleLogout comes from here. Thus, PrivateHeader only needs title props
// when we call it
export default createContainer(() => {
  return {
    handleLogout:  () =>  Accounts.logout()
  };
}, PrivateHeader);
//-------------------------------------------------------------------

// export default class PrivateHeader extends React.Component{
//   onLogout(e){
//     Accounts.logout();
//   }
//   render(){
//     return(
//         <div>
//           <h1>{this.props.title}</h1>
//             <button onClick={this.onLogout.bind(this)}>Logout</button>
//         </div>
//     );
//   }
// }



//export default PrivateHeader;
