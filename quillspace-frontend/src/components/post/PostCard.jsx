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
    <article className="bg-ink-card dark:bg-ink-dark-card rounded-2xl border border-gray-200 dark:border-ink-dark-border shadow-sm dark:shadow-black/30 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 font-sans">
      {/* Header */}
      <div className="flex justify-between items-start p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-ink-dark-sidebar border border-gray-200 dark:border-ink-dark-border">
            <img
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${authorName}`}
              alt={authorName}
              className="w-full h-full"
            />
          </div>

          <div>
            <p className="font-semibold text-sm text-ink-text dark:text-white">
              {authorName}
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formattedDate}
            </p>
          </div>
        </div>

        <button className="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-[#313943] hover:text-gray-600 dark:hover:text-white transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Cover Image */}
      {post.imageUrl && (
        <Link
          to={`/post/${post._id}`}
          className="block mx-6 mb-5 rounded-xl overflow-hidden"
        >
          <img
            src={`http://localhost:5000${post.imageUrl}`}
            alt="Post Cover"
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
      )}

      {/* Content */}
      <div className="px-6 pb-5">
        <Link to={`/post/${post._id}`}>
          <h3 className="text-2xl font-bold font-serif text-ink-text dark:text-white hover:text-ink-btn transition-colors leading-tight mb-3">
            {post.title}
          </h3>
        </Link>

        <p className="text-sm leading-7 text-gray-600 dark:text-gray-400 line-clamp-3">
          {stripHtml(post.content)}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-8 px-6 py-4 border-t border-gray-100 dark:border-ink-dark-border">
        <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors">
          <Heart className="w-4 h-4" />
          Like
        </button>

        <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-ink-btn transition-colors">
          <MessageCircle className="w-4 h-4" />
          Comments
        </button>
      </div>
    </article>
  );
}
