import { useState, useEffect } from "react";
import PostCard from "../components/post/PostCard";
import { Loader2, PenLine } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all published posts when the page loads
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full pt-32">
        <Loader2 className="w-8 h-8 animate-spin text-ink-btn" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans text-ink-text dark:text-white transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 font-serif">Your Feed</h2>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-ink-dark-card rounded-2xl border border-dashed border-gray-300 dark:border-ink-dark-border shadow-sm dark:shadow-black/30 transition-colors duration-300">
          <div className="w-16 h-16 bg-ink-bg dark:bg-ink-dark-sidebar rounded-full flex items-center justify-center mx-auto mb-4 text-ink-btn">
            <PenLine className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-ink-text dark:text-white mb-2">
            No posts yet
          </h3>

          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto text-sm">
            Your feed is looking a little empty. Be the first to share a story
            with the QuillSpace community!
          </p>

          <Link
            to="/create"
            className="inline-flex items-center bg-ink-btn text-white px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-sm dark:shadow-black/30"
          >
            Write a Post
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
