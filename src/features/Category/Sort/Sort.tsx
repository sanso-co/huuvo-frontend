import { useState } from "react";

import { useGeneralStore } from "@/store/useStore";

import { Modal } from "@/components/global/Modal";
import { SortIcon } from "@/assets/icons/SortIcon";
import { OptionType, SortType } from "@/types/sort";

import styles from "./sort.module.scss";
import { SortEnum } from "@/helpers/constants/options";

interface Props {
    selected: SortType;
    options: OptionType[];
    onSortSelect: (value: SortType) => void;
}

export const Sort = ({ selected, options, onSortSelect }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const language = useGeneralStore((state) => state.language);

    const handleSortSelect = (value: SortType) => {
        if (value === SortEnum.NameAsc) {
            const sortValue = language === "kr" ? SortEnum.OriginalNameAsc : SortEnum.NameAsc;
            onSortSelect(sortValue);
        } else {
            onSortSelect(value);
        }
        setShowModal(false);
    };

    return (
        <div>
            <button onClick={() => setShowModal!(true)} className={styles.sortButton}>
                <SortIcon width={20} height={20} stroke={1.5} />
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
                <ul className={styles.options}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`${styles.option} ${
                                selected === option.value ? styles.selected : ""
                            }`}
                            onClick={() => handleSortSelect(option.value)}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
};
