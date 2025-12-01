// import logo from './logo.svg';
import { Box, Button, Grid2, Modal } from '@mui/material';
import './App.css';
import SudokoGrid from './Components/SudokoGrid';
import React, { useEffect, useState } from 'react';
import { validSudoku } from './utils/validSudoku';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  pt: 2,
  px: 4,
  pb: 3,
};

function App() {

  const [open, setOpen] = React.useState(false);
 
  const handleClose = () => {
    setOpen(false);
  };
    const arr=[
      ['#3', '', '#6', '#5', '', '#8', '#4', '', ''],
      ['#5', '#2', '', '', '', '', '', '', ''],
      ['', '#8', '#7', '', '', '', '', '#3', '#1'],
      ['', '', '#3', '', '#1', '', '', '#8', ''],
      ['#9', '', '', '#8', '#6', '#3', '', '', '#5'],
      ['', '#5', '', '', '#9', '', '#6', '', ''], 
      ['#1', '#3', '', '', '', '', '#2', '#5', ''],
      ['', '', '', '', '', '', '', '#7', '#4'],
      ['', '', '#5', '#2', '', '#6', '#3', '', ''] 
    ];

    const arr1=[
      ["#5","#3",".",".","#7",".",".",".","."],
      ["#6",".",".","#1","#9","#5",".",".","."],
      [".","#9","#8",".",".",".",".","#6","."],
      ["#8",".",".",".","#6",".",".",".","#3"],
      ["#4",".",".","#8",".","#3",".",".","#1"],
      ["#7",".",".",".","#2",".",".",".","#6"],
      [".","#6",".",".",".",".","#2","#8","."],
      [".",".",".","#4","#1","#9",".",".","#5"],
      [".",".",".",".","#8",".",".","#7","#9"]]

    const [sgrid, setSGrid]=useState(arr);
    const [isValid,setIsValid]=useState(false);
    const [inCorrect,setIncorrect]=useState([]);

    const handlesubmit=()=>{

    const rows = 9;
    const cols = 9;

    let grid = Array(rows).fill().map(() => Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (sgrid[i][j].length === 2) grid[i][j] = Number(sgrid[i][j][1]);
            else if (sgrid[i][j].length === 1) grid[i][j] = Number(sgrid[i][j]);
            else grid[i][j] = 0;
        }
    }

      var solved = validSudoku(arr);

      // console.log('solved::::',solved, grid);

      var flag = true

      let incorrect = []
      
      for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
          if(solved[i][j]!==grid[i][j]){
            flag = false;
            incorrect.push({i,j,solved:solved[i][j]})
          }
                          
        }
    }

    setOpen(true);

    if(flag)
    setIsValid(true);
    else{
    setIsValid(false);
    setIncorrect([...incorrect]);
    console.log(incorrect);
    
  }
      // alert(checksudoku)

    }
  
  return (
    <div className="App">
     <h2>Sudoku Solver</h2>
      <SudokoGrid sgrid={sgrid} incorrect={inCorrect} originalgrid={arr} callback={(res)=>{setSGrid(res); }} />
      <Box display={'flex'} justifyContent={'center'}>
      <Grid2 size={6}>
        <Button onClick={handlesubmit} >Submit</Button>
      </Grid2>
      <Grid2 size={6}>
        <Button onClick={()=>{setSGrid((newarr)=>arr);
        }} >Reset</Button>
      </Grid2>

      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">{ isValid ?"Congrats! 🥳":"Rotten Luck 😕"}</h2>
          <p id="parent-modal-description">
            { isValid ?
             "Great! You solved the sudoku!" :
             "Sorry, the sudoku is not solved correctly. Please try again."}
          </p>
        </Box>
      </Modal>

    </div>
  );
}

export default App;
