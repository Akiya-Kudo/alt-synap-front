import { Icon } from "@chakra-ui/react"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { BookMarkButtonProps } from "../../type/atom"
import { MdBookmark, MdBookmarkBorder } from "react-icons/md"

export const BookMarkButton = ({
    defaultIsMarked,
    size=5, borderRadius="full", mt="2",
    uuid_pid,
    ...props
}: BookMarkButtonProps) => {
    const [isMarked, setIsMarked] = useState<boolean>(defaultIsMarked)

    //animation setting
    const controls = useAnimation()
    const handleLike = async () => {
        // toggleLike()
        setIsMarked(!isMarked)
        controls.start({ scale: [1.15, 1.2, 1] })
    }

    //when the posts mark state change by refetch, change default isMarked
    useEffect(()=>setIsMarked(defaultIsMarked),[defaultIsMarked])
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
                as={ isMarked ? MdBookmark : MdBookmarkBorder }
                color={ isMarked ? "tipsy_color_2" : "text_light"}
                borderRadius={borderRadius}
                h={size} w={size} 
                mt={mt}
                {...props}
                />
            </motion.div>
        </>
    )
}