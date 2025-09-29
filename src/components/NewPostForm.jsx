// src/components/NewPostForm.jsx
import { useState } from "react";
import { addDoc, collection, db, serverTimestamp } from "../firebase";
import { useAuth } from "../hooks/useAuth";

const NewPostForm = () => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!currentUser) {
      setError("You must be logged in to create a post.");
      return;
    }
    if (!content.trim()) {
      setError("Content cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "posts"), {
        content,
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        createdAt: serverTimestamp(),
      });
      setContent("");
      alert("Post created successfully!");
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="mx-auto my-6 w-full max-w-2xl rounded-2xl border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700">
        <p className="font-bold">Login Required</p>
        <p>Please sign in to create new blog posts.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 w-full max-w-2xl rounded-2xl p-6 shadow-md">
      <h2 className="mb-6 text-center text-3xl font-bold">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className="w-full resize-y rounded-2xl border border-neutral-200 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Write your blog post content here..."
            required
            disabled={loading}
          ></textarea>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-2xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Posting..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default NewPostForm;
