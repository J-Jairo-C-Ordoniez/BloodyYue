import Link from 'next/link'

export default function ({ link, children, classNav }) {
    return (
        <Link
            href={link}
            className={classNav && classNav}
        >
            {children}
        </Link>
    )
}