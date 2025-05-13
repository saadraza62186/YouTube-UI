import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import axios from "axios";

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/videos/${type}`);
        setVideos(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos. Please try again later.");
        setLoading(false);
      }
    };
    fetchVideos();
  }, [type]);

  if (loading) {
    return <LoadingMessage>Loading videos...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (videos.length === 0) {
    return <NoVideosMessage>No videos found.</NoVideosMessage>;
  }

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
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

const NoVideosMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;
