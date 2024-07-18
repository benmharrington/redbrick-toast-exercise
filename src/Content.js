import React from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export default function Content({ addingNewSubmission, init, likedSubmissions }) {
  const renderList = () => {
    if(!init) {
      return (
        <Stack direction='row' alignItems='center' spacing={2} py={4} px={2}>
          <CircularProgress sx={{mr: 2}}/>
          <Typography variant='h6'>Fetching List...</Typography>
        </Stack>
      );
    }

    return (
      <List>
        {!likedSubmissions.length && !addingNewSubmission ? (
          <ListItem>
            <ListItemText>
              No liked submissions
            </ListItemText>
          </ListItem>
          ) : (
          likedSubmissions.map(submission => (
            <ListItem key={submission?.id}>
              <ListItemText>
                {submission?.data?.firstName} {submission?.data?.lastName} - {submission?.data?.email}
              </ListItemText>
            </ListItem>
          )))
        }
        {addingNewSubmission && (
          <ListItem sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <CircularProgress sx={{mr: 2}}/>
            <ListItemText>
              Adding new submission...
            </ListItemText>
          </ListItem>
        )
        }
      </List>
    );
  }

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant='h4'>Liked Form Submissions</Typography>
      {renderList()}
    </Box>
  );
}
