import { atom } from "jotai";

export const isLoggedInAtom = atom<boolean>(false);
export const openLoginModalAtom = atom<boolean>(false);
export const usernameAtom = atom<string>("");
