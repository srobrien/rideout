import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
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

const MenuBar = () => {
  const user = useContext(AuthContext) || {};
  const [scroll, setScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const checkScroll = () => {
    if (window.scrollY > 40) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', checkScroll);

    return () => {
      document.removeEventListener('scroll', checkScroll);
    };
  }, [scroll]);

  return (
    <>
      <StyledMenuBar scroll={scroll}>
        <Logo>
          <Link href="/">
            <a>
              <i className="fas fa-road fa-2x" />
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
          <Link href="/">
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
