import { Box, Flex, FormLabel } from "@chakra-ui/react";
import { NextPage } from "next"
import Head from "next/head"
import emailjs from '@emailjs/browser';
import { LinkHeader } from "../../component/layout/Header"
import { useCustomToast } from "../../util/hook/useCustomToast";
import { useForm } from "react-hook-form";
import { NeumFormInput, NeumTextAreaDefault } from "../../component/atom/inputs";
import { Validation_email, Validation_post_title } from "../../util/form/validation";
import { useRef, useState } from "react";
import { ClickButton } from "../../component/atom/buttons";
import { useRouter } from "next/router";

const Contact: NextPage<{}>  = () => {
    const  { register, formState: { errors }, formState, } = useForm({mode: "all"});
    const {toastSuccess, toastError} = useCustomToast()
    const router = useRouter()

    const formRef = useRef<HTMLFormElement>(null)
    const [contactForm, setContactForm] = useState<{title: string, email:string, content:string}>({
        title: "",
        email: "",
        content: "",
    }) // for the validations
    const [isSaveButtonLoading, setIsSabeButtonLoading] = useState(false)

    const sendEmail = (e:any) => {
        e.preventDefault();
        emailjs.sendForm('service_a4if6r8', 'template_63p7opb', formRef.current!=null ? formRef.current: "form undefined", 'aFiva8YD_oC_mZYTY')
        .then((result) => {
            toastSuccess("お問い合わせが完了しました。")
            setIsSabeButtonLoading(true)
            router.push("/")
        }).catch((error) => {
            toastError("お問い合わせを適切に受け取ることができませんでした。", "お問い合わせ内容を再度確認して送信ください。")
        }).finally(() => {
            setIsSabeButtonLoading(false)
        })
    };
    console.log(formRef.current);
    
    return (
        <>
            <Head><title>Tipsy | Home</title></Head>
            <LinkHeader title={"Contact"}/>
            <Flex className="page"  w={"100vw"} justify="center" mt={5}>
                <Flex as="form" ref={formRef} direction={"column"} w={"90%"} maxW={"1000px"} align={"center"}>
                    <NeumFormInput
                    id="title" labelName={"Title"} mt={6} placeholder={"件名"} fontWeight={"bold"}
                    register={register} errors={errors} validation={Validation_post_title}
                    onChange={(e)=>setContactForm({...contactForm, title: e.target.value})}
                    isRequired
                    />

                    <NeumFormInput
                    id="email" labelName={"Email"} mt={6} placeholder={"メールアドレス"} fontWeight={"bold"}
                    register={register} errors={errors} validation={Validation_email}
                    onChange={(e)=>setContactForm({...contactForm, email: e.target.value})}
                    isRequired
                    />

                    <FormLabel size={"xs"} mt={6} fontWeight={"bold"} >お問い合わせ内容</FormLabel>
                    <NeumTextAreaDefault 
                    id="content" name="content"
                    placeholder={"概要"} h={300} py={2} mt={1}
                    onChange={(e)=>setContactForm({...contactForm, content: e.target.value})}
                    />
                    <ClickButton
                    w={"200px"} mt={5}
                    color={"bg_switch"} Hcolor={"bg_switch"} 
                    bg={!(!errors.title) || !(!errors.email) || contactForm.title=="" || contactForm.email=="" || contactForm.content=="" ? "transparent" : "tipsy_color_3"}
                    onClick={sendEmail}
                    isDisabled={!(!errors.title) || !(!errors.email) || contactForm.title=="" || contactForm.email=="" || contactForm.content==""}
                    isLoading={isSaveButtonLoading}
                    >送信</ClickButton>
                </Flex>
            </Flex>
        </>
    );
}

export default Contact