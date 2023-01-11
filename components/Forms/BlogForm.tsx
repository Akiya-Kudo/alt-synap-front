import { Alert, Box, Flex, Heading, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import { PostProcessType, PostType } from '../../types/post';
import { PageBackButton } from './postForms';
import styles from '../../styles/components/my-quill.module.css'

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