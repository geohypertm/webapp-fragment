import { createContext } from "react";

const fragmentContext = createContext({
  valueDomins: {},
  setValueDomains: () => {},
  inputValue: "",
  setInputValue: () => {},
  handlebtn: () => {},
});

export default fragmentContext;
