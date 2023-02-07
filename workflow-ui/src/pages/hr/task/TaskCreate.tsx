import { capitalCase, paramCase } from 'change-case';
import { useLocation, useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// hooks
import { useSettingsContext } from 'src/components/settings';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import HRTaskNewEditForm from 'src/sections/hr/task/HRTaskNewEditForm';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { HRTaskState } from '../../../@types/hrtask';
import { getHRTask } from '../../../redux/slices/hrtask';
import { dispatch } from '../../../redux/store';

// ----------------------------------------------------------------------

export default function TaskCreate() {
  const { themeStretch } = useSettingsContext();

  const { pathname } = useLocation();

  const { id = '' } = useParams();

  const isEdit = pathname.includes('edit');

  const { hrTasks } = useSelector((state: { hrtask: HRTaskState }) => state.hrtask);

  const currentHRTask = hrTasks.find((HRTask) => paramCase(HRTask.id) === id);

  useEffect(() => {
    dispatch(getHRTask());
  }, []);

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading={!isEdit ? 'Create a new Task' : 'Edit Task'}
        links={[
          { name: 'HR', href: PATH_DASHBOARD.hr.root },
          { name: 'HR Task', href: PATH_DASHBOARD.hr.task },
          { name: !isEdit ? 'New Task' : capitalCase(id) },
        ]}
      />

      <HRTaskNewEditForm isEdit={isEdit} currentHRTask={currentHRTask} />
    </Container>
  );
}
