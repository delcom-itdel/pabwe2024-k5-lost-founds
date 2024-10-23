import React, { useEffect, useState } from "react";
import { getMonthlyStats } from "../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import Header from "../layouts/header";

function MonthlyStatsPage() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchMonthlyStats();
  }, []);

  const fetchMonthlyStats = async () => {
    try {
      const endTime = new Date().toISOString();
      const totalData = 0;

      const result = await getMonthlyStats(endTime, totalData);
      setStats(result);
      setIsLoading(false);
    } catch (error) {
      Swal.fire("Error", "Gagal memuat statistik bulanan", "error");
      navigate("/"); // Kembali ke halaman utama jika gagal
    }
  };

  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="card shadow-lg">
          <div className="card-header bg-info text-white text-center">
            <h3>Monthly Statistics</h3>
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

export default MonthlyStatsPage;
