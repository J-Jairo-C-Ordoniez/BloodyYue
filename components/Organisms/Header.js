import { useState } from "react";
import { User, Menu, X } from 'lucide-react';
import { Heading1, Heading2 } from "../atoms/Heading";
import NavLink from "../atoms/NavLink";
import IconButton from "../atoms/IconButton";
import UserTooltip from "../molecules/UserTooltip";
import SocialLinks from "../molecules/SocialLinks";
import MainMenu from "../molecules/MainMenu";

export default function Header() {
    const [openDialog, setOpenDialog] = useState(false);
    const openMenu = () => setOpenDialog(true);
    const closeMenu = () => setOpenDialog(false);

    return (
        <header>
            <article>
                <Heading1>
                    <NavLink link='/'>BloodyYue</NavLink>
                </Heading1>
                <Heading2>
                    <strong>/ </strong> Artista Digital
                </Heading2>
            </article>

            <section className="h-menu">
                <article>
                    <IconButton className="h-btn-user">
                        <User color="#fff" />
                    </IconButton>

                    <UserTooltip />
                </article>

                <article>
                    <IconButton className='h-btn-menu' onClick={openDialog ? closeMenu : openMenu}>
                        {openDialog ? <X color="#fff" /> : <Menu color="#fff" />}
                    </IconButton>

                    <dialog
                        open={openDialog}
                        className="menuDialog"
                        onClick={(e) => e.target.classList.contains('menuDialog') && setOpenDialog(false)}
                    >
                        <SocialLinks />
                        <MainMenu />
                    </dialog>
                </article>
            </section>
        </header >
    );
}