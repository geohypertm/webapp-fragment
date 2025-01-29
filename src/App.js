import {Routes, Route, Navigate} from "react-router-dom";
import { CreateFT, UserInfo, Navbar } from "./components";

const App = () => {
  return (
<>

<Navbar />


<Routes>
  <Route path="/" element={<Navigate to="/create" />} />
  <Route path="/create" element={<CreateFT />}/>
  <Route path="/userinfo" element={<UserInfo />}/>
</Routes>
</>
  );
}

export default App;
