import { LogIn, UserPlus, Mail } from 'lucide-react'
import { Heading3 } from '../atoms/Heading'
import NavLink from '../atoms/NavLink'

export default function () {
    return (
        <div className="h-tooltip">
            <ul>
                <li>
                    <NavLink link="/login">
                        <LogIn color="#fff" />
                        <Heading3>Iniciar Sesión</Heading3>
                    </NavLink>
                </li>
                <li>
                    <NavLink link="/signin">
                        <UserPlus color="#fff" />
                        <Heading3>Registrarse</Heading3>
                    </NavLink>
                </li>
                <li>
                    <NavLink link="/signin">
                        <Mail color="#fff" />
                        <Heading3>Correo</Heading3>
                    </NavLink>
                </li>
            </ul>
            <ul>
                <li><NavLink link="/help">Ayuda</NavLink></li>
                <li><NavLink link="/contact">Contacto</NavLink></li>
                <li><NavLink link="/terms">Términos y condiciones</NavLink></li>
                <li><NavLink link="/priv">Políticas de privacidad</NavLink></li>
            </ul>
        </div>
    )
}