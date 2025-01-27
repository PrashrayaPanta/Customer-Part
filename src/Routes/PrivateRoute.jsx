import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {

  const user = useSelector((state) => state.user.value);


  // console.log(user);
  

  
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return element;
};

export default PrivateRoute;
