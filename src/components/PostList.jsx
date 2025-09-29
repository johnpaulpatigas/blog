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
      <div className="container mx-auto my-8 p-6 text-center text-lg text-neutral-500">
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto my-8 w-full max-w-2xl rounded-2xl border-l-4 border-red-500 bg-red-100 p-6 text-red-700">
        <p className="font-bold">Error:</p>
        <p>{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="container mx-auto my-8 p-6 text-center text-xl text-neutral-500">
        No posts yet! Be the first to publish.
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8">
      <h2 className="mb-8 text-center text-3xl font-bold">Recent Posts</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
