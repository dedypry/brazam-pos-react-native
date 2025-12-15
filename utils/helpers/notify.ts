import * as Notifications from "expo-notifications";

interface INotify {
  title?: string;
  body?: string;
}
export async function notify({ title = "Notification", body = "" }: INotify) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
    },
    trigger: null, // langsung muncul
  });
}
