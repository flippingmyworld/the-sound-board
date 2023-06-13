import React from 'react';
import App from '../components/App';
import ReduxWrapper from "../redux"
const Board = ({project}) => {
  return <ReduxWrapper><App project={project}/></ReduxWrapper>;
};

export default Board;
