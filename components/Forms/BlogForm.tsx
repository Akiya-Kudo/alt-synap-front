import { Button, Flex, Input, NumberInputField } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import { PostTitleInput, TopLinkInput } from './postForms'
import { SubmitButton } from './userForms'

const BlogForm = () => {
    const [value, setValue] = useState("")

    const { register, formState: { errors }, formState, getValues } = useForm({mode: "all"});

    return (
        <Flex as="form"
        direction="column" 
        w={400} 
        m={3}
        justify="center" 
        align="center"
        onSubmit={() => null }
        >
            <PostTitleInput errors={ errors } register={ register }/>
            <TopLinkInput errors={ errors } register={ register }/>
            <Input type={"file"} accept=" .png, .jpeg, .jpg, .svg"/>
            <ReactQuill theme="snow" value={value} onChange={ setValue }/>
            <SubmitButton text='Post Blog' formState={ formState }/>
        </Flex>
    )
}

export default BlogForm