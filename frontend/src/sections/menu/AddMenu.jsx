import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    Button,
    Box,
    Grid,
    Typography, Avatar,
    IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { parseSaveMenu, parseSaveRestaurant, parseUpdateMenu, parseUpdateRestaurant } from "../../services/parse";
import LoadingOverlay from 'react-loading-overlay-ts';

const AddMenu = ({
    restaurantData,
    handleCloseModel,
    isEditMenu,
    setMenuResponse,
    setLoading,
    isLoading,
    restaurantId,
    onEditMenu,
    menuData
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const [imagePreview, setImagePreview] = useState(null);

    const onSubmit = async (data) => {
        if (isEditMenu) {
            const url =
                `${process.env.REACT_APP_API_URL}/menu/updateMenu`;
            const updateResponse = parseUpdateMenu(data, restaurantId)
            setLoading(true)
            const response = await axios.post(url, updateResponse)
            setMenuResponse(response)
            if (response) {
                setLoading(false)
            }
        } else {
            const url =
                `${process.env.REACT_APP_API_URL}/menu/createMenu`;
            const saveRestaurantData = parseSaveMenu(data, restaurantId)
            setLoading(true)
            const response = await axios.post(url, saveRestaurantData)
            setMenuResponse(response)
            if (response) {
                setLoading(false)
            }
        }
        handleCloseModel();
    };

    console.log("SSSSSS", menuData)

    useEffect(() => {
        if (menuData && Object.keys(menuData)?.length) {
            Object.entries(menuData)?.forEach(([key, val]) => {
                setValue(key, val)
            });
        }
    }, [restaurantData]);


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
                            name="price"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Price"
                                    rows={4}
                                    type="number"
                                    error={!!errors?.location}
                                    helperText={errors?.location ? errors?.location?.message : ""}
                                    {...field}
                                />
                            )}
                            rules={{
                                required: "Price is required",
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
    );
};

export default AddMenu;
