// src/components/Header.jsx
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const Header = ({ toggleNewPostForm, showNewPostForm, setShowNewPostForm }) => {
  const { currentUser, signInWithGoogle, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setShowNewPostForm(false);
      toast.success("Successfully logged out");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Welcome back!");
    } catch (error) {
      console.error("Sign in error", error);
      toast.error("Failed to sign in");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 py-4 backdrop-blur-md transition-all">
      <div className="container mx-auto flex items-center justify-between px-4">
        <h1 className="text-2xl font-black tracking-tight text-indigo-600">
          .blog
        </h1>

        <nav>
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="hidden text-sm font-medium text-slate-600 sm:inline-block">
                Hi, {currentUser.displayName}
              </span>
              <button
                onClick={toggleNewPostForm}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  showNewPostForm
                    ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    : "bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
                }`}
              >
                {showNewPostForm ? "Cancel" : "Write a Post"}
              </button>

              <button
                onClick={handleLogout}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
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
