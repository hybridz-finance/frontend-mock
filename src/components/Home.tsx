
import React,{useState,useEffect} from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import history from './../history';
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import Web3 from 'web3';
import ConnectBar from '../components/ConnectButton';
import Skeleton from '@mui/material/Skeleton';
import CardMedia from '@mui/material/CardMedia';
import ShareIcon from '@mui/icons-material/Share';
import jesus from '.././components/assets/sit_red.jpg';
import tiger from '.././components/assets/tiger.jpg';
import roof from '.././components/assets/roof.jpg';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



export default function Home(){



    function CheckboxesGroup() {
        const [state, setState] = React.useState({
            negETH: false,
            posETH: false,
            neuETH: false,
            
            yearn: false,
            uniswap: false,
            lido: false,

            random: false,
            research: false,


        });

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setState({
            ...state,
            [event.target.name]: event.target.checked,
            });
        };

        const { negETH, posETH, neuETH, yearn, uniswap, lido, random, research } = state;
        const error = [negETH, posETH, neuETH, yearn, uniswap, lido, random, research].filter((v) => v).length !<= 2;


        return (
            <Box sx={{ display: 'flex' }}>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" error={error}>
                    <FormLabel component="legend">Choose high risk strat</FormLabel>
                    <FormGroup>
                    <FormControlLabel
                        control={
                        <Checkbox checked={negETH} onChange={handleChange} name="negETH" />
                        }
                        label="Negative ETH"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={posETH} onChange={handleChange} name="posETH" />
                        }
                        label="Neutral ETH"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={neuETH} onChange={handleChange} name="neuETH" />
                        }
                        label="Positive ETH"
                    />
                    </FormGroup>
                    <FormHelperText>Pick one</FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" error={error}>
                    <FormLabel component="legend">Choose low risk strat</FormLabel>
                    <FormGroup>
                    <FormControlLabel
                        control={
                        <Checkbox checked={yearn} onChange={handleChange} name="yearn" />
                        }
                        label="Yearn ETH"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={uniswap} onChange={handleChange} name="uniswap" />
                        }
                        label="Uniswap ETH"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={lido} onChange={handleChange} name="lido" />
                        }
                        label="Lido ETH"
                    />
                    </FormGroup>
                    <FormHelperText>Pick one</FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" error={error}>
                    <FormLabel component="legend">Choose charity</FormLabel>
                    <FormGroup>
                    <FormControlLabel
                        control={
                        <Checkbox checked={random} onChange={handleChange} name="random" />
                        }
                        label="Random"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox checked={research} onChange={handleChange} name="research" />
                        }
                        label="Research"
                    />
             
                    </FormGroup>
                    <FormHelperText>Optional</FormHelperText>
                </FormControl>
            </Box>
        );
    }


    function SetRatios(){
        const [state, setState] = React.useState({
            highRiskRatio: 33,
            lowRiskRatio: 33,
            charityRatio: 33
        });

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setState({
            ...state,
            [event.target.name]: event.target.checked,
            });
        };

        const {highRiskRatio,lowRiskRatio,charityRatio} = state;
        const marks = [
            {
              value: 0,
              label: '0',
            },
            {
              value: 33,
              label: '1/3',
            },
            {
              value: 66,
              label: '1/3',
            },
            {
              value: 100,
              label: '100',
            },
          ];
          
          function valuetext(value: number) {
            return `${value}°C`;
          }
        return(
            <Box sx={{ display: 'flex' }}>
                <Slider
                    track={false}
                    aria-labelledby="track-false-range-slider"
                    getAriaValueText={valuetext}
                    defaultValue={[33, 66]} 
                    marks={marks}

                    sx={{ml:5,mr:5}}          
      />


            </Box>

        )

    }

    function SetAmount(){

        return(
            <Box justifyContent="center" sx={{ display: 'flex' }}>
                <TextField id="outlined-basic" label="amount" variant="outlined" />
            </Box>
        )
    }


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }
  
  const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
     
        <Button variant="outlined" sx={{mb:5}} onClick={handleClickOpen}>
                            create!
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title"  onClose={handleClose}>
            <Typography textAlign="center" gutterBottom>
              Success!
            </Typography>
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography textAlign="center" gutterBottom>
              You succesfully created a Structured Note containing
            </Typography>
            <Typography textAlign="center"  gutterBottom sx={{fontWeight:500}}>
                <br/>
                Negative ETH 33% -- Lido ETH 33% -- Charity Research 33% 
            </Typography>
            <Typography textAlign="center"  gutterBottom>
            <br/>
              A Hybridz NFT representing your position was minted to your wallet
            </Typography>
          </DialogContent>
          <DialogActions>
            <Box display="flex" justifyContent="center">
                <Button autoFocus onClick={handleClose}>
                view etherscan
                </Button>
            </Box>
          </DialogActions>
        </BootstrapDialog>
      </div>
    );
  }
  
  
  


    function Show(){
        return(
            <>
               <Paper elevation={3} sx={{mt:10,borderRadius:5,p:2}}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography textAlign="center" sx={{mt:2,mb:2,fontSize:20}}>
                            Compose hybrid
                        </Typography>
                    </Grid>
                    <Grid item>
                        <CheckboxesGroup/>
                    </Grid>
                    <Grid item>
                        <Typography textAlign="center" sx={{mt:3,fontSize:20}}>
                            Deposit amount
                        </Typography>
                    </Grid>
                    <Grid item sx={{mt:4,mb:4}}>
                        <SetAmount/>
                    </Grid>
                    <Grid item>
                        <Typography textAlign="center" sx={{mt:3,fontSize:20}}>
                            Set ratios
                        </Typography>
                    </Grid>
                    <Grid item sx={{mt:4,mb:8}}>
                        <SetRatios/>
                    </Grid>
                    <Grid item display="flex" justifyContent="center">
                        <CustomizedDialogs/>
                    </Grid>
                    
                </Grid>
                    
                    
               </Paper>
               
            </>
        )
    }

    return(
        <ConnectBar children={Show()}/>
    );
    
}



