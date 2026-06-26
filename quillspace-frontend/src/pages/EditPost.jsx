import { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Save, Upload, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // References for the editor container and Quill instance
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  // Fetch the existing post and initialize the editor
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);

        if (response.ok) {
          const data = await response.json();

          setTitle(data.title);
          setContent(data.content);

          if (editorRef.current && !quillInstance.current) {
            quillInstance.current = new Quill(editorRef.current, {
              theme: "snow",
              modules: {
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike"],
                  ["blockquote", "code-block"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                  ["clean"],
                ],
              },
            });

            // Populate the editor with the current post content
            quillInstance.current.root.innerHTML = data.content;

            // Keep the editor content synchronized with React state
            quillInstance.current.on("text-change", () => {
              setContent(quillInstance.current.root.innerHTML);
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Submit the updated post to the backend
  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        navigate("/posts");
      }
    } catch (err) {
      console.error("Failed to update post", err);
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
    <div className="p-8 max-w-4xl mx-auto font-sans text-ink-text pb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-serif">Edit Post</h2>

        <Link
          to="/posts"
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-ink-btn transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel
        </Link>
      </div>

      <form onSubmit={handleUpdatePost} className="space-y-6">
        {/* Post title */}
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-4xl font-bold border-none focus:outline-none bg-transparent mb-4"
        />

        {/* Rich text editor */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div ref={editorRef} className="text-base" />
        </div>

        {/* Update actions */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-ink-btn hover:text-opacity-80 font-medium transition-colors">
              <Upload className="w-5 h-5" />
              <span>
                {image ? "New Image Selected" : "Replace Cover Image"}
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2 transition-all shadow-sm"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
