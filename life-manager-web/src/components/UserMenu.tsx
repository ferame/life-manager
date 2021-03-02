import React from 'react';
import { AccountCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { MenuItem } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/reducers/userSlice';
import { useHistory } from 'react-router-dom';

export default function UserMenu(){
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <div>
            <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={'user-menu-button'}
                aria-haspopup='true'
                onClick={handleClick}
                color='inherit'
                >
                <AccountCircle />
            </IconButton>
            <Menu
                id={'user-menu'}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={() => history.push('/about')}>Details</MenuItem>
                <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
            </Menu>
        </div>
    );
};