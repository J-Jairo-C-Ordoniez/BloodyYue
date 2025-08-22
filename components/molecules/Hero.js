import { Brush, Image } from 'lucide-react';
import Link from "next/link";
import Img from "next/image";
import { Heading2, Heading3 } from '../atoms/Heading';
import NavLink from '../atoms/NavLink';
import HeroImage from '../atoms/HeroImage';

export default function Hero() {
    const admin = {
        description: 'El arte digital con un toque de oscuridad y emoción',
        details: 'Explora el mundo creativo de Bloodyyue: ilustraciones únicas, un estilo auténtico y una conexión directa con quienes aman el arte digital.',
        posts: [
            { src: '/post1.jpg', alt: 'arte 1' },
            { src: '/post2.jpg', alt: 'arte 2' },
            { src: '/post3.jpg', alt: 'arte 3' },
        ]
    }

    return (
        <section className="m-hero">
            <article className="m-hero-titles">
                <Heading2> {admin.description} </Heading2>
                <Heading3>{admin.details}</Heading3>
            </article>

            <article className="m-hero-btns">
                <NavLink
                    classNav='h-hero-btn-commission'
                    link="/commissions"
                >
                    <Brush color='#fff' />
                    Encargar comisión
                </NavLink>

                <p>O</p>

                <NavLink link="/post">
                    <Image color='#fff' />
                    Ver galería
                </NavLink>
            </article>

            <article className='m-hero-imgs'>
                {
                    admin.posts.map(post => (
                        <HeroImage>
                            <Img
                                src={post.src}
                                alt={post.alt}
                                fill
                            />
                        </HeroImage>
                    ))
                }
            </article>
        </section>
    )
}