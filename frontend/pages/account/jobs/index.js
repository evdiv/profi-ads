import { useRouter } from 'next/router'
import MyJobList from '../../../components/MyJobList'

export default function MyJobListPage() {
    const router = useRouter()
    const { msg } = router.query

    return (
        <div>
            <h3>My Jobs</h3>
            {msg === 'created' && <div>The job was created!</div>}
            <MyJobList />
        </div>
    )
}