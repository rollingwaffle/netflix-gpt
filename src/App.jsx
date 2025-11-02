import "./App.css";
import AppLayout from "./AppLayout";

import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";


function App() {
 
  return (
    <Provider store={appStore}>
      <AppLayout />
    </Provider>
  );
}

export default App;
