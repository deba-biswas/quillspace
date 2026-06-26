import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, ExternalLink, Edit3, Loader2, FileText } from "lucide-react";

export default function Posts() {
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Retrieve the currently authenticated user
  const loggedInUser = JSON.parse(localStorage.getItem("QuillSpace_user"));

  // Fetch and display posts created by the logged-in user
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");

        if (response.ok) {
          const data = await response.json();

          const userPosts = data.filter(
            (post) => post.authorName === loggedInUser?.name,
          );

          setMyPosts(userPosts);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyPosts();
  }, [loggedInUser?.name]);

  // Delete a post after user confirmation
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this post? This cannot be undone.",
      )
    )
      return;

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Update the UI without requiring a page refresh
        setMyPosts(myPosts.filter((post) => post._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center pt-32">
        <Loader2 className="w-8 h-8 animate-spin text-ink-btn" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans text-ink-text">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold font-serif">My Posts</h2>

        <Link
          to="/create"
          className="bg-ink-btn text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-colors shadow-sm"
        >
          Write New Post
        </Link>
      </div>

      {myPosts.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />

          <h3 className="text-lg font-bold mb-2">No posts written yet</h3>

          <p className="text-gray-500 text-sm mb-6">
            Your published stories will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Published Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {myPosts.map((post) => (
                <tr
                  key={post._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-medium text-gray-900 max-w-md truncate">
                    {post.title}
                  </td>

                  <td className="p-4 text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  <td className="p-4 flex items-center justify-end gap-2">
                    <Link
                      to={`/post/${post._id}`}
                      className="p-2 text-gray-400 hover:text-ink-btn transition-colors rounded-md hover:bg-white"
                      title="View Post"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    <Link
                      to={`/edit/${post._id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-md hover:bg-white"
                      title="Edit Post"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleDelete(post._id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-white"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
