import {Link} from "react-router-dom";
import styles from "./header.module.css";
import {useEffect, useRef, useState} from "react";
import {useGlobal} from "../../hooks/useGlobal.ts";
import logotipo from "../../assets/connectech.png";
import logotipoDark from "../../assets/connectech-dark.png";
import smallLogo from "../../assets/connectech-small.png";
import defaultUser from "../../assets/default-user.jpg";
import {HiMiniBars3CenterLeft} from "react-icons/hi2";
import {FaRegMoon, FaRegSun} from "react-icons/fa6";

export default function Header() {
    const {user, screenWidth, links, setTheme, theme} = useGlobal()
    const [opened, setOpened] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const menuLateralRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickFora(event: MouseEvent) {
            if (
                menuLateralRef.current &&
                !menuLateralRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setOpened(false);
            }
        }

        document.addEventListener("mousedown", handleClickFora);

        return () => {
            document.removeEventListener("mousedown", handleClickFora);
        };
    }, []);

    return (
        <>
            <header className={`${styles.header}`}>
                <nav>
                    {screenWidth < 1024 && links && links.length > 0 && (
                        <>
                            <button
                                ref={buttonRef}
                                onClick={() => setOpened(!opened)}
                                className="p-5 text-[var(--texto)] hover:text-[var(--primaria)] transition cursor-pointer"
                            >
                                <HiMiniBars3CenterLeft size={25}/>
                            </button>
                        </>
                    )}
                    <Link to={"/"} className={`${styles.logotipo}`}>
                        <img src={screenWidth < 596 ? smallLogo : theme === "light" ? logotipo : logotipoDark} alt="Logotipo do Joga Junto"/>
                    </Link>

                    {screenWidth >= 1024 &&
                        <ul className={`${styles.menu} flex gap-3`}>
                            {links.map((link, i) => {
                                return (
                                    <li key={`navLink-mobile${i}`}>
                                        <Link
                                            to={link.url}
                                            className="flex link py-4 px-1  "
                                            onClick={() => {
                                                setOpened(false);
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    }

                    <div className="flex gap-3 items-center">
                        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className={"cursor-pointer"}>
                            {
                                theme === "light" ? (
                                    <FaRegMoon size={25}/>
                                ) : (
                                    <FaRegSun size={25}/>
                                )
                            }
                        </button>
                        <Link to="/profile" className={styles.user}>
                            {screenWidth >= 1024 && (
                                <p className="link">
                                    {user ? user.nome.split(" ")[0] : "Entrar"}
                                </p>
                            )}

                            <img

                                src={user ? (user.img ?? defaultUser) : defaultUser}
                                alt="Imagem do usuário"
                            />
                        </Link>
                    </div>
                </nav>
            </header>
            {screenWidth < 1024 && (
                <div
                    className={`${styles.menuLateral} ${opened ? styles.active : ""} `}
                    ref={menuLateralRef}
                >
                    <nav>
                        <ul className={`flex flex-col my-4`}>
                            {links.map((link, i) => {
                                return (
                                    <li className="w-full" key={`navLink-mobile${i}`}>
                                        <Link
                                            to={link.url}
                                            className="flex link w-full py-4 px-3 hover:bg-[var(--borda-container)] hover:text-[var(--primaria)] rounded-sm transition"
                                            onClick={() => {
                                                setOpened(false);
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                    </nav>
                </div>
            )}
        </>
    );
}
