import { useEffect, useState } from "react";

import ATSScoreCard from "../components/ATSScoreCard";
import API from "../api/api";

import {
  LayoutDashboard,
  FileText,
  Target,
  TrendingUp,
  Briefcase,
} from "lucide-react";

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await API.get(
        "/analysis"
      );

      setReports(data);
    } catch (error) {
      console.log(error);
    }
  };

  const bestATS =
    reports.length > 0
      ? Math.max(
          ...reports.map(
            (report) => report.atsScore
          )
        )
      : 0;

  const averageATS =
    reports.length > 0
      ? Math.round(
          reports.reduce(
            (sum, report) =>
              sum + report.atsScore,
            0
          ) / reports.length
        )
      : 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <LayoutDashboard
            size={36}
            className="text-blue-600"
          />

          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>
        </div>

        <p className="text-slate-500 mt-2">
          Overview of your resume analyses
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <ATSScoreCard
          title="Best ATS Score"
          value={`${bestATS}%`}
          subtitle="Highest score"
          icon={
            <Target className="text-blue-600" />
          }
        />

        <ATSScoreCard
          title="Average ATS"
          value={`${averageATS}%`}
          subtitle="Across all resumes"
          icon={
            <TrendingUp className="text-green-600" />
          }
        />

        <ATSScoreCard
          title="Resumes"
          value={reports.length}
          subtitle="Uploaded resumes"
          icon={
            <FileText className="text-purple-600" />
          }
        />

        <ATSScoreCard
          title="Status"
          value="Active"
          subtitle="Analysis engine"
          icon={
            <Briefcase className="text-orange-600" />
          }
        />
      </div>

      {/* Recent Analyses */}
      <div className="bg-white rounded-3xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-5">
          Recent Analyses
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">
                  Resume File
                </th>

                <th className="text-left py-4">
                  ATS Score
                </th>

                <th className="text-left py-4">
                  Date
                </th>

                <th className="text-left py-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {reports.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-slate-500"
                  >
                    No analyses found
                  </td>
                </tr>
              )}

              {reports.map((report) => (
                <tr
                  key={report._id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="py-4 font-medium">
                    {report.fileName}
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
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}