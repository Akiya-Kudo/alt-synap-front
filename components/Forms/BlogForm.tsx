import { Alert, Box, Flex, Heading, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import { PostProcessType, PostType } from '../../types/post';
import { PageBackButton } from './postForms';
import styles from '../../styles/components/my-quill.module.css'

const BlogForm = ({setProgressValue, setPostType, progressValue, setPostProcess}: {setProgressValue: Dispatch<SetStateAction<number>>, setPostType: Dispatch<SetStateAction<PostType>>, progressValue: number, setPostProcess: Dispatch<SetStateAction<PostProcessType>>}) => {
    
    const [value, setValue] = useState()

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
            [{ 'color': []}, { 'background': []}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'indent': '-1'}, {'indent': '+1'}, {'align': []}],
            ['link', 'image', "video"],
            ['clean']
        ],
        history: {
            delay: 2000,maxStack: 500,userOnly: true
        }
    }
    
    const formats = [
        'header',
        'bold', 'italic', 'underline', 
        'strike', 'blockquote', 'code-block',
        'color', 'background',
        'list', 'bullet', 'indent', 'align',
        'link', 'image', "video",
        'history',
    ]

    let reactQuillRef = useRef<ReactQuill | null>(null)

    const EditorChanged = (e: any) => {
        setValue(e)
    }

    return (
        <>
            <Flex 
            as="form"
            direction="column" 
            w={400} 
            mt={19}
            m={3}
            justify="center" 
            align="center"
            onSubmit={ () => {}}
            >
                <Heading mt={7} me={20}>
                    <PageBackButton beforePageForm={"postTypeSelect"} beforeProcessValue={30} setProgressValue={ setProgressValue } setPostProcess={setPostProcess} />
                    Post Tips
                </Heading>
                {/* <TagSelectModal/> */}
                {/* <PublishSwitch/> */}
                {/* <SaveButton/> */}
                <div className={styles.quillContainer}>
                    <ReactQuill ref={ reactQuillRef } theme={"snow"} value={value} modules={modules} formats={formats} placeholder={"Write Your Tips..."} onChange={ EditorChanged } />
                </div>

            </Flex>
        </>
    )
} 

export default BlogForm