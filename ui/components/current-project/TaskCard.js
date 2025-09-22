const TaskCard = ({ issue, setSelectedTaskId, setTaskModalIsOpen, obtenerAccentPrioridad, obtenerClaseChipPrioridad, taskPriorities }) => {
  const isOverdue =
    issue.dueDate &&
    new Date(issue.dueDate) < new Date() &&
    issue.status !== "hecho" &&
    issue.status !== "cancelado";
  const prAccent = `task-accent ${obtenerAccentPrioridad(issue.priority)}`;
  const prChip = obtenerClaseChipPrioridad(issue.priority);
  
  return (
    <div
      key={issue.id}
      data-task-id={issue.id}
      className="task-card-ui p-3"
      data-priority={issue.priority}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", issue.id);
        e.currentTarget.classList.add("dragging");
      }}
      onDragEnd={(e) => {
        e.currentTarget.classList.remove("dragging");
      }}
    >
      <div className={prAccent} />
      <div className="flex items-start justify-between mb-2">
        <h4 className="task-title">{issue.title}</h4>
        <span className={prChip}>
          <span className="priority-text">
            {taskPriorities.find((p) => p.id == issue.priority_id)?.name ||
              "Media"}
          </span>
        </span>
      </div>

      <p className="task-desc mb-3">
        {issue.description || "No hay descripción disponible"}
      </p>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="Nohaydescripcion">{issue.tag}</span>
        <span className="text-xs text-gray-500 mr-2">{issue.date}</span>
        {issue.dueDate && (
          <span
            className={`badge ${isOverdue ? "badge-overdue" : "badge-due"}`}
          >
            {isOverdue ? "Vencida" : "Vence"} ·{" "}
            {new Date(issue.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="Asignado">
        <div className="flex items-center gap-2">
          {issue.assignee && (
            <img src={issue.assignee} alt="Asignado" className="avatar-sm" />
          )}
        </div>
        <div className="Editartareas">
          <button
            className="task-action-btn"
            onClick={() => {
              setSelectedTaskId(issue.id);
              setTaskModalIsOpen(true);
            }}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};
