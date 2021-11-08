import { useReducer, useCallback } from 'react';
import combineReducers from 'react-combine-reducers';
import blocks, { initialState as blocksInitialState } from "./blocks";
import dataExport, { initialState as dataExportInitialState } from "./dataExport";
import edition, { initialState as editionInitialState } from "./edition";
import hover, { initialState as hoverInitialState } from "./hover";
import mobilizations, { initialState as mobilizationsInitialState } from "./mobilizations";
import uploader, { initialState as uploaderInitialState } from "./uploader";
import widgets, { initialState as widgetsInitialState } from "./widgets";

import type { StateBlocks } from "./blocks";
import type { StateDataExport } from "./dataExport";
import type { StateEdition } from "./edition";
import type { StateMobilizations } from "./mobilizations";
import type { StateWidgets } from "./widgets";

export interface State {
  blocks: StateBlocks;
  dataExport: StateDataExport;
  edition: StateEdition;
  hover: Record<any, any>;
  mobilizations: StateMobilizations;
  uploader: Record<any, any>;
  widgets: StateWidgets;
}

export const [reducer, initialState] = combineReducers({
  blocks: [blocks, blocksInitialState],
  dataExport: [dataExport, dataExportInitialState],
  edition: [edition, editionInitialState],
  hover: [hover, hoverInitialState],
  mobilizations: [mobilizations, mobilizationsInitialState],
  uploader: [uploader, uploaderInitialState],
  widgets: [widgets, widgetsInitialState]
});