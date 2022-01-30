import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient'
import Page from '../components/Page'
import '../styles/globals.css'

export default ({ Component, pageProps }) => {
	const apolloClient = useApollo(pageProps)
	
  	return (
		<ApolloProvider client={apolloClient}>
			<Page>
				<Component {...pageProps} />
			</Page>
		</ApolloProvider>
  	)
}