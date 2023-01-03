import "./App.scss";
import MainNav from "./components/MainNav/MainNav";
import Chart from "./pages/Chart/Chart";

const App = () => {
  return (
    <div className="app">
      <MainNav />
      <Chart />
    </div>
  );
};

export default App;
