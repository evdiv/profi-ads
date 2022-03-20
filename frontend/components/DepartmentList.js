import { useQuery } from '@apollo/client'
import { GET_DEPARTMENTS } from '../lib/queries/getDepartments'
import Link from 'next/link';

export default function DepartmentList({page}) {
    const { loading, error, data } = useQuery(GET_DEPARTMENTS)
    const { departments, departmentsCount } = data

    if (error) return <div>Error loading departments.</div>
    if (loading) return <div>Loading</div>

    return (
        <section>
            {departments.map(dep => (
                <span key={dep.id} style={{display: 'inline-block', margin: 12,  backgroundColor: '#eee'}}>
                    <Link href={`/departments/${dep.id}`}>{dep.name}</Link>
                </span>
            ))}
            {page === "mainPage" && 
                <span style={{ display: 'inline-block', margin: 12, backgroundColor: '#eee' }}> 
                    <Link href="/departments/">See all...</Link>
                </span>
            }
        </section>
    )
}