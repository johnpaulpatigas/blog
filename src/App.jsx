// src/App.jsx
import { AuthProvider } from "./AuthContext";
import Header from "./components/Header";
import NewPostForm from "./components/NewPostForm";
import PostList from "./components/PostList";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <NewPostForm />
          <PostList />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
