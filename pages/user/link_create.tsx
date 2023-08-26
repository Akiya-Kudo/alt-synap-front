import { Avatar, Box, Button, Center, Flex, FormControl, FormLabel, Switch, Text, Textarea, Tooltip, useSteps } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GlassButton, GlassSwitchButton } from "../../component/atom/buttons";
import { LinkHeader } from "../../component/layout/Header";
import { EditingLinkType, Link } from "../../type/global";
import { auth } from "../../util/firebase/init";
import { READ_USER_UUID } from "../../util/graphql/queries/users.query.schema";
import { AuthContext } from "../../util/hook/authContext";
import { useCustomToast } from "../../util/hook/useCustomToast";
import { client } from "../_app";
import { BasicStepper } from "../../component/atom/steppers";
import { StepsType } from "../../type/atom";
import { UrlAnalyzeStep, UrlLabelingStep, UrlTestStep } from "../../component/helper/LinkCreateStepForms";
import { useMutation } from "@apollo/client";
import { CREATE_LINK } from "../../util/graphql/mutation/links.mutation.scheme";
import { GET_PUBLISHED_LINKS, GET_USER_MADE_LINKS } from "../../util/graphql/queries/links.query.scheme";

const LinkCreate : NextPage  = () => {
    const { userState } = useContext(AuthContext);
    const router = useRouter()
    useEffect(() => { if (userState == 'guest')  router.replace('/') }, [userState])
    
    const {toastSuccess, toastError} = useCustomToast()
    
    const [currentLink, setCurrentLink] = useState<EditingLinkType>(defLinkData)
    const [isSaveButtonLoading, setIsSaveButtonLoading] = useState<boolean>(false) 

    const [createLink, { error, data, loading }] = useMutation(CREATE_LINK, { 
        update( cache, { data: { create_link } } ) { 
            const data_user = client.readQuery({ query: READ_USER_UUID, variables: { uid: auth.currentUser?.uid }})

            const data_madeby = client.readQuery({ query: GET_USER_MADE_LINKS,
                variables: { uuid_uid: data_user.user.uuid_uid }
            })
            if (data_madeby) {
                const res_pre = data_madeby.get_link_made_by_user
                const new_res = [...res_pre, create_link]
                client.writeQuery({
                    query: GET_USER_MADE_LINKS,
                    variables: { uuid_uid: data_user.user.uuid_uid },
                    data: { get_link_made_by_user: new_res }
                })
            }

            const data_pubsh = client.readQuery({ query: GET_PUBLISHED_LINKS })
            if (data_pubsh) {
                const res_pre = data_pubsh.get_published_links
                const new_res = [...res_pre, create_link]
                client.writeQuery({
                    query: GET_PUBLISHED_LINKS,
                    data: { get_published_links: new_res }
                })
            }
        }
    })
    
    const handleLinkCreateExecute = async () => {
        setIsSaveButtonLoading(true)
        await createLink({variables: {
            linkData: {
                link_name: currentLink.link_name,
                explanation: currentLink.explanation!="" ? currentLink.explanation : null,
                image_path: currentLink.image_path!="" ? currentLink.image_path : null,
                url_scheme: currentLink.url_scheme,
                query: currentLink.query,
                joint: currentLink.joint,
                other_queries: currentLink.other_queries,
                genre: currentLink.genre,
                is_path_search: currentLink.is_path_search,
                publish: currentLink.publish
            }
        }})
        .then((res) => {
            router.back()
            toastSuccess("Linkを作成できました!")
            setIsSaveButtonLoading(false)
        })
        .catch((error) => {
            setIsSaveButtonLoading(false)
            toastError("作成に失敗しました。", "インターネット状態や入力をもう一度お確かめください")
        })
    }

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    })

    return (
        <>
        <LinkHeader title={"LINKを作成する"}/>
        <Flex
        className="page" 
        justify={"center"}
        >
            <Flex
            direction={"column"}
            w="600px"
            >
                <BasicStepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} my={5}/>
                {
                    activeStep == 0 &&
                    <UrlAnalyzeStep 
                    setCurrentLink={setCurrentLink} currentLink={currentLink} setActiveStep={setActiveStep}
                    defaultUrlValue={currentLink.url_all}
                    />
                }
                {
                    activeStep == 1 &&
                    <UrlTestStep setCurrentLink={setCurrentLink} currentLink={currentLink} setActiveStep={setActiveStep}/>
                }
                {
                    activeStep == 2 &&
                    <UrlLabelingStep 
                    setCurrentLink={setCurrentLink} currentLink={currentLink} 
                    setActiveStep={setActiveStep} handleLinkCreateExecute={handleLinkCreateExecute}
                    isSaveButtonLoading={isSaveButtonLoading}
                    />
                }
            </Flex>
        </Flex>
        </>
    )
}

export default LinkCreate

const defLinkData = {
    url_all: "",
    link_name: "",
    image_path: "",
    url_scheme: "",
    explanation: "",
    genre: 5,
    query: null,
    joint: "",
    other_queries: null,
    other_queries_array: null,
    publish: false,
    is_path_search: false,
} as EditingLinkType

const steps = [
    { title: 'サイトの検索画面のURLをゲットする ', description: '以下のコピーボタンによりコピーした文字列で作成したいサイトの検索を行い、その結果が表示された画面のURLを下記に貼り付けてください。' },
    { title: 'その他のパラメータを選択する ・ テストしてみる', description: '自動で作成されたURLが機能するかチェック！ 他のクエリを組み合わせたい時には組み合わせて、検索結果がどのように変化するのか確認しよう' },
    { title: '最後に作成したリンクを完成させる', description: '名前とジャンルは必ず入力してください' },
] as StepsType[]