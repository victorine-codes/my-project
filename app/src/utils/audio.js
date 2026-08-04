import { Audio } from 'expo-av';

let soundObject = null;

export const playReminderSound = async () => {
  try {
    if (soundObject) {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/alarm.mp3'),
      { shouldPlay: true, isLooping: false }
    );

    soundObject = sound;
    await sound.playAsync();
  } catch (error) {
    console.log('Reminder sound error:', error);
  }
};

export const stopReminderSound = async () => {
  try {
    if (soundObject) {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      soundObject = null;
    }
  } catch (error) {
    console.log('Stop sound error:', error);
  }
};
