import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { selectUser } from 'redux/reducers/userSlice';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function TopBar() {
    const classes = useStyles();
    const history = useHistory();
    const user = useSelector(selectUser);
    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
              {/* TODO - implement resizable menu */}
              {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
              </IconButton> */}
              <Button color="inherit" onClick={() => history.push('/')}>Home</Button>
              <Button color="inherit" onClick={() => history.push('/contact')}>Contact</Button>
              <Button color="inherit" onClick={() => history.push('/about')}>About</Button>
              <Typography variant="h6" className={classes.title}>
                  News
              </Typography>
              {user.isAuthenticated ? null : <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>}
              {user.isAuthenticated ? null : <Button color="inherit" onClick={() => history.push('/register')}>Register</Button>}
              {user.isAuthenticated ? <Typography>{user.username.toUpperCase()}</Typography> : null}
              <UserMenu />
            </Toolbar>
        </AppBar>
        </div>
    );
}