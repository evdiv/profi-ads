import Link from 'next/link';
import TopNav from './TopNav';
import Search from './Search';

export default function Header() {
    return(
        <>
            <div>
                <div>
                    <Link href="/">Logo</Link>
                </div>
                <TopNav />
            </div>
            <div>
                <Search />
            </div>

        </>
    )
}