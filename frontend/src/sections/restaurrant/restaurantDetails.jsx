import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Iconify from '../../components/iconify'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import CustomizedDialogs from '../../layouts/dashboard/common/dialogbox'
import AddMenu from '../menu/AddMenu'
import MenuCard from '../menu/MenuCard'

const RestaurantDetails = () => {

  const [resData, setResData] = useState()
  const [openModel, setOpenModel] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [isEditMenu, setIsEditMenu] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setLoading] = useState(false)
  const [menuResponse, setMenuResponse] = useState()
  const [menuList, setMenuList] = useState()
  const [menuData, setMenuData] = useState()

  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate("/")
  }
  const params = useParams()
  const restaurantId = params?.id
  const getRestaurantDetailsById = async () => {
    const data = { id: params?.id }
    const url = `${process.env.REACT_APP_API_URL}/getRestaurantDetails`;
    const res = await axios.post(url, data)
    setResData(res?.data?.restaurant)
  }

  const getMenuList = async () => {
    const data = { id: params?.id }
    const url = `${process.env.REACT_APP_API_URL}/menu/getMenu`;
    const res = await axios.post(url, data)
    setMenuList(res?.data?.menu)
  }


  useEffect(() => {
    getRestaurantDetailsById()
    getMenuList()
  }, [params?.id, menuResponse])

  const handleAddMenu = () => {
    setUserData({});
    setOpenModel(true);
    setIsEditMenu(false);
  };

  const handleCloseModel = () => {
    setOpenModel(false);
    setIsEditMenu(false);
  };

  const handleMenuDelete = async (id) => {
    const data = { restaurantId: params?.id, menuId: id }
    const url = `${process.env.REACT_APP_API_URL}/menu/deleteMenu`;
    const res = await axios.post(url, data)
    setMenuResponse(res)
  }

  const onEditMenu = (data) => {
    setMenuData(data)
    setOpenModel(true);
    setIsEditMenu(true);
  }


  return (
    <>
      <Grid>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="weui:back-filled" />}
          onClick={handleNavigate}
          sx={{
            marginLeft: 2
          }}
        >
          Back
        </Button>
      </Grid>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Restaurant Details</Typography>


        </Stack>
        <Grid width={"50vw"}>
          <Grid mb={5}>
            <Grid container justifyContent={"space-between"} alignItems={"center"}>
              <Grid>
                <Typography variant='h4'>NAME</Typography>
                <Typography>{resData?.name}</Typography>
              </Grid>
              <Grid>
                <Typography variant='h4'>CUISINE</Typography>
                <Typography >{resData?.cuisine}</Typography>
              </Grid>
              <Grid>
                <Typography variant='h4'>STARS</Typography>
                <Typography>{resData?.stars}</Typography>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
        <Grid>

          <Grid container width={"52%"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
            <Grid>
              <Typography variant='h4'>LOCATION</Typography>
              <Typography>{resData?.location}</Typography>
            </Grid>
            <Grid>
              <Typography variant='h4'>SERVICES</Typography>
              <Typography>{resData?.services}</Typography>
            </Grid>


          </Grid>

          <Grid container justifyContent={"space-between"} alignItems={"center"} mb={2}>

            <Grid>
              <Typography variant='h4'>DESCRIPTION</Typography>
              <Typography>{resData?.description}</Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Menu of Restaurant */}
        <Grid mt={3} borderTop={"1px solid black"}>
          <Grid mt={2} container justifyContent={"space-between"}>
            <Typography variant="h3" >FOOD MENU</Typography>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleAddMenu}
              size='small'
            >
              Add Menu
            </Button>
          </Grid>
        </Grid>

        <Box sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          marginTop: 2
        }}>
          {menuList?.length > 0 ? <>
            {
              menuList?.map((val) => {
                return (
                  <>
                    <MenuCard name={val?.name} price={val?.price} description={val?.description} image={val?.image?.url} onDelete={() => handleMenuDelete(val?._id)} onEdit={onEditMenu} value={val} />
                  </>
                )
              })
            }

          </> : <>
            <Grid container justifyContent={"center"}>
              <Typography variant='h6'>NO MENU ITEM AVAILABLE</Typography>
            </Grid>
          </>}

        </Box>


        {
          openModel &&
          <CustomizedDialogs
            {...{
              handleCloseModel,
              title: isEditMenu ? "Edit Menu" : "Add Menu",
              openModel,
            }}
          >
            <AddMenu
              {...{
                handleCloseModel,
                isEditMenu,
                setLoading,
                isLoading,
                restaurantId,
                setMenuResponse,
                menuData
              }
              }
            />
          </CustomizedDialogs>
        }
      </Container>
    </>
  )
}

export default RestaurantDetails
