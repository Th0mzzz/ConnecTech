import styles from './style.module.css';
import React from "react";

export default function Tag({children, variant = "primary"}: {
    children: React.ReactNode,
    variant?: string
}) {
    return (
        <>
            <span className={`smalltext px-3 py-1 rounded-sm ${styles.tag} ${styles[variant]}`}>
                {children}
            </span>
        </>
    );
}
