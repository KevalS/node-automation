export const statusCodes = { PARTIAL: "PARTIAL", FULL: "FULL", NONE: "NONE" };

export const calculateStatusFromArray = (arr) => {
  let partialCount = 0;
  let fullCount = 0;
  let noneCount = 0;

  arr.forEach((item) => {
    switch (item.automatableStatus) {
      case statusCodes.PARTIAL:
        partialCount++;
        break;
      case statusCodes.FULL:
        fullCount++;
        break;
      case statusCodes.NONE:
        noneCount++;
        break;
      default:
    }
  });

  return calculateStatusFromCounts({ partialCount, fullCount, noneCount });
};

export const calculateStatusFromCounts = ({
  fullCount,
  partialCount,
  noneCount,
}) => {
  if (fullCount > 0 && partialCount === 0 && noneCount === 0) {
    return statusCodes.FULL;
  } else if (noneCount > 0 && partialCount === 0 && fullCount === 0) {
    return statusCodes.NONE;
  } else {
    return statusCodes.PARTIAL;
  }
};

export const setTextColor = (automatableStatus) => {
  switch (automatableStatus) {
    case statusCodes.FULL:
      return "#68D642";

    case statusCodes.PARTIAL:
      return "#FFA001";

    case statusCodes.NONE:
      return "#D71312";

    default:
      return "#000";
  }
};
