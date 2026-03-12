import {useEffect, useRef, useState} from "react";
import {FaStar} from "react-icons/fa6";
import {FaLinkedin, FaFacebook, FaInstagram} from "react-icons/fa";
import {Link} from "react-router-dom";
import styles from "./style.module.css";

const menuLinks = [
    {name: "Início", url: "/"},
    {name: "Buscar Talentos", url: "/#buscar"},
    {name: "Cadastrar", url: "/#cadastrar"},
];

export default function FloatingStar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div
                ref={menuRef}
                className={`${styles.topMenu} ${isOpen ? styles.active : ""}`}
                aria-hidden={!isOpen}
            >
                <div className={styles.topMenuInner}>
                    <nav className={styles.topMenuNav}>
                        <ul className={styles.topMenuLinks}>
                            {menuLinks.map((link) => (
                                <li key={link.url}>
                                    <Link
                                        to={link.url}
                                        className={styles.topMenuLink}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className={styles.topMenuSocial}>
                        <a href="http://" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin size={20}/>
                        </a>
                        <a href="http://" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebook size={20}/>
                        </a>
                        <a href="http://" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram size={20}/>
                        </a>
                    </div>
                </div>
            </div>

            <button
                ref={buttonRef}
                className={`${styles.floatingStar} ${isOpen ? styles.starActive : ""}`}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Abrir menu"
                aria-expanded={isOpen}
            >
                <FaStar size={22}/>
            </button>
        </>
    );
}
