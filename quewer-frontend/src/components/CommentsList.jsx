import React from "react";
import {
  ListItem,
  FixedSizeList,
  List,
  Grid,
  Paper,
  Card,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import store from "../Redux/store";

const useStyles = makeStyles((theme) => ({
  date: {
    padding: "0px 0px 0px 0px",
    fontSize: "10px",
    color: "#597699",
  },
  name: {
    padding: "0px 2px 0px 0px",
    fontSize: "14px",
    color: "#597699",
  },
  comment: {
    padding: "0px 0px 0px 2px",
    fontSize: "14px",
  },
  paper: {
    padding: theme.spacing(1.5),
  },
  list: {
    maxHeight: '200px',
    overflow: 'auto',
    position: 'relative',
    
  }
}));

function Comment({ comment }) {
  const classes = useStyles();
  return (
    <div>
      <ListItem>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography
                variant="subtitle2"
                className={classes.name}
                display="inline"
              >
                {comment.postedBy.name}:
              </Typography>
              <Typography
                variant="subtitle2"
                className={classes.comment}
                display="inline"
              >
                {comment.comment}
              </Typography>
              <Typography
                variant="subtitle2"
                align="right"
                className={classes.date}
              >
                {Date(comment.date).toLocaleString('hi-IN')}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Divider light={true} />
          </Grid>
        </Grid>
      </ListItem>
    </div>
  );
}

export default function CommentList({ comments , addComment}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
      setOpen(false);
      addComment(text.target.value);
  }

  return (
    <div style={{ backgroundColor: "#E8EBFF" }}>
      <List className={classes.list} height={400} width={300}>
        {comments.map((comment, index) => (
          <Comment comment={comment} index={index} />
        ))}
      </List>
      <Button color="primary" onClick={handleClickOpen}>
        Add comment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add comment</DialogTitle>
        <DialogContent style={{width: '500px'}}>
          <TextField
            autoFocus
            onChange={setText}
            margin="dense"
            id="comment"
            label="Comment"
            type="text"
            fullWidth
            autoComplete='off'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Comment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



// import React from "react";
// import { ListItem, List, Grid, Paper, Card, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import Divider from '@material-ui/core/Divider';
// import Button from '@material-ui/core/Button';


// const useStyles = makeStyles((theme) => ({
//     date: {
//         padding: '0px 0px 0px 0px',
//         fontSize: '10px',
//         color: '#597699'
//     },
//     name: {
//         padding: '0px 2px 0px 0px',
//         fontSize: '14px',
//         color: '#597699'
//     },
//     comment: {
//         padding: '0px 0px 0px 2px',
//         fontSize: '14px'
//     },
//     paper: {
//         padding: theme.spacing(1.5),
//     }
//     // .q-user {
//     //     float: left;
//     //     font-size: 10px; 
//     //     margin: 10px 0px 10px 10px;
//     // }

//     // .q-time {
//     //     float: right;
//     //     font-size: 10px;
//     //     margin: 10px 10px 10px 0px;
//     // }
// }));

// function Comment({ comment }) {
//     const classes = useStyles();
//     return (
//         <div>
//             <ListItem>
//                 <Grid container spacing={0}>
//                     <Grid item xs={12}>
//                         <Paper className={classes.paper}>
//                             <Typography variant='subtitle2' className={classes.name} display='inline'>{comment.postedBy.name}:</Typography>
//                             <Typography variant='subtitle2' className={classes.comment} display='inline'>{comment.comment}</Typography>
//                             <Typography variant='subtitle2' align='right' className={classes.date}>{comment.date}</Typography>
//                         </Paper>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Divider light={true} />
//                     </Grid>
//                 </Grid>
//             </ListItem>
//         </div>
//     )
// }

// export default function CommentList({ comments }) {
//     const classes = useStyles();

//     const addComment = () => {
//         // axios.post(`{process.env.REACT_APP_SERVER_URL}`).then((res) => {
//         //     if (res.status === 204){
//         //         window.location.href = process.env.REACT_APP_CLIENT_URL;
//         //     }
//         // })
//     }

//     return (
//         <div style={{ backgroundColor: '#f2f7ff' }}>
//             <List height={400} width={300} itemSize={46} itemCount={comments.length}>
//                 {comments.map((comment, index) => <Comment comment={comment} index={index} />)}
//             </List>
//             <Button color="primary" onClick={addComment}>Add comment</Button>
//         </div>
//     );
// }