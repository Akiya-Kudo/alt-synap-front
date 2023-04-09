import { Box, Button, Divider, Flex, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useLogInFunc, useSocialLoginFunc } from "../../util/hook/useAuth"
import { GlassButton, GlassButton_submit } from "../atom/buttons"
import { BasicLink } from "../atom/links"
import { GlassFloatFormInput, GlassFloatFormInput_password, GlassFormInput, GlassFormInput_password, GlassInputDefault } from "../atom/inputs"
import { Validation_email, Validation_password } from "../../util/form/validation"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { GlassSocialLoginButtons } from "../helper/SocialLoginButtons"

// ログインフォームコンポーネント定義
export const LoginForm = () => {

    const { register, formState: { errors }, formState } = useForm({mode: "all"});

    const {execute} = useLogInFunc()
    const {executeGoogle, executeGithub} = useSocialLoginFunc();

    const SubmitChange = (e: any) => {
        e.preventDefault()
        const target = e.target as any;
        const email = target.input_email.value as string;
        const password = target.input_password.value as string;
        execute(email, password);
    }
    return (
        <Flex
            as="form" 
            direction="column" 
            w="100%" 
            onSubmit={ SubmitChange }
        >
            <ModalBody pb={6}>
                <GlassFloatFormInput
                id="input_email"
                labelName="メールアドレス"
                validation={Validation_email}
                errors={errors} register={ register }
                isRequired
                my={3}
                />
                {/* <GlassFormInput 
                id="input_email" 
                labelName="メールアドレス" 
                placeholder="sample.com"
                validation={Validation_email} 
                errors={ errors } register={ register } 
                isRequired
                my={3}
                /> */}
                <GlassFloatFormInput_password
                id="input_password" 
                labelName="パスワード" 
                placeholder={"Password00"}
                validation={Validation_password} 
                errors={ errors } register={ register } 
                isRequired
                my={3}
                />
                {/* <GlassFormInput_password
                id="input_password" 
                labelName="パスワード" 
                placeholder={"Password00"}
                validation={Validation_password} 
                errors={ errors } register={ register } 
                isRequired
                my={3}
                /> */}
                <Flex direction='column'  my={5} align='center' justify='center'>
                    <GlassButton_submit 
                    formState={formState}
                    bg={"text_light"}
                    px={10} fontSize={"0.8rem"} w={200} mt={5}
                    bgGradient={"linear(to-l, tipsy_color_2, tipsy_color_3)"} color="bg_switch"
                    _hover={{bgGradient: "linear(to-l, tipsy_color_active_2, tipsy_color_active_3)"}}
                    >
                        ログイン
                    </GlassButton_submit>
                    <BasicLink color="tipsy_color_2" href="/guest/changePassword" my={3}>パスワードを忘れた場合</BasicLink>
                    <GlassSocialLoginButtons/>
                </Flex>
            </ModalBody>
        </Flex>
    )
}

export const LoginModal = ({
    
}: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <GlassButton 
            onClick={onOpen}
            fontSize={15} borderRadius={100} letterSpacing={5} px={5}
            bgGradient={"linear(to-l, tipsy_color_1, tipsy_color_2)"} color="bg_switch" 
            _hover={{bgGradient: "linear(to-l, tipsy_color_active_1, tipsy_color_active_2)"}}
            >
                ログイン
            </GlassButton>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay 
                backdropFilter={"blur(2px)"} 
                bg="bg_transparent_reverse"
                />
                <ModalContent
                backdropFilter={"blur(10px)"}
                bg="bg_transparent"
                borderRadius={40}
                p={5}
                >
                    <ModalHeader 
                    borderTopRadius={40}
                    >
                        <Flex 
                        fontSize="1.2rem"
                        >
                            {/* <Box style={{width: 40, height: 40}} mr={2}><Image src='/logo3.svg'  width={300} height={300} layout={'responsive'} alt="logo" priority></Image></Box> */}
                            <Box>ログインする</Box>
                        </Flex>
                        <ModalCloseButton color={"text_light"}/>
                    </ModalHeader>

                    <LoginForm/>

                </ModalContent>
            </Modal>
        </>
    )
}