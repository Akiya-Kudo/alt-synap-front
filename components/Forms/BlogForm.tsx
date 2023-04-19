import { Flex, Heading } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react'
import { PostProcessType, PostType } from '../../type/post';
import { PageBackButton } from './postForms';
import styles from '../../style/components/my-quill.module.css'

import EditorJS from '@editorjs/editorjs';
import EditorjsHeader from '@editorjs/header'; 
import EditorjsList from '@editorjs/list'; 

const editor = new EditorJS({
    // Id of Element that should contain the Editor 
    holder: 'editorjs', 
    tools: { 
    header: EditorjsHeader, 
    list: EditorjsList 
    }, 
});

const BlogForm = ({setProgressValue, setPostType, progressValue, setPostProcess}: {setProgressValue: Dispatch<SetStateAction<number>>, setPostType: Dispatch<SetStateAction<PostType>>, progressValue: number, setPostProcess: Dispatch<SetStateAction<PostProcessType>>}) => {
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
                </div>

            </Flex>
        </>
    )
} 

export default BlogForm