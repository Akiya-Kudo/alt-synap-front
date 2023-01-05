import { Flex, Heading } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import { PostProcessType, PostTopInfoType } from '../../types/post'
import { PostImageInput, PostTitleInput, TopLinkInput } from './postForms'
import { SubmitButton } from './userForms'

const PostTopForm = ({setProgressValue, setPostProcess, setPostTopInfo, postTopInfo}: {setProgressValue: Dispatch<SetStateAction<number>>, setPostProcess: Dispatch<SetStateAction<PostProcessType>>, setPostTopInfo: Dispatch<SetStateAction<PostTopInfoType | undefined>>, postTopInfo: PostTopInfoType | undefined}) => {
    
    const [isShowLink, setIsShowLink] = useState(true)
    const [isShowImage, setIsShowImage] = useState(true)
    const [image, setImage] = useState()
    const [imageFile, setImageFile] = useState(null)
    // const [imageChanged, setImageChanged] = useState(false)

    const { register, formState: { errors }, formState, getValues } = useForm({mode: "all"});

    // ちらつきをなくすためuseLayoutEffectを使用(同期処理になるためパフォーマンスが低下する可能性あり)
    useLayoutEffect(() => {
        if (postTopInfo?.isShowLink == false) setIsShowLink(false)
        if (postTopInfo?.isShowImage == false) setIsShowImage(false)
    }, [])

    return (
        <Flex as="form"
        direction="column" 
        w={400} 
        mt={19}
        m={3}
        justify="center" 
        align="center"
        onSubmit={(e) => {
            e.preventDefault()
            const target = e.target as any;
            setPostTopInfo({
                title: target.inputText10?.value,
                topLink: target.inputText11?.value,
                topImage: imageFile,
                isShowLink,
                isShowImage,
            })
            setProgressValue(30)
            setPostProcess("postTypeSelect")
        }}
        >
            <Heading my={3}>Post Tips</Heading>
            <PostTitleInput errors={ errors } register={ register } defValue={postTopInfo?.title}/>
            <TopLinkInput errors={ errors } register={ register } isShow={isShowLink} setIsShow={setIsShowLink} defValue={postTopInfo?.topLink} defIsShow={postTopInfo?.isShowLink}/>
            <PostImageInput  setImageFile={ setImageFile } image={ image } setImage={ setImage } register={ register } isShow={isShowImage} setIsShow={setIsShowImage} defValue={postTopInfo?.topImage} defIsShow={postTopInfo?.isShowImage}/>
            {/* <ReactQuill theme="snow" value={value} onChange={ setValue }/> */}
            <SubmitButton text='Next ➡︎' formState={ formState }/>
        </Flex>
    )
}

export default PostTopForm