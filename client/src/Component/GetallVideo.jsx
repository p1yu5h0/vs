// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {videeee} from "../../../server/uploads/videos/video-1710745821421-173951373.mp4"

// const GetallVideo = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:4000/api/videos/getvideo", {
//       method: "get",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setVideos(data);
//         console.log("getall data data", data);
//       });
//   }, []);

// // console.log(all)

//   return (
//     <>
//       <div>GetallVideo</div>
//       {videos.map((video) => (
//         <div key={video._id}>
//           <p>id: {video._id}</p>
//           <p>fileName: {video.fileName}</p>

//     {video.videoLink}

//       <video controls>
//             <source src={C:\Users\hp\Desktop\vs\server\src\uploads\videos}{video.videoLink} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           {/* <p> videoLink: {video.videoLink}</p> */}
//         </div>
//       ))}
//     </>
//   );
// };

// export default GetallVideo;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GetallVideo = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/videos/getvideo", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
        console.log("getall data data", data);
        console.log(`${data.videoLink} `);
      });
  }, []);

  return (
    <>
      <div>GetallVideo</div>
      {/* C:\Users\hp\Desktop\vs\server\uploads\videos\video-1710745821421-173951373.mp4 */}
      {/* <a href="server\uploads\videos\video-0.mp4"> file:///C:/Users/hp/Desktop/vs/server/uploads/videos/video-1.mp4</a> */}
      {videos.map((video) => (
        <div key={video._id}>
          <p>id: {video._id}</p>
          <p>fileName: {video.fileName}</p>
          <p> {video.videoLink} </p>
          <video controls style={{width:"200px"}}>
            {/* <source
              src="http://localhost:4000/videos/video-1.mp4"
              type="video/mp4"
            /> */}
            <source src={`http://localhost:4000/videos/${video.videoLink}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </>
  );
};

export default GetallVideo;
