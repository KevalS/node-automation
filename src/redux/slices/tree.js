import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  statusCodes,
  calculateStatusFromCounts,
  calculateStatusFromArray,
} from "../../utils/automatableStatusHelper";

const sliceName = "tree";
const initialState = {
  rootNode: null,
  stemNodes: [],
  leafNodes: [],
  errorMsg: null,
  loading: false,
};

export const getTree = createAsyncThunk(sliceName + "/getTree", async () => {
  const response = await axios.get(
    "https://run.mocky.io/v3/00d916b8-0583-4a52-a17e-12ce1eba5f80"
  );

  return response.data;
});

export const treeSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setRootStatus: (state, action) => {
      state.rootNode = {
        ...state.rootNode,
        automatableStatus: action.payload.status,
      };
    },
    updateStemStatus: (state, action) => {
      state.stemNodes = state.stemNodes.map((node) =>
        node.id === action.payload.id
          ? {
              ...node,
              automatableStatus: action.payload.automatableStatus,
            }
          : node
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTree.pending, (state) => {
        state.loading = true;
        state.errorMsg = null;
        state.rootNode = null;
        state.stemNodes = [];
        state.leafNodes = [];
      })
      .addCase(getTree.fulfilled, (state, action) => {
        let rootNode = null;
        let stems = [];
        let leafs = [];
        action.payload.nodes.forEach((node) => {
          if (node.childrenIds) {
            if (node.id === action.payload.rootId) {
              // this is the root node
              rootNode = node;
              return;
            } else {
              // this is a stem node
              stems.push(node);
              return;
            }
          }
          //this is a leaf node
          leafs.push(node);
        });

        stems = stems.map((stem, stemIndex) => {
          let children = [];
          let statusCounts = { fullCount: 0, partialCount: 0, noneCount: 0 };
          stem.childrenIds.forEach((id) => {
            leafs = leafs.map((leaf, leafIndex) => {
              if (leaf.id === id) {
                //this leaf is a child of this stem
                children.push({ id: leaf.id, leafIndex });

                switch (leaf.automatableStatus) {
                  case statusCodes.FULL:
                    statusCounts.fullCount += 1;
                    break;
                  case statusCodes.PARTIAL:
                    statusCounts.partialCount += 1;
                    break;
                  case statusCodes.NONE:
                    statusCounts.noneCount += 1;
                    break;
                  default:
                }
                return { ...leaf, stemIndex };
              }
              return leaf;
            });
          });
          return {
            id: stem.id,
            children,
            automatableStatus: calculateStatusFromCounts(statusCounts),
          };
        });
        const rootStatus = calculateStatusFromArray(stems);
        state.rootNode = { ...rootNode, automatableStatus: rootStatus };
        state.stemNodes = stems;
        state.leafNodes = leafs;
        state.loading = false;
      })
      .addCase(getTree.rejected, (state, action) => {
        state.errorMsg = action.error.message;
        state.loading = false;
      });
  },
});

export const { setRootStatus, updateStemStatus } = treeSlice.actions;
export default treeSlice.reducer;
