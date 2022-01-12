import { gql } from "@apollo/client";
import client from "../helpers/apollo-client";
import Link from "next/link";

export default function Home({ data }) {
  	return (
		<div>
			Main Page
			{data.map(post => (
				<p key={post.id}>
					<Link href={`/posts/${post.id}`}>
						<a>{post.title}</a>
					</Link>
				</p>
			))}
		</div>
  	)
}


export async function getStaticProps() {
	const { data } = await client.query({
		query: gql`
			query {
				posts {
					id,
					title
				}
			}
		`,
	});

	return {
		props: {
			data: data.posts,
		},
	};
}