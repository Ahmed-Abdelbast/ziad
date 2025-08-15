
import React from 'react';

export const getAudioUrlForSurah = (surahNum, reciter) => {
  if (!reciter || !reciter.urlPrefix) return '';
  const paddedSurahNum = String(surahNum).padStart(3, '0');
  return `${reciter.urlPrefix}${paddedSurahNum}.mp3`;
};

export const estimateSeekTimeForAyah = (surah, ayahNumberInSurah) => {
  if (!surah || !surah.ayahs || surah.ayahs.length === 0) return 0;
  
  const ayahIndex = surah.ayahs.findIndex(a => a.numberInSurah === ayahNumberInSurah);
  if (ayahIndex === -1) return 0;

  const totalAyahs = surah.ayahs.length;
  
  // This is a very rough estimation. 
  // A more accurate method would involve knowing the duration of each ayah.
  // For now, we assume each ayah has roughly equal duration within the surah.
  // This will be less accurate for surahs with very long/short ayahs.
  // We also assume an average of 5 seconds per ayah as a fallback if duration isn't known.
  // This part needs an actual audio element's duration to be more precise.
  // The SurahPage component will handle getting the actual duration.
  // Here we just provide a proportional estimate.
  
  // A simple proportional estimate:
  // (ayahIndex / totalAyahs)
  // This value should be multiplied by the actual audio duration in SurahPage.
  // For now, this function will return the proportion, and SurahPage will calculate.
  // However, the AudioPlayer expects a time, so we'll pass 0 and let SurahPage handle it.
  // The logic for calculating seek time based on audio duration is now in SurahPage.
  // This function can be simplified or removed if not providing a more complex estimation.
  
  // Let's return a proportion that SurahPage can use with the actual duration.
  // This function is now less useful as the logic is better placed in SurahPage
  // where the audio element's duration is available.
  // For simplicity, we'll keep the estimation logic in SurahPage.
  // This function will just return 0, and SurahPage will calculate.
  return 0; // SurahPage will calculate the actual seek time.
};
  