import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  ExternalLink,
  Edit3,
  Loader2,
  FileText,
  Calendar,
  AlertTriangle,
  X,
} from "lucide-react";

export default function Posts() {
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    postId: null,
  });

  const loggedInUser = JSON.parse(localStorage.getItem("QuillSpace_user"));

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
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyPosts();
  }, [loggedInUser?.name]);

  const confirmDelete = async () => {
    if (!deleteModal.postId) return;

    setIsDeleting(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${deleteModal.postId}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setMyPosts((prev) =>
          prev.filter((post) => post._id !== deleteModal.postId),
        );
        setDeleteModal({ isOpen: false, postId: null });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center pt-32">
        <Loader2 className="w-8 h-8 animate-spin text-ink-btn" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-8 text-ink-text dark:text-white transition-colors duration-300">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold font-serif">My Posts</h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Manage everything you've published.
            </p>
          </div>

          <Link
            to="/create"
            className="bg-ink-btn text-white px-6 py-3 rounded-xl font-semibold shadow-sm hover:opacity-90 transition-all"
          >
            Write New Post
          </Link>
        </div>

        {myPosts.length === 0 ? (
          <div className="bg-white dark:bg-ink-dark-card border border-dashed border-gray-300 dark:border-ink-dark-border rounded-3xl py-24 text-center shadow-sm dark:shadow-black/30">
            <div className="w-20 h-20 rounded-full bg-ink-bg dark:bg-ink-dark-sidebar flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-ink-btn" />
            </div>

            <h2 className="text-2xl font-bold mb-3">No Posts Yet</h2>

            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Start writing your first article and build your audience.
            </p>

            <Link
              to="/create"
              className="bg-ink-btn text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
            >
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {myPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white dark:bg-ink-dark-card border border-gray-200 dark:border-ink-dark-border rounded-3xl overflow-hidden shadow-sm dark:shadow-black/30 hover:shadow-lg transition-all duration-300"
              >
                {post.imageUrl && (
                  <Link to={`/post/${post._id}`}>
                    <img
                      src={`http://localhost:5000${post.imageUrl}`}
                      alt={post.title}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                )}

                <div className="p-8">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Calendar className="w-4 h-4" />

                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  <Link to={`/post/${post._id}`}>
                    <h2 className="text-3xl font-serif font-bold hover:text-ink-btn transition-colors mb-4">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-gray-600 dark:text-gray-400 leading-8 line-clamp-3 mb-8">
                    {stripHtml(post.content)}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/post/${post._id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ink-bg dark:bg-ink-dark-sidebar text-ink-text dark:text-white hover:bg-ink-sidebar dark:hover:bg-[#313943] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </Link>

                    <Link
                      to={`/edit/${post._id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        setDeleteModal({ isOpen: true, postId: post._id })
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-ink-dark-card rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 dark:border-ink-dark-border transform transition-all">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-ink-dark-border">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-lg">Delete Post</h3>
              </div>
              <button
                onClick={() => setDeleteModal({ isOpen: false, postId: null })}
                disabled={isDeleting}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Are you sure you want to delete this post? Once removed from
                InkWell, it{" "}
                <span className="font-bold underline decoration-red-500">
                  cannot be recovered
                </span>
                .
              </p>

              {/* Modal Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end mt-2">
                <button
                  onClick={() =>
                    setDeleteModal({ isOpen: false, postId: null })
                  }
                  disabled={isDeleting}
                  className="px-5 py-2.5 rounded-lg font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="px-5 py-2.5 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Yes, Delete Post
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
