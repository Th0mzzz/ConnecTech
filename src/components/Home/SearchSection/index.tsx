import Input from "../../Input";
import {useGlobal} from "../../../hooks/useGlobal.ts";
import React, {useEffect, useMemo, useState} from "react";
import {HiSearch} from "react-icons/hi";
import type {User} from "../../../types/User.ts";
import UserCard from "../../UserCard";
import UserDialog from "../../UserDialog";
import {useSearchParams} from "react-router";

export default function SearchSection() {
    const {users, getUserById} = useGlobal();
    const params = useSearchParams()
    const userId = params[0].get("userId");
    const [pesquisa, setPesquisa] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string | number) => {
        if (e && typeof e === "object" && "target" in e) {
            setPesquisa((e as React.ChangeEvent<HTMLInputElement>).target.value);
        } else {
            setPesquisa(String(e));
        }
    }
    const filteredUsers: User[] = useMemo(() => {
        const q = pesquisa.trim().toLowerCase();
        if (!q) return users;

        const filtrarUser = (user: User) => {
            const nomeMatch = user.nome.toLowerCase().includes(q);
            const emailMatch = user.email.toLowerCase().includes(q);
            const tecnologiasMatch = user.habilidadesTecnicas.some((tech) =>
                tech.toLowerCase().includes(q)
            );
            const areasInteresseMatch = user.areaInteresses.some((area) =>
                area.toLowerCase().includes(q)
            );
            const cargoMatch = user.cargo.toLowerCase().includes(q);
            const formacaoMatch = user.formacao.some((f) =>
                f.curso.toLowerCase().includes(q)
            );
            const idiomasMatch = user.idiomas.some((idioma) =>
                idioma.idioma.toLowerCase().includes(q)
            );

            return areasInteresseMatch || nomeMatch || emailMatch || tecnologiasMatch || cargoMatch || formacaoMatch || idiomasMatch;
        }

        return users.filter(
            (user) =>
                filtrarUser(user)
        );
    }, [pesquisa, users]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if(userId){
            const selUser = getUserById(userId)
            if(selUser){
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setSelectedUser(selUser)
                setIsModalOpen(true)
            }
        }
    }, [userId, getUserById]);

    return (
        <>
            <section className={"px-4 py-8"}>
                <div className="w-full max-w-[var(--max-content)] mx-auto ">
                    <Input
                        width={"100%"}
                        placeholder={"Pesquisar por nome, email, tecnologias, áreas de interesse"}
                        className={"bg-[var(--surface)] border-[var(--secondary)]"}
                        id={"search-section"}
                        value={pesquisa}
                        onChange={handleChange}
                        icon={<HiSearch/>}
                    />

                    <h2 className="subtitle mt-8 mb-5 border-b-2 border-[var(--secondary)] pb-1">
                        Profissionais
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredUsers.map((user) => (
                            <UserCard user={user} key={user.id} onClick={() => {
                                setSelectedUser(user)
                                setIsModalOpen(true)
                            }}/>
                        ))}
                    </div>


                </div>
            </section>
            {
                selectedUser && <UserDialog
                    open={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setSelectedUser(null)
                        params[1](prev => {
                            const next = new URLSearchParams(prev);
                            next.delete("userId");
                            return next;
                        });
                    }}
                    user={selectedUser}
                />
            }

        </>
    );
}
