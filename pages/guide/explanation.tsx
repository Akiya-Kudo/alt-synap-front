import { Box, Divider, Flex, Heading, HStack, Icon, ListItem, Text, UnorderedList, useColorMode } from "@chakra-ui/react"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { SharpBoard } from "../../component/atom/bords"
import { GlassTag } from "../../component/atom/tags"
import { FlatText } from "../../component/atom/texts"
import { LinkHeader } from "../../component/layout/Header"
import { BiCategoryAlt } from 'react-icons/bi';
import { IoIosLink } from "react-icons/io"
import { TfiUnlink } from 'react-icons/tfi'
import { EditIcon } from "@chakra-ui/icons"
import { AiOutlineHeart } from "react-icons/ai"
import { MdBookmarkBorder } from "react-icons/md"

const Explanation: NextPage<{}>  = () => {
    const { colorMode } = useColorMode()
    return (
        <>
        <Head><title>Tipsy | Guide</title></Head>
        <LinkHeader title={""}/>
        <Flex flexDir={"column"} align={"center"} mt={5} className="page" pb={200}>
            <SharpBoard
            maxW={"1100px"} w={"90%"} justifyContent={"center"} borderRadius={["15px", "30px"]} 
            flexDirection={["column", "column", "row"]} flexWrap={"wrap"}
            neumH={"shallow"} gap={5} p={[5, 7, 10]}
            >
                <HStack align={"end"} flexWrap={"wrap"} justifyContent={"center"}>
                    {/* <FlatText color={"bg_switch"} fontWeight={"bold"} fontSize={"3.5rem"}>について</FlatText> */}
                    <FlatText color={"bg_switch"} fontWeight={"bold"} fontSize={"4rem"} mr={4}>What is </FlatText>
                    <FlatText color={"bg_switch"} fontWeight={"bold"} fontSize={"4.5rem"} >tipsy</FlatText>
                </HStack>
            </SharpBoard>
            <Flex
            w={"100%"} maxW={"900px"}
            direction={"column"} px={10} pt={"4rem"}
            >
                <SharpBoard py={4} px={7} flexWrap={"wrap"}>
                    <Heading 
                    color={"tipsy_color_3"} size={"lg"}   
                    bgGradient='linear(to-tl, tipsy_color_3, tipsy_color_1)' bgClip='text'
                    >
                        tipsy
                    </Heading>
                    <Heading 
                    ms={2} mt={[1,1,2]} color={"tipsy_color_3"} size={"md"}
                    bgGradient='linear(to-tl, tipsy_color_1, tipsy_color_2, tipsy_color_3)' bgClip='text'
                    >
                        ~ 調べるを楽しく、簡単に ~ 
                    </Heading>
                </SharpBoard>
                <Box px={3}>
                    <Text pt={"3rem"} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        tipsyは、情報を探し、記録するプロセスをシンプルかつ楽しくする、あなたの学びの新しい仲間です。調べることをより魅力的にする新しい方法を提供します。
                    </Text>

                    <Heading pt={"4rem"} size={["md", "md", "sm"]}>- tipsyでできること -</Heading>
                    <Text pt={5} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        多くのウェブサイトを行き来して目的の情報を見つける手間を省き、過去に調べたサイトや情報に簡単にアクセスできます。
                    </Text>
                    <Text id="about-tipsy-search" pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        tipsyを使えば、目的に集中しやすくなります。煩わしい検索やブックマーク整理の手間から解放され、学びや情報収集に没頭できます。
                    </Text>

                    <Heading pt={"4rem"} size={["md", "md", "sm"]}>- tipsyの検索機能 -</Heading>
                    <Text pt={5} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        tipsyの検索機能は非常に強力で、あなたの情報探しを効率的にサポートします。tipsyの投稿だけでなく、他のウェブサイト上の情報も簡単に検索できます。
                    </Text>
                    <Text pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        <Link href={"#link"}><Box as="span" mx={1} color={"tipsy_color_2"} _hover={{borderBottom: "1px"}}>Link</Box></Link>
                        ボタンを押すことで、さまざまなウェブサイトでの検索が瞬時に行え、簡単にさまざまなソースを訪れることができます。
                    </Text>
                    <Text pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        さらに、
                        <Link href={"#multi-link-search"}><Box as="span" mx={1} color={"tipsy_color_2"} _hover={{borderBottom: "1px"}}>Multi Link Search</Box></Link>
                        機能を使用すれば、
                        <Link href={"#collection"}><Box as="span" mx={1} color={"tipsy_color_2"} _hover={{borderBottom: "1px"}}>Collection</Box></Link>
                        にまとめたすべてのリンク先のウェブサイトで一括検索を行うことができます。
                    </Text>
                    <Text id="link" pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        これにより、複数のソースからの情報を比較し、効率的に情報を収集できます。
                    </Text>
                </Box>


                <Flex pt={"6rem"}>
                    <SharpBoard py={4} px={7}>
                        <Icon  aria-label='link_setting' as={IoIosLink} color="tipsy_color_2"  fontSize={"1.2rem"}/>
                        <Heading mx={3} color={"tipsy_color_3"} size={"md"}
                        bgGradient='linear(to-br, tipsy_color_2, tipsy_color_1)' bgClip='text'
                        >Link Search</Heading>
                        <Icon  aria-label='link_setting' as={IoIosLink} color="tipsy_color_1"  fontSize={"1.2rem"}/>
                    </SharpBoard>
                </Flex>
                <Box px={3}>
                    <Text pt={"3rem"} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        Link SearchではLinkボタン(他サービスのアイコン)を選択することで、tipsyサイト内で使用した検索ワードでそのリンク先のサイトの検索を瞬時に行うことができます。
                    </Text>
                    
                    <Flex pt={"4rem"} align={"center"} gap={4} flexWrap={"wrap"}>
                        <Heading size={["md", "md", "sm"]}>- Linkを使用する -</Heading>
                        <GlassTag id="login-only" border="none" colorScheme={colorMode=='light' ? "teal" : "pink"}>Login限定</GlassTag>
                    </Flex>
                    <UnorderedList pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        <ListItem mt={3}>&quot;tipsyで検索&quot;または&quot;Linkで検索&quot;で検索をする。</ListItem>
                        <ListItem mt={3}>
                            検索をしたいサイトのLinkボタンを
                            <Link href={"#collection"}><Box as="span" mx={1} color={"tipsy_color_2"} _hover={{borderBottom: "1px"}}>Collection</Box></Link>
                            から選び、選択すると他サイトの検索ができます。
                        </ListItem>
                        <ListItem mt={3}>
                            <Link href={"#multi-link-search"}><Box as="span" mx={1} color={"tipsy_color_2"} _hover={{borderBottom: "1px"}}>Multi Link Search</Box></Link>
                            からCollectionを選択すると一括検索ができます。
                        </ListItem>
                    </UnorderedList>

                    <Flex pt={"4rem"} align={"center"} gap={4} flexWrap={"wrap"}>
                        <Heading size={["md", "md", "sm"]}>- Linkをカスタムする -</Heading>
                        <GlassTag id="login-only" border="none" colorScheme={colorMode=='light' ? "teal" : "pink"}>Login限定</GlassTag>
                    </Flex>
                    <Text pt={5} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        あなたのお気に入りのサイト、頻繁に閲覧するサイトのLinkを作成することができます。そして、他のユーザが作成し、公開しているLinkを
                        <Link href={"#collection"}><Box as="span" mx={1} color={"tipsy_color_2"} _hover={{borderBottom: "1px"}}>Collection</Box></Link>
                        に追加することであなたも使用することができます。
                    </Text>
                    <Box mt={5} id="collection">
                        <Link href={"#create-link"}><Box as="span" mx={1} color={"tipsy_color_2"} _hover={{borderBottom: "1px"}}>Linkのカスタムについて</Box></Link>
                    </Box>
                </Box>


                <Flex pt={"6rem"}>
                    <SharpBoard py={4} px={7}>
                        <Icon  aria-label='link_setting' as={BiCategoryAlt} color="tipsy_color_3"  fontSize={"1.2rem"}/>
                        <Heading mx={3} color={"tipsy_color_3"} size={"md"}
                        bgGradient='linear(to-tr, tipsy_color_3, tipsy_color_1)' bgClip='text'
                        >Collection</Heading>
                        <Icon  aria-label='link_setting' as={BiCategoryAlt} color="tipsy_color_1"  fontSize={"1.2rem"}/>
                    </SharpBoard>
                </Flex>
                <Box px={3}>
                    <Text pt={"3rem"} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        Collectionに
                        <Link href={"#link"}><Box as="span" mx={1} color={"tipsy_color_2"} _hover={{borderBottom: "1px"}}>Link</Box></Link>
                        をまとめて管理します
                    </Text>
                    <Text pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        さらに、
                        <Link href={"#multi-link-search"}><Box as="span" mx={1} color={"tipsy_color_2"} _hover={{borderBottom: "1px"}}>Multi Link Search</Box></Link>
                        ではCollectionにカスタムされたLinkを元に検索が行われます。
                    </Text>

                    <Flex pt={"4rem"} align={"center"} gap={4} flexWrap={"wrap"}>
                        <Heading size={["md", "md", "sm"]}>- Collectionをカスタムする -</Heading>
                        <GlassTag id="login-only" border="none" colorScheme={colorMode=='light' ? "teal" : "pink"}>Login限定</GlassTag>
                    </Flex>
                    <Text id="multi-link-search" pt={5} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        Collectionでは
                        <Link href={"#link"}><Box as="span" mx={1} color={"tipsy_color_2"} _hover={{borderBottom: "1px"}}>Link</Box></Link>
                        を個別のフォルダのように自由にカスタムすることができます。
                        あなたの興味やプロジェクトに合わせて
                        <Link href={"#link"}><Box as="span" mx={1} color={"tipsy_color_2"} _hover={{borderBottom: "1px"}}>Link</Box></Link>
                        を整理し、必要な情報に素早くアクセスできるようにします。
                    </Text>
                </Box>


                <Flex pt={"6rem"}>
                    <SharpBoard py={4} px={7}>
                        <Icon  aria-label='link_setting' as={TfiUnlink} color="tipsy_color_2"  fontSize={"1.2rem"}/>
                        <Heading mx={3} color={"tipsy_color_3"} size={"md"}
                        bgGradient='linear(to-br, tipsy_color_2, tipsy_color_3)' bgClip='text'
                        >Multi Link Search</Heading>
                        <Icon  aria-label='link_setting' as={TfiUnlink} color="tipsy_color_3"  fontSize={"1.2rem"}/>
                    </SharpBoard>
                </Flex>
                <Box px={3}>
                    <Text pt={"3rem"} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        複数のLinkのサイトで同時に検索をすることができます。
                    </Text>
                    <Text pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        <Link href={"#collection"}><Box as="span" mx={1} color={"tipsy_color_2"} _hover={{borderBottom: "1px"}}>Collection</Box></Link>
                        に設定された複数の
                        <Link href={"#link"}><Box as="span" mx={1} color={"tipsy_color_2"} _hover={{borderBottom: "1px"}}>Link</Box></Link>
                        ウェブサイトに一斉にアクセスし、同時に検索を実行できる強力な機能です。これにより、あなたのニーズに合った情報を、複数のソースから一度に収集できます。
                    </Text>
                    <Text id="link-post" pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        ログイン済みのユーザは
                        <Link href={"#collection"}><Box as="span" mx={1} color={"tipsy_color_2"} _hover={{borderBottom: "1px"}}>Collection</Box></Link>
                        を作成し、Linkをカスタマイズする必要があります。
                    </Text>
                </Box>


                <Flex pt={"6rem"}>
                    <SharpBoard py={4} px={7}>
                        <Icon  aria-label='link_setting' as={IoIosLink} color="tipsy_color_1"  fontSize={"1.2rem"}/>
                        <Heading mx={3} color={"tipsy_color_3"} size={"md"}
                        bgGradient='linear(to-tr, tipsy_color_1, tipsy_color_2)' bgClip='text'
                        >Link 投稿</Heading>
                        <Icon  aria-label='link_setting' as={IoIosLink} color="tipsy_color_2"  fontSize={"1.2rem"}/>
                    </SharpBoard>
                </Flex>
                <Box px={3}>
                    <Text pt={"3rem"} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        Link投稿ではインターネット上の興味深いリンクを瞬時に保存し、いつでも簡単に見返すことできます。
                    </Text>
                    <Text pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        思わず見つけた興味深い情報、何度も見るページなどをアプリ内にすぐに保存することにより、後でゆっくりと読むことができます。
                    </Text>

                    <Flex pt={"4rem"} align={"center"} gap={4} flexWrap={"wrap"}>
                        <Heading size={["md", "md", "sm"]}>- Linkを投稿する -</Heading>
                        <GlassTag id="login-only" border="none" colorScheme={colorMode=='light' ? "teal" : "pink"}>Login限定</GlassTag>
                    </Flex>
                    <UnorderedList pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        <ListItem mt={3}>画面上部の + ボタンを押し、&quot;Linkを保存する&quot;を選択 <Box fontSize={".8rem"}>( mac : command + j / windows : control + j )</Box></ListItem>
                        <ListItem mt={0}>タイトルを入力</ListItem>
                        <ListItem mt={3} id="article-post">LinkのURLをコピーする</ListItem>
                        <ListItem mt={3}>公開設定を行う <Box fontSize={".8rem"}>( 公開すると他のユーザも閲覧することができます )</Box></ListItem>
                        <ListItem mt={0}>保存する</ListItem>
                    </UnorderedList>
                </Box>


                <Flex pt={"6rem"}>
                    <SharpBoard py={4} px={7}>
                        <Icon  aria-label='link_setting' as={EditIcon} color="tipsy_color_3"  fontSize={"1rem"}/>
                        <Heading mx={3} color={"tipsy_color_3"} size={"md"}
                        bgGradient='linear(to-br, tipsy_color_3, tipsy_color_2)' bgClip='text'
                        >Article 投稿</Heading>
                        <Icon  aria-label='link_setting' as={EditIcon} color="tipsy_color_2"  fontSize={"1rem"}/>
                    </SharpBoard>
                </Flex>
                <Box px={3}>
                    <Text pt={"3rem"} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        Article投稿ではブログや日記を書く感覚で、あなたの記録したいこと、メモしたいことを自由に保存しておくことができます。
                    </Text>
                    <Text pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        そして、オプションとしてタグ( トピック )、参照リンク、サムネイルを自由にカスタマイズできます。
                    </Text>

                    <Heading pt={"4rem"} size={["md", "md", "sm"]}>- タグ ( トピック ) -</Heading>
                    <Text pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        タグは最大で
                        <Box as="span" mx={1} color={"tipsy_color_1v2"}>5つ</Box>
                        まで登録することができ、投稿を目的やジャンルによって整理することができます。さらに、このタグはtipsy内での検索の際にも役立ちます。
                    </Text>

                    <Heading pt={"2rem"} size={["md", "md", "sm"]}>- 参照リンク -</Heading>
                    <Text pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        参照リンクの追加は参考にしたサイトや情報元に瞬時にアクセスできるようにします。
                    </Text>
                    <Text pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        また、情報の信頼性を高めるためにも非常に有効です。
                    </Text>

                    <Heading pt={"2rem"} size={["md", "md", "sm"]}>- サムネイル -</Heading>
                    <Text pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        サムネイルの追加はあなたの投稿を目を引くものにし、情報を視覚的に魅力的にします。
                    </Text>
                    <Text pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        さらに、投稿を特徴付け見つけやすくすることにも役立ちます。
                    </Text>

                    <Flex pt={"4rem"} align={"center"} gap={4} flexWrap={"wrap"}>
                        <Heading size={["md", "md", "sm"]}>- Articleを投稿する -</Heading>
                        <GlassTag id="login-only" border="none" colorScheme={colorMode=='light' ? "teal" : "pink"}>Login限定</GlassTag>
                    </Flex>
                    <UnorderedList  pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        <ListItem mt={3}>画面上部の + ボタンを押し、&quot;文章を作成&quot;を選択 <Box fontSize={".8rem"}>( mac : command + m / windows : control + m )</Box></ListItem>
                        <ListItem mt={0}>タイトルを入力</ListItem>
                        <ListItem mt={3}>文章を作成</ListItem>
                        <ListItem mt={3}>自由に参照リンク・サムネイル・タグを追加する <Box fontSize={".8rem"}>( 省略可 )</Box></ListItem>
                        <ListItem mt={0}>公開設定を行う <Box fontSize={".8rem"}>( 公開すると他のユーザも閲覧することができます )</Box></ListItem>
                        <ListItem mt={0}>保存する</ListItem>
                    </UnorderedList>
                </Box>


                <Flex pt={"6rem"}>
                    <SharpBoard py={4} px={7}>
                        <Icon  aria-label='link_setting' as={MdBookmarkBorder} color="tipsy_color_3"  fontSize={"1.3rem"}/>
                        <Heading mx={3} color={"tipsy_color_3"} size={"md"}
                        bgGradient='linear(to-tr, tipsy_color_3, tipsy_color_1)' bgClip='text'
                        >Folder & ブックマーク</Heading>
                        <Icon  aria-label='link_setting' as={MdBookmarkBorder} color="tipsy_color_1"  fontSize={"1.3rem"}/>
                    </SharpBoard>
                </Flex>
                <Box px={3}>
                    <Text pt={"3rem"} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        Folderでは投稿をフォルダやプレイリストのように自由に追加することであなたの興味やプロジェクトに合わせて投稿を整理し、管理することができます。
                    </Text>

                    <Flex pt={"4rem"} align={"center"} gap={4} flexWrap={"wrap"}>
                        <Heading size={["md", "md", "sm"]}>- Folderを作成する -</Heading>
                        <GlassTag id="login-only" border="none" colorScheme={colorMode=='light' ? "teal" : "pink"}>Login限定</GlassTag>
                    </Flex>
                    <Text pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        マイページの&quot;Folders&quot;から作成することができます。サムネイルを設定することでFolderを特徴ずけ、見つけやすくすることができます。
                    </Text>

                    <Flex pt={"2rem"} align={"center"} gap={4} flexWrap={"wrap"}>
                        <Heading size={["md", "md", "sm"]}>- 投稿を追加する (ブックマーク) -</Heading>
                        <GlassTag id="login-only" border="none" colorScheme={colorMode=='light' ? "teal" : "pink"}>Login限定</GlassTag>
                    </Flex>
                    <Text pt={3} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        Folderに追加したい投稿のブックマークボタンを押し、Folderを選択することで追加できます。
                    </Text>
                </Box>


                <Flex pt={"6rem"}>
                    <SharpBoard py={4} px={7}>
                        <Icon  aria-label='link_setting' as={AiOutlineHeart} color="tipsy_color_1"  fontSize={"1.1rem"}/>
                        <Heading mx={3} color={"tipsy_color_3"} size={"md"}
                        bgGradient='linear(to-tr, tipsy_color_1, tipsy_color_2)' bgClip='text'
                        >いいね</Heading>
                        <Icon  aria-label='link_setting' as={AiOutlineHeart} color="tipsy_color_2"  fontSize={"1.1rem"}/>
                    </SharpBoard>
                </Flex>
                <Box px={3}>
                    <Text id="create-link" pt={"3rem"} fontSize={["1.3rem", "1.2rem", "1rem"]}>
                        気に入った投稿はハートボタンを押すことでいいねができます。マイページの&quot;Likes&quot;で良いねした投稿を確認できます。
                    </Text>
                </Box>


                <Flex pt={"6rem"}>
                        <Heading mx={3} color={"tipsy_color_3"} size={["md", "md", "sm"]}># LINKを作成する</Heading>
                </Flex>
                <Box px={3}>
                    <Text id="create-link" pt={"3rem"} fontSize={["1.2rem", "1.1rem", "0.9rem"]} color="tipsy_color_3">
                        # 必要なクエリ・パラメータを設定する ( 省略可 )
                    </Text>
                    <UnorderedList  pt={3} fontSize={["1.2rem", "1.1rem", "0.9rem"]}>
                        <ListItem mt={3}>クエリパラメータはURL内の&quot;?&quot;の後の部分のことです、多くのサイトの検索画面ではジャンルやカテゴリーなどの検索条件に使われています。</ListItem>
                        <ListItem mt={3}>変更することで、検索結果が変わることがあります。ぜひLinkの作成時にいろんなクエリパラメータを試してみよう。</ListItem>
                    </UnorderedList>

                    <Text id="create-link" pt={"3rem"} fontSize={["1.2rem", "1.1rem", "0.9rem"]} color="tipsy_color_3">
                        # アイコンを追加 (イメージのWebアドレス（URL）をコピーする方法) ( 省略可 )
                    </Text>
                    <UnorderedList  pt={3} fontSize={["1.2rem", "1.1rem", "0.9rem"]}>
                        <ListItem mt={3}>インターネット上で使用したい画像を見つける。</ListItem>
                        <ListItem mt={3}>マウスの右ボタンでインターネット上のイメージを右クリックします。</ListItem>
                        <ListItem mt={3}>イメージ(画像)のアドレス(場所・リンク)をコピーします。</ListItem>
                    </UnorderedList>
                </Box>
            </Flex>
        </Flex>
        </>
    )
}

export default Explanation