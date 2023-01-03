import React, { useState } from "react";

const Sidebar = React.createContext({
  button: false,
  mobileMenu: false,
  ButtonClickHandler: () => {},
  closeMobileMenuHandler: () => {},
});
export default Sidebar;

export const SideBarContextProvider = (props) => {
  const [button, setButton] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const closeMobileMenuHandler = () => {
    setMobileMenu(!mobileMenu);
  };

  const ButtonClickHandler = () => {
    setButton(!button);
  };

  return (
    <Sidebar.Provider
      value={{ button, ButtonClickHandler, closeMobileMenuHandler, mobileMenu }}
    >
      {props.children}
    </Sidebar.Provider>
  );
};
