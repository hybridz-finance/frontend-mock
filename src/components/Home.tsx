
import React,{useState,useEffect} from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import history from './../history';
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { OpenSeaPort, Network } from 'opensea-js'
import { WyvernSchemaName } from "opensea-js/lib/types"
import Web3 from 'web3';
import ConnectBar from './ConnectButton';
import Skeleton from '@mui/material/Skeleton';
import CardMedia from '@mui/material/CardMedia';
import ShareIcon from '@mui/icons-material/Share';

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')



interface Asset {
  // The asset's token ID, or null if ERC-20
  tokenId: string | null,
  tokenAddress: string,
  // The Wyvern schema name (defaults to "ERC721") for this asset
  schemaName?: WyvernSchemaName,
  // Optional for ENS names
  name?: string,
  decimals?: number,
  imageUrlOriginal?: string
}





const styles = {
  container:{
    mt:12,
  },
  item:{
    width:1000,
    display:'flex',
    height:504,
    ['@media (max-width:1000px)']: { // eslint-disable-line no-useless-computed-key
      width:'80%',
      height:'auto'
      
     }
 
    
  },
  text: {
    color:'#fff',
    fontSize: 24,
    marginBottom: 8,
  },
  textHeading:{
    color:'#fff',
    fontSize: 40,
    fontWeight:'bold',
  },

  button_1:{
    width:280,
    height:80,
    border:1,
    borderRadius:4,
    color:'#952a6c',
    backgroundColor:"rgb(25, 27, 31)",
    '&:hover':{
      borderColor: "rgb(59, 64, 73)",
    }
  },
  img:{
    width:256,
    height: 256,
    borderRadius:4,
    transition: '0.4s',
    border:1,
    borderColor:"#fff",
    '&:hover': {
      boxShadow:  "0 0 5px  white",  //,-5px -5px   white",
        transform: 'scale(1.05)',
        border: 1,
        borderColor: '#D6D6FF',
      },
  },
  
  box:{
    height:504,
    width:400,
    backgroundColor:"rgb(33, 36, 41)",
    borderRadius:8, 
  },   

  skeleton:{
    backgroundColor:"rgb(25, 27, 31)",
    borderRadius:8,
    justifyContent:"center",
  },
}



export default function Gallery(){
 
  const context = useWeb3React<Web3Provider>()

  const {active, account, library, connector, activate, deactivate} = context;

  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main,
    //apiKey: YOUR_API_KEY
    })
  
  const [isActive, setIsActive] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [col1, setCol1] = useState<Asset>();
  const [col2, setCol2] = useState<Asset>();
  const [col3, setCol3] = useState<Asset>();

  const [place, setPlace] = useState({place1:1,place2:2,place3:3})

  const fetchAssets = async () => {
    try {
      setLoading(true)
      let c1 = await seaport.api.getAsset({tokenAddress: "0x06012c8cf97bead5deae237070f9587f8e7a266d",tokenId: "1", })
      .then((asset) => {console.log(asset);setCol1(asset)})
      let c2 = await seaport.api.getAsset({tokenAddress: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",tokenId: "1", })
      .then((asset) => { setCol2(asset) })
      let c3 = await seaport.api.getAsset({tokenAddress: "0x2acab3dea77832c09420663b0e1cb386031ba17b",tokenId: "1", })
      .then((asset) => { setCol3(asset) })
      const response1 = c1;
      const response2 = c2;
      const response3 = c3;
      setLoading(false)
    } catch(error) {
      setLoading(false);
      console.error(error);
    } 
  }


  useEffect(() => {
    fetchAssets();
    setIsActive(2)
  },[]) 

  const vals = {
    from: {transform: 'translate(0%, 0)'},
    to: [{transform: 'translate(0, 0)'}],
    durations: ['0s']
  }


  function Test(){
    return(
      <Grid container display="flex" justifyContent="center" sx={{height:300,width:900,backgroundColor:"#524040"}}>
        <Box 
          onClick={()=>setPlace({place1:3,place2:1,place3:2})}
          sx={{height:300,width:300,backgroundColor:"#5f41b3",borderRadius:10,transition:"0.5s",
          ...place=={place1:3,place2:1,place3:2}&&{
            transform: 'translateX(50%,0)',
          }}}>
          
        </Box>
        <Box 
          onClick={()=>setPlace({place1:1,place2:2,place3:3})}
          sx={{height:300,width:300,backgroundColor:"#5f41b3",borderRadius:10,transition:"0.5s"}}>

        </Box>
        <Box 
          onClick={()=>setPlace({place1:2,place2:3,place3:1})}
          sx={{height:300,width:300,backgroundColor:"#5f41b3",borderRadius:10,transition:"0.5s"}}>

        </Box>
      </Grid>
    )
  }


  function Show(){


    return(
      <>
        <Grid container>
          <Grid item md={12} mb={12} display="flex" justifyContent="center" >
            <Typography sx={styles.textHeading}>
              Our Collections
            </Typography>
          </Grid>
          <Grid item md={12} display="flex" justifyContent="center" 
            sx={{width:1008,height:504}}>

            <Box display="flex" justifyContent="center" onClick={()=>setIsActive(1)} sx={{
              border:1,
              height:400,
              width:304,
              backgroundColor:"rgb(25, 27, 31)",
              borderRadius:8,
              zIndex:1,
              transition: '0.4s',
              justifyContent:'center',
              ['@media (max-width:1000px)']: { // eslint-disable-line no-useless-computed-key
                width:'80%',
                height:'auto', 
              },
              ...(isActive == 1 && {
                borderColor:'#ffffffc5',
                boxShadow:  "0 0 10px  white",
                backgroundColor:"rgb(33, 36, 41)",
                height:504,
                width:400,
                zIndex:2,
                transform: 'translate(18.75em,0)',
              }),
              ...(isActive == 3 && {
                transform: 'translate(43.75em,0)',
                }),
            }}>
            
              <Grid container display="flex" justifyContent="center" p={3}>
                <Grid item display="flex" justifyContent="center">
                {loading?
                    <Skeleton variant="rectangular" width={256} height={256} sx={{borderRadius:8,backgroundColor:"rgb(38, 40, 46)",}}/>
                :   
              
                    <img src={col1?.imageUrlOriginal} style={
                      {width:256,
                      height:256,
                      justifyContent:'center',
                      borderRadius:24,
                      opacity:'30%',
                      transition:'0.4s',
                      ...(isActive == 1 && {
                        height:352,
                        width:352,
                        opacity:'100%',
                      }),
                    }}/>
                }
                  
                </Grid>
                <Grid item display="flex" justifyContent='center' md={12}>
                  <Button fullWidth onClick={()=> 
                    history.push('/collections', {Collection:col1})} 
                    sx={{
                      height:56,
                      border:1,
                      backgroundColor:"rgb(25, 27, 31)",
                      borderColor:"rgb(25, 27, 31)",
                      color:'#952a6c',
                      opacity:'30%',
                      borderRadius:4,
                      transition:'0.4s',
                      '&:hover':{
                        borderColor: "rgb(59, 64, 73)",
                      },
                      ...(isActive == 1 && {
                        height:60,
                        opacity:'100%',
                      }),
                    }}>
                    show
                  </Button>
                </Grid>
              </Grid>
            </Box>

                        
            <Box display="flex" justifyContent="center" onClick={()=>setIsActive(2)} sx={{
              border:1,
              height:400,
              width:304,
              backgroundColor:"rgb(25, 27, 31)",
              borderRadius:8,
              zIndex:1,
              transition: '0.4s',
              justifyContent:'center',
              ['@media (max-width:1000px)']: { // eslint-disable-line no-useless-computed-key
                width:'80%',
                height:'auto', 
              },
              ...(isActive == 2 && {
                borderColor:'#ffffffc5',
                boxShadow:  "0 0 10px  white",
                  backgroundColor:"rgb(33, 36, 41)",
                  height:504,
                  width:400,
                  zIndex:2, 
                
                }),
              ...(isActive == 1 && {
                  transform: 'translate(18.75em,0)',
                }),
              ...(isActive == 3 && {
                  transform: 'translate(-18.75em,0)',
                })
              }}>

              <Grid container display="flex" justifyContent="center" p={3}>
                <Grid item display="flex" justifyContent="center">
                {loading?
                    <Skeleton variant="rectangular" width={352} height={352} sx={{borderRadius:8,backgroundColor:"rgb(38, 40, 46)",}}/>
                :   
              
                    <img src={col2?.imageUrlOriginal} style={
                      {width:256,
                      height:256,
                      justifyContent:'center',
                      borderRadius:24,
                      opacity:'30%',
                      transition:'0.4s',
                      ...(isActive == 2 && {
                        height:352,
                        width:352,
                        opacity:'100%',
                      }),
                    }}/>
                }
                  
                </Grid>
                <Grid item display="flex" justifyContent='center' md={12}>
                  <Button fullWidth onClick={()=> 
                    history.push('/collections', {Collection:col2})} 

                    sx={{
                      height:56,
                      border:1,
                      backgroundColor:"rgb(25, 27, 31)",
                      borderColor:"rgb(25, 27, 31)",
                      color:'#952a6c',
                      opacity:'30%',
                      borderRadius:4,
                      transition:'0.4s',
                      '&:hover':{
                        borderColor: "rgb(59, 64, 73)",
                      },
                      ...(isActive == 2 && {
                        height:64,
                        opacity:'100%',
                      }),
                    }}>
                    show
                  </Button>
                </Grid>
              </Grid>
            </Box>

            
            <Box display="flex" justifyContent="center" onClick={()=>setIsActive(3)} sx={{
              border:1,
              height:400,
              width:304,
              backgroundColor:"rgb(25, 27, 31)",
              borderRadius:8,
              zIndex:1,
              transition: '0.4s',
              justifyContent:'center',
              ['@media (max-width:1000px)']: { // eslint-disable-line no-useless-computed-key
                width:'80%',
                height:'auto', 
              },
              ...(isActive == 3 && {
                borderColor:'#ffffffc5',
                boxShadow:  "0 0 10px  white",
                  backgroundColor:"rgb(33, 36, 41)",
                  height:504,
                  width:400,
                  zIndex:2,
                  transform: 'translate(-18.75em,0)',
                }),
              ...(isActive == 1 && {
                  transform: 'translate(-43.75em,0)',
                }),
            }}>
            
              <Grid container display="flex" justifyContent="center" p={3}>
                <Grid item display="flex" justifyContent="center">
                {loading?
                    <Skeleton variant="rectangular" width={256} height={256} sx={{borderRadius:8,backgroundColor:"rgb(38, 40, 46)",}}/>
                :   
              
                    <img src={col3?.imageUrlOriginal} style={
                      {width:256,
                      height:256,
                      justifyContent:'center',
                      borderRadius:24,
                      opacity:'30%',
                      transition:'0.4s',
                      ...(isActive == 3 && {
                        height:352,
                        width:352,
                        opacity:'100%',
                      }),
                    }}/>
                }
                  
                </Grid>
                <Grid item display="flex" justifyContent='center' md={12}>
                  <Button fullWidth onClick={()=> 
                    history.push('/collections', {Collection:col3})} 
                    sx={{
                      height:56,
                      border:1,
                      backgroundColor:"rgb(25, 27, 31)",
                      borderColor:"rgb(25, 27, 31)",
                      color:'#952a6c',
                      opacity:'30%',
                      borderRadius:4,
                      transition:'0.4s',
                      '&:hover':{
                        borderColor: "rgb(59, 64, 73)",
                      },
                      ...(isActive == 3 && {
                        height:64,
                        opacity:'100%',
                      }),
                    }}>
                    show
                  </Button>
                </Grid>
              </Grid>
            </Box>

          </Grid>
        </Grid>
          </>
    
    )

  }

  return(
    <ConnectBar children={Show()}/>
  )


}

















