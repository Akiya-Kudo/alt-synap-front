import { Center, Flex, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useContext, useEffect } from "react";
import { USER_QUERY } from "../../../util/graphql/queries/users.query.schema";
import { useQuery } from "@apollo/client";
import { auth } from "../../../util/firebase/init";
import { useRouter } from "next/router";
import { AuthContext } from "../../../util/hook/authContext";
import CollectionSettingBoard from "../../../component/standalone/CollectionSettingBoard"
import LinkSettingBoard from "../../../component/standalone/LinkSettingBoard";
import Head from "next/head";

const LinkSetting: NextPage  = () => {
    const isMobile = useBreakpointValue([true, true, false])
    const { userState } = useContext(AuthContext);
    const router = useRouter()
    // useEffect(() => { if (userState == 'guest')  router.replace('/') }, [userState])
    
    const { data: user_data } = useQuery(USER_QUERY, { fetchPolicy: 'network-only' });
    
    return (
        <>
        <Head><title>Tipsy | リンク設定</title></Head>
            <Center><Grid
            className="page" 
            templateAreas={!isMobile ? `"multi select"` : `"multi" "select"`}
            gridTemplateRows={!isMobile ? '1fr' : '250px 1fr'}
            gridTemplateColumns={!isMobile ? '350px 1fr' : '1fr'}
            gap={[5, 5, 2]}
            px={[0, 0, 3]} pt={["70px", "100px", "150px"]} pb={5}
            maxW={"2500px"}
            >
                <GridItem area={'multi'}>
                    <Flex direction={"column"} w={"100%"} align="center">
                        <CollectionSettingBoard 
                        collections={user_data?.user?.collections}
                        uuid_uid={user_data?.user?.uuid_uid}
                        />
                    </Flex>
                </GridItem>

                <GridItem area={'select'}>
                    <Flex 
                    h={"100%"}
                    align="center" direction={"column"} 
                    >
                        <LinkSettingBoard uuid_uid={user_data?.user?.uuid_uid}/>
                    </Flex>
                </GridItem>
            </Grid></Center>
        </>
    )
}

export default LinkSetting