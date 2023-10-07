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
export const LoginForm = ({onClose}: {onClose: () => void}) => {

    const { register, formState: { errors }, formState } = useForm({mode: "all"});

    const {execute} = useLogInFunc()

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
                <GlassFloatFormInput_password
                id="input_password" 
                labelName="パスワード" 
                placeholder={"Password00"}
                validation={Validation_password} 
                errors={ errors } register={ register } 
                isRequired
                my={3}
                />
                <Flex direction='column'  my={1} align='center' justify='center'>
                    <GlassButton_submit 
                    formState={formState}
                    bg={"text_light"}
                    px={10} fontSize={"0.8rem"} w={[200, 300, 200]} mt={5}
                    bgGradient={"linear(to-l, tipsy_color_2, tipsy_color_3)"} color="bg_switch"
                    _hover={{bgGradient: "linear(to-l, tipsy_color_active_2, tipsy_color_active_3)"}}
                    >
                        ログイン
                    </GlassButton_submit>
                    <GlassSocialLoginButtons/>
                    <BasicLink onClick={onClose} color="tipsy_color_active_2" href="/guest/changePassword" my={3}>パスワードを忘れた場合</BasicLink>
                    <BasicLink onClick={onClose} color="tipsy_color_active_3" href="/guest/signup" my={1}>新しくアカウントを作成</BasicLink>
                </Flex>
            </ModalBody>
        </Flex>
    )
}

export const LoginModal = ({ isOpen, onClose}: { isOpen: boolean, onClose: () => void }) => {
    return (
        <>
            <Modal
            isOpen={isOpen}
            onClose={onClose}
            >
                <ModalOverlay 
                backdropFilter={"blur(2px)"} 
                bg="bg_transparent_reverse"
                />
                <ModalContent
                backdropFilter={"blur(17px)"}
                bg="bg_popover_switch_lignt"
                borderRadius={[20, 30, 40]}
                p={5}
                >
                    <ModalHeader 
                    borderTopRadius={[10, 30, 40]}
                    >
                        <Flex fontSize="1.2rem">
                            <Box>ログインする</Box>
                        </Flex>
                        <ModalCloseButton color={"text_light"}/>
                    </ModalHeader>

                    <LoginForm onClose={onClose}/>

                </ModalContent>
            </Modal>
        </>
    )
}