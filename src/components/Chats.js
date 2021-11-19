import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { LogoutOutlined } from "@ant-design/icons";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": process.env.REACT_APP_CHATENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })

      .then(() => setLoading(false))

      .catch((e) => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": process.env.REACT_APP_CHATENGINE_KEY,
              },
            })
            .then(() => setLoading(false))
            .catch((e) => console.log("e", e.response));
        });
      });
  }, [user, navigate]);

  if (!user || loading)
    return (
      <>
        <div class="loader"></div>
        <p className="loader-p">Please Wait While Loading</p>
      </>
    );

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Chat App</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout <LogoutOutlined />
        </div>
      </div>

      <ChatEngine
        height="91vh"
        projectID={process.env.REACT_APP_CHATENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
