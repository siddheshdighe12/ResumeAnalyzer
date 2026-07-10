import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  UploadCloud,
  FileText,
  X,
} from "lucide-react";

import API from "../api/api";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const removeFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFile(null);
    setPreviewUrl(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("resume", file);

      const { data } = await API.post(
        "/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem(
        "analysis",
        JSON.stringify(data.analysis)
      );

      navigate("/analysis");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to analyze resume."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Upload
            size={36}
            className="text-blue-600"
          />

          <h1 className="text-4xl font-bold text-slate-800">
            Upload Resume
          </h1>
        </div>

        <p className="text-slate-500 mt-2">
          Upload your resume and get AI-powered ATS analysis.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <label
            htmlFor="resume"
            className="border-2 border-dashed border-blue-300 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition"
          >
            <div className="bg-blue-100 p-5 rounded-full mb-5">
              <UploadCloud
                size={55}
                className="text-blue-600"
              />
            </div>

            <h2 className="text-2xl font-semibold">
              Drag & Drop Resume
            </h2>

            <p className="text-slate-500 mt-2">
              or click to browse
            </p>

            <p className="text-sm text-slate-400 mt-2">
              PDF files only
            </p>

            <input
              id="resume"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {file && (
            <div className="mt-8 flex justify-between items-center bg-slate-50 rounded-2xl border p-4">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-xl">
                  <FileText
                    size={30}
                    className="text-red-500"
                  />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {file.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              <button
                onClick={removeFile}
                className="text-red-500 hover:bg-red-100 p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className={`w-full mt-8 py-4 rounded-xl font-semibold transition ${file && !loading
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
              }`}
          >
            {loading
              ? "Analyzing Resume..."
              : "Analyze Resume"}
          </button>
        </div>

        {/* Right Card */}
        <div>
          {file ? (
            <div className="bg-white rounded-3xl shadow-lg p-8 h-full">
              <div className="text-center">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <FileText
                    size={55}
                    className="text-red-500"
                  />
                </div>

                <h2 className="text-2xl font-bold mt-6 break-all">
                  {file.name}
                </h2>

                <p className="text-slate-500 mt-2">
                  {(file.size / 1024).toFixed(2)} KB
                </p>

                <button
                  onClick={() =>
                    window.open(
                      previewUrl,
                      "_blank"
                    )
                  }
                  className="mt-8 w-full bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-xl transition"
                >
                  Open Resume
                </button>

                <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5">
                  <h3 className="text-green-700 font-semibold">
                    ✓ Ready for Analysis
                  </h3>

                  <p className="text-sm text-slate-500 mt-2">
                    Your resume is ready.
                    Click the Analyze Resume button to
                    generate your ATS report.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-lg h-full flex items-center justify-center p-10">
              <div className="text-center">
                <FileText
                  size={70}
                  className="mx-auto text-slate-300"
                />

                <h2 className="text-2xl font-bold mt-5">
                  No Resume Selected
                </h2>

                <p className="text-slate-500 mt-2">
                  Upload a PDF to see its details here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}