import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { CrmState } from 'src/@types/crm';
import CrmNewEditForm from 'src/sections/crm/CrmNewEditForm';
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

export default function CrmEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const { crms } = useSelector((state: { crm: CrmState }) => state.crm);

  const currentCrm = crms.find((Crm) => paramCase(Crm.id) === id);

  return (
    <>
      <Helmet>
        <title> CRM: Edit</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit user"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'User',
              href: PATH_DASHBOARD.customer.list,
            },
            { name: currentCrm?.id },
          ]}
        />

        <CrmNewEditForm isEdit currentCrm={currentCrm} />
      </Container>
    </>
  );
}
