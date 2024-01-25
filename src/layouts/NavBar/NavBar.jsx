import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../store/Contexts";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

import Avatar from "../../components/Avatar/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import SettingsIcon from '@mui/icons-material/Settings';
import MenuItems from "../../components/MenuItems/MenuItems";

import MUIAvatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Settings from "@mui/icons-material/Settings";
import MailIcon from "@mui/icons-material/Mail";
import Logout from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import LockIcon from "@mui/icons-material/Lock";

import io from "socket.io-client";
import { toast } from "react-hot-toast";
import { GetMyNotifs } from "../../services/Notifis.service";

function NavBar() {
  const { user } = useContext(UserContext);

  const [target, setTarget] = useState(null);
  const [target2, setTarget2] = useState(null);
  const [socket, setSocket] = useState(null);
  const [notifs, setNotifs] = useState([]);

  const handle_open = (event) => {
    setTarget(event.currentTarget);
  };

  const handle_open2 = (event) => {
    setTarget2(event.currentTarget);
  };

  const handle_close = () => {
    setTarget(null);
    setTarget2(null);
  };

  const GetAllMyNotifs = () => {
    GetMyNotifs()
      .then((resp) => {
        console.log(resp.data.data);
        setNotifs(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetAllMyNotifs();
  }, []);

  useEffect(() => {
    if (user) {
      const newSocket = io(`http://localhost:8080`);
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on(`notif-pfe-${user._id}`, (resp) => {
        GetAllMyNotifs();
        alert(resp);
        toast.success(resp);
      });
    }
  }, [socket]);

  return (
    <div className={styles.navbar}>
      <div className={styles.user_name}>
        <Avatar name={`${user?.firstName} ${user?.lastName}`} />
        <p className={styles.user_full_name}>
          {user?.firstName} {user?.lastName}
        </p>
      </div>

      <div className={styles.notifications}>
        {/* ----------------- NOTIFICATIONS  ----------------- */}
        <Badge badgeContent={2} color="error">
          <CalendarMonthIcon className={styles.icon} />
        </Badge>

        <Badge badgeContent={4} color="error">
          <MailIcon className={styles.icon} />
        </Badge>

        <Badge badgeContent={6} color="error" onClick={handle_open2}>
          <NotificationsIcon className={styles.icon} />
        </Badge>

        <MoreVertIcon className={styles.icon} onClick={handle_open} />
        {/* ----------------- MORE ICON  ----------------- */}
        <MenuItems target={target} handleClose={handle_close} pos={-7}>
          <NavLink to="/dash/profile" className={styles.link}>
            <MenuItem onClick={handle_close}>
              <MUIAvatar /> Profil
            </MenuItem>
          </NavLink>

          <Divider />

          <NavLink to="/dash/settings" className={styles.link}>
            <MenuItem onClick={handle_close}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Paramètres
            </MenuItem>
          </NavLink>

          <NavLink to="/dash/ChangerPwd" className={styles.link}>
            <MenuItem onClick={handle_close}>
              <ListItemIcon>
                <LockIcon fontSize="small" />
              </ListItemIcon>
              Changer M-D-P
            </MenuItem>
          </NavLink>

          <NavLink to="/dash/logout" className={styles.link}>
            <MenuItem onClick={handle_close}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Se Déconnecter
            </MenuItem>
          </NavLink>
        </MenuItems>

        {/* ----------------- Notifications ----------------- */}
        <MenuItems target={target2} handleClose={handle_close} pos={-7}>
          {notifs.map((notif, key) => {
            return (
              <MenuItem key={key} onClick={handle_close}>
                {notif.title}
              </MenuItem>
            );
          })}
        </MenuItems>
      </div>
    </div>
  );
}

export default NavBar;
