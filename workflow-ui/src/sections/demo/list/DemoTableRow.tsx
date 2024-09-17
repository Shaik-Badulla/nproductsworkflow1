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
// @types
import { Demo } from 'src/@types/demo';
import { capitalCase } from 'change-case';

// components
import { format } from 'date-fns';
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import ConfirmDialog from '../../../components/confirm-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: Demo;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function DemoTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  // const { firstName, lastName, email, type, joinDate } = row;
  const {id, medicineCategory, medicineName, batchNo, mrp, batchAmount, salePrice, packingQuantity, quantity, purchasePrice, tax, amount} = row;

  const [openConfirm, setOpenConfirm] = useState(false);

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

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell align="left">
          {id}
        </TableCell>

        <TableCell align="left">{medicineCategory}</TableCell>
        <TableCell align="left">{medicineName}</TableCell>
        <TableCell align="left">{batchNo}</TableCell>
        <TableCell align="left">{mrp}</TableCell>
        <TableCell align="left">{batchAmount}</TableCell>
        <TableCell align="left">{salePrice}</TableCell>
        <TableCell align="left">{packingQuantity}</TableCell>
        <TableCell align="left">{quantity}</TableCell>
        <TableCell align="left">{purchasePrice}</TableCell>
        <TableCell align="left">{tax}</TableCell>
        <TableCell align="left">{amount}</TableCell>
        {/* <TableCell align="left">{createdDateTime}</TableCell> */}
        

        {/* <TableCell align="left">{format(new Date(joinDate || ''), 'yyyy-mm-dd')}</TableCell>
        <TableCell align="left">{capitalCase(type)}</TableCell> */}

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
        content= {<>Are you sure want to delete <strong>{medicineName}</strong>?</>}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
