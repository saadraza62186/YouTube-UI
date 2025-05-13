import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {format} from 'timeago.js'

const Card = ({type, video}) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        // Fixed the double slash in the URL
        const res = await axios.get(`/api/users/find/${video.userId}`);
        setChannel(res.data);
      } catch (error) {
        console.error("Error fetching channel:", error);
      }
    };
    fetchChannel();
  }, [video.userId]);
  
  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl || "/placeholder.svg"} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img || "/placeholder.svg"} />
          <Texts>
            <Title type={type}>{video.title}</Title>
            <ChannelName type={type}>{channel.name}</ChannelName>
            <Info type={type}>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  )
}

export default Card

const Container = styled.div`
  width: ${(props) => (props.type !== 'sm' ? '100%' : '100%')};
  max-width: ${(props) => (props.type !== 'sm' ? '340px' : 'none')};
  margin-bottom: ${(props) => (props.type === 'sm' ? '15px' : '45px')};
  cursor: pointer;
  display: ${(props) => (props.type === 'sm' ? 'flex' : 'block')};
  gap: 10px;
  
  @media (max-width: 768px) {
    max-width: none;
    width: 100%;
  }
`;

const Image = styled.img`
  width: ${(props) => (props.type === 'sm' ? '150px' : '100%')};
  height: ${(props) => (props.type === 'sm' ? '84px' : '202px')};
  background-color: #999;
  object-fit: cover;
  
  @media (max-width: 480px) {
    height: ${(props) => (props.type === 'sm' ? '70px' : '180px')};
    width: ${(props) => (props.type === 'sm' ? '120px' : '100%')};
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.type === 'sm' ? 'column' : 'row')};
  margin-top: ${(props) => (props.type !== 'sm' && '16px')};
  gap: ${(props) => (props.type === 'sm' ? '5px' : '12px')};
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => (props.type === 'sm' ? 'none' : 'flex')};
  
  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

const Texts = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  font-size: ${(props) => (props.type === 'sm' ? '14px' : '16px')};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  @media (max-width: 480px) {
    font-size: ${(props) => (props.type === 'sm' ? '12px' : '14px')};
  }
`;

const ChannelName = styled.h2`
  font-size: ${(props) => (props.type === 'sm' ? '12px' : '14px')};
  color: ${({ theme }) => theme.textSoft};
  margin: ${(props) => (props.type === 'sm' ? '0' : '9px 0px')};
  
  @media (max-width: 480px) {
    font-size: ${(props) => (props.type === 'sm' ? '10px' : '12px')};
    margin: ${(props) => (props.type === 'sm' ? '0' : '5px 0px')};
  }
`;

const Info = styled.div`
  font-size: ${(props) => (props.type === 'sm' ? '12px' : '14px')};
  color: ${({ theme }) => theme.textSoft};
  margin-top: ${(props) => (props.type === 'sm' ? '4px' : '0')};
  
  @media (max-width: 480px) {
    font-size: ${(props) => (props.type === 'sm' ? '10px' : '12px')};
  }
`;
