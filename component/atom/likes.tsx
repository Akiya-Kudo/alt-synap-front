import { makeVar, useMutation } from "@apollo/client"
import { Box, Center, Flex, Icon, IconButton, Image, keyframes } from "@chakra-ui/react"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { LikeButtonProps } from "../../type/atom"
import { Post } from "../../type/global"
import { POSTS_LIKE_FRAG, POST_ALL_FIELD_FRAG } from "../../util/graphql/fragment/fragment.scheme"
import { TOGGLE_LIKE } from "../../util/graphql/mutation/likes.mutation.scheme"
import { GET_USER_LIKED_POSTS } from "../../util/graphql/queries/posts.query.scheme"

export const isLikeToggledWithCacheExistVar = makeVar(null as { isLiked: boolean, uuid_pid: string } | null)

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
            // update post's likes_num & likes relation implying that login user is likeing
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
            
            //update get_posts_user_liked query's result, if it've already fetched, this fetch's merge function is different from usual, check _app.ts
            cache.updateQuery({
                    query: GET_USER_LIKED_POSTS,
                    variables: { selectedTagIds: null, offset: 0 }
                },
                (data) => {
                    if (data?.get_posts_user_liked) {
                        const postIncluded = data?.get_posts_user_liked?.find((post: Post) => post.uuid_pid == like_toggle.uuid_pid )
                        if (!!postIncluded) {
                            isLikeToggledWithCacheExistVar({isLiked: false, uuid_pid: like_toggle.uuid_pid})
                            return ({ 
                                get_posts_user_liked: [ postIncluded ], 
                                count_posts_user_liked: data?.count_posts_user_liked - 1 
                            })
                        } else {
                            isLikeToggledWithCacheExistVar({isLiked: true, uuid_pid: like_toggle.uuid_pid})
                            const likedPost = cache.readFragment({
                                id: `Post:{"uuid_pid":"${like_toggle.uuid_pid}"}`,
                                fragment: POST_ALL_FIELD_FRAG,
                            })
                            return ({ 
                                get_posts_user_liked: [likedPost],
                                count_posts_user_liked: data?.count_posts_user_liked + 1 
                            })
                        }
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