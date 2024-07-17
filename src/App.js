import React, { useState } from 'react';
import Container from '@mui/material/Container';

import Header from './Header';
import Content from './Content';

import { fetchLikedFormSubmissions } from './service/mockServer';

function App() {
  const [init, setInit] = useState(false);
  const [likedSubmissions, setLikedSubmissions] = useState([]);

  const fetchList = async () => {
    try {
      const response = await fetchLikedFormSubmissions();

      setLikedSubmissions(response.formSubmissions);
      setInit(true);
    } catch(e) {
      console.error('Error fetching list', e);
    }
  }

  return (
    <>
      <Header fetchList={fetchList}/>
      <Container>
        <Content
          init={init}
          likedSubmissions={likedSubmissions}
          fetchList={fetchList}
        />
      </Container>
    </>
  );
}

export default App;
