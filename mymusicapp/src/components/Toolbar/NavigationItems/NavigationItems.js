import React from "react";
import Styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import Logo from "../../UI/Logo/Logo";

const navigationItems = props => (
  <div
    className={Styles.NavigationItems}
    style={props.showNav ? { display: "none" } : null}
  >
    <NavigationItem link="justrelax">
      <Logo />
    </NavigationItem>
    <NavigationItem link="/" exact>
      HOME
    </NavigationItem>
    <NavigationItem link="/browse" exact>
      BROWSE
    </NavigationItem>
    <NavigationItem link="/discover" exact>
      DISCOVER
    </NavigationItem>
    <NavigationItem link="/radio" exact>
      RADIO
    </NavigationItem>
    <NavigationItem link="/my-music" exact>
      MY MUSIC
    </NavigationItem>
    <NavigationItem link="/season" exact>
      SHOWS & PODCASTS
    </NavigationItem>
  </div>
);

export default navigationItems;
