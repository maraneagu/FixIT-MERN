import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyTipWidget from "scenes/widgets/MyTipWidget";
import TipsWidget from "scenes/widgets/TipsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import { Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  OndemandVideo,
} from "@mui/icons-material";

import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { setTips } from "state";

// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { useNavigate } from "react-router-dom";
import SearchBarPosts from "scenes/widgets/SearchBarPosts";

const TipsPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { picturePath } = useSelector((state) => state.user);
  const { isClient } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  // const fullName = `${user.firstName} ${user.lastName}`;
  const userId = user._id;
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "20%" : undefined}>
          <UserWidget userId={userId} picturePath={picturePath} />
          <Box m="1.2rem" />
          {!isClient && (
            <Button
              onClick={() => navigate(`/createtip/${userId}`)}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "0.7rem",
                fontSize: 20,
                width: 320,
            }}
            >Add a tutorial
          </Button>
          )}
          <Box m="1.2rem" />
          <FriendListWidget userId={userId} />
        </Box>
          <Box
            flexBasis={isNonMobileScreens ? "77%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            {/* <SearchBarPosts onSearch={handleSearch} /> */}
            <TipsWidget userId={userId}/>
            {/* {!isClient && (
            <MyTipWidget 
              picturePath={picturePath}
            />
            )} */}
        </Box>
      </Box>
    </Box>
  );
};

export default TipsPage;