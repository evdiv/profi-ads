import { useQuery, gql } from "@apollo/client"
import Link from "next/link"

const ALL_JOBS = gql`
        query ALL_JOBS_QUERY {
            jobs {
                id,
                title,
                publishedDate
            }
        }
    `

export default (props) => {
    console.log(props)

    const { data, error, loading } = useQuery(ALL_JOBS)

    if(loading) return <p>Loading ...</p>
    if(error) return <p>Error!</p>

    return (
        <div>
            <p>Here will be the list of Departments to see available jobs</p>
            <p>Props: {props.a}</p>
            {data.jobs.map(job => (
                <p key={job.id}><Link href={`/jobs/${job.id}`}>{job.title}</Link></p>
            ))}
        </div>
    )
}

export const getStaticProps = () => {
    return {
        props: { a: 9999}
    }
}