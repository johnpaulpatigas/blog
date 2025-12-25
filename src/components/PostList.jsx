// src/components/PostList.jsx
import { useEffect, useState } from "react";
import { collection, db, onSnapshot, orderBy, query } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import PostCard from "./PostCard";

const PostSkeleton = () => (
  <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  </div>
);

const PostList = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to fetch posts: ", err);
        setError("Failed to load posts. Please try again later.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-4">
          <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
          <div className="h-5 w-16 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto my-8 max-w-lg rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-bold text-red-800">
          Connection Error
        </h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 rounded-full bg-slate-100 p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-10 text-slate-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800">No posts yet</h3>
        <p className="mt-2 mb-6 max-w-sm text-slate-500">
          It looks like there are no stories shared yet.{" "}
          {currentUser
            ? "Why not be the first one to share something?"
            : "Sign in to be the first to share something!"}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Latest Stories</h2>
        <span className="text-sm font-medium text-slate-500">
          {posts.length} posts
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="animate-fade-in"
            style={{
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
