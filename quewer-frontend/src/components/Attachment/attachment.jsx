import { Card, CardActionArea, CardMedia, CardContent, CardActions, IconButton, Typography, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/GetAppRounded';
import { makeStyles } from '@material-ui/core/styles';
import filesize from 'filesize';
import Thumbnail from './Thumbnail';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    backgroundColor: '#FFFFFF',
  },
  Typography: {
    color: '#76787A',
  },
  cardActions: {
    height: 20
  },
  media: {
    height: 80,
  },
});

export default function Attachment({ file, canDelete, onDelete, name, id, onDownload }) {
  const classes = useStyles();

  const deleteFile = () => {
    onDelete(file);
  }

  const downloadFile = (event) => {
    event.preventDefault();
    onDownload(id);
  }

  return (
    <Card className={classes.root}>
      {(typeof file !== 'undefined') ?
        <Tooltip title={file.name} placement="bottom">
          <CardActionArea>
            <CardMedia
              className={classes.media}
              src={Thumbnail(file)}
              component="img"
            />
            <CardContent>
              <Typography className={classes.Typography} noWrap variant="body2" color="textSecondary" component="p">
                {file.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Tooltip>
        :
        null
      }
      <CardActions className={classes.cardActions} disableSpacing={true}>
        {(typeof file !== 'undefined') ?
          <Typography className={classes.Typography}>
            {filesize(file.size,)}
          </Typography>
          :
          <Tooltip title={name} placement="bottom">
            <Typography className={classes.Typography} noWrap>
              {name}
            </Typography>
          </Tooltip>
        }
        {(canDelete) ?
          <IconButton aria-label="delete" onClick={deleteFile}>
            <DeleteIcon />
          </IconButton>
          :
          null
        }
        <IconButton aria-label="download" onClick={downloadFile}>
          <DownloadIcon fontSize='small' />
        </IconButton>
      </CardActions>
    </Card>
  )
}