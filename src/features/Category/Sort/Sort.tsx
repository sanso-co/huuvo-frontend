import { useState } from "react";

import { Modal } from "@/components/global/Modal";
import { SortIcon } from "@/assets/icons/SortIcon";

import styles from "./sort.module.scss";
import { OptionType, SortType } from "@/types/sort";

interface Props {
    options: OptionType[];
    onSortSelect: (value: SortType) => void;
}

export const Sort = ({ options, onSortSelect }: Props) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button onClick={() => setShowModal!(true)} className={styles.sortButton}>
                <SortIcon />
                <span>Sort</span>
            </button>
            <Modal
                header="Sort by"
                open={showModal}
                size="lg"
                handleClose={() => {
                    setShowModal!(false);
                }}
            >
                <ul>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => {
                                onSortSelect(option.value);
                                setShowModal(false);
                            }}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
};
