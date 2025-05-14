import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/videos/search?q=${query}`);
        setVideos(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error searching videos:", err);
        setError("Failed to search videos. Please try again.");
        setLoading(false);
      }
    };
    fetchVideos();
  }, [query]);

  if (loading) {
    return <LoadingMessage>Searching for videos...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <SearchHeader>
        <SearchQuery>Search results for: <Highlight>{query}</Highlight></SearchQuery>
        <ResultCount>{videos.length} videos found</ResultCount>
      </SearchHeader>
      
      {videos.length === 0 ? (
        <NoResults>No videos found matching your search.</NoResults>
      ) : (
        <VideoGrid>
          {videos.map(video => (
            <Card key={video._id} video={video} />
          ))}
        </VideoGrid>
      )}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  padding: 20px 0;
`;

const SearchHeader = styled.div`
  margin-bottom: 20px;
`;

const SearchQuery = styled.h2`
  font-size: 20px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 5px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Highlight = styled.span`
  color: #3ea6ff;
`;

const ResultCount = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const VideoGrid = styled.div`
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

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;
