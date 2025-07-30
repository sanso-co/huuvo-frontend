import { useEffect, useRef } from "react";

import useRecommend from "./hook/useRecommend";
import useHomeData from "@/pages/Home/hook/useHomeData";
import { feelings } from "@/helpers/sampleData/feelingSuggestions";
import { getFeelingDescription, getFeelingLabel } from "@/helpers/feelingDescriptions";
import { LeanShowType } from "@/types/show";

import { RadioChips } from "@/components/global/RadioChips";
import { Button } from "@/components/global/Button";
import { ShowCard } from "@/components/feature/ShowCard";
import { CardSlider } from "@/components/pattern/CardSlider";

import { DismissIcon } from "@/assets/icons/DismissIcon";
import { ReloadIcon } from "@/assets/icons/ReloadIcon";
import { InfoIcon } from "@/assets/icons/InfoIcon";

import styles from "./recommend.module.scss";
import layout from "@/assets/styles/layout.module.scss";

const Recommend = () => {
    const {
        selectedFeeling,
        inputValue,
        isLoading,
        recommendResults,
        handleFeelingChange,
        handleRefreshSample,
        setInputValue,
        handleSubmit,
    } = useRecommend();

    const { trending } = useHomeData();

    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (recommendResults.length > 0 && resultsRef.current) {
            resultsRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [recommendResults]);

    return (
        <div className={`${styles.container} ${layout.max}`}>
            <div className={styles.section}>
                <div className={styles["section-header"]}>
                    <h2>Trending</h2>
                    <p>Check out what's trending right now</p>
                </div>
                {trending?.shows ? (
                    <CardSlider>
                        {trending.shows.map((show: LeanShowType) => (
                            <ShowCard show={show} key={show.id} />
                        ))}
                    </CardSlider>
                ) : (
                    <div className={styles.alert}>
                        <InfoIcon stroke={1.5} color="#92410e" />
                        <div className={styles["alert-text"]}>
                            <p>We’re having trouble loading trending dramas right now.</p>
                            <p className={styles["alert-message"]}>
                                We’re working it. In the meantime, find the perfect drama for your
                                mood below!
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <div className={`${styles.section} ${styles.mood}`}>
                <div className={styles["section-header"]}>
                    <h2>Find dramas based on your mood</h2>
                </div>
                <div className={styles.feelings}>
                    <div className={styles.header}>
                        <h2 className={styles.question}>How are you feeling these days?</h2>
                    </div>
                    <RadioChips
                        name="feelings"
                        size="sm"
                        options={feelings}
                        value={selectedFeeling}
                        onChange={handleFeelingChange}
                    />
                </div>
                <div className={styles.suggest}>
                    <div className={`${styles.header} ${styles.flex}`}>
                        <h2 className={styles.question}>More about what you're looking for</h2>
                        <button className={styles.refresh} onClick={handleRefreshSample}>
                            <ReloadIcon width={16} height={16} stroke={1.5} />
                            <span>Suggest</span>
                        </button>
                    </div>
                    <div className={styles["input-container"]}>
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Describe vibe or type of story you're looking for"
                            className={styles.input}
                        />
                        <button className={styles.clear} onClick={() => setInputValue("")}>
                            <DismissIcon />
                        </button>
                    </div>
                </div>
                <div className={styles.button}>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={Boolean(!selectedFeeling) || isLoading}
                    >
                        {isLoading ? (
                            <span>Analyzing your mood and preferences…</span>
                        ) : (
                            <span>Show Matches</span>
                        )}
                    </Button>
                </div>
            </div>
            {recommendResults.length > 0 && (
                <div className={styles.recommended} ref={resultsRef}>
                    <div className={styles["section-header"]}>
                        <h2>We've curated these dramas based on your current mood</h2>
                        <p>{getFeelingDescription(selectedFeeling)}</p>
                    </div>
                    <div className={styles.grid}>
                        {recommendResults.map((show) => (
                            <ShowCard
                                show={show}
                                key={show.id}
                                tag={show.name}
                                label={getFeelingLabel(selectedFeeling)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recommend;
