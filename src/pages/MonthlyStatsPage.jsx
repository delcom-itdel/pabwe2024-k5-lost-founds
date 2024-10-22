import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMonthlyStats } from "../services/api";
import { useAuth } from "../App";
import Swal from "sweetalert2";

function MonthlyStatsPage() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMonthlyStats();
  }, []);

  const fetchMonthlyStats = async () => {
    try {
      const endTime = new Date().toISOString();
      const totalData = 0; // Ganti ini dengan jumlah data yang sesuai jika perlu

      const result = await getMonthlyStats(endTime, totalData);
      setStats(result);
      setIsLoading(false);
    } catch (error) {
      Swal.fire("Error", "Failed to load monthly stats", "error");
      navigate("/"); // Kembali ke halaman utama jika gagal
    }
  };

  return (
    <div className="container w-50 my-5">
      <div className="card">
        <div className="card-header">
          <h3>Monthly Statistics</h3>
        </div>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="card-body">
            <h3>Monthly Statistics</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Stats Losts</td>
                  <td>
                    {stats.stats_losts.length > 0
                      ? stats.stats_losts.join(", ")
                      : "No data"}
                  </td>
                </tr>
                <tr>
                  <td>Stats Losts Completed</td>
                  <td>
                    {stats.stats_losts_completed.length > 0
                      ? stats.stats_losts_completed.join(", ")
                      : "No data"}
                  </td>
                </tr>
                <tr>
                  <td>Stats Losts In Process</td>
                  <td>
                    {stats.stats_losts_process.length > 0
                      ? stats.stats_losts_process.join(", ")
                      : "No data"}
                  </td>
                </tr>
                <tr>
                  <td>Stats Founds</td>
                  <td>
                    {stats.stats_founds.length > 0
                      ? stats.stats_founds.join(", ")
                      : "No data"}
                  </td>
                </tr>
                <tr>
                  <td>Stats Founds Completed</td>
                  <td>
                    {stats.stats_founds_completed.length > 0
                      ? stats.stats_founds_completed.join(", ")
                      : "No data"}
                  </td>
                </tr>
                <tr>
                  <td>Stats Founds In Process</td>
                  <td>
                    {stats.stats_founds_process.length > 0
                      ? stats.stats_founds_process.join(", ")
                      : "No data"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <div className="card-footer">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default MonthlyStatsPage;
