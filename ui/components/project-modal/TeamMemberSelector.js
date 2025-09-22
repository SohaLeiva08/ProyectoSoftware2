const TeamMemberSelector = ({
        members,
        selectedMembers,
        onSelectionChange,
        onAddNewMember,
      }) => {
        const [terminoBusqueda, setTerminoBusqueda] = useState("");
        const filteredMembers = members.filter(
          (member) =>
            member.name.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            member.role.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );

        const alternarSeleccionIntegrante = (memberId) => {
          onSelectionChange(
            selectedMembers.includes(memberId)
              ? selectedMembers.filter((id) => id !== memberId)
              : [...selectedMembers, memberId]
          );
        };

        return (
          <div className="seleccionarteam">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-700">
                Asignar integrante
              </h3>
              <button
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                onClick={onAddNewMember}
              >
                + Agregar nuevo integrante
              </button>
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Buscar integrante..."
                className="w-full p-2 border rounded-md text-sm"
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
              />
            </div>
            <div className="max-h-40 overflow-y-auto">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center p-2 rounded-md cursor-pointer team-member ${
                      selectedMembers.includes(member.id) ? "bg-blue-100" : ""
                    }`}
                    onClick={() => alternarSeleccionIntegrante(member.id)}
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className={`avatar mr-3 ${
                        selectedMembers.includes(member.id)
                          ? "selected-member"
                          : ""
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => alternarSeleccionIntegrante(member.id)}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </div>
                ))
              ) : (
                <p className="Miembrosnoecnontrado">
                  No se encontraron integrantes
                </p>
              )}
            </div>
            <div className="mt-3">
              <p className="text-xs text-gray-500">
                {selectedMembers.length > 0
                  ? `Se ha seleccionado ${selectedMembers.length} integrante(s) del equipo`
                  : "No se han seleccionado miembros del equipo."}
              </p>
            </div>
          </div>
        );
      };