import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { DatePicker, LoadingButton } from '@mui/lab';
import * as material from '@mui/material';
// utils
import { Demo, DemoRequest } from 'src/@types/demo';
// routes
import { dispatch } from 'src/redux/store';
import { addDemo, updateDemo } from 'src/redux/slices/demo';
import { format } from 'date-fns';
import { Box, Card, Grid, Stack, TextField } from '@mui/material';
import * as paths from '../../routes/paths';
// @types
// assets
// components
import { useSnackbar } from '../../components/snackbar';
import FormProvider, { RHFEditor, RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------

interface FormValuesProps extends Partial<Demo> {}

type Props = {
  isEdit?: boolean;
  currentDemo?: Demo;
};

export default function DemoNewEditForm(this: any, { isEdit = false, currentDemo }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('FirstName is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentDemo?.id || '',
      firstName: currentDemo?.firstName || '',
      lastName: currentDemo?.lastName || '',
      email: currentDemo?.email || '',
      type: currentDemo?.type || '',
      joinDate: currentDemo?.joinDate || '',
      description: currentDemo?.description || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentDemo]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentDemo) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentDemo]);

  const handelTextAreaChange = (e: any) => {
    console.log(e);
  };
  const onSubmit = async (data: FormValuesProps) => {
    const request: DemoRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      joinDate: format(new Date(data.joinDate || ''), 'yyyy-mm-dd'),
      type: data.type,
    };

    try {
      if (isEdit && currentDemo) {
        request.id = data.id;
        dispatch(updateDemo(request));
      }
      if (!isEdit) {
        dispatch(addDemo(request));
        reset();
      }
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(paths.PATH_DASHBOARD.user.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} spacing={3}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="type" label="Type" />

              <Controller
                name="joinDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="joinDate"
                    value={field.value}
                    onChange={(newValue: any) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params: any) => (
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
            </Box>
          </Card>
          <Card sx={{ my: 3, p: 3 }}>
            <Box
              sx={{
                display: 'grid',

                rowGap: 3,
              }}
            >
              <RHFEditor simple name="description" />
            </Box>
          </Card>
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!isEdit ? 'Create CRM' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
