import { useState } from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Iconify from "../../components/iconify";
import { Link } from "react-router-dom"

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  cuisine,
  star,
  services,
  location,
  handleClick,
  userId,
  handleDeleteUser,
  handleEdit,
  row,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEditUser = (data) => {
    handleEdit(data);
    handleCloseMenu();
  };

  return (
    <>

      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          {/* <Checkbox disableRipple checked={selected} onChange={handleClick} /> */}
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Link to={{
              pathname: `/restaurantDetails/${userId}`, 
            }} style={{
              textDecoration: 'none', textAlign: "center",
              color: "black"
            }}>
              <Typography variant="subtitle2" noWrap>
                {name}
              </Typography>
            </Link>
          </Stack>
        </TableCell>


        <TableCell>{cuisine}</TableCell>

        <TableCell>{star}</TableCell>

        <TableCell >
          {services}
        </TableCell>

        <TableCell>
          {location}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => handleEditUser(row)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => handleDeleteUser(userId)}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  userId: PropTypes.string,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  row: PropTypes.object,
};
