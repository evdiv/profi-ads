import { ApolloProvider } from '@apollo/client';
import apolloClient from '../helpers/apollo-client'
import Page from '../components/Page'
import '../styles/globals.css'

export default ({ Component, pageProps }) => {
  	return (
		<ApolloProvider client={apolloClient}>
			<Page>
				<Component {...pageProps} />
			</Page>
		</ApolloProvider>
  	)
}