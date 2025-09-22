const Sidebar = ({
  projects,
  barraLateralAbierta,
  setBarraLateralAbierta,
  selectedProjectId,
  setSelectedProjectId,
  setProjectModalIsOpen,
  eliminarProyecto,
  integrantes,
  setMostrarModalAgregarIntegrante,
  quitarIntegrante,
  etiquetaSeleccionada,
  tags,
  setEtiquetaSeleccionada,
}) => {

  return (
    <div
      className={`sidebar fixed md:relative w-64 px-8 py-4 bg-gray-100 border-r overflow-auto md:translate-x-0 ${
        barraLateralAbierta ? "" : "sidebar-mobile-hidden"
      }`}
    >
      <div className="flex justify-between items-center">
        <img
          src="image/LOGO.png"
          width="90"
          height="35"
          className="small-attr"
        />
        <div className="scrumly-text font-oswald text-2xl font-semibold tracking-wide">
          SCRUMLY
        </div>
      </div>

      <nav className="CrearProyecto">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide text-left">
            Proyectos
          </h3>
          <button
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => {
              setProjectModalIsOpen(true);
            }}
          >
            + Crear Proyecto
          </button>
        </div>
        <div className="mt-2 -mx-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`flex justify-between items-center px-3 py-2 rounded-lg ${
                selectedProjectId == project.id
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <button
                className="flex-1 text-left text-sm font-medium text-gray-900"
                onClick={() => {
                  setSelectedProjectId(project.id);
                  setBarraLateralAbierta(false);
                }}
              >
                {project.name}
              </button>
              <div className="flex space-x-1">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProjectId(project.id);
                    setProjectModalIsOpen(true);
                  }}
                >
                  ✏️
                </button>
                <button
                  className="text-gray-500 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    eliminarProyecto(project.id);
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          {[].length === 0 && (
            <div className="px-3 py-2 text-xs text-gray-500 italic">
              Aún no hay proyectos
            </div>
          )}
        </div>
      </nav>

      <nav className="agregarIntegrante">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide text-left">
            Integrantes del Equipo
          </h3>
          <button
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => setMostrarModalAgregarIntegrante(true)}
          >
            + Agregar Integrante
          </button>
        </div>
        <div className="mt-2 -mx-3 max-h-40 overflow-y-auto">
          {integrantes.map((member) => (
            <div
              key={member.id}
              className="flex items-center px-3 py-2 rounded-lg justify-between group hover:bg-gray-100"
            >
              <div className="flex items-center flex-1">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="avatar mr-3"
                />
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {member.role}
                  </p>
                </div>
              </div>
              <button
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                onClick={() => quitarIntegrante(member.id)}
                title="Eliminar integrante"
              >
                🗑️
              </button>
            </div>
          ))}
          {integrantes.length === 0 && (
            <div className="px-3 py-2 text-xs text-gray-500 italic">
              Aún no hay integrantes
            </div>
          )}
        </div>
      </nav>

      <nav className="etiquetasDisponibles">
        <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide text-left">
          Etiquetas
        </h3>
        <div className="mt-2 -mx-3">
          {tags.map((tag) => (
            <button
              key={`sidebar-${ tag.id }`}
              className={`flex justify-between items-center px-3 py-2 rounded-lg w-full text-left ${
                etiquetaSeleccionada === tag.name
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setEtiquetaSeleccionada(
                  etiquetaSeleccionada === tag.name ? null : tag.name
                );
              }}
            >
              <span className="text-sm font-medium text-gray-700">
                {tag.name}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};
