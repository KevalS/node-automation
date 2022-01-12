import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTree } from "./redux/slices/tree";
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";
import RootNode from "./components/RootNode/RootNode";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { loading, errorMsg } = useSelector((state) => state.tree);

  useEffect(() => {
    dispatch(getTree());
    //eslint-disable-next-line
  }, []);

  let content = null;

  if (errorMsg) {
    content = <ErrorAlert errorMsg={errorMsg} />;
  } else {
    content = <RootNode />;
  }

  return (
    <div style={{ padding: "48px" }}>
      {loading ? <div>Loading...</div> : content}
    </div>
  );
};

export default App;
