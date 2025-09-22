const UserProfileModal = ({ user, onClose, onSave, isOpen }) => {
        const [name, setName] = useState(user?.name || "");
        const [email, setEmail] = useState(user?.email || "");
        const [role, setRole] = useState(user?.role || "");
        const [avatar, setAvatar] = useState(
          user?.avatar || "https://i.pravatar.cc/100"
        );
        const [avatarFile, setAvatarFile] = useState(null);
        const fileInputRef = useRef(null);

        useEffect(() => {
          if (!user) return;
          setName(user.name || "");
          setEmail(user.email || "");
          setRole(user.role || "");
          setAvatar(user.avatar || "https://i.pravatar.cc/100");
        }, [user, isOpen]);

        const guardarPerfilUsuario = () => {
          if (!validarCamposRequeridos(name, email)) return;
          let finalAvatar = avatar;
          if (avatarFile) finalAvatar = URL.createObjectURL(avatarFile);

          onSave(
            construirUsuario({
              id: user?.id,
              name,
              email,
              role,
              avatar: finalAvatar,
            })
          );
          onClose();
        };

        const generarAvatarAleatorio = () => {
          const randomId = Math.floor(Math.random() * 70) + 1;
          setAvatar(`https://i.pravatar.cc/100?img=${randomId}`);
          setAvatarFile(null);
        };

        const abrirSelectorAvatar = () => fileInputRef.current?.click();

        const manejarCambioArchivo = (event) => {
          const file = event.target.files[0];
          const error = validarImagen(file);
          if (error) {
            alert(error);
            return;
          }
          setAvatarFile(file);
          setAvatar(URL.createObjectURL(file));
        };

        const eliminarAvatarPersonalizado = () => {
          setAvatarFile(null);
          setAvatar("https://i.pravatar.cc/100");
        };

        if (!isOpen) return null;
        return (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="modal-container bg-white p-6 rounded-lg shadow-lg w-96 max-w-90vw">
              <h2 className="text-xl font-semibold mb-4">Perfil de Usuario</h2>
              <div className="flex flex-col items-center mb-4">
                <div className="relative">
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full mb-2 object-cover cursor-pointer"
                    onClick={abrirSelectorAvatar}
                  />
                  <div
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer"
                    onClick={abrirSelectorAvatar}
                    title="Cambiar avatar"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={manejarCambioArchivo}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                    onClick={abrirSelectorAvatar}
                  >
                    Subir imagen
                  </button>
                  <button
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                    onClick={generarAvatarAleatorio}
                  >
                    Avatar aleatorio
                  </button>
                  {avatarFile && (
                    <button
                      className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                      onClick={eliminarAvatarPersonalizado}
                    >
                      Quitar
                    </button>
                  )}
                </div>
                {avatarFile && (
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    Imagen seleccionada: {avatarFile.name}
                  </p>
                )}
              </div>

              <div className="Nombreusurio">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre completo"
                />
              </div>
              <div className="Email">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu.email@ejemplo.com"
                />
              </div>
              <div className="Rol">
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
                  className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
                  onClick={guardarPerfilUsuario}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        );
      };