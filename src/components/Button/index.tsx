import {CgSpinnerTwo} from "react-icons/cg";
import styles from "./style.module.css";

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
    loading?: boolean;
    variant?: "primary" | "secondary" | "danger" | "success" | "dark";
    className?: string;
}


export default function Button({
                                   onClick,
                                   disabled = false,
                                   children,
                                   loading = false,
                                   variant = "primary",
                                   className,
                               }: ButtonProps) {
    return (
        <>
            <button onClick={onClick} disabled={loading || disabled}
                    className={`${styles.button} ${styles[variant]} ${loading || disabled ? styles.disabled : ""} transition duration-150 ease-in-out link ${className ? className : ""}`}>
                {loading ? <CgSpinnerTwo className={"animate-spin"} size={20}/> : children}
            </button>
        </>
    );
}
