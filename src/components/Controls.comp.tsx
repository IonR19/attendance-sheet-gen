import React from "react";
import { useDispatch } from "react-redux";
import { load, save } from "../store";

interface Props {}

const Controls: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const handleSaveClick = () => {
    dispatch(save());
  };
  const handleLoadClick = () => {
    dispatch(load());
  };

  return (
    <div>
      <button onClick={handleSaveClick}>Save</button>
      <button onClick={handleLoadClick}>Load</button>
    </div>
  );
};

export default Controls;
