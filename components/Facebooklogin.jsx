import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

const Facebooklogin = (props) => {
  const [name, setName] = useState('');

  let fbContent;

  const componentClicked = () => {
    console.log('clicked');
  };

  const responseFacebook = (response) => {
    props.setLogged(true);
    props.setUser(response.name);
    setName(response.name);
    props.setIsVisibleMenu(true);
    props.setLoginOption(false);
    console.log(response.name);
  };

  props.logged
    ? (fbContent = <div>Hi, {name}</div>)
    : (fbContent = (
        <FacebookLogin
          appId='165721872006849'
          autoLoad={true}
          fields='name,email'
          onClick={componentClicked}
          callback={responseFacebook}
        />
      ));
  return <div>{fbContent}</div>;
};

export default Facebooklogin;
