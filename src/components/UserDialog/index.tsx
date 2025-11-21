import type {User} from "../../types/User.ts";
import {Dialog, DialogPanel} from "@headlessui/react";
import defaultUser from "../../assets/default-user.jpg";
import Button from "../Button";
import Tag from "../Tag";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {FaX} from "react-icons/fa6";

export default function UserDialog({user, onClose, open}: { user?: User, open: boolean, onClose: () => void }) {
    const handleRecomendar = () => {
        if (!user) return;
        try {
            const {origin, pathname, search} = window.location;
            const params = new URLSearchParams(search);
            params.set("userId", String(user.id));
            const url = `${origin}${pathname}?${params.toString()}`;
            navigator.clipboard.writeText(url);
            toast.success("Link copiado para a área de transferência!");
        } catch {
            toast.error("Erro ao copiar o link para a área de transferência.");
        }
    };
    const handleEnviarMensagem = () => {
        if (!user?.telefone) {
            toast.error("Telefone não disponível.");
            return;
        }
        const numero = user.telefone.replace(/\D/g, "");
        if (!numero) {
            toast.error("Telefone inválido.");
            return;
        }
        const mensagem = `Olá ${user.nome}, encontrei seu perfil no connecTech e gostaria de conversar!.`;
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
        try {
            toast.success("Abrindo WhatsApp...");
            setTimeout(() => {
                window.open(url, "_blank", "noopener,noreferrer");
            }, 1000)
        } catch {
            toast.error("Não foi possível abrir o WhatsApp.");
        }
    };
    return (
        <>
            <Dialog open={open} onClose={onClose}
                    className={"flex justify-center w-full px-4 py-8 fixed z-50 inset-0 overflow-y-auto bg-black/30 text-[var(--text)]"}>

                <DialogPanel
                    className="relative w-full max-w-[var(--max-content)] px-8 py-4 border border-[var(--border-color)] bg-[var(--surface)] rounded-lg shadow-lg transition duration-300 ease-out data-closed:opacity-0">
                    {
                        user ? (
                            <>
                                <div className="flex flex-col gap-10 md:flex-row ">
                                    <div className="flex-shrink-0 max-w-[230px]">
                                        <img src={user.foto ?? defaultUser} alt={user.nome}
                                             className="w-full  rounded-lg object-cover border border-[var(--border-color)]"/>
                                        <Button
                                            className={"w-full mt-3"}
                                            onClick={handleEnviarMensagem}>
                                            Enviar mensagem
                                        </Button>
                                        <Button
                                            className={"w-full mt-3"}
                                            onClick={handleRecomendar}>
                                            Recomendar perfil
                                        </Button>
                                        <div className={"mt-3"}>
                                            <span
                                                className="smalltext text-[var(--secondary)] font-semibold block">
                                                    Localização
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {user.localizacao}
                                            </div>
                                        </div>
                                        <div className={"mt-3"}>
                                            <span
                                                className="smalltext text-[var(--secondary)] font-semibold block">
                                                    Telefone
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {user.telefone}
                                            </div>
                                        </div>
                                        <div className={"mt-3"}>
                                            <span
                                                className="smalltext text-[var(--secondary)] font-semibold block">
                                                    E-mail
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {user.email}
                                            </div>
                                        </div>
                                        <div className={"mt-3"}>
                                            <span
                                                className="smalltext text-[var(--secondary)] font-semibold block">
                                                    Área
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {user.area}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="subtitle ">{user.nome}</h3>
                                        <span className={"text text-[var(--secondary)]"}>{user.cargo}</span>
                                        <p className="text">{user.resumo}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5 w-full">
                                            <div>
                                                <span
                                                    className="smalltext text-[var(--secondary)] font-semibold mb-2 block">
                                                    Hard Skills
                                                </span>
                                                <div className="flex flex-wrap gap-2">
                                                    {user.habilidadesTecnicas.map((habilidad) => (
                                                        <Tag>{habilidad}</Tag>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <span
                                                    className="smalltext text-[var(--secondary)] font-semibold mb-2 block">
                                                    Soft Skills
                                                </span>
                                                <div className="flex flex-wrap gap-2">
                                                    {user.softSkills.map((skill) => (
                                                        <Tag>{skill}</Tag>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <span
                                                    className="smalltext text-[var(--secondary)] font-semibold mb-2 block">
                                                    Áreas de Interesse
                                                </span>
                                                <div className="flex flex-wrap gap-2">
                                                    {user.areaInteresses.map((area) => (
                                                        <Tag>{area}</Tag>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <span
                                                    className="smalltext text-[var(--secondary)] font-semibold mb-2 block">
                                                    Idiomas
                                                </span>
                                                <div className="flex flex-wrap gap-2">
                                                    {user.idiomas.map((idioma) => (
                                                        <Tag>{idioma.idioma} - {idioma.nivel} </Tag>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"grid grid-cols-1 md:grid-cols-2 gap-8 mt-5 w-full"}>
                                            <div>
                                                <span
                                                    className="smalltext text-[var(--secondary)] font-semibold mb-2 block">
                                                    Experiências
                                                </span>
                                                <div className="flex flex-col gap-2">
                                                    {user.experiencias.map((experiencia) => (
                                                        <div
                                                            className={"bg-[var(--border-color)] border-1 border-[var(--border-color)] rounded-lg p-3"}>
                                                            <div
                                                                className={"flex items-center justify-between gap-2"}>

                                                                <h4 className="link mb-1 text-[var(--secondary)]">
                                                                    {experiencia.empresa}
                                                                </h4>
                                                                <span
                                                                    className="smalltext font-semibold text-[var(--text)]">
                                                                    {experiencia.inicio} até {experiencia.fim}
                                                                </span>
                                                            </div>
                                                            <p className="link">
                                                                {experiencia.cargo}
                                                            </p>
                                                            <p className="text mt-3">
                                                                {experiencia.descricao}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <span
                                                    className="smalltext text-[var(--secondary)] font-semibold mb-2 block">
                                                    Formações Acadêmicas
                                                </span>
                                                <div className="flex flex-col gap-2">
                                                    {user.formacao.map((f) => (
                                                        <div
                                                            className={"bg-[var(--border-color)] border-1 border-[var(--border-color)] rounded-lg p-3"}>
                                                            <div
                                                                className={"flex items-center justify-between gap-2"}>

                                                                <h4 className="link mb-1 text-[var(--secondary)]">
                                                                    {f.curso}
                                                                </h4>
                                                                <span
                                                                    className="smalltext font-semibold text-[var(--text)]">
                                                                    {f.ano}
                                                                </span>
                                                            </div>
                                                            <p className="link">
                                                                {f.instituicao}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <span
                                                    className="smalltext text-[var(--secondary)] font-semibold mb-2 block">
                                                    Projetos
                                                </span>
                                                <div className="flex flex-col gap-2">
                                                    {user.projetos.map((f) => (
                                                        <Link
                                                            to={f.link}
                                                            className={"bg-[var(--border-color)] border-1 border-[var(--border-color)] rounded-lg p-3"}>
                                                            <div
                                                                className={"flex items-center justify-between gap-2"}>
                                                                <h4 className="link mb-1 text-[var(--secondary)]">
                                                                    {f.titulo}
                                                                </h4>
                                                            </div>
                                                            <p className="text">
                                                                {f.descricao}
                                                            </p>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <span
                                                    className="smalltext text-[var(--secondary)] font-semibold mb-2 block">
                                                    Certificações
                                                </span>
                                                <div className="flex flex-col gap-2">
                                                    {user.certificacoes.map((certificacao) => (
                                                        <div
                                                            className={"bg-[var(--border-color)] border-1 border-[var(--border-color)] rounded-lg p-3"}>
                                                            <div
                                                                className={"flex items-center justify-between gap-2"}>
                                                                <h4 className="link text-[var(--secondary)]">
                                                                    {certificacao}
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </>
                        ) : <>Usuário não encontrado</>
                    }
                    <FaX size={20} onClick={onClose} className={"absolute top-0 right-0 m-4 cursor-pointer"} />
                </DialogPanel>

            </Dialog>
        </>
    );
}
