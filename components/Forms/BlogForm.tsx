import { Flex, Heading } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useState } from 'react'
import ReactQuill from 'react-quill';
import { PostProcessType, PostType } from '../../types/post';
import { PageBackButton } from './postForms';

const BlogForm = ({setProgressValue, setPostType, progressValue, setPostProcess}: {setProgressValue: Dispatch<SetStateAction<number>>, setPostType: Dispatch<SetStateAction<PostType>>, progressValue: number, setPostProcess: Dispatch<SetStateAction<PostProcessType>>}) => {
    
    const [value, setValue] = useState()

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
                <ReactQuill theme="snow" value={value} onChange={() =>  setValue }/>

            </Flex>
        </>
    )
}

export default BlogForm