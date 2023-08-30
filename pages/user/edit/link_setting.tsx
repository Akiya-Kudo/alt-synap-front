import { Center, Grid, GridItem } from "@chakra-ui/react";
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
    const { userState } = useContext(AuthContext);
    const router = useRouter()
    useEffect(() => { if (userState == 'guest')  router.replace('/') }, [userState])
    
    const { data: user_data } = useQuery(USER_QUERY, {
        fetchPolicy: 'network-only',
        variables: { uid: auth.currentUser?.uid }
    });
    
    return (
        <>
        <Head><title>Tipsy | リンク設定</title></Head>
            <Center><Grid
            className="page" 
            templateAreas={`"multi select"`}
            gridTemplateRows={'1fr'}
            gridTemplateColumns={'350px 1fr'}
            gap={5}
            px={10} pt={"150px"} pb={5}
            maxW={"2500px"}
            >
                <GridItem area={'multi'}>
                    <CollectionSettingBoard 
                    collections={user_data?.user?.collections}
                    uuid_uid={user_data?.user?.uuid_uid}
                    />
                </GridItem>

                <GridItem area={'select'} >
                    <LinkSettingBoard uuid_uid={user_data?.user?.uuid_uid}/>
                </GridItem>
            </Grid></Center>
        </>
    )
}

export default LinkSetting