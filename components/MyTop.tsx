import React, { useContext } from 'react'
import { AuthContext, UserInfoContext } from '../context/auth';

import { Avatar, Box, Grid, GridItem, Heading, Skeleton, SkeletonCircle, SkeletonText, Text } from '@chakra-ui/react';
import  styles  from '../styles/components/Top.module.css';

import { MyInfoModal } from './modals';

import { auth } from '../utils/firebase/init';


const MyTop = () => {

    const { userState } = useContext(AuthContext)
    const { userInfo } = useContext(UserInfoContext);
    
    const user_name = userInfo?.user_name ? userInfo.user_name : auth.currentUser?.displayName ? auth.currentUser.displayName : "Guest";
    const comment = userInfo?.comment ? userInfo.comment :  null;
    const photo_path = userInfo?.photo_url ? userInfo.photo_url : auth.currentUser?.photoURL ? auth.currentUser.photoURL: undefined

    return (
        <>
            <Box className={ styles.top } >
                <Grid templateColumns="repeat(3, 1fr)" 
                    templateRows='repeat(5, 1fr)'
                    gap={4}
                    width="80vw" mx="auto" h={250} bg="white" borderRadius={30} boxShadow='lg' mt="20vh" border=".5px solid rgb(209, 209, 209)" p={10}
                    className={ styles.top_card }
                >
                    {userState == "isUser" ?
                        <>
                            <GridItem rowSpan={3} colSpan={1} m="auto">
                                <Avatar size='xl' name={ user_name } src={ photo_path }/>
                            </GridItem>
                            <GridItem rowSpan={2} colSpan={2} m="auto">
                                <Heading>{ user_name }</Heading>
                            </GridItem>                    
                            <GridItem rowSpan={1} colSpan={2} m="auto">
                                <Text>Follower: 10 Followee: 2</Text>
                            </GridItem>                    
                            <GridItem rowSpan={2} colSpan={2} mt={2}>
                                <Text>Comment : { comment}</Text>
                            </GridItem>
                            <GridItem rowSpan={1} colSpan={1} mt={2}>
                                <MyInfoModal title={"Account Setting"} user_name={user_name} comment={comment} photo_path={photo_path}/>
                            </GridItem>
                        </>
                    : 
                        <>
                            <GridItem rowSpan={3} colSpan={1} m="auto">
                                <SkeletonCircle size='100' />
                            </GridItem>
                            <GridItem rowSpan={2} colSpan={2} >
                                <Skeleton  mt='4' height='60px' />
                            </GridItem>                    
                            <GridItem rowSpan={1} colSpan={2}>
                                <SkeletonText mt='8' noOfLines={1} spacing="2" />
                            </GridItem>                    
                            <GridItem rowSpan={2} colSpan={3} mt={2}>
                                <SkeletonText mt='4' noOfLines={3} spacing="2" />
                            </GridItem>
                        </>
                    }
                </Grid>
            </Box>

        </>
    )
}

export default MyTop