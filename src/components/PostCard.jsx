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
    <div className="rounded-2xl bg-white p-7 shadow-lg transition-all duration-300 hover:shadow-xl">
      <p className="mb-4 text-lg leading-relaxed break-words text-neutral-800">
        {post.content}
      </p>
      <div className="flex items-center justify-between text-sm text-neutral-600">
        <span>
          By{" "}
          <span className="font-semibold text-blue-600">{post.authorName}</span>{" "}
          on {formattedDate}
        </span>
        {currentUser && currentUser.uid === post.authorId && (
          <button
            onClick={handleDelete}
            className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-100 hover:text-red-700"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
