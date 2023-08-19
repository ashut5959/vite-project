import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FirstPage from "./components/firstpage";
import SecondPage from "./components/secondpage";
interface AppProps {}


const  App = ({}: AppProps) => {
  const [isFirstPageFilled, setIsFirstPageFilled] = useState(false);
  return (
    <Routes>
      <Route
        path="/"
        
        element={<FirstPage setIsFirstPageFilled={setIsFirstPageFilled} />}
      />
      <Route
        path="/home"
        element={
          isFirstPageFilled ? (
            <SecondPage isFirstPageFilled={isFirstPageFilled} />
          ) : (
            <Navigate to="/"replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
