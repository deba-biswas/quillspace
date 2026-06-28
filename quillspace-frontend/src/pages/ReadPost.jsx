import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Loader2,
  Calendar,
} from "lucide-react";

export default function ReadPost() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);

        if (response.ok) {
          const data = await response.json();
          setPost(data);
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full pt-32">
        <Loader2 className="w-8 h-8 animate-spin text-ink-btn" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold text-gray-500 dark:text-gray-400">
        Post not found.
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const authorName = post.authorName || "Anonymous User";

  return (
    <article className="max-w-4xl mx-auto px-8 py-10 font-sans text-ink-text dark:text-white transition-colors duration-300">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-ink-btn mb-10 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Feed
      </Link>

      {/* Title */}
      <h1 className="font-serif text-5xl font-bold leading-tight mb-8">
        {post.title}
      </h1>

      {/* Author */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-ink-dark-border pb-8 mb-10">
        <div className="flex items-center gap-4">
          <img
            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${authorName}`}
            alt={authorName}
            className="w-14 h-14 rounded-full bg-gray-200 dark:bg-ink-dark-sidebar"
          />

          <div>
            <h3 className="font-semibold text-lg">{authorName}</h3>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </div>
          </div>
        </div>
      </div>

      {/* Cover */}
      {post.imageUrl && (
        <img
          src={`http://localhost:5000${post.imageUrl}`}
          alt={post.title}
          className="w-full max-h-[550px] object-cover rounded-3xl shadow-lg mb-12"
        />
      )}

      {/* Article */}
      <div
        className="
          prose
          prose-lg
          max-w-none

          prose-headings:font-serif
          prose-headings:text-ink-text
          dark:prose-headings:text-white

          prose-p:text-gray-700
          dark:prose-p:text-gray-300

          prose-strong:text-ink-text
          dark:prose-strong:text-white

          prose-a:text-ink-btn

          prose-blockquote:border-l-4
          prose-blockquote:border-ink-btn

          prose-img:rounded-2xl

          dark:prose-invert
        "
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer */}
      <div className="flex items-center gap-8 mt-14 pt-8 border-t border-gray-200 dark:border-ink-dark-border">
        <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors">
          <Heart className="w-5 h-5" />
          Like
        </button>

        <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-ink-btn transition-colors">
          <MessageCircle className="w-5 h-5" />
          Comment
        </button>
      </div>
    </article>
  );
}
