const Navbar = ({
    setBarraLateralAbierta,
    barraLateralAbierta,
    terminoBusqueda,
    setTerminoBusqueda,
    usuarioActual,
    setMostrarPerfilUsuario
}) => {



    return <div className="flex justify-between items-center border-b border-gray-200 py-2">
                      <div className="flex items-center">
                        <button
                          className="md:hidden mr-2 text-gray-500"
                          onClick={() =>
                            setBarraLateralAbierta(!barraLateralAbierta)
                          }
                        >
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </button>
                        <div className="relative search-input w-40 md:w-64">
                          <span className="absolute pl-3 inset-y-0 left-0 flex items-center">
                            <svg
                              className="h-6 w-6 text-gray-600"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </span>
                          <input
                            className="block w-full rounded-lg border border-gray-400 pl-10 pr-4 py-2 text-gray-900 text-sm placeholder-gray-600"
                            placeholder="Buscar tareas..."
                            value={terminoBusqueda}
                            onChange={(e) => setTerminoBusqueda(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          className="ml-2 cursor-pointer"
                          onClick={() => setMostrarPerfilUsuario(true)}
                        >
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src={usuarioActual.avatar}
                            alt="avatar"
                            title="Ver perfil"
                          />
                        </button>
                      </div>
                    </div>
}