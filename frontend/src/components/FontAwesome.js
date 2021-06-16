import React from "react";
import * as FontAwesome from "react-icons/fa";

const Icon = props => {
  const { iconName, className } = props;
  const icon = React.createElement(
      FontAwesome[iconName], 
      {className: className}
    );
  return <React.Fragment>{icon}</React.Fragment>;
};

export default Icon
