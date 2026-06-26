import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  // Convert rich-text HTML into plain text for the post preview
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const authorName = post.authorName || "Anonymous User";

  return (
    <div className="bg-ink-card p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md font-sans">
      {/* Post header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
            <img
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${authorName}`}
              alt={authorName}
            />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900">{authorName}</p>
            <p className="text-xs text-gray-500 font-medium">{formattedDate}</p>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post cover image */}
      {post.imageUrl && (
        <Link
          to={`/post/${post._id}`}
          className="block w-full h-64 rounded-xl overflow-hidden mb-4 bg-gray-100"
        >
          <img
            src={`http://localhost:5000${post.imageUrl}`}
            alt="Post Cover"
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </Link>
      )}

      {/* Post preview */}
      <Link to={`/post/${post._id}`}>
        <h3 className="font-bold text-xl mb-2 cursor-pointer hover:text-ink-btn transition-colors leading-tight">
          {post.title}
        </h3>
      </Link>

      <p className="text-sm text-gray-600 mb-5 line-clamp-3 leading-relaxed">
        {stripHtml(post.content)}
      </p>

      {/* Post actions */}
      <div className="flex gap-6 text-sm text-gray-500 font-medium border-t border-gray-50 pt-4">
        <button className="flex items-center gap-1.5 hover:text-ink-btn transition-colors">
          <Heart className="w-4 h-4" /> Like
        </button>

        <button className="flex items-center gap-1.5 hover:text-ink-btn transition-colors">
          <MessageCircle className="w-4 h-4" /> Comments
        </button>
      </div>
    </div>
  );
}
