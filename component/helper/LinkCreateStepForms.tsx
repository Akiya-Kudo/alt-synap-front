import { Avatar, Box, Button, Center, Checkbox, Collapse, Flex, FormControl, FormLabel, Heading, IconButton, Link, List, ListIcon, ListItem, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Text, useColorMode, useDisclosure } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FaQuestion } from "react-icons/fa"
import { IoMdCheckmarkCircle } from "react-icons/io"
import { EditingLinkType, Link as LinkType } from "../../type/global"
import { LinkAnalyzeStepType } from "../../type/helper"
import { LinkGenreNames } from "../../type/standalone"
import { Validation_linkname, Validation_url, Validation_url_required } from "../../util/form/validation"
import { useGlassColorMode } from "../../util/hook/useColor"
import { useCustomToast } from "../../util/hook/useCustomToast"
import { FlatBord } from "../atom/bords"
import { ClickButton, GlassButton_submit, SwitchButton } from "../atom/buttons"
import { GlassFloatFormInput, GlassInputDefault, NeumFloatFormInput, NeumFormInput, NeumInputDefault, NeumTextAreaDefault } from "../atom/inputs"
import { BasicSelect } from "../atom/select"
import { StepGuide } from "../atom/texts"
import { ImagePathInputPopover } from './Popovers'

export const UrlAnalyzeStep = (
    { setCurrentLink, currentLink, setActiveStep, defaultUrlValue }
: { setCurrentLink: Dispatch<SetStateAction<EditingLinkType>>, currentLink: EditingLinkType, 
    setActiveStep : Dispatch<SetStateAction<number>>, defaultUrlValue: string
}) => {
    const  { register, formState: { errors }, formState, } = useForm({mode: "all"});
    const {toastSuccess, toastError} = useCustomToast()
    const [isLoading, setIsLoading] = useState(false)

    const [url, setUrl] = useState(defaultUrlValue)
    const handleUrl = (e: any) => setUrl(e.target.value)
    const handleCopy = () => {
        navigator.clipboard.writeText(analyzeUrlString)
        toastSuccess("コピーしました")
    }

    const handleAnalyeQuery = () => {
        setIsLoading(true)
        useAnalyzeQuery(url).then((res) => {
            setCurrentLink({...currentLink, ...res})
            toastSuccess("読み取りに成功しました")
            setActiveStep(1)
            // console.log(res)

        }).catch( (error) => toastError("Search-Linkの作成に失敗しました", error.message)
        ).finally(()=> setIsLoading(false))
    }
    return (
        <Box mx={[6,6,3]}>
            <Box mb={10}>
                <StepGuide stepNum={1} guide={"作成したいリンクのサイトを開く"}/>
            </Box>

            <Box my={10}>
                <StepGuide stepNum={2} guide={"以下のコピーボタンを押して文字をコピーする"}/>
                <Flex m={5}>
                    <ClickButton fontSize={[15]} h={8} borderRadius={10} onClick={handleCopy}>コピー</ClickButton>
                    <Flex mx={5} bg={"bg_transparent_reverse_deep"} align={"center"} isTruncated w={200} borderRadius={10}>
                        <Text isTruncated>{ analyzeUrlString }</Text>
                    </Flex>
                </Flex>
            </Box>

            <Box my={10}>
                <StepGuide stepNum={3} guide={"作成するサイトの検索バーにコピーした文字列をペーストし検索を行う"}/>
            </Box>
            
            <Box my={10}>
                <StepGuide stepNum={4} guide={"検索を行い、結果が表示された画面のURLをコピーする"}/>
            </Box>
            
            <Box my={10}>
                <StepGuide stepNum={3} guide={"以下のURLバーにコピーしたURLを貼り付けて次へ進む"}/>
                <NeumFormInput
                m={5}
                id={"input_url"} 
                register={register} errors={errors} validation={Validation_url_required}
                labelName={"URL"} placeholder={"http://"}
                defaultValue={defaultUrlValue}
                onChange={handleUrl}
                isRequired
                />
            </Box>

            <Flex justify={"center"} my={2}>
                <ClickButton 
                onClick={handleAnalyeQuery}
                isDisabled={!(!errors.input_url) || url==""}
                isLoading={isLoading}
                >
                    次へ
                </ClickButton>
            </Flex>
        </Box>
    )
}

export const analyzeUrlString = "abcdefg hijklmn"

// explanation : urlを解析する
// args : url => "parsed string"
const useAnalyzeQuery = async (url: string): Promise<LinkAnalyzeStepType | {message: string}> => {
    try {
        // 検索で使用した文字列を配列化
        const analyzeWords = analyzeUrlString.split(" ")

        //url_scheme部分とクエリ部分で分割
        let url_scheme = url.split("?")[0]
        let all_queries_string = url.split("?")[1]
        
        //初期値設定
        let is_path_search = analyzeWords.every(word => url_scheme.includes(word)) as boolean
        let joint = null
        let query = null
        let other_queries = null

        if (is_path_search) {
            //joint ・ url_scheme ・ other_queriesを設定する
            joint = getJoint(url_scheme, analyzeWords)
            
            const wordStartIx = url.indexOf(analyzeWords[0])
            url_scheme = url_scheme.substring(0, wordStartIx -1) //url_schemeを再設定

            if (all_queries_string) other_queries = all_queries_string.split("&")

        } else if (!is_path_search && analyzeWords.every(word => all_queries_string.includes(word))) { // is_path_searchではなく、クエリ部分に検索ワードを含んでいる場合のみ
            // query・ joint ・ other_queries を設定する
            const all_queries = all_queries_string.split("&")
            let is_query_setted = false
            other_queries = all_queries.filter((param) => {
                if (!is_query_setted && analyzeWords.every(word => param.includes(word))) {
                    joint = getJoint(param, analyzeWords)
                    query = param.split("=")[0]
                    is_query_setted = true
                    return false
                }
                return true
            })
        } else throw new Error(`Unable to create a schema for a search link from the provided URL.`)

        return ({
            url_all: url,
            url_scheme,
            query,
            joint: joint ? joint : "", 
            other_queries_array: other_queries,
            is_path_search,
        })
    } catch (error) {
        console.log(error);
        throw new Error(error instanceof Error ? error.message : "coud'nt create search Link")
    }
}

// explanation : get the joint_string between certain passed string array
// args : url => "parsed string", analuzeWords => "certain string array for getting join from url"
const getJoint = (url: string, analyzeWords: string[]) => {
    let joint = undefined as string | undefined
        let preWordEndIx = 0 as number
        analyzeWords.map(word => {
            const startIx = url.indexOf(word)
            if (preWordEndIx) {
                const newjoint = url.substring(preWordEndIx + 1, startIx)
                if (joint && joint !== newjoint)  throw new Error(`joint is not consistant`)
                joint = newjoint
            }

            preWordEndIx = startIx + word.length -1
        })
        if (joint) return joint 
        throw new Error(`joint coud'nt be gotten by some reasons`)
};



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



export const UrlTestStep = ({setCurrentLink, currentLink, setActiveStep}: {setCurrentLink: Dispatch<SetStateAction<EditingLinkType>>, currentLink: EditingLinkType, setActiveStep : Dispatch<SetStateAction<number>>}) => {
    const { colorMode } = useColorMode()

    const defaultSearchWord = "test sample"
    const [searchWordValue, setSearchWordValue] = useState<string>(defaultSearchWord)
    const [checkedQueriesIndex, setCheckedQueriesIndex] = useState<number[]>([])
    const [testLink, setTestLink] = useState<string>(createSearchLink(currentLink, searchWordValue))

    const handleCheckQuery = (e:any) => {
        let queriesIx = [] as number[]
        if (e.target.checked) queriesIx = [...checkedQueriesIndex, parseInt(e.target.id)]
        else queriesIx = checkedQueriesIndex.filter(num => num !== parseInt(e.target.id))
        setCheckedQueriesIndex(queriesIx)
        setCurrentLink({
            ...currentLink, 
            other_queries: currentLink.other_queries_array && 
            currentLink.other_queries_array.filter((query, _i) => queriesIx.includes(_i)).join("&")
        })
    }
    
    useEffect(() => {
        setTestLink(createSearchLink(currentLink, searchWordValue))
    },[currentLink, searchWordValue])

    const handleCreateLinkWord = (e: any) => setSearchWordValue(e.target.value)
    const handleSearchExecute = () => window.open(testLink, '_blank')
    
    return (
        <Box mx={[6,6,3]}>
            <Box mb={10}>
                <StepGuide stepNum={1} guide={"実際に検索をしてみる"}/>
                <Heading size={"xs"} mx={5} mt={4} mb={1}>作成されたリンク</Heading>
                <Link mx={5} my={4} fontSize={".8rem"} color={"tipsy_color_2"}>{testLink}</Link>
                <Flex flexDir={"row"} alignItems={"center"} gap={5} mx={5} my={4}>
                    <NeumInputDefault 
                    id={"input_test"} onChange={handleCreateLinkWord}
                    placeholder={defaultSearchWord} defaultValue={defaultSearchWord}
                    />
                    <ClickButton
                    color={"bg_switch"} Hcolor={"bg_switch"}
                    bg={"tipsy_color_3"}
                    onClick={handleSearchExecute}
                    >
                        検索
                    </ClickButton>
                </Flex>
            </Box>

            <Box my={10}>
                <StepGuide stepNum={2} guide={"必要なクエリ・パラメータを設定する ( 省略可 )"}/>
                <FlatBord my={5} p={2}>
                    <Flex w={"100%"} maxH={"150px"} overflowX={"hidden"} overflowY={"scroll"} flexDir={"column"}>
                        {
                            currentLink.other_queries_array && 
                            currentLink.other_queries_array.map((param, _i) => {
                                return (
                                    <Checkbox 
                                    key={_i} id={_i.toString()}
                                    colorScheme={colorMode === 'light' ? 'teal' : 'pink'}
                                    size={"sm"} whiteSpace="nowrap" textOverflow="ellipsis"
                                    onChange={handleCheckQuery}
                                    >{param}</Checkbox>
                                )
                            })
                        }
                        {(!currentLink.other_queries_array || currentLink.other_queries_array?.length == 0) && "設定するクエリはありません"}
                    </Flex>
                </FlatBord>
            </Box>
            
            <Flex justify={"center"} my={2} gap={20}>
                <ClickButton onClick={() => setActiveStep(0)} >戻る</ClickButton>
                <ClickButton
                onClick={() => setActiveStep(2)}
                >次へ</ClickButton>
            </Flex>
        </Box>
    )
}

const createSearchLink = (link: LinkType | EditingLinkType, words: string): string => {
    let created_link = link.url_scheme
    const search_string = words?.toLowerCase().replace(/　/g, ' ').replace(/\s+/g, ' ').split(" ").join(link.joint)
    if (link.is_path_search) {
        const other_queries = link.other_queries ? "?" + link.other_queries : ""
        return [created_link, search_string].join("/") + other_queries
    }
    else {
        const other_queries = link.other_queries ? "&" + link.other_queries : ""
        return created_link + "?" + link.query + "=" + search_string + other_queries
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



export const UrlLabelingStep = (
    {setCurrentLink, currentLink, setActiveStep, handleLinkCreateExecute,
    isSaveButtonLoading}
    : {setCurrentLink: Dispatch<SetStateAction<EditingLinkType>>, currentLink: EditingLinkType, 
        setActiveStep : Dispatch<SetStateAction<number>>, handleLinkCreateExecute: () => void,
        isSaveButtonLoading: boolean
}) => {

    const  { register, formState: { errors }, formState, } = useForm({mode: "all"});
    
    const handleLinkName = (e:any) => setCurrentLink({...currentLink, link_name: e.target.value})
    const handleImagePath = (e:any) => setCurrentLink({...currentLink, image_path: e.target.value})
    const handlePublish = (e:any) => setCurrentLink({...currentLink, publish: !currentLink.publish})
    const handleExplanation = (e:any) => setCurrentLink({...currentLink, explanation: e.target.value})
    const handleGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentLink({...currentLink, 
            genre: event.target.value 
            ? parseInt(event.target.value) as 0 | 1 | 2 | 3 | 4 | 5 
            : currentLink.genre})
    }
    
    return (
        <Box mx={[6,6,3]}>
            <Box mb={10}>
                <StepGuide stepNum={1} guide={"名前とその他の概要を埋めよう ( 必須項目 : 名前・ジャンル )"}/>
                <Center
                position={"relative"}
                >
                    <Avatar src={currentLink.image_path} name={currentLink.link_name} size={"xl"} mt={5}/>
                    <Box
                    position={"absolute"}
                    bottom={0} right={["10px", "40px", "70px"]}
                    >    
                        <ImagePathInputPopover 
                        handleImagePath={handleImagePath} defValue={currentLink.image_path} 
                        >
                            <ClickButton fontSize={[10, 12, 15]}>アイコンを追加</ClickButton>
                        </ImagePathInputPopover>
                    </Box>
                </Center>

                <NeumFormInput 
                id="input_name" labelName={"名前"} mt={6} placeholder={"Tipsy"} fontWeight={"bold"}
                register={register} errors={errors} validation={Validation_linkname}
                onChange={handleLinkName} defaultValue={currentLink.link_name}
                isRequired
                />

                <Flex
                justify={"space-between"}
                flexWrap={"wrap"}
                >
                    <FormControl isRequired w={[250]} my={5}>
                        <FormLabel size={"xs"} fontWeight={"bold"} mb={7}>ジャンル</FormLabel>
                        <BasicSelect defaultValue={currentLink.genre} onChange={handleGenre}>
                            { Object.entries(LinkGenreNames).map( ([key, name]) => <option value={parseInt(key)} key={parseInt(key)}>{name}</option>)}
                        </BasicSelect>
                    </FormControl>

                    <Box w={[250]} my={5}>
                        <FormLabel size={"xs"}  fontWeight={"bold"} mb={7}>公開設定</FormLabel>
                        <ClickButton 
                        w={200} h={30}
                        onClick={handlePublish}
                        color={currentLink.publish ? "tipsy_color_2" : "text_normal"}
                        Hcolor={"tipsy_color_2"} Acolor={"tipsy_color_2"}
                        >
                            {currentLink.publish ? "公開中" : "非公開"}
                        </ClickButton>
                    </Box>
                </Flex>

                <FormLabel size={"xs"} mt={6} fontWeight={"bold"} >説明</FormLabel>
                <NeumTextAreaDefault mt={1}
                placeholder={"概要"}
                onChange={handleExplanation}
                />
            </Box>
            <Flex justify={"center"} my={5} gap={20} mx={3}>
                <ClickButton onClick={() => setActiveStep(1)} >戻る</ClickButton>
                <ClickButton
                w={"200px"}
                color={"bg_switch"} Hcolor={"bg_switch"} 
                bg={!(!errors.input_name) || currentLink.link_name=="" ? "transparent" : "tipsy_color_3"}
                onClick={handleLinkCreateExecute}
                isDisabled={!(!errors.input_name) || currentLink.link_name==""}
                isLoading={isSaveButtonLoading}
                >完成</ClickButton>
            </Flex>
        </Box>
    )
}