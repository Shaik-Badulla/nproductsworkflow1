import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import DemoNewEditForm from 'src/sections/demo/DemoNewEditForm';
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

export default function MedicieneCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> CRM: Pharmacy | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Medicine Purchase New"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Medicines',
              href: PATH_DASHBOARD.demo.list,
            },
            { name: 'Purchase' },
          ]}
        />
        <DemoNewEditForm />
      </Container>
    </>
  );
}
