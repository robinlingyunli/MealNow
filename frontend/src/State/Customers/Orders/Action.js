import { api } from "../../../config/api";
import { createOrderFailure, createOrderRequest, createOrderSuccess, getUsersOrdersFailure, getUsersOrdersRequest, getUsersOrdersSuccess } from "./ActionCreators";
import { DELETE_ORDER_FAILURE, DELETE_ORDER_SUCCESS, GET_USERS_NOTIFICATION_FAILURE, GET_USERS_NOTIFICATION_SUCCESS } from "./ActionTypes";


export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      const {data} = await api.post('/api/order', reqData.order,{
        headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
      });
      if(data.payment_url){
        window.location.href=data.payment_url;
      }
      console.log("created order data",data)
      dispatch(createOrderSuccess(data));
    } catch (error) {
      console.log("error ",error)
      dispatch(createOrderFailure(error));
    }
  };
};


export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch(getUsersOrdersRequest());
    try {
      const {data} = await api.get(`/api/order/user`,{
        headers: {
            Authorization: `Bearer ${jwt}`,
          },
      });
      console.log("users order ",data)
      dispatch(getUsersOrdersSuccess(data));
    } catch (error) {
      dispatch(getUsersOrdersFailure(error));
    }
  };
};


export const deleteOrderAction = (orderId, jwt) => async (dispatch) => {
  try {
    await api.delete(`/api/order/${orderId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: orderId });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
  }
};

export const getUsersNotificationAction = () => {
  return async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      const {data} = await api.get('/api/notifications');
     
      console.log("all notifications ",data)
      dispatch({type:GET_USERS_NOTIFICATION_SUCCESS,payload:data});
    } catch (error) {
      console.log("error ",error)
      dispatch({type:GET_USERS_NOTIFICATION_FAILURE,payload:error});
    }
  };
};
