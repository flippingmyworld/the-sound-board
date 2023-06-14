import React, { useEffect, useState } from "react";
import App from "../app";
import { databases } from "../../utils/appwriteClient";
const Board = ({ id }) => {
  const [project, setProject] = useState(false);
  useEffect(() => {
    if (id) {
      const promise = databases.getDocument("soundboard", "boards", id);

      promise.then(
        function (response) {
          // console.log(response); // Success
          const boardData = JSON.parse(response.data);
          boardData.settings.id = response.$id;
          setProject(boardData);
        },
        function (error) {
          // console.log(error); // Failure
        }
      );
    }
  }, []);
  return <App project={project} />;
};

export default Board;
