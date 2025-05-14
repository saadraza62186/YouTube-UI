import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";
import axiosInstance from "../axiosInstance";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const {currentUser} = useSelector((state) => state.user); // ✅ Fixed useSelector

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(`/comments/${videoId}`);
        setComments(res.data); // ✅ Removed unnecessary res.json()
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments(); // ✅ Call function
  }, [videoId]); // ✅ Added dependency

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img || "fallback-avatar.jpg"} /> {/* ✅ Prevent crash */}
        <Input placeholder="Add a comment....." />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;

// Styled Components
const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  padding: 5px;
  outline: none;
  width: 100%;
`;
