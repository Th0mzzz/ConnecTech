import type {User} from "../../types/User.ts";
import {Dialog, DialogPanel} from "@headlessui/react";

export default function UserDialog({user, onClose, open}: { user?: User, open: boolean, onClose: () => void }) {
    return (
        <>
            <Dialog open={open} onClose={onClose}
                    className={"flex items-center justify-center w-full px-4 py-8 fixed z-50 inset-0 overflow-y-auto bg-black/30"}>

                <DialogPanel
                    className="w-full max-w-[var(--max-content)] px-8 py-4 border border-[var(--border-color)] bg-[var(--surface)] rounded-lg shadow-lg transition duration-300 ease-out data-closed:opacity-0">
                    {
                        user ? <></> : <>Usuário não encontrado</>
                    }
                </DialogPanel>

            </Dialog>
        </>
    );
}
