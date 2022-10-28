import React, { useContext } from 'react'
import { AuthContext } from '../context/auth';

import { Avatar, Box, Grid, GridItem, Heading, Skeleton, SkeletonCircle, SkeletonText, Text } from '@chakra-ui/react';
import  styles  from '../styles/components/Top.module.css';

import { auth } from '../utils/firebase/init';

import { useQuery } from '@apollo/client';
import { USER_QUERY, UserData } from '../utils/graphql/queries/users.query';


const MyTop = () => {

    // レンダリング時にuser情報をfirebaseから取得し直す処理（（SSG時には時にはnullになっている？）
    const { userState } = useContext(AuthContext);

    let uid: null | string = null
    const user = auth.currentUser;
    if (user !== null) {
        uid = user.uid;
    }

    // apollo client query 処理
    const { loading, error, data } = useQuery<UserData>(USER_QUERY, {
        variables: {
            "userId" : uid,
        }
    });

    // const comment = data && data.user[0].comment ? data.user[0].comment : null
    // const photo_url = data && data.user[0].photo_url ? data.user[0].photo_url : "https://bit.ly/dan-abramov"
    
    const user_name = data?.user[0].user_name ? data.user[0].user_name : "Guest";
    const comment = data?.user[0].comment ? data.user[0].comment : null
    const photo_url = data?.user[0].photo_url ? data.user[0].photo_url : "https://bit.ly/dan-abramov"

    return (
        <>
            <Box className={ styles.top } >
                <Grid templateColumns="repeat(3, 1fr)" 
                    templateRows='repeat(5, 1fr)'
                    gap={4}
                    width="80vw" mx="auto" h={250} bg="white" borderRadius={30} boxShadow='lg' mt="20vh" border=".5px solid rgb(209, 209, 209)" p={10}
                    className={ styles.top_card }
                >
                    {user ?
                        <>
                            <GridItem rowSpan={3} colSpan={1} m="auto">
                                <Avatar size='xl' name='Dan Abrahmov' src={ photo_url }/>
                            </GridItem>
                            <GridItem rowSpan={2} colSpan={2} m="auto">
                                <Heading>{ user_name }</Heading>
                            </GridItem>                    
                            <GridItem rowSpan={1} colSpan={2} m="auto">
                                <Text>Follower: 10 Followee: 2</Text>
                            </GridItem>                    
                            <GridItem rowSpan={2} colSpan={3} mt={2}>
                                <Text>Comment : { comment}</Text>
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