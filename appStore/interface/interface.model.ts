import { StaticImageData } from "next/image";

export interface Card {
  el: string;
  id: string;
  maxChar: number;
  name: string;
  value: string;
}
export interface SavedTemplate {
  _id?: string;
  newTemplateId?: string;
  templateImage?: StaticImageData;
  emailTitle: string | null;
  cards: Card[];
  authorId: string;
  isReorderable: boolean;
}
export interface Inpt {
  id: string;
  value: string;
}
export interface LoginField {
  name: string;
  id: string;
  isRequired: string;
  minLength: number;
  maxLength: number;
  type: string;
}
export interface User {
  email: string;
  isAdmin: boolean;
  name: string;
  password: string;
  token: string;
  _id: string;
}
