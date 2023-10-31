import { Box } from '@mui/material';
import React from 'react';

interface HeaderTextProps {
  title: string;
}

const HeaderText = ({ title }: HeaderTextProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="span"
        sx={{
          fontWeight: '700',
          fontSize: '24px',
          textAlign: 'center',
          marginX: 'auto',
          marginY: '30px',
          width: '100%',
        }}
      >
        {title}
      </Box>
    </Box>
  );
};

export default HeaderText;
