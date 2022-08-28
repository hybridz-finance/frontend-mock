import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useWeb3React } from '@web3-react/core'
import {injected} from './wallet/injected';
import useBalance from './wallet/useBalance';
import { Web3Provider } from '@ethersproject/providers'
import museum from './assets/protocosm.png';
import history from './../history';
import TopMenu from './menus/TopMenu';
import CollapsedMenu from  './menus/CollapsedTopMenu';
import Some from './menus/SideShareMenu';
const  TokenListMainnet = require('./contracts/tokens-MAINNET.json');





const styles = {
  full: {
    //flexGrow: 1,
    //overflow: 'auto',
    justifyContent: "center",
    height:'100vh',
  },
  
  connectBox:{
    pr:0.2,
    backgroundColor:"rgba(25, 27, 31, 0.294)",
    width:256,
    height:56,
    border:1,
    borderColor: "rgb(59, 64, 73)",
  },
  navBox:{
    backgroundColor:"rgb(33, 36, 41)",
    height:56,
    width:256,
    justifyContent:'center',
  },
  balanceBox:{
    ml:4,
    ['@media (max-width:500px)']: { // eslint-disable-line no-useless-computed-key
      display:'none'
    }
  },
  button:{

    //justifySelf:'flex-end',
    color:'#952a6c',
    border:1,
    borderColor:"rgb(25, 27, 31)",
    backgroundColor:"rgb(33, 36, 41)",
    
    borderRadius:2,
    pl:2,
    pr:2,
    height:48,
    zIndex:1,
    mr:0.4,
    '&:hover':{
      borderColor: "rgb(59, 64, 73)",
    }
  },
  buttonConnect:{
    width:256,
    minWidth:80,
    height:56,
    backgroundColor:"rgb(25, 27, 31)",
    color:'#952a6c',
    border:0.4,
    borderRadius:2,
    m:"1px",
    pl:1,
    pr:1,
    '&:hover':{
      borderColor: "rgb(59, 64, 73)",
    },
  },
  img:{
    height:56,
  },
  imgBox:{
    display:'block',
    ['@media (max-width:900px)']: { // eslint-disable-line no-useless-computed-key
      display:'none',
      width:'100%',
    }
  },

}


type TokenList={
  name:string,
  address:string,
  symbol:string,
  decimals:number
}


export default function ConnectBar({children}:any) {
  const context = useWeb3React<Web3Provider>()
  const {active, account, library, connector, activate, deactivate} = context;
  const [selectedToken, setSelectedToken] = useState<TokenList>(TokenListMainnet[0])
  const [isActive, setIsActive] = useState<number>();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);




  useEffect(() => {
    console.log("doing something")
      window.addEventListener("resize", () => {
          const ismobile = window.innerWidth < 900;
          if (ismobile !== isMobile) setIsMobile(ismobile);
      }, false);
  }, [isMobile,window.innerWidth]);
 

  const [balance] = useBalance(
      selectedToken.address,
      selectedToken.decimals
    )


  async function connect(){
    try{
      await activate(injected);

    } catch(ex) {
      console.log(ex);
    }
  }

 
 
  
  function Navigate(){

    return(
      <Box
        display="flex"
        alignItems="center"
  
        sx={[styles.navBox]}>

        <Box px="3">
          <Button onClick={() => {
            history.push('/Dashboard');
            setIsActive(1)}} 
            sx={{backgroundColor:"rgb(33, 36, 41)",
            ...(isActive == 1 && {backgroundColor:"rgb(25, 27, 31)",})
          }}>
            <Typography color="white" fontSize="md" >
              Dashboard
            </Typography>
          </Button>
        </Box>
        <Button 
          onClick={() => {
            history.push('/Gallery');
            setIsActive(2)}} 
          sx={{backgroundColor:"rgb(33, 36, 41)",
          ...(isActive == 2 && {backgroundColor:"rgb(25, 27, 31)",})}}>
          <Typography color="white" fontSize="md" fontWeight="medium" mr="2">
            Gallery
          </Typography>
        </Button>
    </Box>

    )
  }

  function Logo(){

    return(
      <Box
        display="flex"
        alignItems="center"
        sx={{width:'100%'}}>
        <Box sx={styles.imgBox}>
          <img src={museum} onClick={()=>history.push('/')} style={styles.img}/>
        </Box>
      </Box>
    )
  }


  function ConnectButton(){
    return active ? (
      <Box
        display="flex"
        alignItems="center"
        borderRadius={2}
        justifyContent="space-between"
        sx={styles.connectBox}>
      <Box display="flex" justifyContent="left" sx={styles.balanceBox}>
        <Typography color="white" fontSize="md" >
          {`Ξ${balance}`}
        </Typography>
      </Box>
      <Button sx={styles.button}>
        {account &&
          `${account.slice(0, 6)}...${account.slice(
            account.length - 4,
            account.length
          )}`}
      </Button>
    </Box>
    ) : (
    <Button 
      
      sx={styles.buttonConnect} 
      onClick={() => {connect()}}>
      connect
    </Button>
    );  
  }

  function Show(){

 
    return(

      <Grid container direction="row" justifyContent="center" maxWidth={2000} pl={4} pr={4} pt={4} md={12}>
        <Grid container item display="flex" justifyContent="right" md={12}>
         
         <Grid item display="flex" justifyContent="center" md={4} sx={{ 
            position: "absolute",
            top:"140%",
            left:"21%",
            transform:"translate(-50%, -50%)",
            }}>
            <Logo/>
          </Grid>

          <Grid item display="flex" justifyContent="center" md={4} sx={{ 
            position: "absolute",
            top:"140%",
            left:"50%",
            transform:"translate(-50%, -50%)",
            ['@media (max-width:899px)']: { // eslint-disable-line no-useless-computed-key
              top:"140%",
              left:"10%",
            }}}>
          {isMobile?
            <CollapsedMenu/>
          :
            <TopMenu/>
          }
                  
          </Grid>
          <Grid item display="flex" justifyContent="center" md={4} sx={{ 
            position: "absolute",
            top:"140%",
            left:"79%",
            transform:"translate(-50%, -50%)",
            }}>
            <ConnectButton/>
          </Grid>
        </Grid>
      </Grid>
    )
  }


  return(
    
    <Box
      component="main"
      display="flex"
      sx={styles.full}>

      <Grid container display="flex" justifyContent='center'>
        <Grid item  display="flex" sx={{position:'absolute',zIndex:'1',width:"100%",display:'flex',justifyContent:'center'}}>
            <Show/>
            <Some/>
        </Grid>

        <Grid item maxWidth={1520} display="flex" justifyContent='center' alignItems="center" sx={{width:"100%",display:'flex'}}>
            {children}
        </Grid>
      </Grid>
      
    </Box>
    
  )
  
  
}