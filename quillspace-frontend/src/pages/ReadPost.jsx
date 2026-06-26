import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Loader2 } from "lucide-react";

export default function ReadPost() {
  // Retrieve the post ID from the route parameters
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the selected post when the component loads
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
      <div className="p-8 text-center text-xl font-bold">Post not found.</div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const authorName = post.authorName || "Anonymous User";

  return (
    <article className="p-8 max-w-3xl font-sans text-ink-text pb-20">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-ink-btn mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Feed
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
        {post.title}
      </h1>

      {/* Post metadata */}
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
        <img
          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${authorName}`}
          alt={authorName}
          className="w-12 h-12 rounded-full bg-gray-200"
        />

        <div>
          <p className="font-bold text-gray-900">{authorName}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>

      {/* Cover image */}
      {post.imageUrl && (
        <img
          src={`http://localhost:5000${post.imageUrl}`}
          alt="Cover"
          className="w-full rounded-2xl mb-10 object-cover max-h-125"
        />
      )}

      {/* Render the rich-text content */}
      <div
        className="prose prose-lg max-w-none prose-img:rounded-xl prose-a:text-ink-btn"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Post actions */}
      <div className="flex gap-6 mt-12 pt-6 border-t border-gray-200 text-gray-500 font-medium">
        <button className="flex items-center gap-2 hover:text-ink-btn transition-colors">
          <Heart className="w-5 h-5" /> Like
        </button>

        <button className="flex items-center gap-2 hover:text-ink-btn transition-colors">
          <MessageCircle className="w-5 h-5" /> Comment
        </button>
      </div>
    </article>
  );
}
