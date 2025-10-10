// src/components/Header.jsx
import { useAuth } from "../hooks/useAuth";

const Header = ({ toggleNewPostForm, showNewPostForm, setShowNewPostForm }) => {
  const { currentUser, signInWithGoogle, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setShowNewPostForm(false);
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4">
        <h1 className="text-3xl font-extrabold text-blue-600">.blog</h1>
        <nav>
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleNewPostForm}
                className={`rounded-full px-5 py-2 font-semibold transition-all duration-200 ${
                  showNewPostForm
                    ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {showNewPostForm ? "Cancel" : "Create"}
              </button>

              <span className="text-lg font-medium text-neutral-700">
                Hello, {currentUser.displayName}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-red-300 px-5 py-2 font-semibold text-red-600 transition-all duration-200 hover:border-red-400 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="rounded-full bg-blue-600 px-6 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-blue-700"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
