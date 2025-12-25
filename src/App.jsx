// src/App.jsx
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./AuthContext";
import Header from "./components/Header";
import NewPostForm from "./components/NewPostForm";
import PostList from "./components/PostList";

function App() {
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const toggleNewPostForm = () => {
    setShowNewPostForm((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AuthProvider>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "#4aed88",
              secondary: "black",
            },
          },
        }}
      />
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header
          toggleNewPostForm={toggleNewPostForm}
          showNewPostForm={showNewPostForm}
          setShowNewPostForm={setShowNewPostForm}
        />
        <main className="container mx-auto flex-grow px-4 py-8">
          {showNewPostForm && (
            <NewPostForm onCancel={() => setShowNewPostForm(false)} />
          )}
          <PostList />
        </main>

        <button
          onClick={scrollToTop}
          className={`fixed right-8 bottom-8 z-40 rounded-full bg-indigo-600 p-3 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl ${
            showScrollTop
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </AuthProvider>
  );
}

export default App;
