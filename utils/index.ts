import { format, addMinutes } from "date-fns";
import Hashids from "hashids";

import { ThemeType } from "@interfaces/index";

export const addTime = (minutes: number) => new Date(Date.now() + minutes * 60000);

export const getDefaultProfileImg = (username: string) => {
  return `https://avatars.dicebear.com/api/initials/${encodeURIComponent(username)}.svg`;
};

export const sleep = (t: number) => new Promise(r => setTimeout(r, t));

export const formatDate = (
  date = new Date(),
  formatVal = "yyyy-MM-dd"
) => format(date, formatVal);

export const changeTheme = (
  theme: ThemeType,
  setTheme: (newTheme: ThemeType) => void
) => {
  setTheme(theme);
  localStorage.setItem("theme", theme);
};

export const converToUtc = (date: Date) => {
  const utcDate = addMinutes(date, date.getTimezoneOffset());
  return utcDate;
};

export const converToLocal = (date: Date) => {
  const localDate = addMinutes(date, -1 * date.getTimezoneOffset());
  return localDate;
};

export const copyToClipboard = async (text: string) => {
  try {
    await window.navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
};

export const generateHash = (salt: string, randomInt: number) => {
  const hashids = new Hashids(salt, Number(process.env.HASH_LENGTH || 7));
  return hashids.encode(randomInt);
};
