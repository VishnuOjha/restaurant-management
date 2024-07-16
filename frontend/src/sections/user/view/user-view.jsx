import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { users } from "../../../_mock/user";

import Iconify from "../../..//components/iconify";
import Scrollbar from "../../../components/scrollbar";

import TableNoData from "../table-no-data";
import UserTableRow from "../user-table-row";
import UserTableHead from "../user-table-head";
import TableEmptyRows from "../table-empty-rows";
import UserTableToolbar from "../user-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";
import CustomizedDialogs from "../../../layouts/dashboard/common/dialogbox";
import AddUser from "../AddUser";
import { faker } from "@faker-js/faker";
import { toast } from "react-toastify";
import axios from "axios";
import { parseRestaurantData } from "../../../services/parse";
import { Grid, TableCell, TableRow } from "@mui/material";


export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModel, setOpenModel] = useState(false);

  const [allUsers, setAllUsers] = useState([]);

  const [isEditUser, setIsEditUser] = useState(false);

  const [userData, setUserData] = useState({});

  const [resRespnse, setResResponse] = useState()

  const [isLoading, setLoading] = useState(false)

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const RestaurantList = async () => {
    const url = `${process.env.REACT_APP_API_URL}/getRestaurants`;
    const res = await axios.get(url)
    setAllUsers(res?.data?.restaurants)

  }

  useEffect(() => {
    RestaurantList()
  }, [resRespnse])

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allUsers.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };


  const dataFiltered = applyFilter({
    inputData: parseRestaurantData(allUsers),
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleAddUser = () => {
    setUserData({});
    setOpenModel(true);
    setIsEditUser(false);
  };

  const handleCloseModel = () => {
    setOpenModel(false);
  };

  const addNewUser = (data) => {
    const payload = {
      id: faker.string.uuid(),
      avatarUrl: `/assets/images/avatars/avatar_${allUsers?.length + 1}.jpg`,
      ...data,
    };
    const temp = [...allUsers];
    temp.unshift(payload);
    setAllUsers(temp);
  };

  const handleDeleteUser = async (userId) => {
    const url = `${process.env.REACT_APP_API_URL}/deleteRestaurant`;
    const data = {
      restaurantId: userId
    }
    const res = await axios.post(url, data)
    setResResponse(res)
  };

  const handleSelectDelete = () => {
    const data = allUsers?.filter(({ id }) => {
      return !selected?.includes(id);
    });
    setAllUsers(data);
    toast.success(`User Deleted`);
    setSelected([]);
  };

  const handleEdit = (row) => {
    setUserData(row);
    setOpenModel(true);
    setIsEditUser(true);
  };

  const editUserData = (data) => {
    const findInd = allUsers?.findIndex(({ id }) => id === data?.id);
    if (findInd > -1) {
      const temp = [...allUsers];
      temp.splice(findInd, 1, data);
      setAllUsers(temp);
      toast.success("User Details updated");
    } else {
      toast.error("User not found");
    }
  };




  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Restaurant</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAddUser}
        >
          Add Restaurant
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          handleSelectDelete={handleSelectDelete}
        />


        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 1000 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={allUsers.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "name", label: "Name" },
                  { id: "cuisine", label: "Cuisine" },
                  { id: "star", label: "Star" },
                  { id: "services", label: "Services" },
                  { id: "location", label: "Location" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {dataFiltered.length > 0 ? (
                  dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        userId={row.id}
                        name={row.name}
                        cuisine={row.cuisine}
                        star={row.stars}
                        services={row.services}
                        location={row.location}
                        avatarUrl={row.avatarUrl}
                        isVerified={row.isVerified}
                        selected={selected.indexOf(row.id) !== -1}
                        handleClick={(event) => handleClick(event, row.id)}
                        handleDeleteUser={handleDeleteUser}
                        handleEdit={handleEdit}
                        row={row}
                      />
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <Grid container justifyContent="center">
                        <Grid item>
                          <Typography variant="h6">NO RESTAURANT AVAILABLE </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                )}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={allUsers.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {openModel && (
        <CustomizedDialogs
          {...{
            handleCloseModel,
            title: isEditUser ? "Edit Restaurant" : "Add Restaurant",
            openModel,
          }}
        >
          <AddUser
            {...{
              userData,
              isEditUser,
              handleCloseModel,
              addNewUser,
              editUserData,
              setResResponse,
              setLoading,
              isLoading
            }}
          />
        </CustomizedDialogs>
      )}
    </Container>

  );
}
