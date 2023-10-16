import { Link } from "react-router-dom";
import { Routes } from "../../../Router/Routes";
import { userData } from "../../../Utils/Helper/LoginHelper";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person2Icon from "@mui/icons-material/Person2";
import no_image from "../../../Assets/noImage.jpg";
import { useUserFetch } from "../../../Hooks/useUserFetch";
import "./profileDropdown.scss";

export const ProfileDropdown = () => {
  const { username } = userData();
  const { user } = useUserFetch();

  const handleLogout = () => {
    localStorage.removeItem("user");
  };
  const handleOpenDashboard = () => {
    const dashboardUrl = process.env.REACT_APP_ADMIN_URL;
    window.open(dashboardUrl);
  };
  return (
    <div className="dropdown-container">
      <div className="menu">
        <div className="user-info">
          <img
            src={
              user?.avatarUrl
                ? process.env.REACT_APP_UPLOAD_URL + user.avatarUrl
                : no_image
            }
            alt=""
          />
          <h2>{username}</h2>
        </div>
        <hr />

        <ul>
          <li onClick={handleOpenDashboard}>
            <span>
              <DashboardIcon />
              Dashboard
            </span>
          </li>

          <li>
            <Link className="link" to={Routes.Profile}>
              <span>
                <Person2Icon /> My Profile
              </span>
            </Link>
          </li>
          <li>
            <Link className="link" to={Routes.LOGIN} onClick={handleLogout}>
              <span>
                <LogoutIcon />
                Logout
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
