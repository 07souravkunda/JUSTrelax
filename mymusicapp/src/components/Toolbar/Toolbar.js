import React from "react";
import Styles from "./Toolbar.module.css";
import NavigationItems from "./NavigationItems/NavigationItems";
import NavigationItem from "./NavigationItems/NavigationItem/NavigationItem";
import MenuButton from "../UI/MenuButton/MenuButton";
import { useSelector } from "react-redux";

const Toolbar = (props) => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  let el;
  if (isSignedIn) {
    el = (
      <NavigationItem link="/logout" exact>
        LOGOUT
      </NavigationItem>
    );
  } else {
    el = (
      <NavigationItem link="/authentication" exact>
        SIGN IN
      </NavigationItem>
    );
  }
  return (
    <header className={Styles.Toolbar}>
      <MenuButton show={props.show} clicked={props.clicked} />
      <nav className={Styles.DesktopOnly}>
        <NavigationItems showNav={props.show} />
      </nav>
      <nav style={{ padding: "0px" }}>{el}</nav>
    </header>
  );
};

export default Toolbar;
