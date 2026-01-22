import "./DashboardHeader.css";
import Icon from "../Icon";
import CreateNewSurveyCard from "./CreateNewSurveyCard";
import LogoutButton from "../LogoutButton";

export default function DashboardHeader({ onCreate, onLogout }) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__inner">
        <div className="dashboard-header__brand">
          <div className="dashboard-header__icon" aria-hidden="true">
            <Icon name="analytics" />
          </div>
          <h2 className="dashboard-header__title">Smart Survey Dashboard</h2>
        </div>

        <div className="dashboard-header__actions">
          <CreateNewSurveyCard onClick={onCreate} />
          <LogoutButton onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
}
