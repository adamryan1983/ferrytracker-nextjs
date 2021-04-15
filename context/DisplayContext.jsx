import { createContext, useState } from "react";

const DisplayContext = createContext([{}, () => {}]);

const DisplayWrapper = (props) => {
  return (
    <DisplayContext.Provider
      value={[
        menuVisible,
        setMenuVisible,
        loginVisible,
        setLoginVisible,
        lineupVisible,
        setLineupVisible,
        boatVisible,
        setBoatVisible,
      ]}
    >
      {props.children}
    </DisplayContext.Provider>
  );
};

export { DisplayContext, DisplayWrapper };
