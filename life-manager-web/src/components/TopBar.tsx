import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { logout } from 'redux/reducers/userSlice';
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
              </IconButton>
              <Button color="inherit" onClick={() => history.push('/')}>Home</Button>
              <Button color="inherit" onClick={() => history.push('/contact')}>Contact</Button>
              <Button color="inherit" onClick={() => history.push('/about')}>About</Button>
              <Typography variant="h6" className={classes.title}>
                  News
              </Typography>
              <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
              <Button color="inherit" onClick={() => dispatch(logout())}>Logout</Button>
              <Button color="inherit" onClick={() => history.push('/register')}>Register</Button>
              <UserMenu />
            </Toolbar>
        </AppBar>
        </div>
    );
}