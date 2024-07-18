import React, { useCallback, useEffect, useState } from 'react';

import Container from '@mui/material/Container';

import Header from './Header';
import Content from './Content';

import { fetchLikedFormSubmissions } from './service/mockServer';

function App() {
  const [init, setInit] = useState(false);
  const [refetchToggler, setRefetchToggler] = useState(false);
  const [likedSubmissions, setLikedSubmissions] = useState([]);
  const [addingNewSubmission, setAddingNewSubmission] = useState(false);

  const fetchList = useCallback(async () => {
    try {
      const response = await fetchLikedFormSubmissions();

      setLikedSubmissions(response.formSubmissions);
      setInit(true);
    } catch(e) {
      console.error('Error fetching list', e);
      setRefetchToggler(curr => !curr);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [refetchToggler, fetchList]);

  return (
    <>
      <Header
        addingNewSubmission={addingNewSubmission}
        setAddingNewSubmission={setAddingNewSubmission}
        setRefetchToggler={setRefetchToggler}
        fetchList={fetchList}
      />
      <Container>
        <Content
          addingNewSubmission={addingNewSubmission}
          init={init}
          likedSubmissions={likedSubmissions}
        />
      </Container>
    </>
  );
}

export default App;
