import {
  GET_REVIEWS_FAILURE, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS,
  CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAILURE,
  UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS, UPDATE_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE,
} from "./review.action";

const initialState = {
  reviews: [],
  average: 0,
  count: 0,
  loading: false,
  error: null,
};

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
    case CREATE_REVIEW_REQUEST:
    case UPDATE_REVIEW_REQUEST:
    case DELETE_REVIEW_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_REVIEWS_SUCCESS:
      return { ...state, loading: false, reviews: action.payload.reviews, average: action.payload.average, count: action.payload.count };

    case CREATE_REVIEW_SUCCESS:
      return { ...state, loading: false, reviews: [action.payload, ...state.reviews], count: state.count + 1 };

    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: state.reviews.map((r) => r.id === action.payload.id ? action.payload : r),
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: state.reviews.filter((r) => r.id !== action.payload),
        count: state.count - 1,
      };

    case GET_REVIEWS_FAILURE:
    case CREATE_REVIEW_FAILURE:
    case UPDATE_REVIEW_FAILURE:
    case DELETE_REVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
