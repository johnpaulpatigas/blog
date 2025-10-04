// src/components/PostList.jsx
import { useEffect, useState } from "react";
import { collection, db, onSnapshot, orderBy, query } from "../firebase";
import PostCard from "./PostCard";

const PostList = () => {
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
      <div className="mx-auto my-12 py-16 text-center text-2xl font-light text-neutral-500">
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto my-8 w-full max-w-2xl rounded-xl border border-red-200 bg-red-50 p-6 text-red-800 shadow-sm">
        <p className="mb-2 text-xl font-bold">Error:</p>
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="mx-auto my-12 py-16 text-center text-2xl font-light text-neutral-500">
        No posts yet! Be the first to publish.
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8">
      <h2 className="mb-10 text-center text-3xl font-bold text-neutral-800">
        Recent Posts
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
