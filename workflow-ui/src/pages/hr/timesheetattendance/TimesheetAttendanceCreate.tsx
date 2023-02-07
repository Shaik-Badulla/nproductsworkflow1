import { paramCase } from 'change-case';
import { useLocation, useParams } from 'react-router-dom';

// @mui
import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material';

// sections
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

// hooks
import { useSettingsContext } from 'src/components/settings';

// components
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { HRProjectState } from 'src/@types/hrproject';
import { HRSubtaskState } from 'src/@types/hrsubtask';
import { HRTaskState } from 'src/@types/hrtask';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { getHRProject } from 'src/redux/slices/hrproject';
import { getHRSubtask } from 'src/redux/slices/hrsubtask';
import { getHRTask } from 'src/redux/slices/hrtask';
import {
  HRTimesheetAttendance,
  HRTimesheetAttendanceRequest,
  HRTimesheetAttendanceState
} from '../../../@types/hrtimesheetattendance';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  addHRTimesheetAttendance,
  getHRTimesheetAttendance
} from '../../../redux/slices/hrtimesheetattendance';
import { dispatch } from '../../../redux/store';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

interface FormValuesProps extends Partial<HRTimesheetAttendance> {
  // softwareids: string[];
}

export default function TimesheetAttendanceCreate() {
  const { themeStretch } = useSettingsContext();

  const { pathname } = useLocation();

  const { id = '' } = useParams();

  // const isEdit = pathname.includes('edit');

  const { hrTimesheetAttendances } = useSelector(
    (state: { hrtimesheetattendance: HRTimesheetAttendanceState }) => state.hrtimesheetattendance
  );

  const currentHRTimesheetAttendance = hrTimesheetAttendances.find(
    (HRTimesheetAttendance) => paramCase(HRTimesheetAttendance.id) === id
  );

  const [showForm, setShowForm] = useState(false);

  const { hrProjects } = useSelector((state: { hrproject: HRProjectState }) => state.hrproject);
  const { hrTasks } = useSelector((state: { hrtask: HRTaskState }) => state.hrtask);
  const { hrSubtasks } = useSelector((state: { hrsubtask: HRSubtaskState }) => state.hrsubtask);

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

  const toggleShowForm = (value: boolean) => () => {
    setShowForm(value);
  };

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
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading= 'Create a new Week Attendance'
        links={[
          { name: 'HR', href: PATH_DASHBOARD.hr.root },
          {
            name: 'HR Timesheet Attendance',
            href: PATH_DASHBOARD.hr.timesheetattendance(weekStartDate),
          },
          // { name: !isEdit ? 'New Timesheet Attendance' : capitalCase(id) },
        ]}
      />

      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
          Add Attedances:
        </Typography>

        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
          {showForm && (
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                <Stack key={index} spacing={1.5}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                    <RHFSelect
                      name={dropdownproject}
                      value={dropdownproject}
                      label="Project"
                      SelectProps={{
                        native: true,
                      }}
                      placeholder="Project"
                      onChange={onChangeProject}
                      required
                    >
                      <option value="" />
                      {hrProjects.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </RHFSelect>

                    <RHFSelect
                      name={dropdowntask}
                      value={dropdowntask}
                      label="Task"
                      SelectProps={{
                        native: true,
                      }}
                      placeholder="Task"
                      onChange={onChangeTask}
                      required
                    >
                      <option value="" />
                      {hrTasks.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </RHFSelect>

                    <RHFSelect
                      name={dropdownsubtask}
                      value={dropdownsubtask}
                      label="Sub-task"
                      SelectProps={{
                        native: true,
                      }}
                      placeholder="Subtask"
                      onChange={onChangeSubtask}
                      required
                    >
                      <option value="" />
                      {hrSubtasks.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFTextField name="remarks" label="Remarks" />
                  </Stack>

                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    sx={{ width: 1, mt: 2 }}
                  >
                    <RHFTextField name="c0" label="Mon" />
                    <RHFTextField name="c1" label="Tue" />
                    <RHFTextField name="c2" label="Wed" />
                    <RHFTextField name="c3" label="Thu" />
                    <RHFTextField name="c4" label="Fri" />
                    <RHFTextField name="c5" label="Sat" />
                    <RHFTextField name="c6" label="Sun" />
                    {/* <Controller
                        name="weekStartDate"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <DatePicker
                            label="week Start Date"
                            value={field.value}
                            onChange={(newValue) => {
                              field.onChange(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                error={!!error}
                                helperText={error?.message}
                              />
                            )}
                          />
                        )}
                      /> */}
                  </Stack>

                  <Stack sx={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
                    <Button
                      sx={{ ml: 'auto' }}
                      size="small"
                      color="error"
                      startIcon={<Iconify icon="eva:trash-2-outline" />}
                      onClick={toggleShowForm(false)}
                    >
                      Remove
                    </Button>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      Submit
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Stack>
            </FormProvider>
          )}
        </Stack>

        <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

        <Stack
          spacing={2}
          direction={{ xs: 'column-reverse', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Button
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={toggleShowForm(true)}
            sx={{ flexShrink: 0 }}
            disabled={showForm}
          >
            Add Attendance
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
