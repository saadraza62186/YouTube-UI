"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import axiosInstance from "../axiosInstance"

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined)
  const [video, setVideo] = useState(undefined)
  const [imgPerc, setImgPerc] = useState(0)
  const [videoPerc, setVideoPerc] = useState(0)
  const [inputs, setInputs] = useState({})
  const [tags, setTags] = useState([])
  const [uploadStatus, setUploadStatus] = useState("")

  const navigate = useNavigate()

  const handleTag = (e) => {
    setTags(e.target.value.split(","))
  }

  // Modified Cloudinary Upload Function
  const uploadFile = async (file, urlType) => {
    if (!file) return

    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "youtube")

    try {
      // For video uploads, specify the resource_type as video
      const resourceType = urlType === "videoUrl" ? "video" : "image"
      const url = `https://api.cloudinary.com/v1_1/dgrnu6n3m/${resourceType}/upload`

      console.log(`Starting ${resourceType} upload to: ${url}`)

      const xhr = new XMLHttpRequest()
      xhr.open("POST", url, true)

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100)
          urlType === "imgUrl" ? setImgPerc(progress) : setVideoPerc(progress)
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          console.log(`${urlType} uploaded:`, response.secure_url)

          // Save URL to state and show success message
          setInputs((prev) => ({ ...prev, [urlType]: response.secure_url }))
          setUploadStatus(`${urlType === "videoUrl" ? "Video" : "Image"} uploaded successfully!`)
        } else {
          console.error(`❌ ${urlType} upload failed`, xhr.responseText)
          setUploadStatus(`Failed to upload ${urlType === "videoUrl" ? "video" : "image"}: ${xhr.statusText}`)
        }
      }

      xhr.onerror = () => {
        console.error(`❌ ${urlType} upload failed due to network error`)
        setUploadStatus(`Network error during ${urlType === "videoUrl" ? "video" : "image"} upload`)
      }

      xhr.send(data)
    } catch (error) {
      console.error(`❌ Upload failed:`, error)
      setUploadStatus(`Error: ${error.message}`)
    }
  }

  useEffect(() => {
    if (video) {
      console.log("Video file selected:", video.name, video.type, video.size)
      uploadFile(video, "videoUrl")
    }
  }, [video])

  useEffect(() => {
    if (img) {
      console.log("Image file selected:", img.name, img.type, img.size)
      uploadFile(img, "imgUrl")
    }
  }, [img])

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    // Check if we have the required data
    if (!inputs.videoUrl) {
      setUploadStatus("Error: Video URL is missing. Please wait for video upload to complete.")
      return
    }

    if (!inputs.title) {
      setUploadStatus("Error: Please add a title for your video.")
      return
    }

    console.log("📤 Uploading to backend with data:", { ...inputs, tags })

    try {
      const res = await axiosInstance.post("/videos", { ...inputs, tags })

      console.log("✅ Response from backend:", res.data)

      if (res.status === 200) {
        setOpen(false)
        navigate("/video/" + res.data._id)
      }
    } catch (error) {
      console.error("❌ Backend Upload Failed:", error)
      if (error.response) {
        console.error("🔴 Response Data:", error.response.data)
        console.error("🔴 Response Status:", error.response.status)
        setUploadStatus(`Backend error: ${error.response.data.message || error.response.statusText}`)
      } else {
        setUploadStatus("Network error. Please check your connection.")
      }
    }
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a new Video</Title>

        {/* Status message */}
        {uploadStatus && <StatusMessage>{uploadStatus}</StatusMessage>}

        <Label>Video:</Label>
        {videoPerc > 0 ? (
          <ProgressContainer>
            <ProgressBar progress={videoPerc} />
            <span>Uploading: {videoPerc}%</span>
          </ProgressContainer>
        ) : (
          <Input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
        )}

        <Input type="text" placeholder="Title" name="title" onChange={handleChange} required />

        <Desc placeholder="Description" rows={8} name="desc" onChange={handleChange} />

        <Input type="text" placeholder="Tags (comma separated)" onChange={handleTag} />

        <Label>Thumbnail Image:</Label>
        {imgPerc > 0 ? (
          <ProgressContainer>
            <ProgressBar progress={imgPerc} />
            <span>Uploading: {imgPerc}%</span>
          </ProgressContainer>
        ) : (
          <Input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
        )}

        <Button onClick={handleUpload} disabled={!inputs.videoUrl || (videoPerc > 0 && videoPerc < 100)}>
          {videoPerc > 0 && videoPerc < 100 ? "Uploading..." : "Upload"}
        </Button>
      </Wrapper>
    </Container>
  )
}

export default Upload

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`

const Wrapper = styled.div`
  width: 600px;
  max-width: 90%;
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.soft};
  
  &:hover {
    background-color: ${({ theme }) => theme.textSoft};
    color: ${({ theme }) => theme.bgLighter};
  }
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #3ea6ff;
  }
`

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #3ea6ff;
  }
`

const Button = styled.button`
  background-color: #3ea6ff;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${(props) => (props.disabled ? "#3ea6ff" : "#2a95ff")};
  }
`

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`

// New styled components
const StatusMessage = styled.div`
  padding: 10px;
  background-color: ${({ theme }) => theme.soft};
  border-radius: 3px;
  font-size: 14px;
  text-align: center;
`

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${({ theme }) => theme.soft};
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.progress}%;
    background-color: #3ea6ff;
    transition: width 0.3s ease;
  }
`
