import { useState, useEffect } from "react";

function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const markNotificationAsRead = (id) => {
    const newNotifications = notifications.map((notification) => {
      if (notification.id === id) {
        return { ...notification, read: true };
      }
      return notification;
    });
    setNotifications(newNotifications);
  };

  return { notifications, markNotificationAsRead };
}

export { useNotifications };
