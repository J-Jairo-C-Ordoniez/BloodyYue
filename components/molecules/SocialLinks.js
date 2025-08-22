import { Instagram, Twitch, Youtube, Facebook } from 'lucide-react';
import NavLink from '../atoms/NavLink';

export default function SocialLinks() {
    const socials = [
        {id: '01', link: '/', icono: <Facebook />},
        {id: '02', link: '/', icono: <Instagram />},
        {id: '03', link: '/', icono: <Twitch />},
        {id: '04', link: '/', icono: <Youtube />}
    ];
    
    return (
        <nav className="red-social">
            <ul>
                {
                    socials.map(social => (
                        <li key={social.id}>
                            <a href={social.link} target='_blank' rel="noopener noreferrer">
                                {social.icono}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}