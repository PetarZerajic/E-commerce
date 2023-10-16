import { userData } from "../../Utils/Helper/LoginHelper";
import { Card, CardContent, Typography } from "@mui/material";
import { useUserFetch } from "../../Hooks/useUserFetch";
import { AvatarProfile } from "../../Components/AvatarProfile/AvatarProfile";
import no_image from "../../Assets/noImage.jpg";
import "./profile.scss";

export const Profile = () => {
  const { user, setIsUserUpdated } = useUserFetch();
  const { jwt } = userData();

  return (
    <Card className="Card Wrapper">
      <div className="image-section">
        <img
          src={
            user?.avatarUrl
              ? process.env.REACT_APP_UPLOAD_URL + user?.avatarUrl
              : no_image
          }
        />
        <AvatarProfile
          userId={user?.id!}
          token={jwt}
          username={user?.username!}
          setIsUserUpdated={setIsUserUpdated}
        />
      </div>
      <CardContent className="section">
        <Typography variant="h6" color="gray">
          Name: {user?.username}
        </Typography>
        <Typography variant="h6" color="gray">
          Email: {user?.email}
        </Typography>
        <Typography variant="h6" color="gray">
          Account created at:{" "}
          {new Date(user?.createdAt!).toLocaleDateString("sr-RS")}
        </Typography>
      </CardContent>
    </Card>
  );
};
