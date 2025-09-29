// src/components/PostCard.jsx
import { useAuth } from "../hooks/useAuth";
import { db, doc, deleteDoc } from "../firebase";

const PostCard = ({ post }) => {
  const { currentUser } = useAuth();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "posts", post.id));
        alert("Post deleted successfully!");
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("Failed to delete post.");
      }
    }
  };

  const formattedDate = post.createdAt?.toDate
    ? post.createdAt.toDate().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Date N/A";

  return (
    <div className="rounded-2xl border-b-4 border-blue-500 bg-white p-6 shadow-md transition hover:shadow-lg">
      <p className="mb-4 break-words">{post.content}</p>
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <span>
          By{" "}
          <span className="font-semibold text-blue-600">{post.authorName}</span>{" "}
          on {formattedDate}
        </span>
        {currentUser && currentUser.uid === post.authorId && (
          <button
            onClick={handleDelete}
            className="rounded-2xl border border-red-400 px-3 py-1 font-semibold text-red-500 transition hover:border-red-700 hover:text-red-700"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
