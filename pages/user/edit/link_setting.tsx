import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, AvatarGroup, Box, Center, Flex, Grid, GridItem, Heading, IconButton, Link, Select, SimpleGrid, Tag, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useState } from "react";
import { DentBord, FlatBord } from "../../../component/atom/bords";
import {data} from "../../../component/standalone/LinkBoard"
import { TabSwitchGroup_3 } from "../../../component/helper/TabRadioGroup";
import { LinkDisplaySwitchType } from "../../../type/global";
import {BasicSelect} from "../../../component/atom/select"
const LinkSetting: NextPage  = () => {
    const [displayLink, setDisplayLink] = useState<LinkDisplaySwitchType>("公開中")
    const handleGenre = (e: any) => setDisplayLink(e)
    return (
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
                    <Center h={"40px"} mb={4}>
                        <DentBord w={300} h={"40px"} justifyContent="center" alignItems={"center"} borderRadius={"full"}>
                            <Heading size={"xs"}>MY - LINK - COLLECTIONS</Heading>
                        </DentBord>
                    </Center>
                    <DentBord 
                    h={"400px"} borderRadius={15}
                    flexDirection={"column"}
                    >
                        <Box overflowY={"scroll"} borderRadius={15} w={"100%"} p={3}>
                        {data.map(link => {
                            return (
                                <Flex 
                                w={"100%"} p={1} 
                                direction={"row"} justify={"space-between"} align={"center"}
                                borderRadius={10} transition={".3s"}
                                _hover={{ 
                                    filter: 'brightness(1.2)',
                                    bg: "whiteAlpha.500"
                                }}
                                >
                                    <Flex align={"center"}>
                                        <AvatarGroup size='xs' max={3}>
                                            <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' /><Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' /><Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' /><Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' /><Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
                                        </AvatarGroup>
                                        <Heading size={"xs"} ms={5} overflow={"hidden"}>{link.link_name}</Heading>
                                    </Flex>
                                    <IconButton size={"sm"} bg={"transparent"} aria-label="hunburger_toggle" borderRadius={10} icon={<HamburgerIcon/>}></IconButton>
                                </Flex>
                            )
                        })}
                        </Box>
                        <Flex 
                        w={"100%"} my={2} px={3} h={"60px"} align={"center"} borderRadius={10}
                        fontSize={".8rem"}
                        _hover={{ 
                            filter: 'brightness(1.2)',
                            bg: "whiteAlpha.500"
                        }}
                        >
                            ＋ 新しい COLLECTION を作成する
                        </Flex>
                    </DentBord>
                </GridItem>

                <GridItem area={'select'}>
                    <Center>
                        <TabSwitchGroup_3
                        optionLeft="公開中"
                        optionCenter="履歴"
                        optionRight="作成済み"
                        defaultValue={displayLink}
                        onChange={ handleGenre }
                        fontSize={10} gap={1} p={1} w={250}
                        position={"relative"}
                        >
                            <BasicSelect 
                            placeholder='ジャンルを指定する' 
                            onChange={(e: any)=>console.log(e.target.value)}
                            position={"absolute"}
                            left={300} top={3}
                            >
                                <option value={1}>検索エンジン</option>
                                <option value={2}>エンタメ</option>
                                <option value={3}>ニュース</option>
                                <option value={4}>エンジニアリング</option>
                                <option value={5}>SNS</option>
                                <option value={0}>その他</option>
                            </BasicSelect>
                        </TabSwitchGroup_3>
                    </Center>
                    <FlatBord h={"90%"} flexDirection={"column"} mt={3}>
                        <Box flexGrow={1} w={"100%"} h={"100px"} overflowY={"scroll"} p={2}>
                            {data.map(link => {
                                return (
                                    <Flex 
                                    mx={5} py={2}
                                    direction={"row"} justify={"space-between"} align={"center"}
                                    borderRadius={10} transition={".3s"}
                                    _hover={{ 
                                        filter: 'brightness(1.2)',
                                        bg: "whiteAlpha.500"
                                    }}
                                    >
                                        <Flex align={"center"}>
                                            <Avatar src={link.link_icon} size={"sm"}>
                                                <AvatarBadge boxSize='.85em' bg='tipsy_color_1' border={"1px"} />
                                            </Avatar>
                                            <Heading size={"sm"} ms={5} overflow={"hidden"}>{link.link_name}</Heading>
                                        </Flex>
                                        <Flex align={"center"}>
                                            <Text fontSize={"xs"} overflow={"hidden"}>説明 : {"twitterのスレッドからの検索が可能 (条件なし) ..."}</Text>
                                        </Flex>
                                        <Box ms={1} w={100} fontSize={"xs"}><Tag size={"sm"}>ジャンル</Tag></Box>
                                        <Box ms={2} w={200} fontSize={"sm"} overflow={"hidden"}>Akiya Kudo</Box>
                                    </Flex>
                                )
                            })}
                        </Box>
                        <Flex w={"100%"} my={5} px={3} h={"50px"} align={"center"} borderRadius={10}
                        fontSize={".8rem"}
                        _hover={{ 
                            filter: 'brightness(1.2)',
                            bg: "whiteAlpha.500"
                        }}
                        >
                            ＋ 新しい検索リンクを作成する
                        </Flex>
                    </FlatBord>
                </GridItem>
            </Grid></Center>
    )
}

export default LinkSetting





{/* <GridItem area={'bar'}>
                    <Center h={"40px"} mb={4}>
                        <DentBord w={200} h={"40px"} justifyContent="center" alignItems={"center"} borderRadius={"full"}>
                            <Heading size={"xs"}>SEARCH - BAR</Heading>
                        </DentBord>
                    </Center>
                    <DentBord 
                    h={"220px"} borderRadius={15}
                    flexDirection={"column"}
                    >
                        <Box overflowY={"scroll"} borderRadius={15} w={"100%"} p={3}>
                        {data.map(link => {
                            return (
                                <Flex 
                                w={"100%"} p={2} 
                                direction={"row"} justify={"space-between"} align={"center"}
                                borderRadius={10} transition={".3s"}
                                _hover={{ 
                                    filter: 'brightness(1.2)',
                                    bg: "whiteAlpha.500"
                                }}
                                >
                                    <Flex align={"center"}>
                                        <Avatar src={link.link_icon} size={"xs"}/>
                                        <Heading size={"xs"} ms={5} overflow={"hidden"}>{link.link_name}</Heading>
                                    </Flex>
                                    <Box ms={3} w={100} fontSize={"xs"} overflow={"hidden"}>Akiya Kudo</Box>
                                    <IconButton size={"xs"} bg={"transparent"} aria-label="delete_link" borderRadius={10} icon={<CloseIcon/>}></IconButton>
                                </Flex>
                            )
                        })}
                        </Box>
                    </DentBord>
                </GridItem> */}