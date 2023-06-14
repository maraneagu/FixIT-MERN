import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTips } from "state";
import TipWidget from "./TipWidget";
import TipWidgetProfile from "./TipWidgetProfile";
import OldTipWidget from "./OldTipWidget";


const TipsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const tips = useSelector((state) => state.tips);
  const token = useSelector((state) => state.token);

  const getTips = async () => {
    const response = await fetch("http://localhost:3001/tips", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setTips({ tips: data }));
  };

  const getUserTips = async () => {
    const response = await fetch(
      `http://localhost:3001/tips/${userId}/tips`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setTips({ tips: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserTips();
    } else {
      getTips();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isProfile) {
    //getUserTips();
    return (
      <>
        {tips.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            videoPath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <TipWidgetProfile
              key={_id}
              tipId={_id}
              tipUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              videoPath={videoPath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
      </>
    );
  } else {
    //getTips();
    return (
      <>
        {tips.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            videoPath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <OldTipWidget
              key={_id}
              tipId={_id}
              tipUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              videoPath={videoPath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
      </>
    );
  }
  
};

export default TipsWidget;