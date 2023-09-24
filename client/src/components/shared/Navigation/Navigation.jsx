import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { logout } from "../../../http";
import styles from "./Navigation.module.css";
=======
import styles from "./Navigation.module.css";
import { logout } from "../../../http";
>>>>>>> 2b5fc41245bcb7cbbe529e8fa3530d894a9659f6
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";

const Navigation = () => {
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };
  const dispatch = useDispatch();
<<<<<<< HEAD
  const { isAuth, user } = useSelector((state) => state.auth);
  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }

=======
  const { isAuth, user } = useSelector((state) => state.authSlice);

  const logoutUser = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  };
>>>>>>> 2b5fc41245bcb7cbbe529e8fa3530d894a9659f6
  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src="/images/logo.png" alt="logo" />
        <span style={logoText}>Codershouse</span>
      </Link>
      {isAuth && (
        <div className={styles.navRight}>
          <h3>{user?.name}</h3>
          <Link to="/">
            <img
              className={styles.avatar}
              src={user.avatar ? user.avatar : "/images/monkey-avatar.png"}
              width="40"
              height="40"
              alt="avatar"
            />
          </Link>
          <button className={styles.logoutButton} onClick={logoutUser}>
<<<<<<< HEAD
            <img src="/images/logout.png" alt="logout" />
=======
            <img src="/images/arrow-forward.png" alt="logout" />
>>>>>>> 2b5fc41245bcb7cbbe529e8fa3530d894a9659f6
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
