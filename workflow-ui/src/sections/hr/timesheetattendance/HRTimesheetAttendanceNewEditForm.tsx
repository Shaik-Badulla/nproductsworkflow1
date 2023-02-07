import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// _mock
// components
import { HRProjectState } from '../../../@types/hrproject';
import { HRSubtaskState } from '../../../@types/hrsubtask';
import { HRTaskState } from '../../../@types/hrtask';
import { HRTimesheetAttendance, HRTimesheetAttendanceRequest } from '../../../@types/hrtimesheetattendance';
import { IUserState } from '../../../@types/user';
import { getHRProject } from '../../../redux/slices/hrproject';
import { getHRSubtask } from '../../../redux/slices/hrsubtask';
import { getHRTask } from '../../../redux/slices/hrtask';
import { addHRTimesheetAttendance, updateHRTimesheetAttendance } from '../../../redux/slices/hrtimesheetattendance';
import { getUsers } from '../../../redux/slices/user';
import { dispatch, useSelector } from '../../../redux/store';

// ----------------------------------------------------------------------

interface FormValuesProps extends Partial<HRTimesheetAttendance> {
  // softwareids: string[];
}

type Props = {
  isEdit: boolean;
  currentHRTimesheetAttendance?: HRTimesheetAttendance;
};

export default function HRTimesheetAttendanceNewEditForm({ isEdit, currentHRTimesheetAttendance }: Props) {
  const navigate = useNavigate();

  const { users } = useSelector((state: { user: IUserState }) => state.user);
  const { hrProjects } = useSelector((state: { hrproject: HRProjectState }) => state.hrproject);
  const { hrTasks } = useSelector((state: { hrtask: HRTaskState }) => state.hrtask);
  const { hrSubtasks } = useSelector((state: { hrsubtask: HRSubtaskState }) => state.hrsubtask);

  const { enqueueSnackbar } = useSnackbar();

  const [dropdownuser, setDropdownUser] = useState(currentHRTimesheetAttendance?.user.id || '');
  const [dropdownproject, setDropdownProject] = useState(currentHRTimesheetAttendance?.project.id || '');
  const [dropdowntask, setDropdownTask] = useState(currentHRTimesheetAttendance?.task.id || '');
  const [dropdownsubtask, setDropdownSubtask] = useState(currentHRTimesheetAttendance?.subtask.id || '');

  useEffect(() =>{
    setDropdownUser(currentHRTimesheetAttendance?.user?.id || '')
    setDropdownProject(currentHRTimesheetAttendance?.project?.id || '')
    setDropdownTask(currentHRTimesheetAttendance?.task?.id || '')
    setDropdownSubtask(currentHRTimesheetAttendance?.subtask?.id || '')
  }, [currentHRTimesheetAttendance])
  
  const NewUserSchema = Yup.object().shape({
    remarks: Yup.string().required('remarks is required'),
    weekStartDate: Yup.string().required('Week Start Date is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentHRTimesheetAttendance?.id || '',
      remarks: currentHRTimesheetAttendance?.remarks || '',
      // c0: currentHRTimesheetAttendance?.c0 || '',
      // c1: currentHRTimesheetAttendance?.c1 || '',
      // c2: currentHRTimesheetAttendance?.c2 || '',
      // c3: currentHRTimesheetAttendance?.c3 || '',
      // c4: currentHRTimesheetAttendance?.c4 || '',
      // c5: currentHRTimesheetAttendance?.c5 || '',
      // c6: currentHRTimesheetAttendance?.c6 || '',
      weekStartDate: currentHRTimesheetAttendance?.weekStartDate,
      projectsid: currentHRTimesheetAttendance?.project.id || '',
      taskid: currentHRTimesheetAttendance?.task.id || '',
      subtaskid: currentHRTimesheetAttendance?.subtask.id || '',
      userid: currentHRTimesheetAttendance?.user.id || '',
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

  useEffect(() => {
    if (isEdit && currentHRTimesheetAttendance) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentHRTimesheetAttendance]);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getHRProject());
    dispatch(getHRTask());
    dispatch(getHRSubtask());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: FormValuesProps) => {
    const request: HRTimesheetAttendanceRequest = {
      // c0: data.c0,
      // c1: data.c1,
      // c2: data.c2,
      // c3: data.c3,
      // c4: data.c4,
      // c5: data.c5,
      // c6: data.c6,
      remarks: data.remarks,
      weekStartDate: format(new Date(data.weekStartDate || ''), 'yyyy-MM-dd'),
      userId: dropdownuser,
      projectsId: dropdownproject,
      taskId: dropdowntask,
      subtaskId: dropdownsubtask,
    };

    try {
      if (isEdit && currentHRTimesheetAttendance) {
        request.id = data.id;
        dispatch(updateHRTimesheetAttendance(request));
      }
      if (!isEdit) {
        // dispatch(addHRTimesheetAttendance(request));
        reset();
      }

      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      // navigate(PATH_DASHBOARD.hr.timesheetattendance);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeUser = (event: any) => {
    setDropdownUser(event.target.value);
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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
              }}
            >
              <RHFSelect
                name={dropdownproject}
                value={dropdownproject}
                label="Project"
                placeholder="Project"
                onChange={onChangeProject}
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
                placeholder="Task"
                onChange={onChangeTask}
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
                placeholder="Subtask"
                onChange={onChangeSubtask}
              >
                <option value="" />
                {hrSubtasks.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>
              {/* <RHFTextField name="c0" label="Mon" />
              <RHFTextField name="c1" label="Tue" />
              <RHFTextField name="c2" label="Wed" />
              <RHFTextField name="c3" label="Thu" />
              <RHFTextField name="c4" label="Fri" />
              <RHFTextField name="c5" label="Sat" />
              <RHFTextField name="c6" label="Sun" /> */}
              <RHFTextField name="remarks" label="Remarks" />

              <Controller
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
              />

              <RHFSelect
                name={dropdownuser}
                value={dropdownuser}
                label="Users"
                placeholder="Users"
                onChange={onChangeUser}
              >
                <option value="" />
                {users.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.firstName} {option.lastName}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Timesheet Attendance' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
