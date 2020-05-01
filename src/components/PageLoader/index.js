import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import './pageLoader.scss';

const PageLoader = (props) => {
  return (
    <div className="loader-container">
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  );
};

export default PageLoader;
