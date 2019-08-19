import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import debounce from 'lodash.debounce';
import { detect } from 'detect-browser';
import { AuthContext } from './context/Auth';
import LogOut from './LogOut';
import {
  StyledMenuBar,
  Logo,
  Spacer,
  Menu,
  UserButton,
  DropMenu,
  Triangle,
  MenuBurger,
} from './styled/StyledMenuBar';
import StyledBurger from './styled/StyledBurger';
import SideBar from './SideBar';

// component renders menubar at top of page, alters styling on page scroll and width change.
const MenuBar = () => {
  // gets currently logged in user.
  const user = useContext(AuthContext) || {};

  // set initial variables, setters and initial state.
  const [scroll, setScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // checks if window has scrolled, debounces to avoid overcalling.
  const checkScroll = debounce(() => {
    if (window.scrollY >= 40) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }, 100);

  // detects browser type for use in styling rules.
  const browser = detect();

  // add event listener on component mount to check for page scroll event, remove on dismount.
  useEffect(() => {
    document.addEventListener('scroll', checkScroll);

    return () => {
      document.removeEventListener('scroll', checkScroll);
    };
  }, [checkScroll, scroll]);

  return (
    <>
      <StyledMenuBar scroll={scroll}>
        <Logo browser={browser.name}>
          <div>
            <i className="fas fa-road fa-2x" />
          </div>
          <Link href="/events">
            <a>
              <h1>RideOut</h1>
            </a>
          </Link>
        </Logo>
        <Spacer />
        <MenuBurger>
          <SideBar isOpen={isOpen} user={user} />
          <StyledBurger isOpen={isOpen} setIsOpen={setIsOpen} />
        </MenuBurger>
        <Menu>
          <Link href="/events">
            <h3>RideOuts</h3>
          </Link>
          <Link href="/addevent" prefetch>
            <h3>New Event</h3>
          </Link>
          <UserButton>
            <img
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              src={user.photo}
              alt={user ? user.firstName : 'placeholder image'}
            />
            <DropMenu>
              <Triangle />
              <ul>
                <Link href="/useradmin">
                  <li>My Account</li>
                </Link>
                <LogOut />
              </ul>
            </DropMenu>
          </UserButton>
        </Menu>
      </StyledMenuBar>
    </>
  );
};

export default MenuBar;
