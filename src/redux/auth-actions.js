import {
  changeUserDetails,
  changeUserPassword,
  getUserDetails,
  logoutUser,
  signInUser,
} from "../firebase";
import { authSliceActions } from "./auth-slice";
import { toast } from "react-toastify";

export const logInUser = (useremail, password, uid = null) => {
  return async (dispatch) => {
    try {
      if (password) {
        var userData = await signInUser(useremail, password);
        localStorage.setItem("uid", userData?.user?.uid);
        localStorage.setItem("userEmail", useremail);
      }

      const userDetails = await getUserDetails(userData?.user?.uid || uid);

      dispatch(
        authSliceActions.setUserData({
          id: userData?.user?.uid || uid,
          ...userDetails.profile,
        })
      );

      toast.success(`Welcome, ${userDetails.profile.name}`, {
        position: "top-left",
      });

      return true;
    } catch (err) {
      console.log(err.code);
      if (err.code === "auth/wrong-password") toast.error("Wrong Password");
      else if (err.code === "auth/user-not-found")
        toast.error("Email does not exist!");
      else if (err.code === "auth/user-disabled")
        toast.error("Account disabled. Please contact support!");
      else toast.error("Unknown error, please try again!");
      return false;
    }
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    await logoutUser();
    localStorage.removeItem("uid");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("lastTabVisited");
    localStorage.removeItem("lastDomainName");
    localStorage.removeItem("lastEmailPage");
    localStorage.removeItem("lastMainPageTabVisited");
    dispatch(authSliceActions.logUserOut());
  };
};

export const setUserDetails = (userId, details) => {
  return async (dispatch) => {
    if (Object.keys(details).length > 0) {
      dispatch(authSliceActions.setUserData(details));
      await changeUserDetails(userId, details);
      toast.success("Information updated successfully!");
    } else {
      toast.info("No changes to make.");
    }
  };
};

export const setUserPassword = (email, currentPassword, newPassword) => {
  return async () => {
    try {
      await changeUserPassword(email, currentPassword, newPassword);
      toast.success("Password changed successfully!");
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        toast.error("The current password is incorrect!");
      } else {
        toast.error("An unknown error has occurred, please try later.");
      }
    }
  };
};

//  ADMIN
export const logInAdmin = (useremail, password, uid) => {
  return async (dispatch) => {
    try {
      var userData = await signInUser(useremail, password);
      // localStorage.setItem("uid", userData?.user?.uid);
      // localStorage.setItem("userEmail", useremail);

      const userDetails = await getUserDetails(uid);

      dispatch(
        authSliceActions.setUserData({
          id: uid,
          ...userDetails.profile,
        })
      );

      toast.success(`Welcome, ${userDetails.profile.name}`, {
        position: "top-left",
      });

      return true;
    } catch (err) {
      console.log(err.code);
      if (err.code === "auth/wrong-password") toast.error("Wrong Password");
      else if (err.code === "auth/user-not-found")
        toast.error("Email does not exist!");
      else toast.error("Unknown error, please try again!");
      return false;
    }
  };
};
