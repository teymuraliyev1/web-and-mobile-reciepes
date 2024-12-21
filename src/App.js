import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Home from "./home/Home";
import DetailedRecipe from "./recipe/detailed-page";
import MainPage from "./recipe/main-page";
import Create from "./recipe/create/create";
import Contact from "./contact/contact";

function App() {
  console.log("App");

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<MainPage />} />
            <Route path="/recipes/create" element={<Create />} />
            <Route path="/recipes/:id" element={<DetailedRecipe />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
