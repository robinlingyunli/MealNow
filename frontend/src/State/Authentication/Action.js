import {
  ADD_TO_FAVORITES_FAILURE,
  ADD_TO_FAVORITES_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";
import { API_URL, api } from "../../config/api";
import axios from "axios";

export const registerUser = (reqData) => async (dispatch) => {
  console.log("resgister request data ",reqData.userData)
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
    if(data.jwt) localStorage.setItem("jwt",data.jwt)
    if(data.role==="ROLE_RESTAURANT_OWNER"){
      reqData.navigate("/admin/restaurant")
    }
    else{
      reqData.navigate("/")
    }
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("catch error ------ ",error)
    dispatch({
      type: REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.data);
    if(data.jwt) localStorage.setItem("jwt",data.jwt)
    if(data.role==="ROLE_RESTAURANT_OWNER"){
      reqData.navigate("/admin/restaurant")
    }
    else{
      reqData.navigate("/")
    }
    
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
  } catch (error) {
    const errorMessage = "Invalid email or password. Please try again.";
    
    dispatch({
      type: LOGIN_FAILURE,
      payload: errorMessage,
    });
  }
};


export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await api.get(`/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      
      dispatch({ type: GET_USER_SUCCESS, payload: user });
      console.log("req User ", user);
    } catch (error) {
      // token 失效或用户不存在，清掉本地 JWT 避免反复报错
      localStorage.removeItem("jwt");
      dispatch({ type: GET_USER_FAILURE, payload: null });
    }
  };
};

export const addToFavorites = ({restaurantId,jwt}) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITES_REQUEST });
    try {
      const { data } = await api.put(`api/restaurants/${restaurantId}/add-favorites`,{},{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Add to favorites ",data)
      dispatch({ type: ADD_TO_FAVORITES_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error ",error)
      dispatch({
        type: ADD_TO_FAVORITES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const saveAddress = ({ jwt, address }) => async (dispatch) => {
  try {
    await api.post("/api/users/addresses", address, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch(getUser(jwt));
  } catch (error) {
    console.log("save address error", error);
  }
};

export const updateAddress = ({ jwt, addressId, address }) => async (dispatch) => {
  try {
    await api.put(`/api/users/addresses/${addressId}`, address, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch(getUser(jwt));
  } catch (error) {
    console.log("update address error", error);
  }
};

export const deleteAddress = ({ jwt, addressId }) => async (dispatch) => {
  try {
    await api.delete(`/api/users/addresses/${addressId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch(getUser(jwt));
  } catch (error) {
    console.log("delete address error", error);
  }
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
  };
};



