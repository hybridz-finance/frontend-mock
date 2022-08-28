
import React,{useState,useEffect} from "react";
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import history from './../history';
import {ethers} from 'ethers';

import { OpenSeaPort, Network } from 'opensea-js'
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import ConnectBar from './ConnectButton';
import Skeleton from '@mui/material/Skeleton';
import Fade from 'react-reveal/Fade';
import ShareMenu from './menus/ShareButtonAndMenu';

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')


const styles = {
  container:{
    justifyContent: 'space-between',
  },
  item:{
    width:'100%',
  },
  text: {
    color:'#fff',
    fontSize: 16,
    width:456,
    mt:4,
  },
  textHeading:{
    color:'#fff',
    fontSize: 32,
    fontWeight: 'bold',
    
  },

  button_1:{
    width:456,
    height:72,
    border:1,
    borderRadius:4,
    borderColor: "rgb(116, 126, 143)",
    //backgroundColor:"rgb(33, 36, 41)",
    color:'white',

    transition:'0.4s',
    '&:hover':{
      backgroundColor:"#dacccc",
      color:'#952a6c',
      borderColor:'#952a6c',
    }
  },

  img:{
    height: 552,
    borderRadius:4,
  },
  container2:{
    display:'contents',
    alignItems:'center',
    height:'100%',
    
  },
  box:{
    border:1,
    borderColor: "rgb(59, 64, 73)",
    width:524,
    height:552,
    backgroundColor:"rgba(25, 27, 31, 0.486)",
    borderRadius:4,
    transition:'0.4s',
    justifyContent:'space-between',
    '&:hover':{
      borderColor: "rgb(59, 64, 73)",
    }
  },
}



export default function Art(artPiece:any){

  const context = useWeb3React<Web3Provider>()
  const {active, library, connector, activate, deactivate} = context;
  const [owned, setOwned] = useState(false);
  const [loading, setLoading] = useState(false);
  const etherscanApiKey = "GS87EP275GN8KZ4CSV8C97ING3KZHCPGJI";

  const asset = artPiece.location.state.artPiece;
  const account = "0x51d9676f4934e06c45dde9c3c93e9707b0b4f2f2";

  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main,
    //apiKey: YOUR_API_KEY
  })




  const validateOwner = async (contractAddress:string, abi:any, tokenID:any) => {
    try{
      const signer = library?.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      const owner = await contract.ownerOf(tokenID);
      if(owner.toLowerCase() == account){
        return true;
      } return false;
    } catch(error) {
      console.log(error);
      throw new Error(error as any);
    }
  } 
  const getContractABI = async (contractAddress:string) => {
    try {
      let url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${etherscanApiKey}`
      const response = await axios.get(url); 
      return response.data.result;
    } catch (error) {
      throw new Error(error as any);
    }
}

  useEffect( ()=>{
    if(active){
      const getAbi = async () =>{
        try{
          setLoading(true)
          let abi = asset.abi;
          if(!asset.abi){
            abi = await getContractABI(asset.tokenAddress);
          }
          let isOwner = await validateOwner(asset.tokenAddress,abi,asset.tokenId)
          setOwned(isOwner)
          setLoading(false)
        }catch(error){
          console.log(error);
          setLoading(false);
        }
      }
      getAbi()
    }
  },[active])


  const loadText = () =>{
    return(
      <>
        <Skeleton variant="text" width={456} height={24} sx={{backgroundColor:"rgb(38, 40, 46)"}}/>
        <Skeleton variant="text"  width={456} height={24} sx={{backgroundColor:"rgb(38, 40, 46)"}}/>
        <Skeleton variant="text" width={456} height={24} sx={{mb:2,backgroundColor:"rgb(38, 40, 46)"}}/>
      </>
    )
  }



  function ShowTEST(){
    return(
      <>

          <Grid container pt={12} maxWidth={1112} sx={styles.container}>
            <Grid container item md={6} sm={12} display="flex" justifyContent="flex-start" alignContent="center" minHeight={450} 
              sx={{flexWrap: 'wrap',flexDirection:'column', position:'relative',    
                ['@media (max-width:900px)']: { // eslint-disable-line no-useless-computed-key
                  mb:10,} }}>
              <Grid item>
                <Skeleton variant="text" width={256} height={80} sx={{mb:8,backgroundColor:"rgb(38, 40, 46)"}}/>
              </Grid>
              <Grid item>
                {loadText()}
                {loadText()}
                {loadText()}
              </Grid>
              <Grid item >
                <Skeleton variant="rectangular" width={456}  height={70} sx={{borderRadius:4,mt:12,backgroundColor:"rgb(38, 40, 46)"}}/>
              </Grid>

            </Grid>
              <Grid item md={6} display="flex" justifyContent="center" sx={styles.item}>
              <Skeleton variant="rectangular" width={552} height={552} sx={{borderRadius:8,backgroundColor:"rgb(38, 40, 46)",}}/>
            </Grid>
          </Grid>

        </>
        )
      }
  


  function Show(){
    return(
      <>
        {loading? 

          <Grid container pt={12} maxWidth={1112} sx={styles.container}>
            
            <Grid container item md={6} sm={12} display="flex" justifyContent="flex-start" alignContent="center" minHeight={456} 
              sx={{flexWrap: 'wrap',flexDirection:'column', position:'relative',    
                ['@media (max-width:900px)']: { // eslint-disable-line no-useless-computed-key
                  mb:8,} }}>
              <Grid item>
                <Skeleton variant="text" width={256} height={80} sx={{mb:8,backgroundColor:"rgb(38, 40, 46)"}}/>
              </Grid>
              <Grid item>
                {loadText()}
                {loadText()}
                {loadText()}
              </Grid>
              <Grid item >
                <Skeleton variant="rectangular" width={456}  height={72} sx={{borderRadius:4,mt:12,backgroundColor:"rgb(38, 40, 46)"}}/>
              </Grid>

            </Grid>
              <Grid item md={6} display="flex" justifyContent="center" sx={styles.item}>
              <Skeleton variant="rectangular" width={556} height={556} sx={{borderRadius:8,backgroundColor:"rgb(38, 40, 46)",}}/>
            </Grid>
          </Grid>

        
        :
          <Grid container pt={12}  maxWidth={1152}  sx={styles.container}>


              <Grid container item md={6} sm={12} display="flex" justifyContent="flex-start" alignContent="center" minHeight={456} 
                sx={{flexWrap: 'wrap',flexDirection:'column', position:'relative',    
                  ['@media (max-width:900px)']: { // eslint-disable-line no-useless-computed-key
                    mb:8,} }}>
                
                  <Grid container item sx={styles.container2}>
                    <Box sx={styles.box}>

                      <Grid container item sx={{p:4,height:'100%'}}>

                        <Grid item md={12} sx={{}}>
                          <Fade>
                            <Typography sx={styles.textHeading}>
                              {asset.name}
                            </Typography>
                          </Fade>
                        </Grid>
                        <Grid item md={12} sx={{}}>
                          <ShareMenu/>
                        </Grid>
                        <Grid item md={12} sx={{}}>
                          <Fade>
                            <Typography sx={styles.text}>
                              Tresou nanama saka del elde fel roj goska haga nom
                              los ti ki mi neretal oj sif radviful. toli somig
                              dolit fol roli golska da man ren tee fre super sa
                              as opuss du nära eheller sen då mig kom s
                              asg.
                            </Typography>
            
                            <Typography sx={styles.text}>
              
                            </Typography>
                          </Fade>
                        </Grid>
                        <Grid item md={12} sx={{}}>
                          {owned ? 
                            <>
                              <Fade>
                                <Button 
                                  onClick={() => 
                                    history.push('/collections/art/sell',{ASSET:asset})}
                                  sx={styles.button_1}>
                                    SELL
                                </Button>
                              </Fade>
                            </>
                          :
                            <>
                              <Fade>
                                <Button 
                                  onClick={() => 
                                    history.push('/collections/art/buy',{ASSET:asset})}
                                  sx={styles.button_1}>
                                  BUY
                                </Button>
                              </Fade>
                            </> 
                          }
                      </Grid>
                      
                      </Grid>
                    </Box>
                  </Grid>
                        
              </Grid>
                        
              <Grid item md={6} display="flex" justifyContent="center" sx={styles.item}>
                <Fade>
                  <CardMedia sx={styles.img}
                    component="img"
                    src={asset.imageUrlOriginal}/>
                </Fade>
              </Grid>
          </Grid>
        }
      </>
    )
  }

  return(
    <>
      <ConnectBar children={Show()}/>
    </>
  )
}


//alignSelf:"center",position:'absolute',bottom:0,left:0,right:0,textAlign:'center'