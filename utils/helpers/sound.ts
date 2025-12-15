import { Audio } from "expo-av";

let sound: Audio.Sound | null = null;

export async function playScanSound() {
  if (sound) {
    await sound.unloadAsync();
    sound = null;
  }

  const { sound: newSound } = await Audio.Sound.createAsync(
    require("@/assets/sounds/notification.wav"),
    { shouldPlay: true }
  );

  sound = newSound;
}
