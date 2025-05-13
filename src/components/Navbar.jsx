"use client"

import { useState } from "react"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import styled from "styled-components"
import SearchIcon from "@mui/icons-material/Search"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import VideoCallIcon from "@mui/icons-material/VideoCall"
import Upload from "./Upload"

function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const { currentUser } = useSelector((state) => state.user)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`)
    }
  }

  return (
    <>
      <Container>
        <Wrapper>
          <SearchContainer>
            <SearchForm onSubmit={handleSearch}>
              <Input placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <SearchButton type="submit">
                <SearchIcon />
              </SearchButton>
            </SearchForm>
          </SearchContainer>
          {currentUser ? (
            <User>
              <UploadButton onClick={() => setOpen(true)}>
                <VideoCallIcon />
                <UploadText>Upload</UploadText>
              </UploadButton>
              <Avatar src={currentUser.img || "/placeholder.svg"} />
              <Username>{currentUser.name}</Username>
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default Navbar

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 10;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  position: relative;
  padding: 0px 20px;
  
  @media (max-width: 768px) {
    padding: 0px 10px;
    justify-content: center;
  }
`

const SearchContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 40%;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    margin-right: 10px;
  }
`

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
`

const Input = styled.input`
  border: none;
  background-color: transparent;
  padding: 8px 10px;
  flex: 1;
  color: ${({ theme }) => theme.text};
  outline: none;
`

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.soft};
  border: none;
  padding: 0 15px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Button = styled.div`
  padding: 4px 8px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: fit-content;
  text-align: center;
  cursor: pointer;
`

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  
  @media (max-width: 480px) {
    gap: 5px;
  }
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`

const Username = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`

// New styled components for better upload button
const UploadButton = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
  
  svg {
    font-size: 24px;
  }
  
  @media (max-width: 768px) {
    padding: 5px;
  }
`

const UploadText = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`
