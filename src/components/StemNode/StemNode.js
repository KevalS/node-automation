import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTextColor,
  calculateStatusFromArray,
} from "../../utils/automatableStatusHelper";
import { updateStemStatus } from "../../redux/slices/tree";
import LeafNode from "../LeafNode/LeafNode";

const StemNode = ({ data }) => {
  const dispatch = useDispatch();
  const { leafNodes } = useSelector((state) => state.tree);
  const [childLeafs, setChildLeafs] = useState([]);
  const [automatableStatus, setAutomatableStatus] = useState(null);

  const updateChildStatus = (updatedLeaf) => {
    let updatedList = childLeafs.map((leaf) =>
      leaf.id === updatedLeaf.id ? updatedLeaf : leaf
    );
    setChildLeafs(updatedList);
  };

  useEffect(() => {
    if (!data) return;
    setAutomatableStatus(data.automatableStatus);
  }, [data]);

  // set childLeafs after fetching leafNodes
  useEffect(() => {
    if (!leafNodes || leafNodes.length <= 0) return;
    let newLeafs = [];
    data.children.forEach((child) => {
      newLeafs.push(leafNodes[child.leafIndex]);
    });

    setChildLeafs(newLeafs);
    //eslint-disable-next-line
  }, [leafNodes]);

  //update automatableStatus after any child changes
  useEffect(() => {
    if (!childLeafs || childLeafs.length <= 0) return;
    const newStatus = calculateStatusFromArray(childLeafs);
    if (newStatus === automatableStatus) return;
    setAutomatableStatus(newStatus);

    // update redux state
    dispatch(updateStemStatus({ id: data.id, automatableStatus: newStatus }));

    //eslint-disable-next-line
  }, [childLeafs]);

  //list of child components
  let LeafNodesList = () => {
    if (childLeafs && childLeafs.length > 0) {
      return childLeafs.map((item) => (
        <LeafNode
          key={item.id}
          data={item}
          updateChildStatus={updateChildStatus}
        />
      ));
    } else {
      return null;
    }
  };

  return (
    <Fragment>
      <div className="node">
        {`Node: ${data.id || ""} - `}
        <span style={{ color: setTextColor(automatableStatus) }}>
          {automatableStatus}
        </span>
      </div>
      <div className="child_container">
        <LeafNodesList />
      </div>
    </Fragment>
  );
};

export default StemNode;
