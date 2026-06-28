import { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Save, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // References for the editor container and Quill instance
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  // Initialize the rich text editor once after the component mounts
  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Start writing your story...",
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

      // Synchronize editor content with React state
      quillInstance.current.on("text-change", () => {
        setContent(quillInstance.current.root.innerHTML);
      });
    }
  }, []);

  // Submit a new blog post to the backend
  const handleCreatePost = async (e) => {
    e.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem("QuillSpace_user"));

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("authorName", loggedInUser?.name || "Unknown Author");

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.error("Failed to save post", err);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans text-ink-text dark:text-white transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 font-serif">Create New Post</h2>

      <form onSubmit={handleCreatePost} className="space-y-6">
        {/* Post title */}
        <input
          type="text"
          required
          placeholder="Title of your story..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-4xl font-bold placeholder-gray-300 dark:placeholder-gray-500 border-none focus:outline-none bg-transparent text-ink-text dark:text-white mb-4"
        />

        {/* Rich text editor */}
        <div className="bg-white dark:bg-ink-dark-card rounded-lg overflow-hidden border border-gray-200 dark:border-ink-dark-border transition-colors duration-300">
          <div ref={editorRef} className="text-base" />
        </div>

        {/* Post actions */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-ink-dark-border">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-ink-btn hover:opacity-80 font-medium transition-colors">
              <Upload className="w-5 h-5" />
              <span>{image ? "Change Cover Image" : "Add Cover Image"}</span>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
            </label>

            {image && (
              <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-50">
                {image.name}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-ink-btn text-white px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 flex items-center gap-2 transition-all duration-300 shadow-sm dark:shadow-black/30"
          >
            <Save className="w-4 h-4" />
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
}
