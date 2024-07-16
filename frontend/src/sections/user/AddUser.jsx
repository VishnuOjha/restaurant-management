import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  FormHelperText,
  Avatar,
  IconButton,
} from "@mui/material";
import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";
import { SelectBoxStyle } from "../../components/select/style";
import { Api } from "../../services/Api";
import { createOrUpdateRestaurant } from "../../services/restaurant";
import { CompressOutlined, ConstructionOutlined } from "@mui/icons-material";
import axios from "axios";
import { parseSaveRestaurant, parseUpdateRestaurant } from "../../services/parse";
import label from "../../components/label";
import LoadingOverlay from 'react-loading-overlay-ts';

const AddUser = ({
  userData,
  handleCloseModel,
  addNewUser,
  editUserData,
  isEditUser,
  setResResponse,
  setLoading,
  isLoading
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);


  const handleChange = (data) => {
    return data?.label;
  };


  const onSubmit = async (data) => {

    if (isEditUser) {
      const url =
        `${process.env.REACT_APP_API_URL}/updateRestaurant`;
      const updateResponse = parseUpdateRestaurant(data)
      setLoading(true)
      const response = await axios.post(url, updateResponse)
      setResResponse(response)
      if (response) {
        setLoading(false)
      }
    } else {
      const url =
        `${process.env.REACT_APP_API_URL}/createRestaurant`;
      const saveRestaurantData = parseSaveRestaurant(data)
      setLoading(true)
      const response = await axios.post(url, saveRestaurantData)
      setResResponse(response)
      if (response) {
        setLoading(false)
      }
    }
    handleCloseModel();
  };

  const servicesOptions = [
    { label: "DineIn", value: "DineIn" },
    { label: "Takeaway", value: "Takeaway" },
    { label: "Delivery", value: "Delivery" },
  ];


  const starOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];

  const createServiceSelectVal = (val) => {
    const tempArr = []
    const tempVal = val?.split(",")

    tempVal?.map((data) => {
      tempArr.push({
        label: data,
        value: data
      })
    })

    return tempArr
  }


  useEffect(() => {
    if (userData && Object.keys(userData)?.length) {
      Object.entries(userData)?.forEach(([key, val]) => {
        if (key === "services") {
          const servVal = createServiceSelectVal(val)
          setValue("services", servVal)
        }
        else {
          setValue(key, val)
        }
      });
    }
  }, [userData]);


  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    if (file) {
      if (file.size <= 5242880) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setValue("image", reader.result);
        };
      } else {
        setImagePreview(null);
        setValue("image", null);

      }
    } else {
      setImagePreview(null);
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setValue("image", null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/heic": [],
    },
    multiple: false,
  });


  return (
    <LoadingOverlay active={isLoading} spinner text={isEditUser ? "Updaing Details" : "Saving Details"}>
      <Box
        component="form"
        id="restaurant-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ m: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Name"
                  error={!!errors?.name}
                  helperText={errors?.name ? errors.name.message : ""}
                  {...field}
                  inputProps={{ maxLength: 128 }}
                />
              )}
              rules={{
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Minimum Length is 2",
                },
                maxLength: {
                  value: 128,
                  message: "Maximum Length is 128",
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Location"
                  rows={4}
                  error={!!errors?.location}
                  helperText={errors?.location ? errors?.location?.message : ""}
                  {...field}
                />
              )}
              rules={{
                required: "Location is required",
                minLength: {
                  value: 2,
                  message: "Minimum Length is 2",
                },
                maxLength: {
                  value: 128,
                  message: "Maximum Length is 128",
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="cuisine"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Cuisine"
                  rows={4}
                  error={!!errors?.cuisine}
                  helperText={errors?.cuisine ? errors?.cuisine?.message : ""}
                  {...field}
                />
              )}
              rules={{
                required: "Cuisine is required",
                minLength: {
                  value: 2,
                  message: "Minimum Length is 2",
                },
                maxLength: {
                  value: 128,
                  message: "Maximum Length is 128",
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="services"
              control={control}
              render={({ field: { onChange, value } }) => {
                console.log("DDDDDDDDDDDDDDDD", value)
                return (
                  <>
                    <Select
                      onChange={onChange}
                      value={value}
                      options={servicesOptions}
                      getOptionValue={(option) => option.label}
                      placeholder="Select Services"
                      isMulti
                      menuPortalTarget={document.body}
                      styles={SelectBoxStyle}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                    />
                    {errors?.services && (
                      <FormHelperText sx={{ color: "red" }}>
                        {errors?.services?.message}
                      </FormHelperText>
                    )}
                  </>
                );
              }}
              rules={{
                required: "Please select services",
              }}
            />
          </Grid>


          <Grid item xs={12}>
            <Controller
              name="stars"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <Select
                      onChange={(e) => onChange(handleChange(e))}
                      value={starOptions?.find((data) =>
                        data?.value == value ? value : null
                      )}
                      options={starOptions}
                      getOptionValue={(option) => option.label}
                      placeholder="Select Stars"
                      menuPortalTarget={document.body}
                      styles={SelectBoxStyle}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                    />
                    {errors?.stars && (
                      <FormHelperText sx={{ color: "red" }}>
                        {errors?.stars?.message}
                      </FormHelperText>
                    )}
                  </>
                );
              }}
              rules={{
                required: "Please select stars",
              }}
            />
          </Grid>


          <Grid item xs={12}>
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <>
                  <Box
                    {...getRootProps()}
                    sx={{
                      border: "2px dashed gray",
                      padding: "20px",
                      textAlign: "center",
                      cursor: "pointer",
                      borderRadius: "8px",
                    }}
                  >
                    <input {...getInputProps()} />
                    <Typography>
                      Drag & drop an image here, or click to select one
                    </Typography>
                  </Box>
                  {errors.image && (
                    <Typography color="error">{errors.image.message}</Typography>
                  )}
                  {imagePreview && (
                    <Box mt={2} sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={imagePreview}
                        alt="Image Preview"
                        sx={{ width: 100, height: 100, mr: 2 }}
                        variant={"rounded"}
                      />
                      <IconButton onClick={handleDeleteImage} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </>
              )}
            />
          </Grid>


          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Description"
                  rows={4}
                  error={!!errors?.description}
                  helperText={errors?.description ? errors?.description?.message : ""}
                  {...field}
                />
              )}
              rules={{
                required: "Description is required",
                minLength: {
                  value: 2,
                  message: "Minimum Length is 2",
                },
                maxLength: {
                  value: 256,
                  message: "Maximum Length is 256",
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth form="restaurant-form">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LoadingOverlay>
  );
};

export default AddUser;
