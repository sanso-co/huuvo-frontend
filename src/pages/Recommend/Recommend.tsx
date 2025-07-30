import useRecommend from "./hook/useRecommend";
import { feelings } from "@/helpers/sampleData/feelingSuggestions";

import { RadioChips } from "@/components/global/RadioChips";
import { Button } from "@/components/global/Button";

import { DismissIcon } from "@/assets/icons/DismissIcon";
import { ReloadIcon } from "@/assets/icons/ReloadIcon";

import styles from "./recommend.module.scss";
import layout from "@/assets/styles/layout.module.scss";

const Recommend = () => {
    const {
        selectedFeeling,
        inputValue,
        isLoading,
        handleFeelingChange,
        handleRefreshSample,
        setInputValue,
        handleSubmit,
    } = useRecommend();

    return (
        <div className={`${styles.container} ${layout.max}`}>
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
        </div>
    );
};

export default Recommend;
