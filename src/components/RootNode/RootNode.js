import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRootStatus } from "../../redux/slices/tree";
import {
  calculateStatusFromArray,
  setTextColor,
} from "../../utils/automatableStatusHelper";
import StemNode from "../StemNode/StemNode";

const RootNode = () => {
  const dispatch = useDispatch();
  const { rootNode, stemNodes } = useSelector((state) => state.tree);

  useEffect(() => {
    const status = calculateStatusFromArray(stemNodes);
    dispatch(setRootStatus({ status }));
    // eslint-disable-next-line
  }, [stemNodes]);

  return (
    <Fragment>
      <div className="node">
        {`Node: ${rootNode ? rootNode.id : ""} - `}
        <span
          style={{
            color: setTextColor(rootNode ? rootNode.automatableStatus : ""),
          }}
        >
          {rootNode ? rootNode.automatableStatus : ""}
        </span>
      </div>
      <div className="child_container">
        {stemNodes && stemNodes.length > 0
          ? stemNodes.map((data, index) => (
              <StemNode key={index} data={data} index={index} />
            ))
          : null}
      </div>
    </Fragment>
  );
};

export default RootNode;
