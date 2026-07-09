import {
  GET_PROMOTIONS_SUCCESS,
  CREATE_PROMOTION_SUCCESS,
  UPDATE_PROMOTION_SUCCESS,
  DELETE_PROMOTION_SUCCESS,
  PROMOTION_REQUEST,
  PROMOTION_FAILURE,
} from "./promotion.action";

const initialState = {
  promotions: [],
  loading: false,
  error: null,
};

export const promotionReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROMOTION_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PROMOTIONS_SUCCESS:
      return { ...state, loading: false, promotions: action.payload };
    case CREATE_PROMOTION_SUCCESS:
      return { ...state, loading: false, promotions: [...state.promotions, action.payload] };
    case UPDATE_PROMOTION_SUCCESS:
      return {
        ...state,
        loading: false,
        promotions: state.promotions.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case DELETE_PROMOTION_SUCCESS:
      return {
        ...state,
        loading: false,
        promotions: state.promotions.filter((p) => p.id !== action.payload),
      };
    case PROMOTION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
