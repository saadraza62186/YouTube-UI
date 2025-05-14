import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // SignIn function
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (isSignUp && (!name || !email || !password)) {
    setError("All fields are required for sign up");
    return;
  }

  if (!isSignUp && (!name || !password)) {
    setError("Username and password are required");
    return;
  }

  dispatch(loginStart());

  try {
    if (isSignUp) {
      // Sign up logic
      const res = await axiosInstance.post("/auth/signup", { name, email, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } else {
      // Sign in logic
      const res = await axiosInstance.post("/auth/signin", { name: name, email: email, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
    }
  } catch (err) {
    console.error("Authentication error:", err);
    setError(err.response?.data?.message || "Authentication failed");
    dispatch(loginFailure());
  }
};


 const signInWithGoogle = async () => {
  dispatch(loginStart());
  try {
    const result = await signInWithPopup(auth, provider);
    const res = await axiosInstance.post("/auth/google", {
      name: result.user.displayName,
      email: result.user.email,
      img: result.user.photoURL,
      googleId: result.user.uid, // Pass the googleId as well
    });
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    console.error("Google sign-in error:", error);
    setError("Google sign-in failed");
    dispatch(loginFailure());
  }
};


  return (
    <Container>
      <Wrapper>
        <Title>{isSignUp ? "Sign up" : "Sign in"}</Title>
        <SubTitle>To Continue to YouTube</SubTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          {isSignUp && (
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button type="submit">
            {isSignUp ? "Sign up" : "Sign in"}
          </Button>
        </Form>
        
        {/* <Divider>or</Divider> */}
        
        {/* <GoogleButton onClick={signInWithGoogle}>
          Sign in with Google
        </GoogleButton> */}
        
        <ToggleContainer>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <ToggleLink onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Sign in" : "Sign up"}
          </ToggleLink>
        </ToggleContainer>
      </Wrapper>
    </Container>
  );
};

export default SignIn;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  gap: 15px;
  width: 100%;
  max-width: 400px;
  
  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const SubTitle = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.textSoft};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #3ea6ff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3ea6ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2a95ff;
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Divider = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
  margin: 15px 0;
  color: ${({ theme }) => theme.textSoft};
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: ${({ theme }) => theme.soft};
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

const ErrorMessage = styled.div`
  color: #cc0000;
  background-color: #ffeeee;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  text-align: center;
  font-size: 14px;
`;

const ToggleContainer = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  display: flex;
  gap: 5px;
`;

const ToggleLink = styled.span`
  color: #3ea6ff;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;
