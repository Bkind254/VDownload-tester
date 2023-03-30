import React, { useState } from "react";
import "./VideoCard.css";

function VideoCard(props) {
  const { title, thumbnail, videoId } = props;
  const [downloadProgress, setDownloadProgress] = useState(0); // Initialize state variable

  const handleDownload = async () => {
    const response = await fetch("http://localhost:3000/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `https://www.youtube.com/watch?v=${videoId}`,
      }),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.mp4`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDownloadProgress = (event) => {
    const percentage = Math.round((event.loaded * 100) / event.total); // Calculate download progress percentage
    setDownloadProgress(percentage); // Update state variable with percentage value
  };

  return (
    <div className="video-card">
      <img src={thumbnail} alt={title} />
      <div className="video-info">
        <label>{title}</label>
        <button className="downloadButton" onClick={handleDownload}>
          Download
        </button>
        {downloadProgress > 1 && ( // Only display progress if it's greater than 0
          <div className="downloadProgress">{downloadProgress}% downloaded</div>
        )}
      </div>
    </div>
  );
}

export default VideoCard;
