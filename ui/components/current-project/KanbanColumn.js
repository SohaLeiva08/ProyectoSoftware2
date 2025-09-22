const KanbanColumn = ({
  taskStatus,
  currentProject,
  moverTarea,
  setSelectedTaskId,
  setTaskModalIsOpen,
  obtenerAccentPrioridad,
  obtenerClaseChipPrioridad,
  taskPriorities,
}) => {
  const tasks =
    currentProject?.tasks?.filter((task) => task.status_id == taskStatus.id) ||
    [];

  return (
    <div
      key={taskStatus.id}
      className="kanban-column rounded-lg p-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("text/plain");
        const task = currentProject?.tasks?.find((t) => t.id == taskId);

        if (task && task.status_id != taskStatus.id) {
          moverTarea(task.id, taskStatus.id);
        }
      }}
    >
      <div className="flex items-center mb-4">
        <span className={`w-3 h-3 rounded-full ${taskStatus.color} mr-2`} />
        <h3 className="font-medium text-gray-700">{taskStatus.name}</h3>
        <span className="ml-2 bg-gray-200 text-gray-700 text-xs font-medium rounded-full px-2 py-1">
          {tasks.length}
        </span>
      </div>

      <div className="SinTareas">
        {tasks.length == 0 ? (
          <div className="text-sm text-gray-400 italic py-2 text-center">
            Sin tareas
          </div>
        ) : (
          tasks?.map((issue) => {
            return (
              <TaskCard
                key={`kanban-${issue.id}`}
                issue={issue}
                setSelectedTaskId={setSelectedTaskId}
                setTaskModalIsOpen={setTaskModalIsOpen}
                obtenerAccentPrioridad={obtenerAccentPrioridad}
                obtenerClaseChipPrioridad={obtenerClaseChipPrioridad}
                taskPriorities={taskPriorities}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
