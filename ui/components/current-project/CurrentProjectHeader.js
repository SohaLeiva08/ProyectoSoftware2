const CurrentProjectHeader = ({
  currentProject,
  setSelectedProjectId,
  setProjectModalIsOpen,
  vistaActiva,
  setVistaActiva,
  setSelectedTaskId,
  setTaskModalIsOpen,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center py-2 header-actions">
      <div className="flex items-center mb-2 md:mb-0">
        <h2 className="project-title text-xl md:text-2xl font-semibold text-gray-900 leading-tight">
          {currentProject?.name
            ? currentProject.name
            : "No hay proyecto agregado"}
        </h2>
        {currentProject && (
          <button
            className="ml-4 text-sm text-blue-600 hover:text-blue-800"
            onClick={() => {
              setSelectedProjectId(currentProject.id);
              setProjectModalIsOpen(true);
            }}
          >
            Editar
          </button>
        )}
      </div>
      <div className="flex items-center space-x-4 view-toggle">
        <div className="flex bg-gray-100 rounded-md p-1">
          <button
            className={`px-3 py-1 text-sm rounded ${
              vistaActiva === "list" ? "bg-white shadow" : "text-gray-600"
            }`}
            onClick={() => setVistaActiva("list")}
          >
            Vista de Lista
          </button>
          <button
            className={`px-3 py-1 text-sm rounded ${
              vistaActiva === "kanban" ? "bg-white shadow" : "text-gray-600"
            }`}
            onClick={() => setVistaActiva("kanban")}
          >
            Tablero Kanban
          </button>
        </div>
        { currentProject && <button
          className="flex items-center pl-2 pr-4 py-1 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700"
          onClick={() => {
            setTaskModalIsOpen(true);
          }}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M12 7v10m5-5H7"
            />
          </svg>
          <span className="ml-1">Nueva Tarea</span>
        </button> }
      </div>
    </div>
  );
};
