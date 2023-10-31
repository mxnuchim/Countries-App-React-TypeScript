import { Box } from '@mui/material';
import React from 'react';
import CountriesTable from './components/CountriesTable';

function App() {
  return (
    <Box sx={{ padding: '5%' }} className="">
      <CountriesTable />
    </Box>
  );
}

export default App;
