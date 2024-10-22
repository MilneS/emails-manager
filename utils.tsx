import { LoginField, Template } from "./appStore/interface/interface.model";
import templateImage1 from "./assets/templateImage1.png";
import templateImage2 from "./assets/templateImage2.png";
import templateImage3 from "./assets/templateImage3.png";
import templateImage4 from "./assets/templateImage4.png";

export const templates: Template[] = [
  {
    id: "firstTemplate",
    isReorderable: true,
    templateImage: templateImage1,
    comps: [
      { name: "Headline", el: "h4", maxChar: 10, id: "Headline" },
      { name: "Subject", el: "h6", maxChar: 15, id: "Subject" },
      { name: "Body", el: "body1", maxChar: 30, id: "Body" },
      { name: "Signature", el: "body2", maxChar: 10, id: "Signature" },
    ],
  },
  {
    id: "secondTemplate",
    isReorderable: true,
    templateImage: templateImage2,
    comps: [
      { name: "Subject", el: "h6", maxChar: 15, id: "Subject" },
      { name: "Headline", el: "h4", maxChar: 10, id: "Headline" },
      { name: "Subject", el: "h6", maxChar: 15, id: "Subject2" },
      { name: "Body", el: "body1", maxChar: 30, id: "Body" },
      { name: "Signature", el: "body2", maxChar: 10, id: "Signature" },
    ],
  },
  {
    id: "thirdTemplate",
    isReorderable: true,
    templateImage: templateImage3,
    comps: [
      { name: "Signature", el: "body2", maxChar: 10, id: "Signature" },
      { name: "Headline", el: "h4", maxChar: 10, id: "Headline" },
      { name: "Body", el: "body1", maxChar: 30, id: "Body" },
      { name: "Subject", el: "h6", maxChar: 15, id: "Subject" },
      { name: "Body", el: "body1", maxChar: 30, id: "Body2" },
    ],
  },
  {
    id: "fourthTemplate",
    isReorderable: true,
    templateImage: templateImage4,
    comps: [
      { name: "Headline", el: "h4", maxChar: 10, id: "Headline" },
      { name: "Body", el: "body1", maxChar: 30, id: "Body" },
      { name: "Headline", el: "h4", maxChar: 10, id: "Headline2" },
      { name: "Signature", el: "body2", maxChar: 10, id: "Signature" },
    ],
  },
];

export const loginFields: LoginField[] = [
  {
    name: "Email",
    id: "loginEmail",
    isRequired: "Please enter an email",
    minLength: 8,
    maxLength: 20,
    type: "email",
  },
  {
    name: "Password",
    id: "loginPassword",
    isRequired: "Please enter a password",
    minLength: 8,
    maxLength: 20,
    type: "password",
  },
];
export const registerFields = [
  {
    name: "Email",
    id: "registerEmail",
    isRequired: "Please enter an email",
    minLength: 8,
    maxLength: 20,
    type: "email",
  },
  {
    name: "Password",
    id: "registerPassword",
    isRequired: "Please enter a password",
    minLength: 8,
    maxLength: 20,
    type: "password",
  },
  {
    name: "Confirm password",
    id: "confirmPassword",
    isRequired: "Please confirm your password",
    minLength: 8,
    maxLength: 20,
    type: "password",
  },
];
