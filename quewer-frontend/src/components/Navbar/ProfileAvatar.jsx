import React from "react";
import { Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    button: {
        '& > *': {
          padding: '0 20px',
        },
    },
}));

export default function ProfileAvatar({ profileImg }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        axios.post(`http://localhost:5000/api/auth/logout`).then((res) => {
            if (res.status === 204){
                window.location.href = process.env.REACT_APP_CLIENT_URL;
            }
        })
    }

    const open = Boolean(anchorEl);
    const id = open ? 'profile-image-popover' : undefined;

    return (
        <div>
            <img src={profileImg} alt="Avatar" className="avatar" onClick={handleClick}>
            </img>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Button className={classes.button} color="secondary" onClick={onLogout}>Logout</Button>
            </Popover>
        </div>
    );
}