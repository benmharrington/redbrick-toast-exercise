import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';

import { createMockFormSubmission, onMessage } from './service/mockServer';
import { Stack } from '@mui/material';

const defaultSnackbarContent = {
  id: null,
  data: {
    email: '',
    firstName: '',
    lastName: '',
    liked: false,
  },
};

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState(defaultSnackbarContent);

  const createSnackbarContent = submissionData => {
    setSnackbarContent({ ...submissionData });
  }

  const handleNewSubmission = () => {
    createMockFormSubmission();
    setOpen(true);
  }

  const handleLike = () => {
    console.log('save content');
  }

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;

    setOpen(false);
  }

  const snackbarActions = (
    <React.Fragment>
      <Button color="primary" size="small" onClick={handleLike}>
        Like
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    onMessage(createSnackbarContent);
  }, []);

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{marginRight: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{flexGrow: 1}}>
            Toast Exercise
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={handleNewSubmission}
          >
            New Submission
          </Button>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={open}
        onClose={handleClose}
        message={(
          <Stack sx={{mr: 4}}>
            <Typography>{snackbarContent?.data?.firstName} {snackbarContent?.data?.lastName}</Typography>
            <Typography>{snackbarContent?.data?.email}</Typography>
          </Stack>
        )}
        action={snackbarActions}
        TransitionComponent={SlideTransition}
      />
    </Box>
  );
}
