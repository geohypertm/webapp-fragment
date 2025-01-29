import { Routes, Route, Navigate } from "react-router-dom";
import { CreateFT, UserInfo, Navbar } from "./components";
import fragmentContext from "./ContextApi/context";
import { useState } from "react";

const App = () => {

  const [valueDomins, setValueDomains] = useState(() => {
    const storedDomains = localStorage.getItem("domains");
    return storedDomains ? JSON.parse(storedDomains) : [];
  });
  const [inputValue, setInputValue] = useState("");

  const handleBtn = () => {
    if (inputValue.trim()) {
      const updatedDomains = [...valueDomins, { name: inputValue.trim() }];
      setValueDomains(updatedDomains);
      localStorage.setItem("domains", JSON.stringify(updatedDomains)); // ذخیره مستقیم مقدار جدید
      setInputValue("");
    }
    }
  return (
    <>
      <Navbar />

      <fragmentContext.Provider
        value={{
          valueDomins,
          setValueDomains,
          inputValue,
          setInputValue,
          handlebtn: handleBtn,
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/create" />} />
          <Route path="/create" element={<CreateFT />} />
          <Route path="/userinfo" element={<UserInfo />} />
        </Routes>
      </fragmentContext.Provider>
    </>
  );
};

export default App;
