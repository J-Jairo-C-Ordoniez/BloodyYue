import { Link2, GalleryHorizontal, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion } from "framer-motion";
import { Heading2 } from '../atoms/Heading';
import NavLink from '../atoms/NavLink';

const items = [
    {
        img: "/post4.jpg",
        title: "Compañía en silencio",
        desc: "Un retrato íntimo acompañado de la ternura felina.",
        url: "/post",
    },
    {
        img: "/post5.jpg",
        title: "Lealtad oscura",
        desc: "Exploración de la fuerza y misterio en contraste.",
        url: "/post",
    },
    {
        img: "/post6.jpg",
        title: "Encuentro",
        desc: "Un momento congelado entre dos miradas.",
        url: "/post",
    },
    {
        img: "/post7.jpg",
        title: "Sombras juveniles",
        desc: "Fragmento de una serie que mezcla inocencia y fantasía.",
        url: "/post",
    },
];

export default function Gallery() {
    return (
        <section className="m-gallery">
            <header className="m-gallery-header">
                <Heading2>
                    <GalleryHorizontal />
                    Nuestra Galería
                </Heading2>

                <NavLink link="/posts">
                    Ver todo
                    <ExternalLink />
                </NavLink>
            </header>

            <div className="m-gallery-grid">
                {items.map((item, i) => (
                    <motion.article
                        key={i}
                        className="m-gallery-item"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        viewport={{ amount: 0.3 }}
                    >
                        <img src={item.img} alt={item.title} />
                        <div className="m-gallery-content">
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                            <NavLink link={item.url}>
                                <Link2 />
                            </NavLink>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    )
}