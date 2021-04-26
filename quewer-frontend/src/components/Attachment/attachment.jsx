import { Card, CardActionArea, CardMedia, CardContent, CardActions, IconButton, Typography, ButtonGroup } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/GetAppRounded';
import { makeStyles } from '@material-ui/core/styles';
import filesize from 'filesize';
import Thumbnail from './Thumbnail';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
  media: {
    height: 80,
  },
});

export default function Attachment({ file }) {
  const classes = useStyles();
  console.log("File path : ", file);
  var reader = new FileReader();
  var url = reader.readAsDataURL(file);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          src={Thumbnail(file)}
          component="img"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {file.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography>
          {filesize(file.size, )}
        </Typography>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="download">
          <DownloadIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}