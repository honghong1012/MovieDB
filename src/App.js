import Header from "./components/Header/index";
import { Routes, Route } from "react-router-dom";

// Router import
import Home from "./components/Home";
import Favorite from "./components/Favorite";
import Rated from "./components/Rated";
import Login from "./components/Login";
import MovieDetail from "./components/MovieDetail";

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/favorite" element={<Favorite />} />
				<Route path="/rated" element={<Rated />} />
				<Route path="/login" element={<Login />} />
				<Route path="/movies/:movieId" element={<MovieDetail />} />
			</Routes>
		</div>
	);
}

export default App;
