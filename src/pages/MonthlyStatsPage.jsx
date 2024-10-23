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
            <h3>Statistik Bulanan</h3>
          </div>
          {isLoading ? (
            <p className="text-center my-3">Memuat data...</p>
          ) : (
            <div className="card-body">
              <div className="row">
                {Object.keys(stats).map((key) => (
                  <div className="col-md-4 mb-4" key={key}>
                    <div className="card h-100">
                      <div className="card-body bg-light">
                        <h5 className="card-title text-info text-center">
                          {key.replace(/_/g, ' ').toUpperCase()}
                        </h5>
                        <p className="card-text text-center">
                          {typeof stats[key] === "object" && !Array.isArray(stats[key])
                            ? JSON.stringify(stats[key])
                            : Array.isArray(stats[key])
                            ? stats[key].join(", ")
                            : stats[key]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
