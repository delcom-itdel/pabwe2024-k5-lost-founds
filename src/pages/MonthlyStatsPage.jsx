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
      const totalData = 0; // Ganti sesuai dengan data yang Anda miliki

      const result = await getMonthlyStats(endTime, totalData);
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
      <div className="container w-50 my-5">
        <div className="card">
          <div className="card-header">
            <h3>Monthly Statistics</h3>
          </div>
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="card-body">
              <pre>{JSON.stringify(stats, null, 2)}</pre>{" "}
              {/* Menampilkan JSON terformat */}
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
