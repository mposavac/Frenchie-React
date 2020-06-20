import { IconsFetchActionTypes, ICONS_FETCHED } from '../../types/actions';

const initialState: Array<string> = [];

const iconReducer = (state = initialState, action: IconsFetchActionTypes) => {
  switch (action.type) {
    case ICONS_FETCHED:
      return [...action.icons];
    default:
      return state;
  }
};

export default iconReducer;
