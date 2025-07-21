import React from 'react'
import TypingAnim from "../components/typer/TypingAnim"
import { Box } from '@mui/material'

const  Home = () => {
  return (
    <Box width={'100%'} height={'100%'}>
      <Box sx={{display:'flex', width:'100%', flexDirection:'column', alignItems:'center',mx:'auto'}}>
      <Box>
          <img src="detlaLogo.png" alt="Delta" 
           style={{ filter: 'invert(1)', width: '500px' }} 
          />
        </Box>
        <Box>
          <TypingAnim/>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
