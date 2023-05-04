import {
ChatBubbleOutlineOutlined,
FavoriteBorderOutlined,
FavoriteOutlined,
ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import VideoPlayer from "components/VideoPlayer";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTip } from "state";
import React from 'react'
import ReactPlayer from 'react-player'

const TipWidget = ({
tipId,
tipUserId,
name,
description,
location,
picturePath,
videoPath,
userPicturePath,
likes,
comments,
}) => {
const [isComments, setIsComments] = useState(false);
const dispatch = useDispatch();
const token = useSelector((state) => state.token);
const loggedInUserId = useSelector((state) => state.user._id);
const isLiked = Boolean(likes[loggedInUserId]);
const likeCount = Object.keys(likes).length;

const { palette } = useTheme();
const main = palette.neutral.main;
const primary = palette.primary.main;

const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/tips/${tipId}/like`, {
    method: "PATCH",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedTip = await response.json();
    dispatch(setTip({ tip: updatedTip }));
};

return (
    <WidgetWrapper m="0 0 2rem 0">
        <Friend
            friendId={tipUserId}
            name={name}
            subtitle={location}
            userPicturePath={userPicturePath}
        />
        
        <Typography color={main} sx={{ mt: "1rem" }}>
            {description}
        </Typography>

        {picturePath && (
            <img
            width="100%"
            height="auto"
            alt="tip"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
            />
        )}

        {videoPath && (
            <ReactPlayer url={`http://localhost:3001/assets/${videoPath}`} />
        )}

        <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                    <IconButton onClick={patchLike}>
                    {isLiked ? (
                        <FavoriteOutlined sx={{ color: primary }} />
                    ) : (
                        <FavoriteBorderOutlined />
                    )}
                    </IconButton>
                    <Typography>{likeCount}</Typography>
                </FlexBetween>

                <FlexBetween gap="0.3rem">
                    <IconButton onClick={() => setIsComments(!isComments)}>
                        <ChatBubbleOutlineOutlined />
                    </IconButton>
                    <Typography>{comments.length}</Typography>
                </FlexBetween>
            </FlexBetween>

            <IconButton>
                <ShareOutlined />
            </IconButton>
        </FlexBetween>

        {isComments && (
            <Box mt="0.5rem">
            {comments.map((comment, i) => (
                <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                    {comment}
                </Typography>
                </Box>
            ))}
            <Divider />
            </Box>
        )}
    </WidgetWrapper>
);
};

export default TipWidget;