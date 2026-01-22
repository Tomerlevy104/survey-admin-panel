import "./SurveyGrid.css";
import SurveyCard from "./SurveyCard";
import StartNewSurveyCard from "./StartNewSurveyCard";

export default function SurveyGrid({
  surveys,
  onCreate,
  onEdit,
  onDelete,
  onOpenResponses,
}) {
  return (
    <section className="survey-grid">
      {surveys.map((s) => (
        <SurveyCard
          key={s.id}
          survey={s}
          onEdit={() => onEdit(s.id)}
          onDelete={() => onDelete(s.id)}
          onOpen={(survey) => onOpenResponses?.(survey)}
        />
      ))}

      <StartNewSurveyCard onClick={onCreate} />
    </section>
  );
}
