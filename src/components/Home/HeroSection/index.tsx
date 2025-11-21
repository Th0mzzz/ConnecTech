import styles from './style.module.css';
import Button from "../../Button";
import {HiSearch} from "react-icons/hi";

export default function HeroSection({targetId = "search-section"}: { targetId?: string }) {
    const handleScroll = () => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
    };
    return (
        <>
            <section className={`${styles.heroSection} px-4 py-8`}>
                <div className={styles.content}>
                    <h1 className={"title"}>O lugar para certo para o conexão certa!</h1>
                    <p className={"text mb-4"}>Pesquise e se conecte com os mais diversos profissionais do
                        mercado!</p>
                    <Button
                        onClick={handleScroll}
                        variant={"dark"}
                        className="w-full sm:w-auto"
                    >
                        <div className="flex items-center justify-center gap-2">
                            Pesquise agora!
                            <HiSearch size={23}/>
                        </div>
                    </Button>
                </div>
            </section>

        </>
    );
}
