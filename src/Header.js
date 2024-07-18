import React, { useEffect, useReducer, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/Close';

import { createMockFormSubmission, onMessage, saveLikedFormSubmission } from './service/mockServer';

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
  return <Slide {...props} />;
}

const snackbarReducer = (state, { type, key }) => {
  switch (type) {
    case 'open':
      return { ...state, [key]: true };
    case 'close':
      return { ...state, [key]: false };
    default:
      return state;
  }
}

export default function Header({ addingNewSubmission, setAddingNewSubmission, fetchList }) {
  const [openSnackbar, snackbarDispatch] = useReducer(snackbarReducer, {
    form: false,
    error: false,
  });
  const [newFormData, setNewFormData] = useState(defaultSnackbarContent);

  const createSnackbarContent = submissionData => {
    setNewFormData({ ...submissionData });
  }

  const handleNewSubmission = () => {
    createMockFormSubmission();
    snackbarDispatch({ type: 'open', key: 'form' });
  }

  const handleLike = async () => {
    setAddingNewSubmission(true);

    try {
      await saveLikedFormSubmission(newFormData);
      await fetchList();
      snackbarDispatch({ type: 'close', key: 'form' });
    } catch (e) {
      console.error('Error saving form submission', e);
      snackbarDispatch({ type: 'open', key: 'error' });
    } finally {
      setAddingNewSubmission(false);
    }
  }

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;

    snackbarDispatch({ type: 'close', key: 'form' });
  }

  const snackbarActions = (
    <React.Fragment>
      <Button color='primary' size='small' onClick={handleLike} disabled={addingNewSubmission}>
        Like
      </Button>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    onMessage(createSnackbarContent);
  }, []);

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{marginRight: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' sx={{flexGrow: 1}}>
            Toast Exercise
          </Typography>
          <Button
            variant='contained'
            size='small'
            color='secondary'
            onClick={handleNewSubmission}
          >
            New Submission
          </Button>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={openSnackbar.form}
        onClose={handleClose}
        message={(
          <Stack sx={{mr: 4}}>
            <Typography>{newFormData?.data?.firstName} {newFormData?.data?.lastName}</Typography>
            <Typography>{newFormData?.data?.email}</Typography>
          </Stack>
        )}
        action={snackbarActions}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={SlideTransition}
        TransitionProps={{ direction: 'up' }}
      />
      <Snackbar
        open={openSnackbar.error}
        onClose={() => snackbarDispatch({ type: 'close', key: 'error' })}
        message='Error saving form submission. Please retry.'
        autoHideDuration={5000}
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={() => snackbarDispatch({ type: 'close', key: 'error' })}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={SlideTransition}
        TransitionProps={{ direction: 'down' }}
        ContentProps={{
          sx: { background: 'darkred' },
        }}
      />
    </Box>
  );
}
