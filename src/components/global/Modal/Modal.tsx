import { createPortal } from "react-dom";

import styles from "./modal.module.scss";
import { useEffect } from "react";

const mountElement = document.getElementById("portal");

interface Props {
    open: boolean;
    hideButton?: boolean;
    children: React.ReactNode;
    handleClose: () => void;
}

export const Modal = ({ open, hideButton, children, handleClose }: Props) => {
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

    if (!mountElement) return null;
    return createPortal(
        <>
            {open && (
                <>
                    <div className={styles.overlay} onClick={handleClose} />
                    <div className={styles.container}>
                        {!hideButton && (
                            <header>
                                <button onClick={handleClose}>close</button>
                            </header>
                        )}
                        <main>{children}</main>
                    </div>
                </>
            )}
        </>,
        mountElement
    );
};
