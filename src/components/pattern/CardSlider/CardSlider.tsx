import React from "react";

import styles from "./cardslider.module.scss";

interface Props {
  helper?: string;
  title?: string;
  children: React.ReactNode;
}

export const CardSlider = ({ helper, title, children }: Props) => {
  return (
    <section className={styles.section}>
      {title && (
        <div className={styles.header}>
          <h3>{title}</h3>
          {helper && <p className="caption">{helper}</p>}
        </div>
      )}
      <div className={styles.container}>{children}</div>
    </section>
  );
};
