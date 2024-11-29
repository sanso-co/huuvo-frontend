import { useState, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";

import { Modal } from "@/components/global/Modal";
import { MultiSelect } from "@/components/global/MultiDropdown";
import { RadioSelect } from "@/components/global/RadioSelect";

import { OptionType } from "@/types/filter";

import styles from "./filter.module.scss";

interface ExpandedState {
    [key: string]: boolean;
}

interface Props {
    keywordOptions: OptionType[];
    genreOptions: OptionType[];
    toneOptions: OptionType[];
    selectedKeywords: OptionType[];
    selectedGenre?: OptionType;
    selectedTone?: OptionType;
    onFilterChange: (filters: {
        keywords: OptionType[];
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

    const handleExpand = (name: string, expanded: boolean) => {
        setExpandedSections((prev) => ({ ...prev, [name]: expanded }));
    };

    const [showModal, setShowModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const checkIsMobile = useMemo(
        () =>
            debounce(() => {
                const isMobileView = window.innerWidth < 768;
                setIsMobile(isMobileView);
                if (!isMobileView) {
                    setShowModal(false);
                }
            }, 250),
        [setIsMobile, setShowModal]
    );

    useEffect(() => {
        // Set initial value
        setIsMobile(window.innerWidth < 768);

        window.addEventListener("resize", checkIsMobile);

        return () => {
            checkIsMobile.cancel();
            window.removeEventListener("resize", checkIsMobile);
        };
    }, [checkIsMobile]);

    const handleKeywordChange = (newSelected: OptionType[]) => {
        onFilterChange({ keywords: newSelected, genre: selectedGenre, tone: selectedTone });
    };

    const handleGenreChange = (newSelected: OptionType) => {
        onFilterChange({ keywords: selectedKeywords, genre: newSelected, tone: selectedTone });
    };

    const handleToneChange = (newSelected: OptionType) => {
        onFilterChange({ keywords: selectedKeywords, genre: selectedGenre, tone: newSelected });
    };

    const hasAnySelection = selectedKeywords.length > 0 || selectedGenre || selectedTone;

    const FilterContent = () => (
        <>
            <div className={styles.filters}>
                <RadioSelect
                    name="Genres"
                    options={genreOptions}
                    selectedValue={selectedGenre?.value}
                    onChange={handleGenreChange}
                    isExpanded={expandedSections["genres"]}
                    onExpand={(expanded) => handleExpand("genres", expanded)}
                />
                <RadioSelect
                    name="Tones"
                    options={toneOptions}
                    selectedValue={selectedTone?.value}
                    onChange={handleToneChange}
                    isExpanded={expandedSections["tones"]}
                    onExpand={(expanded) => handleExpand("tones", expanded)}
                />
                <MultiSelect
                    name="Keywords"
                    options={keywordOptions}
                    selectedValues={selectedKeywords.map((option) => option.value)}
                    onChange={handleKeywordChange}
                    isExpanded={expandedSections["keywords"]}
                    onExpand={(expanded) => handleExpand("keywords", expanded)}
                />
            </div>
            {hasAnySelection && (
                <button
                    className={styles.resetButton}
                    onClick={() => {
                        onReset();
                        setExpandedSections({});
                    }}
                >
                    Reset All Filters
                </button>
            )}
        </>
    );

    return (
        <div className={styles.filterContainer}>
            {isMobile && (
                <>
                    <button onClick={() => setShowModal!(true)}>Filter</button>
                    <Modal
                        header="Add a new cast"
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
                <div className="w-64 flex-shrink-0 pr-6">
                    <div className="sticky top-4">
                        <FilterContent />
                    </div>
                </div>
            )}
            {/* <div className={styles.selectedChips}>
                {selectedKeywords.map((keyword) => (
                    <RemovableChip
                        key={keyword.value}
                        label={keyword.label}
                        onRemove={() => handleRemoveKeyword(keyword.value)}
                    />
                ))}
                {selectedGenre && (
                    <RemovableChip label={selectedGenre.label} onRemove={handleRemoveGenre} />
                )}
                {selectedTone && (
                    <RemovableChip label={selectedTone.label} onRemove={handleRemoveTone} />
                )}
            </div> */}
        </div>
    );
};
