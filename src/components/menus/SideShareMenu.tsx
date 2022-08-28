
import React from 'react';
import HelmetMetaData from "../helmet/helmetMetaData";
import {FacebookShareButton, TwitterShareButton,WhatsappShareButton} from "react-share";
import Popper from '@mui/material/Popper';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsappIcon from '@mui/icons-material/WhatsApp';

const styles ={

  socialMediaPopper: {
    top: "300px",
    left: "unset",
    right: "0px",
    display: "grid",
  },
  socialMediaButton: {
    border:1,
    '&:hover': {
      height: "50px",
      width: "50px",
    },
  },
  icon:{
    fontSize:60,
    color:"rgb(53, 59, 68)",
    transition:'0.4s',
    '&:hover':{
      transform:'scale(1.3)',
      color:'#952a6c',
    }
  }
}






export default function Some(){
  return(
    <>
      <HelmetMetaData></HelmetMetaData>
      <Popper style={styles.socialMediaPopper} open={true} transition>
        <FacebookShareButton
          url={"http://www.protocosm.com"}
          quote={"Protocosm - World is yours to explore"}
          hashtag="#protocosm"
          style={styles.socialMediaButton}>
          <FacebookIcon sx={styles.icon}/>
        </FacebookShareButton>
        <TwitterShareButton
          url={"http://www.protocosm.com"}
          title={"Protocosm - World is yours to explore"}
          style={styles.socialMediaButton}>
          <TwitterIcon  sx={styles.icon}/>
        </TwitterShareButton>
        <WhatsappShareButton
          url={"http://www.protocosm.com"}
          title={"Protocosm - World is yours to explore"}
          separator=":: "
          style={styles.socialMediaButton}>
          <WhatsappIcon  sx={styles.icon}/>
        </WhatsappShareButton>
      </Popper>
    </>
  )
}