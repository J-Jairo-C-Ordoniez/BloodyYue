import Hero from '../molecules/Hero';
import Gallery from "../molecules/Gallery";
import { Brush, Sparkles, Palette, Laptop, Music, Layers, BookOpen, Lightbulb, ExternalLink } from "lucide-react";
import { Heading2 } from '../atoms/Heading';
import NavLink from '../atoms/NavLink';
import { motion } from 'framer-motion';

const blogs = [
  { title: 'Entre la luz y la sombra: el origen de mis ilustraciones', icono: <Brush /> },
  { title: 'Cómo transformar emociones en arte digital', icono: <Sparkles /> },
  { title: 'El lado oculto de mis personajes', icono: <Palette /> },
  { title: 'Colores que sangran: mi paleta favorita', icono: <Laptop /> },
  { title: 'Del boceto al caos: así nace una obra', icono: <Music /> },
  { title: 'Historias detrás de mis dibujos', icono: <Layers /> },
  { title: 'Bloodyyue sin filtros: arte, vida y desvelo', icono: <BookOpen /> },
  { title: 'Mi viaje en el arte digital: caídas y renacimientos', icono: <Lightbulb /> },
]

export default function Main() {
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delayChildren: 0.05, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };


  return (
    <main>
      <Hero />
      <Gallery />

      {/* comisiones */}
      <section className="m-blog">
        <header className='m-blog-header'>
          <Heading2>
            Blog
          </Heading2>
        </header>
        <div className="m-blog-item">
          <motion.ul
            variants={listVariants}
            initial="hidden"
            whileInView="show"                 // se activa al entrar en viewport
            viewport={{ once: false, amount: 0.3 }} // vuelve a animar al regresar
          >
            {blogs.map((blog, i) => (
              <motion.li key={blog.id ?? i} variants={itemVariants}>
                <NavLink link="/">
                  {blog.icono}
                  {blog.title}
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <footer className='m-blog-foot'>
          <NavLink link="/blog">
            Ver más
            <ExternalLink />
          </NavLink>
        </footer>
      </section>
    </main >
  );
}