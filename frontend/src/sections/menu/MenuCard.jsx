import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; // Import the Edit icon

const MenuCard = ({ image, name,price, description, onDelete, onEdit , value}) => {


    return (


        <Card sx={{ minWidth: 245, position: 'relative' }}>
            <CardMedia
                component="img"
                height="140"
                image={image}
                alt={name}
            />
            <Box sx={{ position: 'absolute', top: 5, right: 5, display: 'flex', }}>
                <IconButton
                    aria-label="edit"
                    onClick={() => onEdit(value)} // You'll need to define this function
                    sx={{
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                        marginRight: 1 // Add some space between the icons
                    }}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    onClick={onDelete}
                    sx={{
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    {`Rs. ${price}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MenuCard;