import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { DemoState } from 'src/@types/demo';
import DemoNewEditForm from 'src/sections/demo/DemoNewEditForm';
import { useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _userList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

export default function DemoEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const { demos } = useSelector((state: { demo: DemoState }) => state.demo);

  const currentDemo = demos.find((Demo) => paramCase(Demo.id) === id);

  return (
    <>
      <Helmet>
        <title> CRM: Edit Demo</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Demo"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'User',
              href: PATH_DASHBOARD.demo.list,
            },
            // { name: currentDemo?.id },
          ]}
        />

        <DemoNewEditForm isEdit currentDemo={currentDemo} />
      </Container>
    </>
  );
}
