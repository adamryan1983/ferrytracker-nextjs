import { createContext, useState } from "react";

const LoginContext = createContext([{}, () => {}]);

const LoginWrapper = (props) => {
  const [state, setState] = useState({
    username: "",
    isLogged: false,
  });

  return (
    <LoginContext.Provider
      value={{
        data: state,
        updateDeliveryStatus: () => {
          setState({ ...state });
        },
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginWrapper };
