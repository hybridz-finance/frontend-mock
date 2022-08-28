import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';

import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import history from '../../history';
import Divider from '@mui/material/Divider';

import PaletteIcon from '@mui/icons-material/Palette';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PreviewIcon from '@mui/icons-material/Preview';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StorefrontIcon from '@mui/icons-material/Storefront';



const styles = {
  gallery:{
    color:'#952a6c',
  },
  dashboard:{
    color:'#952a6c',
  },
  box:{
    border:1,
    borderColor:"rgb(33, 36, 41)",

    backgroundColor:"rgb(33, 36, 41)",
    height:56,
    width:56,
    display:"flex",
    justifyContent:'center',
    alignItems:'center',
    borderRadius:2,
    transition:'0.4s',
    '&:hover':{
      backgroundColor:"rgb(25, 27, 31)",
      borderColor: "rgb(59, 64, 73)",
    }
  },
  menu:{
    color:"#cfcece",
    fontWeight:550,
    lineHeight:2,
    display:"flex",
    justifyContent:'space-between',
    '&:hover':{
      color:'#952a6c',
    }
    
    },

  icon:{
    color:"rgb(194, 172, 173)",
  }
}

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    
  };

  return (
    <div>
      <Box sx={styles.box}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={styles.icon}
      >
        <MoreVertIcon />
      </IconButton>
      </Box>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            backgroundColor:"rgb(54, 59, 68)",
            borderRadius:8,
            color:'#fff',
            padding:1,
          },
        }}
        
      >
        
          <MenuItem  onClick={() => history.push('/Gallery')} sx={styles.menu}>
           {'Gallery'} <PaletteIcon sx={styles.icon}/>
          </MenuItem>
          <MenuItem  onClick={() => history.push('/Dashboard')} sx={styles.menu}>
           {'Dashboard'} <DashboardIcon sx={styles.icon}/>
          </MenuItem>
          <Divider/>
          <MenuItem  onClick={() => history.push('/Dashboard/showroom')} sx={styles.menu}>
           {'Showroom'} <PreviewIcon sx={styles.icon}/>
          </MenuItem>
          <MenuItem  onClick={() => history.push('/Dashboard/bidsoffers')} sx={styles.menu}>
           {'Bids & Offers'} <StorefrontIcon sx={styles.icon}/>
          </MenuItem>
       
      </Menu>
    </div>
  );
}