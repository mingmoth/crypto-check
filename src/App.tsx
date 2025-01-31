import { Provider } from "react-redux";
import { store } from "@/store/configureStore";
import DashBoard from "@/components/DashBoard";

function App() {
  return (
    <div className="flex flex-col">
      <div className="p-4 text-2xl font-bold sm:text-3xl sticky top-0 bg-white">
        <div className="">Crypto Check</div>
      </div>
      <Provider store={store}>
        <DashBoard />
      </Provider>
    </div>
  );
}

export default App;
