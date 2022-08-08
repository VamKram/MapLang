import * as fs from "fs";
import {DIGITS} from "../Constant";

export const getContent = (path: string) => fs.readFileSync(path, {encoding: 'utf-8'})
export function isInKeyWordList(cur: string) {
  return false;
}
export function isDigits(cur: string) {
  return DIGITS.includes(Number(cur));
}

