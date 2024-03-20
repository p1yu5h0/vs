import React, { useState } from "react";

const UploadsVideo = () => {
  const [video, setVideo] = useState("");
  const [videodetais, setVideodetais] = useState({});
  const [title, setTitle] = useState();
  const [id, setId] = useState("");
  const [validity, setValidity] = useState("1 year");
  const [fileName, setFileName] = useState("");
  const [videoLink, setvideoLink] = useState("");
  const [createvideodata, setCreatevideodata] = useState();
  // id=Math.random()

  const uploadVideos = (files) => {
    const formData = new FormData();
    formData.append("video", files[0]);
    formData.append("title", title);

    fetch("http://localhost:4000/api/videos/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setVideo(data.secure_url);
        console.log(data);
        setVideodetais(data);
        setvideoLink(data.path);
        setFileName(data.filename);
      })
      .catch((error) => {
        console.error("Error uploading video:", error);
      });
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById("videoInput");
    const files = fileInput.files;
    uploadVideos(files);
  };

  const createAPiCALL = () => {
    try {
      fetch("http://localhost:4000/api/videos/create", {
        method: "POST",
        body: JSON.stringify({_id:id, title, validity, fileName, validity, videoLink}),
        headers: {
          'Content-Type': 'application/json'
      }
        // body: {  },
      })
        .then((response) => response.json())
        .then((data) => {
          setCreatevideodata(data);
          console.log("  createAPiCALL data", data);
        });
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  // }

  return (
    <>
      <div>Upload Video</div>
      <div>
        <input type="file" id="videoInput" />
        <button onClick={handleButtonClick}>Upload</button>
        <video src={video} controls />
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <p> filename ---{videodetais.filename}</p>
      <p>fieldname----{videodetais.fieldname}</p>
      <p>mimetype---{videodetais.mimetype}</p>
      <p>originalname---{videodetais.originalname}</p>
      <p> size---{videodetais.size}</p>
      {/* <p>{videodetais.mimetype}</p> */}
      <hr />
      <p> title---{title}</p>
      <p> id---{id}   <input value={id} onChange={(e) => setId(e.target.value)} /></p>
      <p>validity {validity}</p>
      <p>fileName real--- {fileName}</p>
      <p>validity{validity}</p>
      <p>videoLink real--- {videoLink}</p>
      <button onClick={createAPiCALL}>create</button>
    </>
  );
};

export default UploadsVideo;
