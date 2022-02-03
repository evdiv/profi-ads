import PostList from "../components/PostList"
import JobList from "../components/JobList"
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { GET_ALL_POSTS, initialVars as postsInitialVars } from "../lib/queries/getAllPosts"
import { GET_ALL_JOBS, initialVars as jobsInitialVars } from "../lib/queries/getAllJobs"

export default function MainPage() {
  	return (
		<div>
			<h2>Main Page</h2>
			<h4>Recent Jobs</h4>
			<JobList page={'mainPage'}/>
			<h4>Recent Posts</h4>
			<PostList page={'mainPage'}/>			
		</div>
  	)
}

export async function getServerSideProps() {

	const apolloClient = initializeApollo()
	await apolloClient.query({ query: GET_ALL_JOBS, variables: jobsInitialVars })
	await apolloClient.query({ query: GET_ALL_POSTS, variables: postsInitialVars })

	return addApolloState(apolloClient, {
		props: {},
	})
}