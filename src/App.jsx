// src/App.jsx
import { useState } from "react";
import { AuthProvider } from "./AuthContext";
import Header from "./components/Header";
import NewPostForm from "./components/NewPostForm";
import PostList from "./components/PostList";

function App() {
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const toggleNewPostForm = () => {
    setShowNewPostForm((prev) => !prev);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-neutral-50">
        <Header
          toggleNewPostForm={toggleNewPostForm}
          showNewPostForm={showNewPostForm}
          setShowNewPostForm={setShowNewPostForm}
        />
        <main className="container mx-auto px-4 py-8">
          {showNewPostForm && <NewPostForm />}
          <PostList />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
