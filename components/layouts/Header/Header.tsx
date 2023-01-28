import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '../../Loading';

import { AuthContext, setUserInfoContext, UserInfoContext } from '../../../context/auth';

import { Avatar, Box, BoxProps, Button, ButtonGroup, Flex, Heading, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Spacer } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { useLogOutFunc, usePassChangeSendEmail } from '../../../utils/hooks/useAuth';
import { auth } from '../../../utils/firebase/init';
import { getRedirectResult, GoogleAuthProvider } from 'firebase/auth';
import { useUserRegister } from '../../../utils/hooks/useMutation';
import { useUserInfoQuery } from '../../../utils/hooks/useQuery';
import { MyModal } from '../../modals';
import { LoginForm } from '../../Forms/userForms';

const Container = (props: BoxProps) => <Flex zIndex={15} w="100%" h="7.5vh" pos="fixed" top="0" boxShadow='sm' alignItems='center' bg='white' >{props.children}</Flex>


// ログアウトコンポーネント定義
const UserMenu = () => {

    const { userInfo } = useContext(UserInfoContext);
    const photo_path = userInfo?.photo_url ? userInfo.photo_url : auth.currentUser?.photoURL ? auth.currentUser.photoURL: undefined
    const user_name = userInfo?.user_name ? userInfo.user_name : auth.currentUser?.displayName ? auth.currentUser.displayName : "Guest";

    const {execute} = useLogOutFunc()
    const {executeSendEmail} = usePassChangeSendEmail();

    return (
        <Menu>
            <MenuButton as={Button} colorScheme='orange' bg='orange.200'  boxShadow='md' rounded="3xl" p={0} mt={1}>
                <Avatar size='sm' name={ user_name } src={ photo_path }/>
            </MenuButton>
            <MenuList>
                <MenuGroup title='- PROFILE -'>
                <Link href="/mypage" passHref><MenuItem>MY PAGE</MenuItem></Link>
                { auth.currentUser?.email && <MenuItem onClick={() => executeSendEmail(auth.currentUser?.email)}>CHANGE PASSWORD</MenuItem> }
                <MenuItem 
                    onClick={ () => {
                        execute();
                    }}>
                    LOG OUT
                </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title='- Help -'>
                <MenuItem>FAQ</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}


// ヘッダー
export const Header = () => {

    const { userState } = useContext(AuthContext);
    const { setUserInfo } = useContext(setUserInfoContext);

    const { userRegister } = useUserRegister();
    const { getUserInfo } = useUserInfoQuery();
    
    return (
        <>
            <Container>
                <Flex minWidth='100%' alignItems='center' gap='2'>
                    <Flex >
                        <Link href="/" passHref>
                            <Flex>
                                <Box style={{width: 40, height: 40}} mx='3' >
                                    <Image src='/logo3.svg'  width={300} height={300} layout={'responsive'} alt="logo" priority></Image>
                                </Box>
                                <Flex justify='center' align='center'>
                                    <Heading size='md' color='orange.300' textShadow='1px 2px #bae9ff' >Tipsy</Heading>
                                </Flex>
                            </Flex>
                        </Link>
                    </Flex>
                    <Spacer />
                    <ButtonGroup gap='2' mx='3'>
                        { userState == 'guest' &&
                            <>
                                <Link href="/signup" passHref><Button colorScheme='orange' color='orange.300' variant='ghost' size='sm'>SIGN UP</Button></Link>
                                <MyModal title={"LOG IN"}>
                                    <LoginForm/>
                                </MyModal>

                            </>
                        }

                        { userState == 'isUser' &&   
                            <>
                                <Link href="/post/newpost" passHref>                                    
                                    <Button mt={1} colorScheme='orange' color='orange.300' variant='ghost' fontSize='xl' rounded='3xl' ><AddIcon /></Button>
                                </Link>
                                <UserMenu />
                            </>
                        }

                        { userState == 'loading' &&   
                            <><Loading message="User Info Loading"/></>
                        }
                    </ButtonGroup>
                </Flex>
            </Container>
        </>
    )
}
