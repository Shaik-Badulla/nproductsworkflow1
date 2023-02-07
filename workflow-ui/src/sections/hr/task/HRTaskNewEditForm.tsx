import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// utils
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// _mock
// components
import { HRTask, HRTaskRequest } from '../../../@types/hrtask';
import { IUserState } from '../../../@types/user';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { addHRTask, updateHRTask } from '../../../redux/slices/hrtask';
import { dispatch, useSelector } from '../../../redux/store';
// import { SoftwaresState } from 'src/@types/softwares';

// ----------------------------------------------------------------------

interface FormValuesProps extends Partial<HRTask> {
  // softwareids: string[];
}

type Props = {
  isEdit: boolean;
  currentHRTask?: HRTask;
};

export default function HRTaskNewEditForm({ isEdit, currentHRTask }: Props) {
  const navigate = useNavigate();
  const { users } = useSelector((state: { user: IUserState }) => state.user);

  const { enqueueSnackbar } = useSnackbar();


  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentHRTask?.id || '',
      name: currentHRTask?.name || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentHRTask]
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
    if (isEdit && currentHRTask) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentHRTask]);



  const onSubmit = async (data: FormValuesProps) => {
    const request: HRTaskRequest = {
      name: data.name,

    };

    try {
      if (isEdit && currentHRTask) {
        request.id = data.id;
        dispatch(updateHRTask(request));
      }
      if (!isEdit) {
        dispatch(addHRTask(request));
        reset();
      }

      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.hr.task);
    } catch (error) {
      console.error(error);
    }
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
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label="Name" />

            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create HR Task' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
