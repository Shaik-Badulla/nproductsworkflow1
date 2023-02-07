import { useState } from 'react';
// @mui
import { Button, IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import ConfirmDialog from 'src/components/confirm-dialog';
import MenuPopover from 'src/components/menu-popover';
// @types
import { HRTimesheetAttendance } from '../../../@types/hrtimesheetattendance';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  row: HRTimesheetAttendance;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function HRTimesheetAttendanceTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme();

  const { c0, c1, c2, c3, c4, c5, c6, remarks, weekStartDate, project, task, subtask, user } = row;

  const totalCount = [c0 + c1 + c2 + c3 + c4 + c5 + c6];

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
        <TableCell align="left">{user?.firstName}</TableCell>
        <TableCell align="left">{project?.name}</TableCell>
        <TableCell align="left">{task?.name}</TableCell>
        <TableCell align="left">{subtask?.name}</TableCell>
        <TableCell align="left">{c0}</TableCell>
        <TableCell align="left">{c1}</TableCell>
        <TableCell align="left">{c2}</TableCell>
        <TableCell align="left">{c3}</TableCell>
        <TableCell align="left">{c4}</TableCell>
        <TableCell align="left">{c5}</TableCell>
        <TableCell align="left">{c6}</TableCell>
        <TableCell align="left">{totalCount}</TableCell>
        <TableCell align="left">{remarks}</TableCell>
        {/* <TableCell align="left">{weekStartDate}</TableCell> */}

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
