//navbar
import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, TextField, Button, Badge, Box, Typography, IconButton, Avatar, Menu, MenuItem, Popover, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext.jsx';
import { useCart } from '../../context/cartContext.jsx';
import CartPopover from '../carrito/CartPopover.jsx';
import avatar from '../../assets/logoeco.png';

const Navbar = () => {

  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const { cart } = useCart();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    handleMenuItemClick('/');
  };


  const handleCartOpen = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };
  // const truncateName = (name) => {
  //   return name.length > 8 ? name.substring(0, 8) : name;
  // };

  const handleProceedToCheckout = () => {
    handleCartClose();
    navigate('/checkout');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 10,
        backgroundImage: 'linear-gradient(to right, #0d7510, #0aa30e)', // Degradado de izquierda a derecha
        padding: '0 20px', // Añadido padding para la consistencia
        borderBottomLeftRadius: '20px', // Valor para redondear esquina inferior izquierda
        borderBottomRightRadius: '20px', // Valor para redondear esquina inferior derecha
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Imagen de la tienda */}
        <Box sx={{ display: 'flex', alignItems: 'center' }} >
          <Button href="/">
            <img
              src="https://ecoplastics.store/wp-content/uploads/2022/09/blanco-01.png"
              alt="Logo de la tienda"
              style={{ height: '60px', objectFit: 'contain' }} // Ajusta el tamaño según sea necesario
            />
          </Button>
        </Box>

        {/* Contenedor de los elementos de la derecha */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Input de búsqueda con estilo outlined en blanco */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: '300px' }}>
            <TextField
              variant="outlined"
              placeholder="Buscar productos..."
              size="small"
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'white' }} />,
                style: {
                  color: 'white',
                  borderColor: 'white',
                },
              }}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // Borde en blanco
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // Borde en blanco al hacer hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // Borde en blanco cuando está enfocado
                  },
                },
              }}
            />
          </Box>
          {/* Botón del carrito de compras */}
          <IconButton
            aria-label="cart"
            onClick={handleCartOpen}
            color="inherit"
          >
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <CartPopover
            open={Boolean(cartAnchorEl)}
            anchorEl={cartAnchorEl}
            onClose={handleCartClose}
            onCheckout={handleProceedToCheckout}
          />
          {/* Menú de usuario */}
          <Box>
            <Avatar
              src={avatar}
              onClick={handleMenuOpen}
              sx={{ cursor: 'pointer' }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {user ? (
                [
                  <MenuItem key="profile" onClick={() => handleMenuItemClick('/profile')}>Perfil</MenuItem>,
                  <MenuItem key="orders" onClick={() => handleMenuItemClick('/orders')}>Pedidos</MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout} >Logout</MenuItem>
                ]
              ) : (
                [
                  <MenuItem key="login" onClick={() => handleMenuItemClick('/login')}>Iniciar sesión</MenuItem>,
                  <MenuItem key="register" onClick={() => handleMenuItemClick('/register')}>Registrarse</MenuItem>
                ]
              )}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;