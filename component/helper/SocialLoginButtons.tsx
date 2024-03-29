import { Button, Flex, HStack } from "@chakra-ui/react"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { useSocialLoginFunc } from "../../util/hook/useAuth";
import { ClickButton } from "../atom/buttons";

export const NeumSocialLoginButtons = () => {
    const {executeGoogle, executeGithub} = useSocialLoginFunc();
    return (
        <Flex
        flexWrap={"wrap"}
        justify="center" align={"center"}
        >
            <ClickButton
            onClick={ () => executeGoogle() } rightIcon={<FaGoogle/>} 
            color={"red_switch"}
            Hcolor={"red.600"}
            Acolor={"red.800"}
            w={[100, 150, 200]} h={["30px", "40px", "50px"]}
            m={5}
            >
                GMail
            </ClickButton>
            <ClickButton
            onClick={ () => executeGithub() } rightIcon={<FaGithub />} 
            color={"purple_switch"}
            Hcolor={"purple.700"}
            Acolor={"purple.800"}
            w={[100, 150, 200]} h={["30px", "40px", "50px"]}
            m={5}
            >
                Github
            </ClickButton>
        </Flex>
    )
}

export const GlassSocialLoginButtons = () => {
    const {executeGoogle, executeGithub} = useSocialLoginFunc()
    return (
        <Flex
        direction={{ base: "column", sm: "column", md: "row"}} 
        align='center' justify='center' 
        gap={{ base: 5, sm: 5, md: 10}} my={5}
        >
            <Button 
            onClick={ () => executeGoogle() } rightIcon={<FaGoogle/>}
            variant='outline' colorScheme="red" borderRadius="full"
            _hover={{bgGradient: "linear(to-tl, red_switch, orange_switch)", color: "bg_switch"}}
            w={[200, 300, 200]}
            >
                GMail
            </Button>
            <Button 
            onClick={ () => executeGithub() } rightIcon={<FaGithub />} 
            variant="outline" colorScheme="purple" borderRadius="full"
            _hover={{bgGradient: "linear(to-tl, purple_switch, yellow_switch)", color: "bg_switch"}}
            w={[200, 300, 200]}
            >
                Github
            </Button>
        </Flex>
    )
}