// src/components/PostCard.jsx
import toast from "react-hot-toast";
import { db, deleteDoc, doc } from "../firebase";
import { useAuth } from "../hooks/useAuth";

const PostCard = ({ post }) => {
  const { currentUser } = useAuth();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "posts", post.id));
        toast.success("Post deleted successfully!");
      } catch (error) {
        console.error("Error deleting document: ", error);
        toast.error("Failed to delete post.");
      }
    }
  };

  const formattedDate = post.createdAt?.toDate
    ? post.createdAt.toDate().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : "Date N/A";

  const authorInitial = post.authorName
    ? post.authorName.charAt(0).toUpperCase()
    : "?";

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-100/50">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 ring-2 ring-white">
              {authorInitial}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {post.authorName}
              </p>
              <p
                className="text-xs text-slate-500"
                title={
                  post.createdAt?.toDate
                    ? post.createdAt.toDate().toLocaleString()
                    : ""
                }
              >
                {formattedDate}
              </p>
            </div>
          </div>
          {currentUser && currentUser.uid === post.authorId && (
            <button
              onClick={handleDelete}
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
              aria-label="Delete post"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
        <p className="text-base leading-relaxed whitespace-pre-wrap text-slate-700">
          {post.content}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
    </div>
  );
};

export default PostCard;
