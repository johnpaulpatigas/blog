// src/components/Header.jsx
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { currentUser, signInWithGoogle, logout } = useAuth();

  return (
    <header className="p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold">.blog</h1>
        <nav>
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-lg">Hello, {currentUser.displayName}</span>
              <button
                onClick={logout}
                className="rounded-2xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="rounded-2xl bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
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
