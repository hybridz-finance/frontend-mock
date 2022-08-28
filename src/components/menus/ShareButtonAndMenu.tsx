import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';

import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import history from '../../history';
import Divider from '@mui/material/Divider';

import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Fade from '@mui/material/Fade';

import ShareIcon from '@mui/icons-material/Share';
import {TelegramShareButton, FacebookShareButton, TwitterShareButton,WhatsappShareButton} from "react-share";
import Tooltip from '@mui/material/Tooltip';


const styles = {
  gallery:{
    color:'#952a6c',
  },
  dashboard:{
    color:'#952a6c',
  },
  box:{
 
    //borderColor:"rgb(33, 36, 41)",
    height:56,
    width:56,
    display:"flex",
    justifyContent:'center',
    alignItems:'center',
    borderRadius:2,
    transition:'0.4s',
    '&:hover':{
      //borderColor: "rgb(59, 64, 73)", 
    }
  },
  menu:{
    color:"#cfcece",
    fontWeight:550,
    lineHeight:2,
    display:"flex",
    justifyContent:'space-between',
    alignItems:'center',
    '&:hover':{
      color:'#952a6c',
    }
  },
  icon:{
    color:"rgb(194, 172, 173)",
    transition:'0.4s',
    '&:hover':{
      transform:'scale(1.4)',
      color:'#952a6c',
    }
  },
  socialMediaPopper: {
    top: "300px",
    left: "unset",
    right: "0px",
  
    display:"flex",
    justifyContent:'space-between',
  },
  socialMediaButton: {
    border:1,
    '&:hover': {
      height: "50px",
      width: "50px",
    },
  },
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
      
      <Tooltip title="share" sx={{width:100}}>
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
        <ShareIcon />
      </IconButton>
      </Box>
      </Tooltip>
      
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
            border:1,
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            backgroundColor:"rgb(54, 59, 68)",
            borderRadius:8,
            color:'#fff',
            padding:1,
            display:'flex',
            justifyContent:'space-between'
          },
        }}
        
      >   <MenuItem sx={styles.menu}>
            <WhatsappShareButton
              url={"http://www.protocosm.com"}
              title={"Protocosm - World is yours to explore"}
              separator=":: "
              style={styles.socialMediaButton}
            >
               <WhatsAppIcon sx={styles.icon}/> {'WhatsApp'}
            </WhatsappShareButton>
          </MenuItem>
            
        
          <MenuItem sx={styles.menu}>
            <FacebookShareButton
              url={"http://www.protocosm.com"}
              quote={"Protocosm - World is yours to explore"}
              hashtag="#protocosm"
              style={styles.socialMediaButton}
            >
              <FacebookIcon sx={styles.icon}/> {'Facebook'} 
            </FacebookShareButton>
          </MenuItem>

          <MenuItem sx={styles.menu}>
            <TwitterShareButton
              url={"http://www.protocosm.com"}
              title={"Protocosm - World is yours to explore"}
              style={styles.socialMediaButton}
              >
               <TwitterIcon sx={styles.icon}/> {'Twitter'}
            </TwitterShareButton>
          </MenuItem>

          <MenuItem sx={styles.menu}>
            <TelegramShareButton
              url={"http://www.protocosm.com"}
              title={"Protocosm - World is yours to explore"}
              style={styles.socialMediaButton}
              >
            <TelegramIcon sx={styles.icon}/> {'Telegram'}
           </TelegramShareButton>
          </MenuItem>

       
      </Menu>
    </div>
  );
}