import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoggedOut } from '../store/actions/authActions';

const guestRoutes = [
  { id: 2, title: 'Login', url: '/login' },
  { id: 3, title: 'Register', url: '/register' },
];

const loggedRoutes = [
  { id: 2, title: 'Find Jobs', url: '/jobs' }
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const logoutUser = () => {
    dispatch(setIsLoggedOut());
    navigate("/")
  };
  const userLogged = useSelector(state => state.auth.user);
  let navRoutes = userLogged ? loggedRoutes : guestRoutes;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'rgba(255,255,255,0.93)',
        boxShadow: '0 2px 24px 0 rgba(21,78,220,0.06)',
        borderBottomLeftRadius: { xs: 0, md: 22 },
        borderBottomRightRadius: { xs: 0, md: 22 },
        backdropFilter: 'blur(8px)',
        transition: 'all .24s cubic-bezier(.55,0,.1,1)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 72, px: { xs: 0, md: 3 } }}>
          {/* Logo desktop */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#1976d2', fontSize: 34 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 900,
              letterSpacing: '.08em',
              color: '#1976d2',
              textDecoration: 'none',
              fontSize: 28,
            }}
          >
            FindYourJob
          </Typography>

          {/* Burger icon mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#1976d2' }}
            >
              <MenuIcon sx={{ fontSize: 34 }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                mt: 1,
                '.MuiMenu-paper': { borderRadius: 3, boxShadow: '0 4px 16px 0 rgba(30,90,200,0.13)' }
              }}
            >
              {navRoutes.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu} sx={{ px: 3 }}>
                  <NavLink
                    to={page.url}
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      color: isActive ? '#1976d2' : '#222',
                      fontWeight: isActive ? 800 : 500,
                      fontSize: 18
                    })}
                  >
                    <Typography sx={{ textAlign: 'center' }}>{page.title}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
              {userLogged && userLogged.role === "user" && (
                <MenuItem onClick={handleCloseNavMenu} sx={{ px: 3 }}>
                  <NavLink to={`${userLogged.id}/applications`} style={{
                    textDecoration: 'none', color: '#1976d2', fontWeight: 700, fontSize: 18
                  }}>
                    <Typography sx={{ textAlign: 'center' }}>Applications</Typography>
                  </NavLink>
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* Logo mobile */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#1976d2', fontSize: 28 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 900,
              letterSpacing: '.08em',
              color: '#1976d2',
              textDecoration: 'none',
              fontSize: 22,
            }}
          >
            FindYourJob
          </Typography>

          {/* Menu desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 3 }}>
            {navRoutes.map((page) => (
              <Button
                key={page.id}
                sx={{
                  my: 2,
                  mx: 1.5,
                  px: 2,
                  py: 1,
                  color: '#1976d2',
                  fontWeight: 700,
                  fontSize: 18,
                  borderRadius: 3,
                  background: 'transparent',
                  textTransform: 'none',
                  transition: 'all .17s',
                  '&:hover': {
                    background: 'rgba(25,118,210,0.08)',
                    color: '#14459a',
                    boxShadow: '0 2px 0 #1976d2'
                  }
                }}
              >
                <NavLink
                  to={page.url}
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    color: isActive ? '#14459a' : '#1976d2',
                    borderBottom: isActive ? '2.5px solid #1976d2' : '2.5px solid transparent',
                    paddingBottom: 3,
                    fontWeight: isActive ? 900 : 700,
                    transition: 'border .16s'
                  })}
                >
                  {page.title}
                </NavLink>
              </Button>
            ))}
            {userLogged && userLogged.role === "user" && (
              <Button
                sx={{
                  my: 2, mx: 1.5, px: 2, py: 1, color: '#1976d2', fontWeight: 700, fontSize: 18, borderRadius: 3,
                  background: 'transparent', textTransform: 'none',
                  '&:hover': {
                    background: 'rgba(25,118,210,0.08)', color: '#14459a'
                  }
                }}
              >
                <NavLink to={`${userLogged.id}/applications`} style={{
                  textDecoration: 'none', color: '#1976d2', borderBottom: '2.5px solid transparent', paddingBottom: 3, fontWeight: 800
                }}>
                  Applications
                </NavLink>
              </Button>
            )}
          </Box>

          {/* Avatar menu */}
          {userLogged && (
            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <Tooltip title="Impostazioni account">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                    border: '2px solid #e0eafd',
                    boxShadow: '0 2px 14px 0 rgba(25,118,210,0.07)',
                    transition: 'box-shadow .18s',
                    '&:hover': {
                      boxShadow: '0 4px 28px 0 rgba(25,118,210,0.17)'
                    }
                  }}
                >
                  <Avatar alt={userLogged.name || "Utente"} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px', '.MuiMenu-paper': { borderRadius: 3 } }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => { handleCloseUserMenu(); logoutUser(); }}>
                  <Typography sx={{ textAlign: 'center', color: '#1976d2', fontWeight: 800 }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;