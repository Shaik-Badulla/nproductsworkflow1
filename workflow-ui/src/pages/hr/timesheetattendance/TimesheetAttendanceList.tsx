import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

// @mui
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useSettingsContext } from 'src/components/settings';

// sections
import HRTimesheetAttendanceAnalytic from 'src/sections/hr/timesheetattendance/HRTimesheetAttendanceAnalytic';
import HRTimesheetAttendanceTableRow from 'src/sections/hr/timesheetattendance/HRTimesheetAttendanceTableRow';
import HRTimesheetAttendanceTableToolbar from 'src/sections/hr/timesheetattendance/HRTimesheetAttendanceTableToolbar';

import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { HRProjectState } from 'src/@types/hrproject';
import { HRSubtaskState } from 'src/@types/hrsubtask';
import { HRTaskState } from 'src/@types/hrtask';
import { getHRProject } from 'src/redux/slices/hrproject';
import { getHRSubtask } from 'src/redux/slices/hrsubtask';
import { getHRTask } from 'src/redux/slices/hrtask';
import * as Yup from 'yup';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// hooks
import useTable, { emptyRows, getComparator } from '../../../hooks/useTable';

// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/iconify';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData } from '../../../components/table';
import {
  HRTimesheetAttendance,
  HRTimesheetAttendanceRequest,
  HRTimesheetAttendanceState,
} from '../../../@types/hrtimesheetattendance';
import {
  addHRTimesheetAttendance,
  deleteHRTimesheetAttendance,
  getHRTimesheetAttendance,
} from '../../../redux/slices/hrtimesheetattendance';
import { dispatch } from '../../../redux/store';

const TABLE_HEAD = [
  { id: 'user', label: 'User', align: 'left' },
  { id: 'project', label: 'Project', align: 'left' },
  { id: 'task', label: 'Task', align: 'left' },
  { id: 'subtask', label: 'Sub-Task', align: 'left' },
  { id: 'c0', label: 'Mon', align: 'left' },
  { id: 'c1', label: 'Tue', align: 'left' },
  { id: 'c2', label: 'Wed', align: 'left' },
  { id: 'c3', label: 'Thu', align: 'left' },
  { id: 'c4', label: 'Fri', align: 'left' },
  { id: 'c5', label: 'Sat', align: 'left' },
  { id: 'c6', label: 'Sun', align: 'left' },
  { id: 'total', label: 'Total', align: 'left' },
  { id: 'remarks', label: 'Remarks', align: 'left' },
  // { id: 'weekStartDate', label: 'Week Start Date', align: 'left' },
  { label: 'Actions', align: 'right' },

  { id: '' },
];

// ----------------------------------------------------------------------

interface FormValuesProps extends Partial<HRTimesheetAttendance> {
  // softwareids: string[];
}

type Props = {
  currentHRTimesheetAttendance?: HRTimesheetAttendance;
};

export default function HRTimesheetAttendanceList({ currentHRTimesheetAttendance }: Props) {
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

  const [showForm, setShowForm] = useState(false);

  const { hrProjects } = useSelector((state: { hrproject: HRProjectState }) => state.hrproject);
  const { hrTasks } = useSelector((state: { hrtask: HRTaskState }) => state.hrtask);
  const { hrSubtasks } = useSelector((state: { hrsubtask: HRSubtaskState }) => state.hrsubtask);
  const { hrTimesheetAttendances } = useSelector(
    (state: { hrtimesheetattendance: HRTimesheetAttendanceState }) => state.hrtimesheetattendance
  );

  const { enqueueSnackbar } = useSnackbar();

  const [dropdownproject, setDropdownProject] = useState(
    currentHRTimesheetAttendance?.project.id || ''
  );
  const [dropdowntask, setDropdownTask] = useState(currentHRTimesheetAttendance?.task.id || '');
  const [dropdownsubtask, setDropdownSubtask] = useState(
    currentHRTimesheetAttendance?.subtask.id || ''
  );

  const { weekStartDate = '' } = useParams();

  useEffect(() => {
    dispatch(getHRTimesheetAttendance(weekStartDate));
    dispatch(getHRProject());
    dispatch(getHRTask());
    dispatch(getHRSubtask());
  }, [weekStartDate]);

  const NewUserSchema = Yup.object().shape({
    c0: Yup.string().required('Mon Work Hours is required'),
    c1: Yup.string().required('Tue Work Hours is required'),
    c2: Yup.string().required('Wed Work Hours is required'),
    c3: Yup.string().required('Thu Work Hours is required'),
    c4: Yup.string().required('Fri Work Hours is required'),
    c5: Yup.string().required('Sat Work Hours is required'),
    remarks: Yup.string().required('remarks is required'),
    // weekStartDate: Yup.string().required('Week Start Date is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentHRTimesheetAttendance?.id || '',
      remarks: currentHRTimesheetAttendance?.remarks || '',
      // weekStartDate: currentHRTimesheetAttendance?.weekStartDate || '',
      c0: currentHRTimesheetAttendance?.c0 || '',
      c1: currentHRTimesheetAttendance?.c1 || '',
      c2: currentHRTimesheetAttendance?.c2 || '',
      c3: currentHRTimesheetAttendance?.c3 || '',
      c4: currentHRTimesheetAttendance?.c4 || '',
      c5: currentHRTimesheetAttendance?.c5 || '',
      c6: currentHRTimesheetAttendance?.c6 || '',
      projectsid: currentHRTimesheetAttendance?.project || '',
      taskid: currentHRTimesheetAttendance?.task.id || '',
      subtaskid: currentHRTimesheetAttendance?.subtask.id || '',
      // userid: currentHRTimesheetAttendance?.user.id || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentHRTimesheetAttendance]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const request: HRTimesheetAttendanceRequest = {
      c0: data.c0,
      c1: data.c1,
      c2: data.c2,
      c3: data.c3,
      c4: data.c4,
      c5: data.c5,
      c6: data.c6,
      remarks: data.remarks,
      // weekStartDate: format(new Date(data.weekStartDate || ''), 'yyyy-MM-dd'),
      userId: '',
      projectsId: dropdownproject,
      taskId: dropdowntask,
      subtaskId: dropdownsubtask,
    };

    try {
      dispatch(addHRTimesheetAttendance(request, weekStartDate));
      reset();

      enqueueSnackbar('Records Added Successfully!');
    } catch (error) {
      enqueueSnackbar('Records Creation Failed');
      console.error(error);
    }
  };

  const [filterName, setFilterName] = useState('');

  const handleFilterName = (name: string) => {
    setFilterName(name);
    setPage(0);
  };

  const handleDeleteRow = (id: string) => {
    dispatch(deleteHRTimesheetAttendance(id));
  };

  const dataFiltered = applySortFilter({
    hrTimesheetAttendances,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleOnChange = (e: any) => {
    const file = e.target.files[0];
  };

  const toggleShowForm = (value: boolean) => () => {
    setShowForm(value);
  };

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  const today = new Date();
  const firstDayOfWeek = format(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()),
    'dd MMM'
  );
  const lastDayOfWeek = format(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay())),
    'dd MMM'
  );
  const firstAndLastWeek = `${firstDayOfWeek} - ${lastDayOfWeek}`;

  const tableData: any = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const dayKeys = ['c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  const dayTotal: any = dayKeys.reduce(
    (pre, curr) => ({
      ...pre,
      [curr]: tableData.reduce((prev: number, item: any) => prev + item[curr], 0),
    }),
    {}
  );

  const total = Object.values(dayTotal).reduce((prev: number, curr: any) => prev + curr, 0);

  const renderFooter = () => (
    <TableRow>
      <TableCell colSpan={2} />
      <TableCell>Total</TableCell>
      {dayKeys.map((day) => (
        <TableCell>{dayTotal[day]}</TableCell>
      ))}
      <TableCell>{total}</TableCell>
    </TableRow>
  );

  const rows = [
    { date: firstAndLastWeek },
    // { day: "Tuesday", date: new Date(firstDayOfWeek.getTime() + (24 * 60 * 60 * 1000)) },
    // { day: "Wednesday", date: new Date(firstDayOfWeek.getTime() + (2 * 24 * 60 * 60 * 1000)) },
    // { day: "Thursday", date: new Date(firstDayOfWeek.getTime() + (3 * 24 * 60 * 60 * 1000)) },
    // { day: "Friday", date: new Date(firstDayOfWeek.getTime() + (4 * 24 * 60 * 60 * 1000)) },
    // { day: "Saturday", date: new Date(firstDayOfWeek.getTime() + (5 * 24 * 60 * 60 * 1000)) },
    // { day: "Sunday", date: lastDayOfWeek },
  ];

  const onChangeProject = (event: any) => {
    setDropdownProject(event.target.value);
  };
  const onChangeTask = (event: any) => {
    setDropdownTask(event.target.value);
  };
  const onChangeSubtask = (event: any) => {
    setDropdownSubtask(event.target.value);
  };

  const index = 1;

  return (
    <Page title="HRTimesheetAttendance: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Attendance Sheet"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.hr.root },
            { name: 'Timesheet Attendance' },
            { name: 'List' },
          ]}
          action={
            <Button
              sx={{ m: 2 }}
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.hr.timesheetattendancenew(weekStartDate)}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Timesheet Attendance
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
              <HRTimesheetAttendanceAnalytic
                title="Total"
                total={hrTimesheetAttendances.length}
                title2="Timesheet Attendance"
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
            </Stack>
          </Scrollbar>
        </Card>
        <Card>
          <Table>
            <TableBody>
              {rows.map((row) => (
                <TableCell>
                  <Stack direction="row">
                    <CalendarMonthIcon />
                    <Typography sx={{ color: '#2196f3', paddingLeft: '10px' }}>
                      Week: {row.date.toString()}
                    </Typography>
                  </Stack>
                </TableCell>
              ))}
            </TableBody>
          </Table>

          <HRTimesheetAttendanceTableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={hrTimesheetAttendances.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {tableData.map((row: any) => (
                    <HRTimesheetAttendanceTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => undefined}
                    />
                  ))}
                  {renderFooter()}
                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, hrTimesheetAttendances.length)}
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
  hrTimesheetAttendances,
  comparator,
  filterName,
}: {
  hrTimesheetAttendances: HRTimesheetAttendance[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = hrTimesheetAttendances.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  hrTimesheetAttendances = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    hrTimesheetAttendances = hrTimesheetAttendances.filter(
      (item: Record<string, any>) =>
        item.remarks.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return hrTimesheetAttendances;
}
