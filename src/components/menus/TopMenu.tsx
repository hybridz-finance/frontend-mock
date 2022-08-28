import React,{useEffect,useState,useRef,MouseEvent} from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import history from '../../history';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PreviewIcon from '@mui/icons-material/Preview';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useGlobalState, GlobalStateInterface } from './../context/GlobalStateProvider';
import {useLocation} from 'react-router-dom';


const styles = {
  item:{
    height:48,
    width:124,
    ml:0.4,
    mr:0.4,
    color:"rgb(255, 255, 255)",
    transition:'0.4s',
    '&:hover':{
      color:'#952a6c',
    }
  },
  box:{
    border:1,
    backgroundColor:"rgba(25, 27, 31, 0.616)",
    //backgroundColor:"rgb(33, 36, 41)",
    height:56,
    width:256,
    alignItems:'center',
    borderRadius:2,
    borderColor: "rgb(59, 64, 73)",
  },

  menu:{
    width:200,
    backgroundColor:"rgb(54, 59, 68)",
    borderRadius:4,
    padding:1,
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


export default function MenuListComposition() {
  const location = useLocation();

  const anchorRef = useRef<HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setState,state } = useGlobalState();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log("STATE: ")
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleState = (newState:string)=>{
    setState({page:newState})
  }

   
  
  useEffect(()=>{
    const path = location.pathname;
    if(path.substring(0,2)=='/D'){
      setState({page:'dashboard'})
    } else {
      setState({page:'gallery'})
    }
  },[location])



  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between"  sx={styles.box}>

      <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={()=>{
            handleState('gallery');
            history.push('/Gallery');
            }}
          sx={[styles.item,{...(state.page === 'gallery' &&{
   
            backgroundColor:"rgb(33, 36, 41)",
            borderRadius:2,
            color:'#952a6c',
          })}]}
        >
          Gallery
        </Button>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          sx={[styles.item,{...(state.page === 'dashboard' &&{
    
            backgroundColor:"rgb(33, 36, 41)",
            borderRadius:2,
            color:'#952a6c',
          })}]}
        >
          Dashboard
        </Button>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper  sx={styles.menu}>
                <ClickAwayListener onClickAway={handleClose}>
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

                      <MenuItem  onClick={() => {
                        history.push('/Dashboard');
                        handleState('dashboard');}} sx={styles.menu}>
                      {'Dashboard'} <DashboardIcon sx={styles.icon}/>
                      </MenuItem>
                      <Divider/>
                      <MenuItem  onClick={() => {
                        history.push('/Dashboard/showroom');
                        handleState('dashboard');}} sx={styles.menu}>
                      {'Showroom'} <PreviewIcon sx={styles.icon}/>
                      </MenuItem>
                      <MenuItem  onClick={() => {
                        history.push('/Dashboard/bidsoffers');
                        handleState('dashboard');}} sx={styles.menu}>
                      {'Bids & Offers'} <StorefrontIcon sx={styles.icon}/>
                      </MenuItem>
                  
                  </Menu>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      

    </Stack>
  );
}