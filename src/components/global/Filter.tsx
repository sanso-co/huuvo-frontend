import { useState } from "react";
import { IconContainer } from "./IconContainer";
import { Sort } from "@/assets/icons/Sort";
import { Drawer } from "./Drawer";

interface Props {
    onOptionClick: (sort: string) => void;
}

export const Filter = ({ onOptionClick }: Props) => {
    const [overlayOpen, setOverlayOpen] = useState(false);

    const handleDrawer = () => {
        setOverlayOpen(!overlayOpen);
    };

    const handleOptionClick = (sort: string) => {
        onOptionClick(sort);
        setOverlayOpen(false);
    };

    return (
        <div>
            <IconContainer onClick={handleDrawer}>
                <Sort />
            </IconContainer>
            <Drawer fullWidth hideButton open={overlayOpen} handleClose={handleDrawer}>
                <ul>
                    <li onClick={() => handleOptionClick("first_air_date.desc")}>Newest first</li>
                    <li onClick={() => handleOptionClick("first_air_date.asc")}>Oldest first</li>
                </ul>
            </Drawer>
        </div>
    );
};
