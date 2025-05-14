import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );

        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video:", error);
        setError("Failed to load video. Please try again later.");
        setLoading(false);
      }
    };
    fetchVideo();
  }, [path, dispatch]);

  const HandleLike = async () => {
    if (!currentUser) return;
    try {
      await axios.put(`/users/like/${currentVideo._id}`);
      dispatch(like(currentUser._id));
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  const HandleDislike = async () => {
    if (!currentUser) return;
    try {
      await axios.put(`/users/dislike/${currentVideo._id}`);
      dispatch(dislike(currentUser._id));
    } catch (error) {
      console.error("Error disliking video:", error);
    }
  };

  const HandleSub = async () => {
    if (!currentUser) return;
    try {
      if (currentUser.subscribedUsers?.includes(channel._id)) {
        await axios.put(`/users/unsub/${channel._id}`);
      } else {
        await axios.put(`/users/sub/${channel._id}`);
      }
      dispatch(subscription(channel._id));
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  if (loading) {
    return <LoadingMessage>Loading video...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!currentVideo) {
    return <ErrorMessage>Video not found</ErrorMessage>;
  }

  return (
    <Container>
      <VideoWrapper>
        <VideoFrame 
          src={currentVideo.videoUrl} 
          controls
          allowFullScreen
        />
      </VideoWrapper>
      
      <Title>{currentVideo.title}</Title>
      
      <Details>
        <Info>
          {currentVideo.views} views • {new Date(currentVideo.createdAt).toLocaleDateString()}
        </Info>
        <ButtonsContainer>
          <Button onClick={HandleLike}>
            <ThumbUpIcon style={{ color: currentUser?.likes?.includes(currentVideo._id) ? "blue" : "" }} />
            {currentVideo.likes?.length || 0}
          </Button>
          <Button onClick={HandleDislike}>
            <ThumbDownAltIcon style={{ color: currentUser?.dislikes?.includes(currentVideo._id) ? "red" : "" }} />
            {currentVideo.dislikes?.length || 0}
          </Button>
          <Button>
            <ReplyIcon /> Share
          </Button>
          <Button>
            <BookmarkBorderIcon /> Save
          </Button>
        </ButtonsContainer>
      </Details>
      
      <Hr />
      
      <Channel>
        <ChannelInfo>
          <Image src={channel.img || "/placeholder.svg"} alt={channel.name} />
          <ChannelDetail>
            <ChannelName>{channel.name}</ChannelName>
            <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
            <Description>{currentVideo.desc}</Description>
          </ChannelDetail>
        </ChannelInfo>
        {currentUser && (
          <Subscribe onClick={HandleSub} isSubscribed={currentUser.subscribedUsers?.includes(channel._id)}>
            {currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
          </Subscribe>
        )}
      </Channel>
      
      <Hr />
      
      <Comments videoId={currentVideo._id} />
    </Container>
  );
};

export default Video;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
`;

const VideoFrame = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: 14px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
  
  @media (max-width: 480px) {
    gap: 10px;
    flex-wrap: wrap;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 14px;
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #999;
  object-fit: cover;
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
  font-size: 16px;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Subscribe = styled.button`
  background-color: ${props => props.isSubscribed ? "#8c8c8c" : "#cc1a00"};
  color: white;
  border: none;
  border-radius: 3px;
  height: 36px;
  padding: 0 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.isSubscribed ? "#6c6c6c" : "#aa1600"};
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: red;
`;
