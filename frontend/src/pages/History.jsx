import { useEffect, useState } from "react";
import API from "../api/api";

import {
  History as HistoryIcon,
  FileText,
  Trash2,
} from "lucide-react";

export default function History() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/analysis", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReports(data);
    } catch (error) {
      console.log("History Error:", error);
    }
  };

  const deleteReport = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this analysis?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/analysis/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReports(
        reports.filter((report) => report._id !== id)
      );
    } catch (error) {
      console.log(error);
      alert("Failed to delete analysis");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <HistoryIcon
            size={36}
            className="text-blue-600"
          />

          <h1 className="text-4xl font-bold">
            Analysis History
          </h1>
        </div>

        <p className="text-slate-500 mt-2">
          View all your previously analyzed resumes
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-3xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold">
          Total Analyses
        </h2>

        <p className="text-4xl font-bold text-blue-600 mt-3">
          {reports.length}
        </p>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-3xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-5">
          Uploaded Resumes
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">
                  Resume
                </th>

                <th className="text-left py-4">
                  ATS Score
                </th>

                <th className="text-left py-4">
                  Date
                </th>

                <th className="text-left py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-slate-500"
                  >
                    No analysis history found
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr
                    key={report._id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <FileText
                          className="text-blue-600"
                          size={18}
                        />
                        <span>{report.fileName}</span>
                      </div>
                    </td>

                    <td className="py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        {report.atsScore}%
                      </span>
                    </td>

                    <td className="py-4">
                      {new Date(
                        report.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="py-4">
                      <button
                        onClick={() =>
                          deleteReport(report._id)
                        }
                        className="flex items-center gap-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}