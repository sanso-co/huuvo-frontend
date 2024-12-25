import { useState } from "react";

import { Modal } from "@/components/global/Modal";
import { MultiSelect } from "@/components/global/MultiDropdown";
import { RadioSelect } from "@/components/global/RadioSelect";

import { OptionType } from "@/types/filter";

import styles from "./filter.module.scss";
import { Button } from "@/components/global/Button";
import { FilterIcon } from "@/assets/icons/FilterIcon";
import { useIsMobile } from "@/hooks/useIsMobile";

interface ExpandedState {
    [key: string]: boolean;
}

interface Props {
    keywordOptions: OptionType[];
    genreOptions: OptionType[];
    toneOptions: OptionType[];
    selectedKeywords?: OptionType[];
    selectedGenre?: OptionType;
    selectedTone?: OptionType;
    onFilterChange: (filters: {
        keyword?: OptionType[];
        genre?: OptionType;
        tone?: OptionType;
    }) => void;
    onReset: () => void;
}

export const Filter = ({
    keywordOptions,
    genreOptions,
    toneOptions,
    selectedKeywords,
    selectedGenre,
    selectedTone,
    onFilterChange,
    onReset,
}: Props) => {
    const [expandedSections, setExpandedSections] = useState<ExpandedState>({});
    const [showModal, setShowModal] = useState(false);
    const isMobile = useIsMobile({ breakpoint: 1024 });

    const handleExpand = (name: string, expanded: boolean) => {
        setExpandedSections((prev) => ({ ...prev, [name]: expanded }));
    };

    const handleKeywordChange = (newSelected: OptionType[]) => {
        onFilterChange({ keyword: newSelected, genre: selectedGenre, tone: selectedTone });
    };

    const handleGenreChange = (newSelected: OptionType) => {
        onFilterChange({ keyword: selectedKeywords, genre: newSelected, tone: selectedTone });
    };

    const handleToneChange = (newSelected: OptionType) => {
        onFilterChange({ keyword: selectedKeywords, genre: selectedGenre, tone: newSelected });
    };

    const hasAnySelection = (selectedKeywords || []).length > 0 || selectedGenre || selectedTone;

    const FilterContent = () => (
        <div className={styles.container}>
            <div className={styles.filters}>
                <RadioSelect
                    name="Genres"
                    options={genreOptions}
                    selectedValue={selectedGenre?._id}
                    onChange={handleGenreChange}
                    isExpanded={expandedSections["genres"]}
                    onExpand={(expanded) => handleExpand("genres", expanded)}
                />
                <RadioSelect
                    name="Tones"
                    options={toneOptions}
                    selectedValue={selectedTone?._id}
                    onChange={handleToneChange}
                    isExpanded={expandedSections["tones"]}
                    onExpand={(expanded) => handleExpand("tones", expanded)}
                />
                <MultiSelect
                    name="Keywords"
                    options={keywordOptions}
                    selectedValues={(selectedKeywords || []).map((option) => option._id)}
                    onChange={handleKeywordChange}
                    isExpanded={expandedSections["keywords"]}
                    onExpand={(expanded) => handleExpand("keywords", expanded)}
                />
            </div>
            {hasAnySelection && (
                <Button
                    label="Reset All Filters"
                    variant="secondary"
                    onClick={() => {
                        onReset();
                        setExpandedSections({});
                    }}
                />
            )}
        </div>
    );

    return (
        <div className={styles.filterContainer}>
            {isMobile && (
                <>
                    <div className={styles.filterButtonSection}>
                        <button onClick={() => setShowModal!(true)} className={styles.filterButton}>
                            <FilterIcon stroke={1.5} />
                            <span>Filter</span>
                        </button>
                    </div>

                    <Modal
                        header="Filter"
                        open={showModal}
                        size="lg"
                        handleClose={() => {
                            setShowModal!(false);
                        }}
                    >
                        <FilterContent />
                    </Modal>
                </>
            )}

            {!isMobile && (
                <div>
                    <FilterContent />
                </div>
            )}
        </div>
    );
};
