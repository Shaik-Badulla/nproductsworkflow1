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
// hooks

// sections
// import { RoleTableToolbar, RoleTableRow } from '../../../../sections/hr/role';
import { useSelector } from 'react-redux';
import RoleAnalytic from 'src/sections/@dashboard/user/role/RoleAnalytic';
import RoleTableToolbar from 'src/sections/@dashboard/user/role/RoleTableToolbar';
import RoleTableRow from 'src/sections/@dashboard/user/role/RoleTableRow';

import { dispatch } from '../../redux/store';
import { deleteRole, getRole } from '../../redux/slices/role';
import { Role, RoleState } from '../../@types/role';
// components
import Page from '../../components/Page';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../components/table';
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';

const TABLE_HEAD = [{ id: 'name', label: 'Name', align: 'left' }, { id: '' }];

// ----------------------------------------------------------------------

export default function RoleList() {
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

  const { roles } = useSelector((state: { role: RoleState }) => state.role);
  useEffect(() => {
    dispatch(getRole());
  }, []);

  const [filterName, setFilterName] = useState('');

  const handleFilterName = () => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id: string) => {
    dispatch(deleteRole(id));
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.user.roleedit(id));
  };

  const dataFiltered = applySortFilter({
    roles,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleOnChange = (e: any) => {
    const file = e.target.files[0];
    // dispatch(postUploadFile(file));
  };

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title=" Role: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading=" Role"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.user.root },
            { name: ' Role' },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.user.rolenew}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Role
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
              <RoleAnalytic
                title="Total"
                total={roles.length}
                title2=" Role"
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
            </Stack>
          </Scrollbar>
        </Card>
        <Card>
          <RoleTableToolbar filterName={filterName} onFilterName={handleFilterName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={roles.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <RoleTableRow
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
                    emptyRows={emptyRows(page, rowsPerPage, roles.length)}
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
  roles,
  comparator,
  filterName,
}: {
  roles: Role[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = roles.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  roles = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    roles = roles.filter(
      (item: Record<string, any>) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return roles;
}
