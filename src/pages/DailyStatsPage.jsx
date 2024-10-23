import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDailyStats } from "../services/api";
import { useAuth } from "../App";
import Swal from "sweetalert2";
import Header from "../layouts/header";

function DailyStatsPage() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDailyStats();
  }, []);

  const fetchDailyStats = async () => {
    try {
      const endTime = new Date().toISOString();
      const totalData = 0; 

      const result = await getDailyStats(endTime, totalData);
      setStats(result);
      setIsLoading(false);
    } catch (error) {
      Swal.fire("Error", "Failed to load monthly stats", "error");
      navigate("/"); // Kembali ke halaman utama jika gagal
    }
  };

  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="card shadow-lg">
          <div className="card-header bg-info text-white text-center">
            <h3>Daily Statistics</h3>
          </div>
          {isLoading ? (
            <p className="text-center my-3">Loading...</p>
          ) : (
            <div className="card-body">
             <pre>{JSON.stringify(stats, null, 2)}</pre>
            </div>
          )}
          <div className="card-footer">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyStatsPage;
