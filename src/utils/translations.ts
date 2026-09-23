import { Language } from '@/types';

export const languageOptions: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'mr', label: 'Marathi' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'bn', label: 'Bengali' },
  { value: 'ta', label: 'Tamil' },
  { value: 'te', label: 'Telugu' },
  { value: 'kn', label: 'Kannada' },
];

export const translations: Record<Language, Record<string, string>> = {
  en: { home: 'Home', learning: 'Learning Hub', games: 'Games', settings: 'Settings', dailyChallenge: 'Daily Challenge', voiceOn: 'Voice Assistant on', voiceOff: 'Voice Assistant off', aiAssistant: 'AI Assistant', logout: 'Logout', chooseDifficulty: 'Choose Difficulty', startGame: 'Start Game', playMore: 'Play More Games' },
  hi: { home: 'होम', learning: 'लर्निंग हब', games: 'खेल', settings: 'सेटिंग्स', dailyChallenge: 'दैनिक चुनौती', voiceOn: 'वॉइस सहायक चालू', voiceOff: 'वॉइस सहायक बंद', aiAssistant: 'एआई सहायक', logout: 'लॉग आउट', chooseDifficulty: 'कठिनाई चुनें', startGame: 'खेल शुरू करें', playMore: 'और खेल खेलें' },
  mr: { games: 'खेळ', settings: 'सेटिंग्ज', dailyChallenge: 'दैनिक आव्हान', voiceOn: 'आवाज सहाय्यक सुरू', voiceOff: 'आवाज सहाय्यक बंद', aiAssistant: 'एआय सहाय्यक', logout: 'लॉग आउट', chooseDifficulty: 'अडचण निवडा', startGame: 'खेळ सुरू करा', playMore: 'अधिक खेळ खेळा' },
  gu: { games: 'રમતો', settings: 'સેટિંગ્સ', dailyChallenge: 'દૈનિક પડકાર', voiceOn: 'વૉઇસ સહાયક ચાલુ', voiceOff: 'વૉઇસ સહાયક બંધ', aiAssistant: 'એઆઈ સહાયક', logout: 'લૉગ આઉટ', chooseDifficulty: 'મુશ્કેલી પસંદ કરો', startGame: 'રમત શરૂ કરો', playMore: 'વધુ રમતો રમો' },
  bn: { games: 'গেম', settings: 'সেটিংস', dailyChallenge: 'দৈনিক চ্যালেঞ্জ', voiceOn: 'ভয়েস সহায়ক চালু', voiceOff: 'ভয়েস সহায়ক বন্ধ', aiAssistant: 'এআই সহায়ক', logout: 'লগ আউট', chooseDifficulty: 'কঠিনতা বেছে নিন', startGame: 'খেলা শুরু করুন', playMore: 'আরও গেম খেলুন' },
  ta: { games: 'விளையாட்டுகள்', settings: 'அமைப்புகள்', dailyChallenge: 'தினசரி சவால்', voiceOn: 'குரல் உதவி இயக்கம்', voiceOff: 'குரல் உதவி நிறுத்தம்', aiAssistant: 'AI உதவியாளர்', logout: 'வெளியேறு', chooseDifficulty: 'சிரமத்தைத் தேர்ந்தெடுக்கவும்', startGame: 'விளையாட்டைத் தொடங்கு', playMore: 'மேலும் விளையாடுங்கள்' },
  te: { games: 'ఆటలు', settings: 'సెట్టింగ్‌లు', dailyChallenge: 'రోజువారీ సవాలు', voiceOn: 'వాయిస్ సహాయకుడు ఆన్', voiceOff: 'వాయిస్ సహాయకుడు ఆఫ్', aiAssistant: 'AI సహాయకుడు', logout: 'లాగ్ అవుట్', chooseDifficulty: 'కష్టాన్ని ఎంచుకోండి', startGame: 'ఆట ప్రారంభించండి', playMore: 'మరిన్ని ఆటలు ఆడండి' },
  kn: { games: 'ಆಟಗಳು', settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು', dailyChallenge: 'ದೈನಂದಿನ ಸವಾಲು', voiceOn: 'ಧ್ವನಿ ಸಹಾಯಕ ಆನ್', voiceOff: 'ಧ್ವನಿ ಸಹಾಯಕ ಆಫ್', aiAssistant: 'AI ಸಹಾಯಕ', logout: 'ಲಾಗ್ ಔಟ್', chooseDifficulty: 'ಕಷ್ಟವನ್ನು ಆಯ್ಕೆಮಾಡಿ', startGame: 'ಆಟ ಪ್ರಾರಂಭಿಸಿ', playMore: 'ಇನ್ನಷ್ಟು ಆಟಗಳನ್ನು ಆಡಿ' },
};