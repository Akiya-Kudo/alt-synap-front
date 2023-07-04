import { useQuery } from "@apollo/client"
import { Box, Grid, GridItem, Image } from "@chakra-ui/react"
import { Post, PostCard } from "../../type/global";
import { POSTS_SEARCH } from '../../util/graphql/queries/posts.query.scheme';
import { TipsyCard, TipsyCard_image } from '../atom/cards'
import NextImage from 'next/image';

export const TipsyPostsboard = ({ query_text }: {query_text: string}) => {
    const { loading, error, data } = useQuery(POSTS_SEARCH, {
        variables: {
            searchString: query_text,
            selectedTagIds: [],
            pgNum: 0,
            sortType: 0
        }
    })
    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (error) {
        return <p>Error: {error.message}</p>;
    }
    
    return (
        <Grid m={5}  templateColumns='repeat(2, 1fr)' gap={6}>
            <GridItem>
                <TipsyCard
                uuid_pid="4f98e515-42b3-454e-a32f-907840de82c8"
                title="Pages Router と App Router での i18n 対応の違い"
                top_link={"https://zenn.dev/cybozu_frontend/articles/nextjs-i18n-app-router"}
                top_image={"https://lh3.googleusercontent.com/a/AAcHTteqxHoMDWvrboY6epQ-5nUL66Q7V_lbhZ4cTvnDtqS3hQ=s96-c"}
                likes_num={20}
                timestamp={new Date()}
                content_type={0}
                user={{
                    uid: "2276dt5yPKAeMTIBR1pasQVsCWLh",
                    uuid_uid: "4e755e0a-b0df-4254-8b64-b0c9a4fec768",
                    user_name: "akidoki",
                    user_image: "https://lh3.googleusercontent.com/a/AAcHTteqxHoMDWvrboY6epQ-5nUL66Q7V_lbhZ4cTvnDtqS3hQ=s96-c"
                }}
                tags={[
                    {tid: 10, tag_name: "tipsy"},
                    {tid: 13, tag_name: "After Effect"},
                    {tid: 14, tag_name: "Illustrator"},
                ]}
                />
            </GridItem>

            <GridItem>
                <TipsyCard
                uuid_pid="4f98e515-42b3-454e-a32f-907840de82c8"
                title="PrettierのNode.jsサポートポリシーを決めたので紹介します"
                top_link={"https://zenn.dev/cybozu_frontend/articles/nextjs-i18n-app-router"}
                top_image={"https://lh3.googleusercontent.com/a/AAcHTteqxHoMDWvrboY6epQ-5nUL66Q7V_lbhZ4cTvnDtqS3hQ=s96-c"}
                likes_num={20}
                timestamp={new Date()}
                content_type={0}
                user={{
                    uid: "2276dt5yPKAeMTIBR1pasQVsCWLh",
                    uuid_uid: "4e755e0a-b0df-4254-8b64-b0c9a4fec768",
                    user_name: "akidoki taro",
                    user_image: "https://lh3.googleusercontent.com/a/AAcHTteqxHoMDWvrboY6epQ-5nUL66Q7V_lbhZ4cTvnDtqS3hQ=s96-c"
                }}
                tags={[
                    {tid: 10, tag_name: "tipsy"},
                    {tid: 13, tag_name: "After Effect"},
                    {tid: 14, tag_name: "Illustrator"},
                ]}
                />
            </GridItem>
            <GridItem>
                <TipsyCard
                uuid_pid="4f98e515-42b3-454e-a32f-907840de82c8"
                title="【AWS】 閉域内でAmazon SageMakerノートブックインスタンスを利用する際のデータ保護に関するTips"
                top_link={"https://zenn.dev/cybozu_frontend/articles/nextjs-i18n-app-router"}
                top_image={"https://lh3.googleusercontent.com/a/AAcHTteqxHoMDWvrboY6epQ-5nUL66Q7V_lbhZ4cTvnDtqS3hQ=s96-c"}
                likes_num={20}
                timestamp={new Date()}
                content_type={0}
                user={{
                    uid: "2276dt5yPKAeMTIBR1pasQVsCWLh",
                    uuid_uid: "4e755e0a-b0df-4254-8b64-b0c9a4fec768",
                    user_name: "akidoki",
                    user_image: "https://lh3.googleusercontent.com/a/AAcHTteqxHoMDWvrboY6epQ-5nUL66Q7V_lbhZ4cTvnDtqS3hQ=s96-c"
                }}
                tags={[
                    {tid: 10, tag_name: "tipsy"},
                    {tid: 13, tag_name: "After Effect"},
                    {tid: 14, tag_name: "Illustrator"},
                ]}
                />
            </GridItem>

            <TipsyCard_image
            uuid_pid="4f98e515-42b3-454e-a32f-907840de82c8"
            title="【AWS】 閉域内でAmazon SageMakerノートブックインスタンスを利用する際のデータ保護に関するTips"
            top_link={"https://zenn.dev/cybozu_frontend/articles/nextjs-i18n-app-router"}
            top_image={"https://bit.ly/dan-abramov"}
            likes_num={20}
            timestamp={new Date()}
            content_type={0}
            user={{
                uid: "2276dt5yPKAeMTIBR1pasQVsCWLh",
                uuid_uid: "4e755e0a-b0df-4254-8b64-b0c9a4fec768",
                user_name: "akidoki",
                user_image: "https://bit.ly/dan-abramov"
            }}
            tags={[
                {tid: 10, tag_name: "tipsy"},
                {tid: 13, tag_name: "After Effect"},
                {tid: 14, tag_name: "Illustrator"},
            ]}
            />
            <TipsyCard_image
            uuid_pid="4f98e515-42b3-454e-a32f-907840de82c8"
            title="【AWS】 閉域内でAmazon SageMakerノートブックインスタンスを利用する際のデータ保護に関するTips"
            top_link={"https://zenn.dev/cybozu_frontend/articles/nextjs-i18n-app-router"}
            top_image={"https://i.pinimg.com/564x/fc/17/a3/fc17a307ac7df8c298b5a8cdb9e05890.jpg"}
            likes_num={20}
            timestamp={new Date()}
            content_type={0}
            user={{
                uid: "2276dt5yPKAeMTIBR1pasQVsCWLh",
                uuid_uid: "4e755e0a-b0df-4254-8b64-b0c9a4fec768",
                user_name: "akidoki",
                user_image: "https://bit.ly/dan-abramov"
            }}
            tags={[
                {tid: 10, tag_name: "tipsy"},
                {tid: 13, tag_name: "After Effect"},
                {tid: 14, tag_name: "Illustrator"},
            ]}
            />


            {data.search_post_tag.posts.map((post: PostCard) => {
                return (
                    <GridItem>
                        {/* <TipsyCard
                        title={post.title}
                        likes_num={ post.likes_num } 
                        timestamp={ post.timestamp }
                        /> */}
                    </GridItem>
                )
            })}
        </Grid>
    );
}