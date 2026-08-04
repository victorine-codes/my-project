import { Audio } from 'expo-av';

let sound: Audio.Sound | null = null; // ✅ Type added

export async function playAlarm() {
  try {
    const { sound: alarm } = await Audio.Sound.createAsync(
      require('../../assets/sounds/alarm.mp3'),
      {
        shouldPlay: true,
        isLooping: true,
        volume: 1.0,
      }
    );

    sound = alarm;
  } catch (error) {
    console.log(error);
  }
}

export async function stopAlarm() {
  if (sound) {
    await sound.stopAsync();
    await sound.unloadAsync();
    sound = null;
  }
}