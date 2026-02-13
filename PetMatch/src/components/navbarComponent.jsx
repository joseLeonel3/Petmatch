import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";
import "../components/navbar.css"

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAuth } from "../hooks/userAuth";
import { useLogout } from "../hooks/useLogout";

const NavbarComponent = () => {
  const { user, loading } = useAuth();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const buttonStyle = {
    backgroundColor: "#D98C9A",
    "&:hover": {
      backgroundColor: "#c97b89",
    },
  };

  if (loading) return null;

    const handleToggle = () => {
      setAnchorEl(anchorRef.current);
      setOpen((prev) => !prev);
    };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  const handlePerfil = () => {
    setOpen(false);
    navigate("/perfil");
  };

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav id="navbar_container">
      <Link id="home" to="/">
        <img src={Logo} id="logo" alt="Logo" />
      </Link>

    <ul>
      <li>
        <Button component={Link} to="/PetPages" variant="contained" sx={buttonStyle}>
          Adotar
        </Button>
      </li>

      {user && (
        <li>
          <Button component={Link} to="/AdicionarPet" variant="contained" sx={buttonStyle}>
            Por em adoção
          </Button>
        </li>
      )}

      <li>
        {!user ? (
          <Button component={Link} to="/login" variant="contained" sx={buttonStyle}>
            Login
          </Button>
        ) : (
          <>
            <ButtonGroup variant="contained" ref={anchorRef} sx={buttonStyle}>
              <Button
                sx={buttonStyle}
                title={user.displayName || "Conta"}
                onClick={() => navigate("/perfil")}
              >
                <AccountCircleIcon />
              </Button>
              <Button sx={buttonStyle} size="small" onClick={handleToggle}>
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>

            <Popper
              open={open}
              anchorEl={anchorEl}
              transition
              placement="bottom-end"
              disablePortal
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList sx={{ display: "flex", flexDirection: "column" }}>
                        <MenuItem onClick={handlePerfil}>Perfil</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </>
        )}
      </li>
    </ul>

    </nav>
  );
};

export default NavbarComponent;