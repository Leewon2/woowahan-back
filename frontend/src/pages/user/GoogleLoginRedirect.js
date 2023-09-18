import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setAccessToken,
  setUserId,
  setNickname,
  setIsLogin,
  setRoles,
  setQuiz,
  setMoney,
  setScore,
  setFirebaseToken,
} from "redux/Auth"; // 필요한 액션들을 import 합니다.
import apis from "services/api/apis";
import { getFirebaseToken, sendWebPushNotification } from "services/api/FirebaseAPI";

function GoogleLoginRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.auth.nickname);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");

    if (code) {
      handleGoogleLogin(code);
    }
  }, [location]);

  const handleGoogleLogin = async (code) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/google`,
        { code }
      );
      console.log("유저가 인증되었습니다.", response.data);

      const accessToken = response.data.data["access-token"];
      const payloadBase64 = accessToken.split(".")[1];
      const decodedPayload = atob(payloadBase64);
      const payloadObj = JSON.parse(decodedPayload);
      const userId = payloadObj.sub;

      dispatch(setAccessToken(accessToken));
      dispatch(setUserId(userId));

      fetchUserData(userId, navigate, dispatch, nickname, token);
    } catch (error) {
      console.error("구글 로그인 에러:", error);
      navigate("/");
      alert("구글 로그인 오류."); // 여기도 sweetalert로 변경할 수 있습니다.
    }
  };

  const fetchUserData = async (userId, navigate, dispatch, nickname, token) => {
    try {
      const response = await apis.get(`/api/user/${userId}`);
      const userData = response.data.data;

      dispatch(setUserId(userData.userId));
      dispatch(setNickname(userData.nickname));
      dispatch(setRoles(userData.roles));
      dispatch(setIsLogin(true));
      dispatch(setQuiz(userData.quiz));
      dispatch(setMoney(userData.money));
      dispatch(setScore(userData.score));
      console.log(userData);

      if (userData.roles === null) {
        navigate("/register");
      } else {
        navigate("/mypage");
      }

      const firebaseToken = await getFirebaseToken();
      if (firebaseToken) {
        dispatch(setFirebaseToken(firebaseToken));
        console.log('FIREBASE - token updated successfully');

        if (userData.nickname && firebaseToken) {
          await sendWebPushNotification(userData.nickname, firebaseToken)
            .then(res => {
              console.log('FIREBASE - send backend firebase token successfully');
            }).catch((error) => {
              console.error('Error sending web push notification:', error);
            });
        }
      }

    } catch (error) {
      console.error("API 오류:", error);
    }
  };


  return <div>Redirecting...</div>;
}

export default GoogleLoginRedirect;
