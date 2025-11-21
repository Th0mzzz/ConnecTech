import Input from "../../Input";
import {useGlobal} from "../../../hooks/useGlobal.ts";
import React, {useMemo, useState} from "react";
import {HiSearch} from "react-icons/hi";
import type {User} from "../../../types/User.ts";
import UserCard from "../../UserCard";

export default function SearchSection() {
    const {users} = useGlobal();
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
        return users.filter(
            (user) =>
                user.nome.toLowerCase().includes(q) ||
                user.email.toLowerCase().includes(q)
        );
    }, [pesquisa, users]);

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
                            <UserCard user={user} key={user.id}/>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
