import React, { useState } from "react";
import "./SearchVideo.css";
import fetchFromAPI from "../src/fetchFromAPI";
import VideoCard from "./VideoCard";

function SearchVideos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetchFromAPI.get("/search", {
      params: {
        part: "snippet",
        type: "video",
        q: searchQuery,
        maxResults: 14,
      },
    });
    setVideos(response.data.items);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Y2Y</h1>
        <h2>Download Mp3 and Mp4 from YouTube </h2>

        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search or Paste link here..."
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>

        <div className="video-container">
          {videos.map((video) => (
            <VideoCard
              key={video.id.videoId}
              title={video.snippet.title}
              description={video.snippet.description}
              thumbnail={video.snippet.thumbnails.medium.url}
              videoId={video.id.videoId}
            />
          ))}
        </div>
      </div>
      <div className="info">
        <h2>Youtube Audio and Video Downloader</h2>
      </div>
    </div>
  );
}

export default SearchVideos;
