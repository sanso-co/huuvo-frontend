import { Link } from "react-router-dom";

import { Stack } from "@/components/global/containers/Stack";
import { ProfileImage } from "@/components/global/ProfileImage";
import { CardSlider } from "@/components/pattern/CardSlider";
import { CastType } from "@/helpers/interface/credit";
import { getProfileImage } from "@/services/image-url";

interface Props {
  data: CastType[];
}

export const Cast = ({ data }: Props) => {
  return (
    <Stack border gap={1} padding="2rem 0">
      <h3 className="pl-1">Cast</h3>
      <CardSlider>
        {data.map((cast) => (
          <Link to={`/cast/${cast.id}`} key={cast.id}>
            <ProfileImage url={getProfileImage(cast.profile_path)} />
          </Link>
        ))}
      </CardSlider>
    </Stack>
  );
};
