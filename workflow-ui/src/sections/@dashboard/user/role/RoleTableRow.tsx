import { useState } from 'react';
// @mui
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
import { capitalCase } from 'change-case';


// components
import MenuPopover from 'src/components/menu-popover';
import Iconify from '../../../../components/iconify';
import ConfirmDialog from '../../../../components/confirm-dialog';
// import { TableMoreMenu } from '../../components/table';

import { Role } from '../../../../@types/role';

// ----------------------------------------------------------------------

type Props = {
  row: Role;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function RoleTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {

  const { name } = row;
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

//   return (
//     <TableRow hover selected={selected}>

//       <TableCell align="left">{name}</TableCell>

//       <TableCell align="right">
//         <MenuPopover
//           open={openPopover}
//           onOpen={handleOpenPopover}
//           onClose={handleClosePopover}
//           actions={
//             <>
//               <MenuItem
//                 onClick={() => {
//                   onDeleteRow();
//                   handleClosePopover();
//                 }}
//                 sx={{ color: 'error.main' }}
//               >
//                 <Iconify icon={'eva:trash-2-outline'} />
//                 Delete
//               </MenuItem>
//               <MenuItem
//                 onClick={() => {
//                   onEditRow();
//                   handleClosePopover();
//                 }}
//               >
//                 <Iconify icon={'eva:edit-fill'} />
//                 Edit
//               </MenuItem>
//             </>
//           }
//         />
//       </TableCell>
//     </TableRow>
//   );
// }

return (
  <>
    <TableRow hover selected={selected}>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="right">
        <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>

    <MenuPopover
      open={openPopover}
      onClose={handleClosePopover}
      arrow="right-top"
      sx={{ width: 140 }}
    >
      <MenuItem
        onClick={() => {
          handleOpenConfirm();
          handleClosePopover();
        }}
        sx={{ color: 'error.main' }}
      >
        <Iconify icon="eva:trash-2-outline" />
        Delete
      </MenuItem>

      <MenuItem
        onClick={() => {
          onEditRow();
          handleClosePopover();
        }}
      >
        <Iconify icon="eva:edit-fill" />
        Edit
      </MenuItem>
    </MenuPopover>

    <ConfirmDialog
      open={openConfirm}
      onClose={handleCloseConfirm}
      title="Delete"
      content="Are you sure want to delete?"
      action={
        <Button variant="contained" color="error" onClick={onDeleteRow}>
          Delete
        </Button>
      }
    />
  </>
);
}
