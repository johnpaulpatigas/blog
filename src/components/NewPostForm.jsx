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
    return null;
  }

  return (
    <div className="mx-auto mt-6 mb-8 w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="mb-8 text-center text-3xl font-bold text-neutral-800">
        Create a New Post
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className="w-full resize-y rounded-xl border border-neutral-300 px-5 py-4 text-lg text-neutral-800 placeholder-neutral-500 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Share your thoughts, insights, or stories..."
            required
            disabled={loading}
          ></textarea>
        </div>
        {error && <p className="text-base font-medium text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-blue-600 px-6 py-3.5 text-lg font-semibold text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default NewPostForm;
