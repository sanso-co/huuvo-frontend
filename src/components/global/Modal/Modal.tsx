import { createPortal } from "react-dom";

import styles from "./modal.module.scss";
import { useEffect } from "react";
import { DismissIcon } from "@/assets/icons/DismissIcon";

interface Props {
    open: boolean;
    header: string;
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
    handleClose: () => void;
}

export const Modal = ({ open, header, size = "md", children, handleClose }: Props) => {
    useEffect(() => {
        if (open) {
            document.body.classList.add(styles.noScroll);
        } else {
            document.body.classList.remove(styles.noScroll);
        }

        return () => {
            document.body.classList.remove(styles.noScroll);
        };
    }, [open]);

    const mountElement = document.getElementById("portal");
    if (!mountElement) return null;

    const containerClassName = `${styles.container} ${styles[size]} ${open ? styles.open : ""}`;

    return createPortal(
        <>
            {open && (
                <div className={styles.wrapper}>
                    <div
                        className={`${styles.overlay} ${open ? styles.open : ""}`}
                        onClick={handleClose}
                    />
                    <div className={containerClassName}>
                        <div className={styles.header}>
                            <h2>{header}</h2>
                            <button className={styles.closeButton} onClick={handleClose}>
                                <DismissIcon width={16} height={16} />
                            </button>
                        </div>
                        <div className={styles.content}>{children}</div>
                    </div>
                </div>
            )}
        </>,
        mountElement
    );
};
