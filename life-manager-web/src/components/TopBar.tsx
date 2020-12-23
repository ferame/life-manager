import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

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
    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Link to='/'>Home</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/about'>About</Link>
            {/* <Button color="inherit" onClick={() => router.push('/')}>Home</Button>
            <Button color="inherit" onClick={() => router.push('/contact')}>Contact</Button>
            <Button color="inherit" onClick={() => router.push('/about')}>About</Button> */}
            <Typography variant="h6" className={classes.title}>
                News
            </Typography>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            {/* <Button color="inherit" onClick={() => router.push('/login')}>Login</Button> */}
            {/* <Button color="inherit" onClick={() => router.push('/register')}>Register</Button> */}
            </Toolbar>
        </AppBar>
        </div>
    );
}