import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Table,
  Button,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  Stack,
  Divider,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { HRProject, HRProjectState } from 'src/@types/hrproject';
import HRProjectAnalytic from 'src/sections/hr/project/HRProjectAnalytic';
import HRProjectTableToolbar from 'src/sections/hr/project/HRProjectTableToolbar';
import HRProjectTableRow from 'src/sections/hr/project/HRProjectTableRow';
import { useSettingsContext } from 'src/components/settings';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';

// components
import Page from '../../../components/Page';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { TableNoData, TableEmptyRows, TableHeadCustom } from '../../../components/table';
// sections
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

import { dispatch } from '../../../redux/store';
import { deleteHRProject, getHRProject } from '../../../redux/slices/hrproject';


const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },

  { id: '' },
];

// ----------------------------------------------------------------------

export default function HRProjectList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    onSelectRow,
    //
    onSort,

    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const { hrProjects } = useSelector((state: { hrproject: HRProjectState }) => state.hrproject);
  useEffect(() => {
    dispatch(getHRProject());
  }, []);

  const [filterName, setFilterName] = useState('');

  const handleFilterName = (name: string) => {
    setFilterName(name);
    setPage(0);
  };

  const handleDeleteRow = (id: string) => {
    dispatch(deleteHRProject(id));
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.hr.projectedit(id));
  };

  const dataFiltered = applySortFilter({
    hrProjects,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleOnChange = (e: any) => {
    const file = e.target.files[0];
  };

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title="HR Project: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="HR Project"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.hr.root },
            { name: 'HR Project' },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.hr.projectnew}
              startIcon={<Iconify icon= 'eva:plus-fill' />}
            >
              New HR Project
            </Button>
          }
          action2={
            <Button variant="contained" component="label">
              Import
              <input
                hidden
                type= 'file'
                id= 'csvFileInput'
                accept= '.csv'
                onChange={handleOnChange}
              />
            </Button>
          }
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <HRProjectAnalytic
                title="Total"
                total={hrProjects.length}
                title2="HR Project"
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
            </Stack>
          </Scrollbar>
        </Card>
        <Card>
          <HRProjectTableToolbar filterName={filterName} onFilterName={handleFilterName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={hrProjects.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <HRProjectTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, hrProjects.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  hrProjects,
  comparator,
  filterName,
}: {
  hrProjects: HRProject[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = hrProjects.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  hrProjects = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    hrProjects = hrProjects.filter(
      (item: Record<string, any>) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return hrProjects;
}
