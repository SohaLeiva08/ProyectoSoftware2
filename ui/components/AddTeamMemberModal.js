const AddTeamMemberModal = ({ onClose, onSave, isOpen }) => {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [role, setRole] = useState(rolesDisponibles[0]);

        const resetForm = () => {
          setName("");
          setEmail("");
          setRole(rolesDisponibles[0]);
        };
        useEffect(() => {
          if (isOpen) resetForm();
        }, [isOpen]);

        const agregarIntegranteManual = () => {
          if (!name.trim() || !email.trim()) return;

          const member = {
            id: `user-${Date.now()}`,
            name: name.trim(),
            email: email.trim(),
            role,
            avatar: `https://i.pravatar.cc/100?img=${
              Math.floor(Math.random() * 70) + 1
            }`,
          };
          onSave(member);
          onClose();
        };

        if (!isOpen) return null;
        return (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="modal-container bg-white p-6 rounded-lg shadow-lg w-96 max-h-screen overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Agregar integrante</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ingrese nombre completo"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingrese correo electrónico"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <select
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {rolesDisponibles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700"
                  onClick={agregarIntegranteManual}
                >
                  Agregar integrante
                </button>
              </div>
            </div>
          </div>
        );
      };