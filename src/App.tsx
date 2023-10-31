import { Box } from '@mui/material';
import React from 'react';
import CountriesTable from './components/CountriesTable';
import HeaderText from './components/HeaderText';

function App() {
  return (
    <Box sx={{ padding: '3%' }} className="">
      <HeaderText title="Countries Table Submission - Manuchimso Oliver" />
      <CountriesTable />
    </Box>
  );
}

export default App;
