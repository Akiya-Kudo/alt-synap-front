import Link from 'next/link';
import React from 'react';
import {Header} from '../components/layouts/Header/Header';

// import { Box, Button, ScaleFade, useDisclosure } from "@chakra-ui/react"

const test = () => {
  return (
    <>
        <Header/>
        <div className="page">   
          <Link  href="/">Home</Link>
        </div>
    </>
  )
}

export default test

// function ScaleFadeEx() {
//   const { isOpen, onToggle } = useDisclosure()

//   return (
//     <>
//       <Button onClick={onToggle}>Click Me</Button>
//       <ScaleFade initialScale={0.9} in={isOpen}>
//         <Box
//           p='40px'
//           color='white'
//           mt='4'
//           bg='teal.500'
//           rounded='md'
//           shadow='md'
//         >
//           Fade
//         </Box>
//       </ScaleFade>
//     </>
//   )
// }

// export default ScaleFadeEx