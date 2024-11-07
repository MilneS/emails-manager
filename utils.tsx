import {
  LoginField,
  SavedTemplate,
} from "./appStore/interface/interface.model";
import templateImage1 from "./assets/templateImage1.png";
import templateImage2 from "./assets/templateImage2.png";
import templateImage3 from "./assets/templateImage3.png";
import templateImage4 from "./assets/templateImage4.png";

export const templates: SavedTemplate[] = [
  {
    newTemplateId: "firstTemplate",
    authorId: "",
    emailTitle: "",
    isReorderable: true,
    templateImage: templateImage1,
    cards: [
      { name: "Headline", el: "h4", maxChar: 10, id: "Headline", value: "" },
      { name: "Subject", el: "h6", maxChar: 15, id: "Subject", value: "" },
      { name: "Body", el: "body1", maxChar: 30, id: "Body", value: "" },
      {
        name: "Signature",
        el: "body2",
        maxChar: 10,
        id: "Signature",
        value: "",
      },
    ],
  },
  {
    newTemplateId: "secondTemplate",
    authorId: "",
    emailTitle: "",
    isReorderable: true,
    templateImage: templateImage2,
    cards: [
      { name: "Subject", el: "h6", maxChar: 15, id: "Subject", value: "" },
      { name: "Headline", el: "h4", maxChar: 10, id: "Headline", value: "" },
      { name: "Subject", el: "h6", maxChar: 15, id: "Subject2", value: "" },
      { name: "Body", el: "body1", maxChar: 30, id: "Body", value: "" },
      {
        name: "Signature",
        el: "body2",
        maxChar: 10,
        id: "Signature",
        value: "",
      },
    ],
  },
  {
    newTemplateId: "thirdTemplate",
    authorId: "",
    emailTitle: "",
    isReorderable: true,
    templateImage: templateImage3,
    cards: [
      {
        name: "Signature",
        el: "body2",
        maxChar: 10,
        id: "Signature",
        value: "",
      },
      { name: "Headline", el: "h4", maxChar: 10, id: "Headline", value: "" },
      { name: "Body", el: "body1", maxChar: 30, id: "Body", value: "" },
      { name: "Subject", el: "h6", maxChar: 15, id: "Subject", value: "" },
      { name: "Body", el: "body1", maxChar: 30, id: "Body2", value: "" },
    ],
  },
  {
    newTemplateId: "fourthTemplate",
    authorId: "",
    emailTitle: "",
    isReorderable: true,
    templateImage: templateImage4,
    cards: [
      { name: "Headline", el: "h4", maxChar: 10, id: "Headline", value: "" },
      { name: "Body", el: "body1", maxChar: 30, id: "Body", value: "" },
      { name: "Headline", el: "h4", maxChar: 10, id: "Headline2", value: "" },
      {
        name: "Signature",
        el: "body2",
        maxChar: 10,
        id: "Signature",
        value: "",
      },
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
    name: "Name",
    id: "registerName",
    isRequired: "Please enter a name",
    minLength: 2,
    maxLength: 20,
    type: "text",
  },
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
