import { api } from "../../../config/api";

export const GET_PROMOTIONS_SUCCESS = "GET_PROMOTIONS_SUCCESS";
export const CREATE_PROMOTION_SUCCESS = "CREATE_PROMOTION_SUCCESS";
export const UPDATE_PROMOTION_SUCCESS = "UPDATE_PROMOTION_SUCCESS";
export const DELETE_PROMOTION_SUCCESS = "DELETE_PROMOTION_SUCCESS";
export const PROMOTION_REQUEST = "PROMOTION_REQUEST";
export const PROMOTION_FAILURE = "PROMOTION_FAILURE";

export const getPromotionsByRestaurant = ({ jwt, restaurantId }) => async (dispatch) => {
  dispatch({ type: PROMOTION_REQUEST });
  try {
    const { data } = await api.get(`/api/admin/promotions/restaurant/${restaurantId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: GET_PROMOTIONS_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: PROMOTION_FAILURE, payload: e.message });
  }
};

export const createPromotion = ({ jwt, restaurantId, data }) => async (dispatch) => {
  dispatch({ type: PROMOTION_REQUEST });
  try {
    const res = await api.post(`/api/admin/promotions/restaurant/${restaurantId}`, data, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: CREATE_PROMOTION_SUCCESS, payload: res.data });
    return { success: true };
  } catch (e) {
    dispatch({ type: PROMOTION_FAILURE, payload: e.message });
    return { success: false, error: e.response?.data || e.message };
  }
};

export const updatePromotion = ({ jwt, promotionId, data }) => async (dispatch) => {
  dispatch({ type: PROMOTION_REQUEST });
  try {
    const res = await api.put(`/api/admin/promotions/${promotionId}`, data, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: UPDATE_PROMOTION_SUCCESS, payload: res.data });
    return { success: true };
  } catch (e) {
    dispatch({ type: PROMOTION_FAILURE, payload: e.message });
    return { success: false };
  }
};

export const deletePromotion = ({ jwt, promotionId }) => async (dispatch) => {
  dispatch({ type: PROMOTION_REQUEST });
  try {
    await api.delete(`/api/admin/promotions/${promotionId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: DELETE_PROMOTION_SUCCESS, payload: promotionId });
  } catch (e) {
    dispatch({ type: PROMOTION_FAILURE, payload: e.message });
  }
};
