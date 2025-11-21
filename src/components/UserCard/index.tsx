import type {User} from "../../types/User.ts";
import defaultUser from "../../assets/default-user.jpg";
import Button from "../Button";
import Tag from "../Tag";

export default function UserCard({user, onClick}: { user: User, onClick?: () => void }) {
    return (
        <>
            <div
                className={`bg-[var(--surface)] border border-[var(--border-color)] rounded-lg flex flex-col overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer`}>
                <img src={user.foto ?? defaultUser} alt={`foto de ${user.nome}`}
                     className={"aspect-5/4 object-cover"}/>
                <div className="p-4">
                    <h3 className="link">{user.nome}</h3>
                    <p className="text">{user.resumo.slice(0, 100) + ".."}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {user.habilidadesTecnicas.map((habilidad) => (
                            <Tag key={habilidad}>{habilidad}</Tag>
                        ))}
                    </div>
                    {onClick &&
                        <Button onClick={onClick}>
                            Ver mais
                        </Button>
                    }
                </div>
            </div>
        </>
    );
}
