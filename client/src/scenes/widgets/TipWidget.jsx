import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    DeleteOutlined,
  } from "@mui/icons-material";
  import EditIcon from "@mui/icons-material/Edit";
  import ClassIcon from '@mui/icons-material/Class';
  import TitleIcon from '@mui/icons-material/Title';
  import DescriptionIcon from '@mui/icons-material/Description';
  import {
    Box,
    Divider,
    IconButton,
    Typography,
    useTheme,
    Button,
    useMediaQuery,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Rating,
    TextField
  } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useRef, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setTip } from "state";
  import { setTips } from "state";
  import { useNavigate, useLocation } from "react-router-dom";
import PlayerComponent from "./PlayerComponent";
  
  const TipWidget = ({
    tipId,
    tipUserId,
    name,
    title,
    description,
    category,
    location,
    videoPath,
    userPicturePath,
    likes,
    comments,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
  
    const loggedInUserId = useSelector((state) => state.user._id);
    const isProfileUser = tipUserId === loggedInUserId;
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const navigate = useNavigate();
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const primary = palette.primary.main;
    const location2 = useLocation();
    const isHomePage = location2.pathname === "/home";
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  
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
  
    const handleDeleteConfirmationOpen = () => {
      setDeleteConfirmationOpen(true);
    };
  
    const handleDeleteConfirmationClose = () => {
      setDeleteConfirmationOpen(false);
    };

    const deleteTip = async () => {
      console.log("tipid :", tipId)
      const response = await fetch(`http://localhost:3001/tips/${tipId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      if (response.ok) {
        const restTips = await response.json();
        dispatch(setTips({ tips: restTips}));
      }
    };

    return (
      <WidgetWrapper 
        m="2rem 0"
        ml={isNonMobileScreens ? "15px" : undefined} 
        mr={isNonMobileScreens ? "15px" : undefined} 
      >
        <Friend
          friendId={tipUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
  
        <Typography 
            color={main} 
            variant="h5" 
            fontWeight="500" 
            sx={{ mt: "1rem", width: "100%", wordWrap: "break-word" }}
          >
            {title}
        </Typography>

        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
  
        <Typography
          color={medium}
          display="flex"
          alignItems="center"
          sx={{ mt: "1.3rem", mb: "5px" }}
        >
          <ClassIcon sx={{ color: main, mr: "8px" }}/>
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : ""}
        </Typography>
        <br></br>
				<PlayerComponent vid={videoPath} />

        <Divider sx={{ mt: "1rem", mb: "1rem" }} />
        	
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
          </FlexBetween>
          <Box>
            {isProfileUser && (
              <IconButton
                onClick={() => navigate(`/edittip/${tipId}`)}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <EditIcon/>
              </IconButton>
            )}
            {isProfileUser && (
              <IconButton onClick={handleDeleteConfirmationOpen}>
                <DeleteOutlined />
              </IconButton>
            )}
          </Box>
        </FlexBetween>

        <Dialog
          open={deleteConfirmationOpen}
          onClose={handleDeleteConfirmationClose}
        >
          <DialogTitle>Delete Tip</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this tip?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirmationClose} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteTip} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
          
        
        
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
  
        {/* Show the button only on the home page
        {isHomePage && (
          <Box
            marginTop="10px"
            marginBottom="10px"
            display="flex"
            justifyContent="center"
          >
            <Button
              variant="contained"
              onClick={() => navigate(`/show/${tipId}`)}
            >
              See the offer
            </Button>
          </Box>
        )} */}
      </WidgetWrapper>
    );
  };
  
  export default TipWidget;