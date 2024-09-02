import { Link } from "react-router-dom";

import { Stack } from "@/components/global/Stack";
import { ProfileImage } from "@/components/global/ProfileImage";
import { CardSlider } from "@/components/pattern/CardSlider";
import { CastType } from "@/types/credit";
import { getProfileImage } from "@/services/image-url";

interface Props {
    data: CastType[];
}

export const Cast = ({ data }: Props) => {
    return (
        <Stack border gap="1rem" padding="2rem 0">
            <h3 className="pl-1">Cast</h3>
            <CardSlider>
                {data.map((cast) => (
                    <Link to={`/credit/cast/${cast.id}`} key={cast.id}>
                        <ProfileImage url={getProfileImage(cast.profile_path)} />
                    </Link>
                ))}
            </CardSlider>
        </Stack>
    );
};
