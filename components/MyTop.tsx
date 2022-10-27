import React from 'react'

import { Avatar, Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import  styles  from '../styles/components/Top.module.css';

import { useQuery } from '@apollo/client';
import { USER_QUERY, UserData } from '../utils/graphql/queries/users.query';


const MyTop = () => {

    const { loading, error, data } = useQuery<UserData>(USER_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {JSON.stringify(error)}</p>;

    if (data)console.log(data);

    return (
        <>
            <Box className={ styles.top } >
                <Grid templateColumns="repeat(3, 1fr)" 
                    templateRows='repeat(5, 1fr)'
                    gap={4}
                    width="80vw" mx="auto" h={250} bg="white" borderRadius={30} boxShadow='lg' mt="20vh" border=".5px solid rgb(209, 209, 209)" p={10}
                    className={ styles.top_card }
                >
                    <GridItem rowSpan={3} colSpan={1} m="auto">
                        <Avatar size='xl' name='Dan Abrahmov' src='https://bit.ly/dan-abramov'/>
                    </GridItem>
                    <GridItem rowSpan={2} colSpan={2} m="auto">
                        {/* { user.user_name ? <Heading>user.user_name</Heading> } */}
                        <Heading>Akiya Kudo</Heading>
                    </GridItem>                    
                    <GridItem rowSpan={1} colSpan={2} m="auto">
                        <Text>Follower: 10 Followee: 2</Text>
                    </GridItem>                    
                    <GridItem rowSpan={2} colSpan={3} mt={2}>
                        <Text>comment : hello! I&apos;m studying After Effect & web progmaming. </Text>
                    </GridItem>                    
                </Grid>
            </Box>
            <div className={ styles.container }>
                
            </div>
        </>
    )
}

export default MyTop