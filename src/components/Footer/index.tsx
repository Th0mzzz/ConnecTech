import styles from "./style.module.css";
import {FaFacebook, FaInstagram, FaLinkedin} from "react-icons/fa";
import logotipo from "../../assets/connectech.png";
import React from "react";

const Footer: React.FC = () => {
    return (
        <>
            <footer className={`${styles.footer}`}>
                <div className="content w-full max-w-[var(--max-content)] flex flex-col items-center gap-10 mx-auto mt-8">
                    <div className="flex flex-col items-center gap-3">
                        <img
                            src={logotipo}
                            alt="Logo da connectech"
                            className={styles.logotipo}
                        />
                    </div>
                    <div className="flex gap-6 justify-center text-[var(--texto)]">
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={25} />
                        </a>
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                            <FaFacebook size={25} />
                        </a>
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={25} />
                        </a>
                    </div>
                    <p className="smalltext">
                        ©2025 ConnecTech | Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
