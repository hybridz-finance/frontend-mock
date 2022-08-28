
import React,{useState,useEffect} from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

import CardMedia from '@mui/material/CardMedia';
import { WyvernSchemaName } from "opensea-js/lib/types"
import ConnectBar from './ConnectButton';

import { OpenSeaPort, Network } from 'opensea-js'
import Web3 from 'web3';
import history from './../history';
import Fade from 'react-reveal/Fade';




const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')


const styles = {
  around:{
    border:1,
    borderColor: "rgb(59, 64, 73)",
    mb:16,
    
 
    display:'flex',
    height:320,
    width:256,
    alignItems:'top',
    justifyContent:'center',
    backgroundColor:"rgb(33, 36, 41)",
    borderRadius:4,
    
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
  container: {
    mb:12,
    ml:12,
    mr:12
  },
  item:{
    justifyContent: "center",    
  },
  itemHeight:{
    height:120,
  },
  textHeading:{
    color:"white",
    fontSize:32,
    fontWeight:"bold",
  },
  text:{
    fontSize:16,
    color:"#e0dede"
  },
}

export default function Collections(Collection:any){

  

  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main,
    //apiKey: YOUR_API_KEY
    })

  const [collection, setCollection] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchAssets = async () => {
    try{
      setLoading(true)
      let assets = await seaport.api.getAssets(
        {asset_contract_address: Collection.location.state.Collection.assetContract.address,
        limit:8});
      let array = Array.from(assets["assets"]);
      setCollection(array);
      setLoading(false);
    } catch(error) {
      console.log(error);
      setLoading(false);
    }
    
  }


  useEffect(() => {
    fetchAssets();
  },[]) 
  const loadingAssets = [1,2,3,4,5,6];
  const Loading = () => {
    return(
      <>
        <Grid item xl={3} md={4} sm={12} display="flex" sx={styles.item}>   
          <Box sx={styles.around}>
            <Grid container justifyContent="center" >

              <Grid item justifyContent="center" >
                <Skeleton variant="rectangular" width={256} height={256} sx={{borderRadius:4,backgroundColor:"rgb(38, 40, 46)",}}/>
              </Grid>
              <Grid item justifyContent="center">
                <Skeleton variant="text" width={200} height={40}/>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </>
    )
  }


  function Show(){
    return(

        <Grid container alignItems="top" pt={5} sx={styles.container}>

          <Grid item mt={12} mb={8} md={12} display="flex" sx={styles.item}>
            <Typography sx={styles.textHeading}>
              {Collection.location.state.Collection.assetContract.name}
            </Typography>
          </Grid>
            {loading?
            <>
            {loadingAssets.map(() => {
              return(
                <>
                  <Loading/>
                </>
              )
            })}
          </>
          :
              <>
                {collection.map((asset:any, i:any) => {
                  return (

                    <Grid item xl={3} md={4} sm={12}  display="flex" sx={styles.item}>
                      
                      <Box sx={styles.around}>
                        <Grid container justifyContent="center" >

                          <Grid item justifyContent="center" >
                            <Fade>
                              <CardMedia sx={[styles.img]}
                                component="img"
                                src={asset["imageUrlOriginal"]}
                                onClick={ () => {
                                  history.push('/collections/art',{artPiece:asset})}
                                }/> 
                              </Fade>
                          </Grid>
                          <Grid item justifyContent="center">
                            <Typography  sx={styles.text}>
                              {asset.name}
                            </Typography>
                          </Grid>
                          
                        </Grid>
                      </Box>
                      
                    </Grid>
                  );
                })}
              </>

              
              
            }

        </Grid>

    )
  }

  return(
    <ConnectBar children={Show()}/>
  )
}