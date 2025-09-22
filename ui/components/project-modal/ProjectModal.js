const ProjectModal = ({
        projectId,
        onClose,
        
        projectModalIsOpen,
        integrantes,
        onAddNewMember,
        tags,
      }) => {
        const [isLoading, setIsLoading] = useState(false);
        const [name, setName] = useState("");
        const [description, setDescription] = useState("");
        const [selectedTags, setSelectedTags] = useState([]);
        const [assignees, setAssignees] = useState([]);
        const [newTag, setNewTag] = useState("");

        const loadProjectById = async (id) => {

          const project = await window.getProjectById(id);

          if( !project ) return;

          setName( project?.name ?? "" );
          setDescription( project?.description ?? "" );
          setSelectedTags( project?.projects_tags?.map( pt => pt.tags ) ?? [] );
        }

        useEffect(() => {
          if (projectId) {
            loadProjectById(projectId);  
          } else {
            setName("");
            setDescription("");
            setAssignees([]);
          }
        }, [projectId, projectModalIsOpen]);

        const saveProject = async () => {

          setIsLoading(true);
          
          if( !projectId ) {
            
            const projectData = await window.createProject({ name, description });

            console.log( projectData );

            if( !projectData?.id ) return;

            if( (selectedTags?.length ?? 0) < 1 ) return;

            const tagIds = selectedTags.map( tag => tag.id );

            await window.addTagsToProject({ projectId: projectData.id, tagIds });

            setIsLoading(false);
            onClose();

          }

          if( projectId ) {

            const projectUpdatedData = await window.updateProjectById({ id: projectId, name, description });

            console.log( projectUpdatedData );
            setIsLoading(false);
            onClose();

          }
        };

        const agregarEtiqueta = (tagToAdd) => {
          const tagAlreadyExists = selectedTags.some(selectedTag => selectedTag.id == tagToAdd.id);

          if( tagAlreadyExists ) return;

          setSelectedTags((prev) => [...prev, tagToAdd]);
        };

        const quitarEtiqueta = (tagToRemove) => {
          const filteredSelectedTags = selectedTags.filter((tag) => tag.id != tagToRemove.id);
          setSelectedTags(filteredSelectedTags);
        }

        const renderButtonText = () => {
          if( projectId ) {
            return isLoading ? 'Guardando' : 'Guardar Cambios';
          }

          return isLoading ? "Creando proyecto" : 'Crear proyecto';
        }

        if (!projectModalIsOpen) return null;

        return (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-40">
            <div className="modal-container bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                {projectId ? "Editar Proyecto" : "Crear Proyecto"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Proyecto
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ej, Rediseño del sitio web"
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
                    placeholder="Descripción del Proyecto..."
                  />
                </div>
                <div className="md:col-span-2">
                  <TeamMemberSelector
                    members={integrantes}
                    selectedMembers={assignees}
                    onSelectionChange={setAssignees}
                    onAddNewMember={onAddNewMember}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Etiquetas
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedTags.map((selectedTag) => (
                      <span
                        key={`selected-${selectedTag.id}`}
                        className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                      >
                        {selectedTag.name}
                        <button
                          type="button"
                          className="ml-1 text-blue-500 hover:text-blue-700"
                          onClick={() => quitarEtiqueta(selectedTag)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  {/* <div className="flex">
                    <input
                      type="text"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Agregar etiqueta"
                      onKeyPress={(e) => e.key === "Enter" && agregarEtiqueta()}
                    />
                    <button
                      type="button"
                      className="ml-2 px-3 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700"
                      onClick={agregarEtiqueta}
                    >
                      Agregar
                    </button>
                  </div> */}
                  <div className="Tags">
                    <p className="text-xs text-gray-500 mb-1">
                      Etiquetas sugeridas:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {tags
                        .map((tag) => (
                          <button
                            key={`suggested-${ tag.id }`}
                            type="button"
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200"
                            onClick={() => agregarEtiqueta(tag)}
                          >
                            {tag.name}
                          </button>
                        ))}
                    </div>
                  </div>
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
                  onClick={saveProject}
                >
                { renderButtonText() }
                </button>
              </div>
            </div>
          </div>
        );
      };