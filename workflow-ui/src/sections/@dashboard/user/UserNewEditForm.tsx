import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// utils
// routes
import { dispatch, useSelector } from 'src/redux/store';
import { addUser, updateUser } from 'src/redux/slices/user';
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { IUser } from '../../../@types/user';
import { RoleState } from '../../../@types/role';
import { getRole } from '../../../redux/slices/role';
// assets
// components
import { CustomFile } from '../../../components/upload';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField, RHFSelect } from '../../../components/hook-form';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IUser, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  currentUser?: IUser;
};

export default function UserNewEditForm({ isEdit = false, currentUser }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { roles } = useSelector((state: { role: RoleState }) => state.role);
  const [dropdownRole, setDropdownRole] = useState(currentUser?.roleId?.id || '');

  const NewUserSchema = Yup.object().shape({
    userName: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required'),
    // email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    // role: Yup.string().required('Role is reed'),
  });

  const defaultValues = useMemo(
    () => ({
      userName: currentUser?.userName || '',
      password: currentUser?.yourPassword || '',
      // email: currentUser?.email || '',
      // role: currentUser?.role || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
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
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);
  useEffect(() => {
    dispatch(getRole());
  }, []);
  const onSubmit = async (data: FormValuesProps) => {
    console.log('in submit');
    const request: IUser = {
      id: data.id,
      userName: data.userName,
      yourPassword: data.yourPassword,
      // email: data.email,
      // role: data.role,
    };

    try {
      if (isEdit && currentUser) {
        request.id = data.id;
        dispatch(updateUser(request));
      }
      if (!isEdit) {
        dispatch(addUser(request));
        reset();
      }

      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.user.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };
  const onChangeRole = (event: any) => {
    setDropdownRole(event.target.value);
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
            // <h1>
            // /h1>

              rowGap={3}
              columnGap={2}
              display="column"
              gridTemplateColumns={{
                xs: 'repeat(3, 1fr)',
                sm: 'repeat(5, 1fr)',
              }}
            >
              <RHFTextField name="username" label="User Name" />
              <RHFTextField name="yourPassword" label="Your Password" />
              <RHFTextField name="" label="Forgot your password?" />
              <RHFTextField name="" label="Keep me logged in?" />
              {/* <RHFTextField name="email" label="Email Address" /> */}

              {/* <RHFSelect
                name={dropdownRole}
                value={dropdownRole}
                label="Role"
                placeholder="Role"
                onChange={onChangeRole}
              >
                <option value="" />
                {roles.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 2 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Login' : 'Save Changes'}
              </LoadingButton>
            

            
            <Card sx={{ p: 7 }}>
              <Box
              
              alignItems="flex"
              rowGap={3}
              columnGap={5}
              display="column"
              gridTemplateColumns={{
                xs: 'repeat(3, 1fr)',
                sm: 'repeat(5, 1fr)',
              }}
            >
              <RHFTextField name="username" label="your Name" />
              <RHFTextField name="yourPassword" label="phone number" />
              <RHFTextField name="" label="password" />
              {/* <RHFTextField name="" label="Keep me logged in?" /> */}
              
              </Box>

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Register' : 'Save Changes'}
              </LoadingButton>
             
              </Card>
              
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
