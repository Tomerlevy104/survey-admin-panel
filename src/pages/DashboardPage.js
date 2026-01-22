import DashboardHeader from "../components/dashboard/DashboardHeader";
import SurveyGrid from "../components/dashboard/SurveyGrid";
import { fetchSurveys, deleteSurvey } from "../api/surveyApi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./DashboardPage.css";

export default function DashboardPage() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  ////////////////////////////////////////////////////////////////////////////////////////
  // Load Surveys
  useEffect(() => {
    async function loadSurveys() {
      setError(null);
      setLoading(true);

      try {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) throw new Error("Not authenticated. Please login again.");

        const data = await fetchSurveys(jwt);
        setSurveys(data);
        console.log("Fetched surveys:", data);
      } catch (err) {
        setError(err.message || "Failed to load surveys");
      } finally {
        setLoading(false);
      }
    }

    loadSurveys();
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////
  // Navigate to Create new survey
  function handleCreateSurvey() {
    console.log("Create New Survey");
    navigate("/surveys/new");
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // Navigate to Edit survey
  function handleEditSurvey(id) {
    console.log("Edit survey:", id);
    navigate(`/surveys/${id}/edit`);
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // Delete survey
  async function handleDeleteSurvey(id) {
    console.log("Delete survey:", id);
    setError(null);
    setLoading(true);
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) throw new Error("Not authenticated. Please login again.");
      const deleted = await deleteSurvey(jwt, id);
      if (deleted) {
        setSurveys((prevSurveys) => prevSurveys.filter((s) => s.id !== id));
      }
    } catch (err) {
      setError(err.message || "Failed to delete survey");
    } finally {
      setLoading(false);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // handle Logout
  function handleLogout() {
    localStorage.removeItem("jwt");
    navigate("/login");
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  // Handle open Survey Responses
  function handleOpenSurveyResponses(survey) {
    navigate(`/surveys/${survey.id}/responses`, {
      state: { surveyTitle: survey.title },
    });
  }
  ///////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="dashboard-page">
      <DashboardHeader onCreate={handleCreateSurvey} onLogout={handleLogout} />

      <main className="dashboard-main">
        <div className="dashboard-top-row">
          <h1 className="dashboard-title">All Surveys</h1>
          <span className="dashboard-chip">{surveys.length} Total</span>
        </div>

        <SurveyGrid
          surveys={surveys}
          onCreate={handleCreateSurvey}
          onEdit={handleEditSurvey}
          onDelete={handleDeleteSurvey}
          onOpenResponses={handleOpenSurveyResponses}
        />
      </main>
    </div>
  );
}
