import NavLink from "../atoms/NavLink";

export default function MainMenu() {
    const linksMenu = [
        { id: '01', link: '/', text: 'Inicio' },
        { id: '02', link: '/about', text: 'Sobre mí' },
        { id: '03', link: '/services', text: 'Servicios' },
        { id: '04', link: '/post', text: 'Obras' },
        { id: '05', link: '/commissions', text: 'Comisiones' },
        { id: '06', link: '/blog', text: 'Blog' }
    ];

    return (
        <nav>
            <ul>
                {
                    linksMenu.map(link => (
                        <li key={link.id}>
                            <NavLink link={link.link}>
                                {link.text}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}