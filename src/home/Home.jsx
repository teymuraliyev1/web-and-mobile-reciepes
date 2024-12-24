import { Link } from "react-router-dom";
import { GiCookingPot } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
import useFetch from "../hooks/useFetch";

function Home() {
  const {
    data: featuredRecipes,
    loading,
    error,
  } = useFetch(
    "http://localhost:3001/recipes?_limit=3&_sort=updatedAt&_order=desc"
  );

  return (
    <div className="space-y-16">
      <section className="text-center py-12 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl">
        <div className="max-w-3xl mx-auto px-4">
          <GiCookingPot className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Recipe Manager
          </h1>
          <p className="text-lg text-gray-600">
            Your personal cookbook in the digital age. Discover, create, and
            organize your favorite recipes all in one place. Whether you're a
            seasoned chef or just starting your culinary journey, we've got you
            covered.
          </p>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Recipes
        </h2>
        {error && (
          <div className="text-red-500 text-center">
            Error loading recipes: {error}
          </div>
        )}
        {loading ? (
          <div className="text-center">Loading featured recipes...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRecipes?.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{recipe.description}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        recipe.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : recipe.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {recipe.difficulty}
                    </span>
                    <Link
                      to={`/recipes/${recipe.id}`}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      View Recipe →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Projects Section */}
      <section className="py-8 bg-gray-50 rounded-xl">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Previous Projects
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              LinkedIn Data Extraction Extension
            </h3>
            <p className="text-gray-600 mb-4">
              A Chrome extension that helps users extract and organize data from
              LinkedIn profiles. Built with JavaScript and Chrome Extension
              APIs, this tool streamlines the process of gathering professional
              information for recruitment and networking purposes.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername/linkedin-extension"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <FaGithub className="w-5 h-5 mr-2" />
                GitHub Repository
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
