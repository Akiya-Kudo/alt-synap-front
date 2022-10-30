import { ApolloClient , InMemoryCache , ApolloProvider , gql } from '@apollo/client';


    const clientpage = () => {

        const client = new ApolloClient({
            uri: 'https://flyby-gateway.herokuapp.com/',
            cache: new InMemoryCache(),
        });
        
        client
            .query({
                query: gql`
                query GetLocations {
                    locations {
                    id
                    name
                    description
                    photo
                    }
                }
                `,
            })
            .then((result) => console.log(result));

        return (
            <>
                <div className="page">
                </div>
            </>
            )
        }
        
        export default clientpage


        const { loading, error, data } = useQuery<UserData>(USER_QUERY, {
            variables: {
                "userId" : userId,
            }
        });