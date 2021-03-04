import React from 'react';
import { AccountCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import { MenuItem } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/reducers/userSlice';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    }
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
        }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
        }}
        {...props}
    />
));

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
    // const user = useSelector(selectUser);

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
            <StyledMenu
                id={'user-menu'}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                >
                <MenuItem onClick={() => history.push('/about')}>Details</MenuItem>
                <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
            </StyledMenu>
        </div>
    );
};