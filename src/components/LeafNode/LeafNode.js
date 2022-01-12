import React from "react";
import { setTextColor, statusCodes } from "../../utils/automatableStatusHelper";

const LeafNode = ({ data, updateChildStatus }) => {
  const handleSelectChange = (e) => {
    if (!data) return;
    const updatedData = { ...data, automatableStatus: e.target.value };
    updateChildStatus(updatedData);
  };

  return (
    <div className="node">
      {`Node: ${data.id || ""} - `}
      <select
        style={{ color: setTextColor(data.automatableStatus) }}
        value={data.automatableStatus}
        onChange={handleSelectChange}
      >
        <option value={statusCodes.FULL}>{statusCodes.FULL}</option>
        <option value={statusCodes.PARTIAL}>{statusCodes.PARTIAL}</option>
        <option value={statusCodes.NONE}>{statusCodes.NONE}</option>
      </select>
    </div>
  );
};

export default LeafNode;
