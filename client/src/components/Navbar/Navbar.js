import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InvertColorIcon from "@material-ui/icons/InvertColors";
import MoreIcon from "@material-ui/icons/MoreVert";
import { withThemeConsumer } from "../../theme";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return state && state.api
    ? {
        user: state.auth.user
      }
    : "";
};

const _handleLogout = props => {
  const { dispatch } = props;
  AuthService.logout()
    .then(() => {
      dispatch({ type: "LOGOUT" });
    })
    .catch(e => {
      console.error(e);
    });
};

const useStyles = makeStyles(theme => ({
  position: "fixed",
  top: 0,
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  links: { 
    textDecoration: "none",
    color: "white",
    "&:visited": {
      color: "white",
      textDecoration: "none"
    }
  }
}));

function Navbar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = props => (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {props.user && (
        <React.Fragment>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/profile" style={{color:props.theme.palette.primary.link, textDecoration:"none","&:visited" :{color:props.theme.palette.primary.link}}}>Profile</Link>
          </MenuItem>
          <MenuItem
            onClick={() => {
              _handleLogout(props);
              handleMenuClose();
            }}
          >
            Logout
          </MenuItem>
        </React.Fragment>
      )}
      {!props.user && (
        <React.Fragment>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/login"  style={{color:props.theme.palette.primary.link, textDecoration:"none","&:visited" :{color:props.theme.palette.primary.link}}}>Login</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/signup"  style={{color:props.theme.palette.primary.link, textDecoration:"none","&:visited" :{color:props.theme.palette.primary.link}}}>Register</Link>
          </MenuItem>
        </React.Fragment>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      backgroudColor={props.theme.primary}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Account</p>
      </MenuItem>
      <MenuItem onClick={() => props.changeTheme()}>
        <IconButton color="inherit">
          <InvertColorIcon />
        </IconButton>
        {props.theme.palette.type === "light" && <p>Dark Mode</p>}
        {props.theme.palette.type === "dark" && <p>Light Mode</p>}
      </MenuItem>
      {props.user && (
        <React.Fragment>
          <MenuItem>
            <Button color="inherit" onClick={handleMobileMenuClose}>
              <Link to="/"  style={{color:props.theme.palette.primary.link, textDecoration:"none","&:visited" :{color:props.theme.palette.primary.link}}}>Matches</Link>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button color="inherit" onClick={handleMobileMenuClose}>
              <Link to="/users"  style={{color:props.theme.palette.primary.link, textDecoration:"none","&:visited" :{color:props.theme.palette.primary.link}}}>Users</Link>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button color="inherit" onClick={handleMobileMenuClose}>
              <Link to="/ranking"  style={{color:props.theme.palette.primary.link, textDecoration:"none","&:visited" :{color:props.theme.palette.primary.link}}}>Ranking</Link>
            </Button>
          </MenuItem>
        </React.Fragment>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h6" noWrap>
            Next ball
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {props.user && (
              <React.Fragment>
                <Button color="inherit">
                  <Link to="/"  style={{color:props.theme.palette.primary.contrastText, textDecoration:"none","&:visited" :{color:props.theme.palette.primary.contrastText}}}>
                    Matches
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link to="/users"  style={{color:props.theme.palette.primary.contrastText, textDecoration:"none","&:visited" :{color:props.theme.palette.primary.contrastText}}}>
                    Users
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link to="/ranking"  style={{color:props.theme.palette.primary.contrastText, textDecoration:"none","&:visited" :{color:props.theme.palette.primary.contrastText}}}>
                    Ranking
                  </Link>
                </Button>
              </React.Fragment>
            )}

            <IconButton
              aria-label="Toggle light/dark theme"
              title="Toggle light/dark theme"
              color="inherit"
              onClick={() => props.changeTheme()}
            >
              <InvertColorIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu(props)}
    </div>
  );
}

export default withThemeConsumer(connect(mapStateToProps)(Navbar));
