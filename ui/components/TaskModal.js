const TaskModal = ({
  taskId,
  tags,
  taskStatuses,
  taskPriorities,
  onClose,
  taskModalIsOpen,
  integrantes,
  projectId,
  usuarioActual,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  const loadTaskById = async () => {
    const task = await window.getTaskById(taskId);

    if (!task) return;

    setTitle(task.title);
    setDescription(task.description);
    setSelectedTag(task.tag_id);
    setStatus(task.status_id);
    setPriority(task.priority_id);
  };

  useEffect(() => {
    if (taskId) {
      loadTaskById();
    }

    if (!taskId) {
      setTitle("");
      setDescription("");
      setSelectedTag(tags?.[0]?.id ?? "");
      setAssignee("");
      setStatus(taskStatuses?.[0]?.id ?? "");
      setPriority(taskPriorities?.[0]?.id ?? "");
      setDueDate("");
    }
  }, [taskId, taskModalIsOpen]);

  const guardarTarea = async () => {
    setIsLoading(true);

    if (!taskId) {
      const taskData = await window.createTask({
        title,
        description,
        tag_id: selectedTag,
        status_id: status,
        priority_id: priority,
        project_id: projectId,
      });

      setIsLoading(false);
      onClose();
    }

    if( taskId ) {
      const taskData = await window.updateTaskById({
        task: {
          title,
          description,
          tag_id: selectedTag,
          status_id: status,
          priority_id: priority,
          project_id: projectId,
        },
        taskId
      });

      setIsLoading(false);
      onClose();
    }

  };

  const renderButtonText = () => {
    if( isLoading ) return taskId ? "Guardando" : "Creando";

    return taskId ? "Guardar Cambios" : "Crear Tarea";
  }

  if (!taskModalIsOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-container bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {taskId ? "Editar Tarea" : "Crear Nueva Tarea"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título de la tarea
            </label>
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ejem., Corregir error de inicio de sesión"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              rows="3"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción de la tarea..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tag
            </label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              value={selectedTag?.id}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              {tags?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Asignado a
            </label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            >
              <option value="">No asignado</option>
              {integrantes.map((m) => (
                <option key={m.id} value={m.avatar}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {taskStatuses?.map((taskStatus) => (
                <option key={taskStatus.id} value={taskStatus.id}>
                  {taskStatus.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prioridad
            </label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {taskPriorities?.map((taskPriority) => (
                <option key={taskPriority.id} value={taskPriority.id}>
                  {taskPriority.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha límite
            </label>
            <input
              type="date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700"
            onClick={guardarTarea}
          >
            {renderButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
};
