import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone'
import { Button, Dialog, Grid } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Attachment from './attachment'
import { saveAs } from 'file-saver';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function Dropzone({ onChange, initialFiles }) {
    const [files, setNewFiles] = React.useState([...initialFiles]);
    const [count, setFileCount] = React.useState(0);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        getFilesFromEvent: event => myCustomFileGetter(event),
        accept: ['image/*', 'application/pdf', 'application/zip'],
    });

    async function myCustomFileGetter(event) {
        const newFiles = files;
        const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;

        for (var i = 0; i < fileList.length; i++) {
            const file = fileList.item(i);

            Object.defineProperty(file, 'myProp', {
                value: true
            });

            newFiles.push(file);
        }

        onChange(newFiles);
        setNewFiles(newFiles);
        return newFiles;
    }

    const style = useMemo(() => ({
        ...baseStyle,
    }));

    const onDelete = (file) => {
        files.splice(files.indexOf(file), 1);
        setNewFiles(files);
        setFileCount(files.length);
        onChange(files);
    }

    const onDownload = (file) => {
        saveAs(file);
    }

    const showFiles = files.map(file => (
        <Grid item>
            <Attachment file={file} canDelete={true} onDelete={onDelete} onDownload={onDownload}/>
        </Grid>
    ));

    return (
        <div className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                <h4>Files</h4>
                <Grid container spacing={2}>
                    {showFiles}
                </Grid>
            </aside>
        </div>
    );
}

export default function AttachFilesButton({ onUpload, initialFiles}) {

    const [open, setOpen] = React.useState(false);
    let files = [...initialFiles];

    const onChange = (newFiles) => {
        files = newFiles;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = () => {
        onUpload(files);
        handleClose();
    }

    return (
        <span style={{ float: 'right' }}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>Attach files</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                fullWidth={true}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Attachments"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Dropzone onChange={onChange} initialFiles={files}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        cancel
            </Button>
                    <Button onClick={onSubmit} color="primary">
                        upload
            </Button>
                </DialogActions>
            </Dialog>
        </span>
    )
}