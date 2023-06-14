import { store } from "../index";

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export const REMOVE_NOTIFICATION_WITH_INDEX = "REMOVE_NOTIFICATION_WITH_INDEX";
export const UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION";
export const REMOVE_ALL_NOTIFICATIONS = "REMOVE_ALL_NOTIFICATIONS";
export const addNotification = (message, type) => {
  const { notifications } = store.getState();
  type = type || "success";
  const newId = Date.now();
  const notification = {
    id: newId,
    message: message,
    type: type,
    status: "new",
  };
  if (notifications.findIndex((o) => o.id === notification.id) > -1) {
    var i = 1;
    while (notifications.findIndex((o) => o.id === notification.id) > -1) {
      notification.id = newId + "-" + i;
      i++;
    }
  }
  return {
    type: ADD_NOTIFICATION,
    notification,
  };
};

export const removeNotification = (notification) => {
  notification.id = notification.id || "" + Date.now();
  return {
    type: REMOVE_NOTIFICATION,
    notification,
  };
};

export const removeNotificationWithIndex = (notification, index) => {
  notification.id = notification.id || "" + Date.now();
  return {
    type: REMOVE_NOTIFICATION_WITH_INDEX,
    notification,
    index,
  };
};

export const updateNotification = (notification) => {
  notification.id = notification.id || "" + Date.now();
  return {
    type: UPDATE_NOTIFICATION,
    notification,
  };
};
export const removeAllNotifications = () => {
  return {
    type: REMOVE_ALL_NOTIFICATIONS,
  };
};
