import { api } from "../../../config/api";

export const GET_REVIEWS_REQUEST = "GET_REVIEWS_REQUEST";
export const GET_REVIEWS_SUCCESS = "GET_REVIEWS_SUCCESS";
export const GET_REVIEWS_FAILURE = "GET_REVIEWS_FAILURE";

export const CREATE_REVIEW_REQUEST = "CREATE_REVIEW_REQUEST";
export const CREATE_REVIEW_SUCCESS = "CREATE_REVIEW_SUCCESS";
export const CREATE_REVIEW_FAILURE = "CREATE_REVIEW_FAILURE";

export const UPDATE_REVIEW_REQUEST = "UPDATE_REVIEW_REQUEST";
export const UPDATE_REVIEW_SUCCESS = "UPDATE_REVIEW_SUCCESS";
export const UPDATE_REVIEW_FAILURE = "UPDATE_REVIEW_FAILURE";

export const DELETE_REVIEW_REQUEST = "DELETE_REVIEW_REQUEST";
export const DELETE_REVIEW_SUCCESS = "DELETE_REVIEW_SUCCESS";
export const DELETE_REVIEW_FAILURE = "DELETE_REVIEW_FAILURE";

export const getReviewsByRestaurantId = ({ restaurantId, jwt }) => async (dispatch) => {
  dispatch({ type: GET_REVIEWS_REQUEST });
  try {
    const { data } = await api.get(`/api/restaurants/${restaurantId}/reviews`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    const avg = await api.get(`/api/restaurants/${restaurantId}/reviews/average`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: GET_REVIEWS_SUCCESS, payload: { reviews: data, ...avg.data } });
  } catch (error) {
    dispatch({ type: GET_REVIEWS_FAILURE, payload: error.message });
  }
};

export const createReview = ({ restaurantId, rating, comment, jwt }) => async (dispatch) => {
  dispatch({ type: CREATE_REVIEW_REQUEST });
  try {
    const { data } = await api.post(
      `/api/restaurants/${restaurantId}/reviews`,
      { rating, comment },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_REVIEW_FAILURE, payload: error.message });
  }
};

export const updateReview = ({ restaurantId, reviewId, rating, comment, jwt }) => async (dispatch) => {
  dispatch({ type: UPDATE_REVIEW_REQUEST });
  try {
    const { data } = await api.put(
      `/api/restaurants/${restaurantId}/reviews/${reviewId}`,
      { rating, comment },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_REVIEW_FAILURE, payload: error.message });
  }
};

export const deleteReview = ({ restaurantId, reviewId, jwt }) => async (dispatch) => {
  dispatch({ type: DELETE_REVIEW_REQUEST });
  try {
    await api.delete(`/api/restaurants/${restaurantId}/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: reviewId });
  } catch (error) {
    dispatch({ type: DELETE_REVIEW_FAILURE, payload: error.message });
  }
};
