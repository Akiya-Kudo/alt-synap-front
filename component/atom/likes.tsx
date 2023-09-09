import { useMutation } from "@apollo/client"
import { Box, Center, Flex, Icon, IconButton, Image, keyframes } from "@chakra-ui/react"
import { motion, useAnimation, useDragControls } from "framer-motion"
import { useEffect, useState } from "react"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { LikeButtonProps } from "../../type/atom"
import { POSTS_LIKE_FRAG } from "../../util/graphql/fragment/fragment.scheme"
import { TOGGLE_LIKE } from "../../util/graphql/mutation/likes.mutation.scheme"

export const LikeButton = ({ 
    likes_num, defaultIsLiked,
    size=5, borderRadius="full", mt="2",
    uuid_pid,
    ...props
}: LikeButtonProps) => {
    //state
    const [isLiked, setIsLiked] = useState<boolean>(defaultIsLiked)
    //query setting
    const [toggleLike, { error, data, loading }] = useMutation(TOGGLE_LIKE, {
        variables: { uuid_pid: uuid_pid },
        update( cache, { data: { like_toggle } } ) {
            cache.updateFragment(
                { 
                    id: `Post:{"uuid_pid":"${like_toggle.uuid_pid}"}`,
                    fragment: POSTS_LIKE_FRAG 
                },
                (data) => {
                    if (data.likes.length!=0) {
                        return ({
                            likes_num: likes_num  - 1,
                            likes: []
                        })
                    }
                    else {
                        return ({
                            likes_num: likes_num  + 1,
                            likes: [like_toggle]
                        }) 
                    }
                }
            )
        }
    })
    
    //animation setting
    const controls = useAnimation()
    const handleLike = async () => {
        toggleLike()
        setIsLiked(!isLiked)
        controls.start({ scale: [1.15, 1.2, 1] })
    }

    //when the posts likes state change by refetch, change default isLike
    useEffect(()=>setIsLiked(defaultIsLiked),[defaultIsLiked])
    return (
        <>
            <motion.div
            whileTap={{ scale: 1.1 }} // クリック時のアニメーションを定義
            whileHover={{ scale: 0.95 }}
            drag
            dragConstraints={{
                top: -400,
                left: -200,
                right: 0,
                bottom: 0
            }}
            onClick={handleLike}
            animate={controls}
            transition={{ duration: 0.3 }}
            >
                <Icon 
                as={ isLiked ? AiFillHeart : AiOutlineHeart }
                color={ isLiked ? "red_switch" : "text_light"}
                borderRadius={borderRadius}
                h={size} w={size} 
                mt={mt}
                {...props}
                />
            </motion.div>
            <Center fontSize={".8rem"}>{ likes_num  }</Center>
        </>
    )
}