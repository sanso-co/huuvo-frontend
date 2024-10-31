import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

import styles from "./layout.module.scss";

const Layout = () => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
