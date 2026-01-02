import { createContext } from "react";


export const MessageContext = createContext({})

export const initState = {
    type:"",
    title:"",
    content:""
}

export const messageReducer = (state, action) => {
    switch (action.type) {
        case "POST_MSG":
            return {
                ...action.payload
            }

        case "CLEAR_MSG":
            return {
                ...initState
            }
            
    
        default:
            return state;
    }
}

export function ToastMessage(dispatch, res) {
  dispatch({
    type: "POST_MSG",
    payload: {
      type: "success",
      title: '更新成功',
      content: res.data.message
    }
  });
  setTimeout(() => {
    dispatch({
    type: "CLEAR_MSG",
  });
  }, 2000);
}

export function ToastFailMessage(dispatch, error) {
  dispatch({
    type: "POST_MSG",
    payload: {
      type: "danger",
      title: '失敗',
      content: Array.isArray(error?.response?.data?.message) ? error?.response?.data?.message.join("、") : error?.response?.data?.message
    }
  });
  setTimeout(() => {
    dispatch({
    type: "CLEAR_MSG",
  });
  }, 2000);
}