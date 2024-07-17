import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export default function Content({ likedSubmissions, fetchList, init }) {
  useEffect(() => {
    if(!init) fetchList();
  });

  const renderList = () => {
    if(!init) {
      return (
        <Typography variant="h5">Fetching List...</Typography>
      );
    }

    return (
      <List>
        {!!likedSubmissions.length ?
          likedSubmissions.map(submission => (
            <ListItem key={submission?.id}>
              <ListItemText>
                {submission?.data?.firstName} {submission?.data?.lastName} - {submission?.data?.email}
              </ListItemText>
            </ListItem>
          )) : (
            <ListItem>
              <ListItemText>
                No liked submissions
              </ListItemText>
            </ListItem>
          )
        }
      </List>
    );
  }

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      {renderList()}
    </Box>
  );
}
