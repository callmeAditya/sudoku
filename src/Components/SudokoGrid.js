import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import './SudokuGrid.scss'
import { Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  focusedCell: {
    outline: '2px solid #3f51b5',
    backgroundColor: '#e3f2fd',
  },
});

const bluerows =[
  [0,0],
  [0,6],
  [3,3],
  [6,0],
  [6,6]
]

const blueShade=(row,col)=>{
  
  for(let i=0;i<bluerows.length;i++){
    if((bluerows[i][0]<=row && row<=bluerows[i][0]+2) && (bluerows[i][1]<=col && col<=bluerows[i][1]+2)){
          return true;
        }
    
  }

 
  
  return false
}

function SudokuGrid({sgrid, originalgrid, incorrect, callback=()=>{}}) {
  const classes = useStyles();
  const [arr, setArr]=React.useState(sgrid);
  const [value,setValue]=React.useState({})

  React.useEffect(()=>{
    let newarr =sgrid
    setArr(newarr)
  },[sgrid])
  

  const min = 1; // Minimum value
  const max = 9; // Maximum value

  const handleChange=(row,col,number)=>{
    // setValue(value);
    // var number = parseInt(value);
    if( isNaN(parseInt(number)) || number<min || number>max){
      arr[row][col]=''
      setValue({...value ,r:row, c:col, v:''})
    }

    // else if(number>max) number=max;
    else{
    setValue({...value ,r:row, c:col, v:number})
      arr[row][col]=number;
  }
  let newarr = arr
  setArr(newarr)
  callback(newarr)
    // setValue(arr[row][col])
    // console.log(arr,row,col);
    
  }

  function handleIncorrect(key, colid){
    return incorrect.filter((item)=>item.i===key && item.j===colid)?.solved
  }


  return (
    
    <div className="">
      {/* {JSON.stringify(value)} */}
     <Grid >
        <Paper >
            <Table>
              <TableBody>
                {
                  arr?.map((row,key)=>(
                    <TableRow key={'row-'+key+1}>
                      {
                        row?.map((col,colid)=>(
                          <TableCell
                          sx={{
                            '&.MuiTableCell-root:focus-within':{
                              border:col ==0 ? '1.5px solid #3C3D37 !important':""
                          },
                          '&.MuiTableCell-root':{
                            background: blueShade(key,colid) ? '#D4F6FF':""
                          }
                        }}
                          
                          >
                            {
                              col.length===2 ?
                               <span style={{fontWeight:'bold'}}>
                                {col[1]}
                              </span> 
                              :
                              <TextField 
                              type='string' 
                              // slotProps={{htmlInput:{min, max}}}
                              onChange={(e)=>handleChange(key,colid, e.target.value)}
                              onFocus={()=>{}}
                              // onBlur={handleBlur}
                              // value={ value?.r === key && value?.c === colid ? value?.v:""}
                              value={
                                incorrect.length>0
                                ?
                                handleIncorrect(key, colid)
                                :
                                arr[key][colid]!='' ? arr[key][colid]:""
                              }
                              // value={value?.v}
                              // value={arr[key][colid] ?  String(arr[key][colid]):""}
                              />
                              
                            }
                            
                          </TableCell>
                        ))
                      }
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
        </Paper>

     </Grid>
    </div>
  );
}

export default SudokuGrid;
