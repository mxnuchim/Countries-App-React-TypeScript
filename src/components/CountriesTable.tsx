import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Column, ColumnToCountryMap, Country } from '../types';
import countriesData from '../data/countryData.json';
import { Box, Button } from '@mui/material';
import { BsSortAlphaDown, BsSortAlphaDownAlt } from 'react-icons/bs';

const columns: readonly Column[] = [
  { id: 'code', label: 'Country Code', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'nameUn',
    label: 'Name (UN)',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'continent',
    label: 'Continent Code',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'hasStates',
    label: 'Has States',
    minWidth: 170,
    align: 'right',
  },
];

function createData(
  id: string,
  code: string,
  name: string,
  nameUn: string,
  continent: string,
  hasStates: boolean
): Country {
  return { id, code, name, nameUn, continent, hasStates };
}

const rows = countriesData.countries.map((country) => {
  return createData(
    country.id,
    country.code,
    country.name,
    country.nameUn,
    country.continent,
    country.hasStates
  );
});

export default function CountriesTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [continentFilter, setContinentFilter] = React.useState('');
  const [hasStatesFilter, setHasStatesFilter] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('ASC'); // Initialize with 'ASC'

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
  };

  const filteredRows = rows.filter((row) => {
    return (
      (continentFilter === '' || row.continent === continentFilter) &&
      (hasStatesFilter === '' || row.hasStates.toString() === hasStatesFilter)
    );
  });

  const sortedRows = [...filteredRows]; // Create a copy of the filtered rows
  if (sortOrder === 'ASC') {
    sortedRows.sort((a, b) => a.nameUn.localeCompare(b.nameUn));
  } else {
    sortedRows.sort((a, b) => b.nameUn.localeCompare(a.nameUn));
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '2%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '30px',
          marginY: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
            alignItems: 'center',
          }}
        >
          <Box component="span" sx={{ fontSize: 16, fontWeight: '700' }}>
            Filter by Continent
          </Box>
          <Select
            label="Filter by Continent Code"
            value={continentFilter}
            onChange={(e) => setContinentFilter(e.target.value)}
          >
            <MenuItem value="">All Continents</MenuItem>
            <MenuItem value="AF">Africa</MenuItem>
            <MenuItem value="AS">Asia</MenuItem>
            <MenuItem value="EU">Europe</MenuItem>
            <MenuItem value="NA">North America</MenuItem>
            <MenuItem value="OC">Oceania</MenuItem>
            <MenuItem value="SA">South America</MenuItem>
          </Select>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
            alignItems: 'center',
          }}
        >
          <Box component="span" sx={{ fontSize: 16, fontWeight: '700' }}>
            Filter by States
          </Box>
          <Select
            label="Filter by Has States"
            value={hasStatesFilter}
            onChange={(e) => setHasStatesFilter(e.target.value)}
          >
            <MenuItem value="">All States</MenuItem>
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.id === 'nameUn' ? (
                    <Box
                      component="span"
                      onClick={() => handleSort()}
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      {column.label}

                      <Button variant="contained">
                        {sortOrder === 'ASC' ? (
                          <BsSortAlphaDown />
                        ) : (
                          <BsSortAlphaDownAlt />
                        )}
                      </Button>
                    </Box>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id as keyof ColumnToCountryMap];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {typeof value === 'boolean'
                            ? `${value}`.toLocaleUpperCase()
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={sortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
