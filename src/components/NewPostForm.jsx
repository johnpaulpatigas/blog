// src/components/NewPostForm.jsx
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { addDoc, collection, db, serverTimestamp } from "../firebase";
import { useAuth } from "../hooks/useAuth";

const NewPostForm = ({ onCancel }) => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("You must be logged in to create a post.");
      return;
    }
    if (!content.trim()) {
      toast.error("Content cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "posts"), {
        content,
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        authorPhoto: currentUser.photoURL,
        createdAt: serverTimestamp(),
      });
      setContent("");
      toast.success("Post published!");
      if (onCancel) onCancel();
    } catch (err) {
      console.error("Error adding document: ", err);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="animate-fade-in mx-auto mt-8 mb-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-8 py-6">
        <h2 className="text-xl font-bold text-slate-800">Create a New Post</h2>
        <button
          onClick={onCancel}
          className="text-slate-400 transition-colors hover:text-slate-600"
          aria-label="Close form"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-8">
        <div className="relative">
          <textarea
            ref={textareaRef}
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            className="w-full resize-none rounded-xl border-0 bg-slate-50 p-4 text-slate-800 placeholder-slate-400 ring-1 ring-slate-200 transition-all ring-inset focus:bg-white focus:ring-2 focus:ring-indigo-500 sm:text-base sm:leading-6"
            placeholder="What's on your mind?"
            required
            disabled={loading}
          ></textarea>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Publishing...
              </>
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;
