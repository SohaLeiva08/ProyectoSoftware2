// Importar React y ReactDOM (ya están disponibles globalmente en el HTML)
// const React = window.React;
// const ReactDOM = window.ReactDOM;

// Para react-beautiful-dnd, si lo estuvieras usando en un entorno con bundler:
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialIssues = [
  { id: 'issue-1', title: 'Add discount code to checkout page', date: 'Sep 14', tag: 'Feature Request', assignee: 'https://i.pravatar.cc/100' },
  { id: 'issue-2', title: 'Fix broken image on product page', date: 'Sep 15', tag: 'Bug', assignee: 'https://i.pravatar.cc/100?img=2' },
  { id: 'issue-3', title: 'Update privacy policy document', date: 'Sep 16', tag: 'Marketing', assignee: 'https://i.pravatar.cc/100?img=3' },
  { id: 'issue-4', title: 'Improve search algorithm performance', date: 'Sep 17', tag: 'Enhancement', assignee: 'https://i.pravatar.cc/100?img=4' },
  { id: 'issue-5', title: 'Redesign user dashboard', date: 'Sep 18', tag: 'Design', assignee: 'https://i.pravatar.cc/100?img=5' },
  { id: 'issue-6', title: 'Implement new payment gateway', date: 'Sep 19', tag: 'Feature Request', assignee: 'https://i.pravatar.cc/100?img=6' },
  { id: 'issue-7', title: 'Optimize database queries', date: 'Sep 20', tag: 'Enhancement', assignee: 'https://i.pravatar.cc/100?img=7' },
  { id: 'issue-8', title: 'Create social media campaign assets', date: 'Sep 21', tag: 'Marketing', assignee: 'https://i.pravatar.cc/100?img=8' },
  { id: 'issue-9', title: 'Fix login authentication bug', date: 'Sep 22', tag: 'Bug', assignee: 'https://i.pravatar.cc/100?img=9' },
  { id: 'issue-10', title: 'Add dark mode toggle', date: 'Sep 23', tag: 'Feature Request', assignee: 'https://i.pravatar.cc/100?img=10' },
];

const NewIssueModal = ({ onClose, onSave }) => {
  const [title, setTitle] = React.useState('');
  const [tag, setTag] = React.useState('Feature Request');

  const handleSubmit = () => {
    if (title.trim()) {
      onSave({
        id: `issue-${Date.now()}`, // Generar un ID único
        title: title.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        tag: tag,
        assignee: 'https://i.pravatar.cc/100?img=11' // Asignar un avatar por defecto
      });
      onClose();
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50" }, /*#__PURE__*/
    React.createElement("div", { className: "bg-white p-8 rounded-lg shadow-lg w-96" }, /*#__PURE__*/
    React.createElement("h2", { className: "text-xl font-semibold mb-4" }, "Create New Issue"), /*#__PURE__*/
    React.createElement("div", { className: "mb-4" }, /*#__PURE__*/
    React.createElement("label", { htmlFor: "issueTitle", className: "block text-sm font-medium text-gray-700 mb-1" }, "Issue Title"), /*#__PURE__*/
    React.createElement("input", {
      type: "text",
      id: "issueTitle",
      className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2",
      value: title,
      onChange: (e) => setTitle(e.target.value),
      placeholder: "e.g., Fix login bug"
    })), /*#__PURE__*/
    React.createElement("div", { className: "mb-4" }, /*#__PURE__*/
    React.createElement("label", { htmlFor: "issueTag", className: "block text-sm font-medium text-gray-700 mb-1" }, "Tag"), /*#__PURE__*/
    React.createElement("select", {
      id: "issueTag",
      className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2",
      value: tag,
      onChange: (e) => setTag(e.target.value)
    }, /*#__PURE__*/
    React.createElement("option", { value: "Feature Request" }, "Feature Request"), /*#__PURE__*/
    React.createElement("option", { value: "Bug" }, "Bug"), /*#__PURE__*/
    React.createElement("option", { value: "Marketing" }, "Marketing"), /*#__PURE__*/
    React.createElement("option", { value: "v2.0" }, "v2.0"), /*#__PURE__*/
    React.createElement("option", { value: "Enhancement" }, "Enhancement"), /*#__PURE__*/
    React.createElement("option", { value: "Design" }, "Design"))), /*#__PURE__*/
    React.createElement("div", { className: "flex justify-end space-x-2" }, /*#__PURE__*/
    React.createElement("button", { className: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50", onClick: onClose }, "Cancel"), /*#__PURE__*/
    React.createElement("button", { className: "px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-700", onClick: handleSubmit }, "Create Issue"))))
  );
};


const App = () => {
  const [selectedIssueFilter, setSelectedIssueFilter] = React.useState('All');
  const [selectedTagFilter, setSelectedTagFilter] = React.useState(null); // null para ninguna etiqueta seleccionada
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showNewIssueModal, setShowNewIssueModal] = React.useState(false);
  const [issues, setIssues] = React.useState(initialIssues); // Estado para las issues

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSaveNewIssue = (newIssue) => {
    setIssues([...issues, newIssue]);
  };

  // Lógica de filtrado de issues
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIssueFilter = selectedIssueFilter === 'All' ||
                               (selectedIssueFilter === 'Assigned to me' && issue.assignee.includes('100')) || // Ejemplo simple de asignación
                               (selectedIssueFilter === 'Created by me' && issue.assignee.includes('100')) || // Ejemplo simple de creación
                               (selectedIssueFilter === 'Archived' && false); // No hay issues archivadas en este ejemplo

    const matchesTagFilter = selectedTagFilter === null || issue.tag === selectedTagFilter;

    return matchesSearch && matchesIssueFilter && matchesTagFilter;
  });

  // Función para simular el drag and drop (requiere react-beautiful-dnd)
  const onDragEnd = (result) => {
    // Lógica para reordenar las issues o moverlas entre columnas
    // Esto es un placeholder y necesitaría una implementación real con react-beautiful-dnd
    if (!result.destination) return;

    const newIssues = Array.from(filteredIssues); // O la lista de issues de la columna específica
    const [reorderedItem] = newIssues.splice(result.source.index, 1);
    newIssues.splice(result.destination.index, 0, reorderedItem);

    // Actualizar el estado de las issues (o de las columnas si tienes múltiples)
    // setIssues(newIssues); // Esto afectaría a todas las issues, necesitarías un estado por columna
  };


  return /*#__PURE__*/(
    React.createElement("div", { className: "App" }, /*#__PURE__*/
    React.createElement("div", { className: "h-screen flex" }, /*#__PURE__*/
    React.createElement("div", { className: "w-64 px-8 py-4 bg-gray-100 border-r overflow-auto" }, /*#__PURE__*/
    React.createElement("img", { className: "h-8 w-8", src: "https://i.pravatar.cc/100", alt: "logo" }), /*#__PURE__*/
    React.createElement("nav", { className: "mt-8" }, /*#__PURE__*/
    React.createElement("h3", { className: "text-xs font-semibold text-gray-600 uppercase tracking-wide text-left" }, "Issues"), /*#__PURE__*/
    React.createElement("div", { className: "mt-2 -mx-3" }, /*#__PURE__*/
    React.createElement("a", {
      href: "#",
      className: `flex justify-between items-center px-3 py-2 rounded-lg ${selectedIssueFilter === 'All' ? 'bg-gray-200' : ''}`,
      onClick: () => { setSelectedIssueFilter('All'); setSelectedTagFilter(null); }
    }, /*#__PURE__*/
    React.createElement("span", { className: "text-sm font-medium text-gray-900 " }, "All"), /*#__PURE__*/
    React.createElement("span", { className: "text-xs font-semibold text-gray-700 " }, issues.length)), /*#__PURE__*/

    React.createElement("a", {
      href: "#",
      className: `flex justify-between items-center px-3 py-2 rounded-lg ${selectedIssueFilter === 'Assigned to me' ? 'bg-gray-200' : ''}`,
      onClick: () => { setSelectedIssueFilter('Assigned to me'); setSelectedTagFilter(null); }
    }, /*#__PURE__*/
    React.createElement("span", { className: "text-sm font-medium text-gray-700 " }, "Assigned to me"), /*#__PURE__*/
    React.createElement("span", { className: "text-xs font-semibold text-gray-700 " }, "2")), /*#__PURE__*/

    React.createElement("a", {
      href: "#",
      className: `flex justify-between items-center px-3 py-2 rounded-lg ${selectedIssueFilter === 'Created by me' ? 'bg-gray-200' : ''}`,
      onClick: () => { setSelectedIssueFilter('Created by me'); setSelectedTagFilter(null); }
    }, /*#__PURE__*/
    React.createElement("span", { className: "text-sm font-medium text-gray-700 " }, "Created by me"), /*#__PURE__*/
    React.createElement("span", { className: "text-xs font-semibold text-gray-700 " }, "2")), /*#__PURE__*/

    React.createElement("a", {
      href: "#",
      className: `flex justify-between items-center px-3 py-2 rounded-lg ${selectedIssueFilter === 'Archived' ? 'bg-gray-200' : ''}`,
      onClick: () => { setSelectedIssueFilter('Archived'); setSelectedTagFilter(null); }
    }, /*#__PURE__*/
    React.createElement("span", { className: "text-sm font-medium text-gray-700 " }, "Archived"), /*#__PURE__*/
    React.createElement("span", { className: "text-xs font-semibold text-gray-700 " }, "1"))), /*#__PURE__*/


    React.createElement("h3", { className: "mt-8 text-xs font-semibold text-gray-600 uppercase tracking-wide text-left" }, "Tags"), /*#__PURE__*/
    React.createElement("div", { className: "mt-2 -mx-3" }, /*#__PURE__*/
    React.createElement("a", {
      href: "#",
      className: `flex justify-between items-center px-3 py-2 rounded-lg ${selectedTagFilter === 'Bug' ? 'bg-gray-200' : ''}`,
      onClick: () => { setSelectedTagFilter('Bug'); setSelectedIssueFilter('All'); }
    }, /*#__PURE__*/
    React.createElement("span", { className: "text-sm font-medium text-gray-700 " }, "Bug")), /*#__PURE__*/

    React.createElement("a", {
      href: "#",
      className: `flex justify-between items-center px-3 py-2 rounded-lg ${selectedTagFilter === 'Feature Request' ? 'bg-gray-200' : ''}`,
      onClick: () => { setSelectedTagFilter('Feature Request'); setSelectedIssueFilter('All'); }
    }, /*#__PURE__*/
    React.createElement("span", { className: "text-sm font-medium text-gray-700 " }, "Feature Request")), /*#__PURE__*/

    React.createElement("a", {
      href: "#",
      className: `flex justify-between items-center px-3 py-2 rounded-lg ${selectedTagFilter === 'Marketing' ? 'bg-gray-200' : ''}`,
      onClick: () => { setSelectedTagFilter('Marketing'); setSelectedIssueFilter('All'); }
    }, /*#__PURE__*/
    React.createElement("span", { className: "text-sm font-medium text-gray-700 " }, "Marketing")), /*#__PURE__*/

    React.createElement("a", {
      href: "#",
      className: `flex justify-between items-center px-3 py-2 rounded-lg ${selectedTagFilter === 'v2.0' ? 'bg-gray-200' : ''}`,
      onClick: () => { setSelectedTagFilter('v2.0'); setSelectedIssueFilter('All'); }
    }, /*#__PURE__*/
    React.createElement("span", { className: "text-sm font-medium text-gray-700 " }, "v2.0")), /*#__PURE__*/

    React.createElement("a", {
      href: "#",
      className: `flex justify-between items-center px-3 py-2 rounded-lg ${selectedTagFilter === 'Enhancement' ? 'bg-gray-200' : ''}`,
      onClick: () => { setSelectedTagFilter('Enhancement'); setSelectedIssueFilter('All'); }
    }, /*#__PURE__*/
    React.createElement("span", { className: "text-sm font-medium text-gray-700 " }, "Enhancement")), /*#__PURE__*/

    React.createElement("a", {
      href: "#",
      className: `flex justify-between items-center px-3 py-2 rounded-lg ${selectedTagFilter === 'Design' ? 'bg-gray-200' : ''}`,
      onClick: () => { setSelectedTagFilter('Design'); setSelectedIssueFilter('All'); }
    }, /*#__PURE__*/
    React.createElement("span", { className: "text-sm font-medium text-gray-700 " }, "Design"))), /*#__PURE__*/


    React.createElement("button", { className: " mt-4 -ml-1 flex items-center text-sm font-medium text-gray-600" }, /*#__PURE__*/
    React.createElement("svg", { className: "h-5 w-5 text-gray-500", viewBox: "0 0 24 24", fill: "none" }, /*#__PURE__*/
    React.createElement("path", {
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      d: "M12 7v10m5-5H7" })), /*#__PURE__*/


    React.createElement("span", { className: "ml-1" }, "New Project")))), /*#__PURE__*/



    React.createElement("div", { className: "flex-1 min-w-0 bg-white flex flex-col" }, /*#__PURE__*/
    React.createElement("div", { className: "flex-shrink-0 border-b-2 border-gray-200" }, /*#__PURE__*/
    React.createElement("header", { className: "px-6" }, /*#__PURE__*/
    React.createElement("div", { className: "flex justify-between items-center border-b border-gray-200 py-2" }, /*#__PURE__*/

    React.createElement("div", { className: "flex-1" }, /*#__PURE__*/
    React.createElement("div", { className: "relative w-64" }, /*#__PURE__*/
    React.createElement("span", { className: "absolute pl-3 inset-y-0 left-0 flex items-center" }, /*#__PURE__*/
    React.createElement("svg", { className: "h-6 w-6 text-gray-600", viewBox: "0 0 24 24", fill: "none" }, /*#__PURE__*/
    React.createElement("path", {
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }))), /*#__PURE__*/



    React.createElement("input", {
      className: "block w-full rounded-lg border border-gray-400 pl-10 pr-4 py-2 text-gray-900 text-sm placeholder-gray-600",
      placeholder: "Search",
      value: searchTerm,
      onChange: handleSearchChange
    }))), /*#__PURE__*/




    React.createElement("div", { className: "flex items-center" }, /*#__PURE__*/
    React.createElement("button", { className: "" }, /*#__PURE__*/
    React.createElement("svg", { className: "h-5 w-5 text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, /*#__PURE__*/
    React.createElement("path", { stroke: "currentColor", d: "M468 392h-20c-10.384 0-18.709-3.609-24.745-10.728-7.363-8.684-11.255-22.386-11.255-39.626V204c0-78.818-59.543-144.777-136-154.699V0h-40v49.301C159.543 59.223 100 125.181 100 204v144c0 14.175-3.734 25.775-10.799 33.546C82.984 388.385 74.27 392 64 392H44v56h161.413A51.888 51.888 0 00204 460c0 28.673 23.327 52 52 52s52-23.327 52-52c0-4.131-.499-8.145-1.413-12H468v-56zm-212 80c-6.617 0-12-5.383-12-12s5.383-12 12-12 12 5.383 12 12-5.383 12-12 12zm-136.792-64C132.813 392.784 140 372.052 140 348V204c0-63.067 51.263-115.072 114.302-115.987h3.396C320.737 88.928 372 140.933 372 204v137.646c0 26.84 7.174 49.488 20.745 65.494.245.289.492.576.741.86H119.208z" }))), /*#__PURE__*/


    React.createElement("button", { className: "ml-6" }, /*#__PURE__*/
    React.createElement("img", { className: "h-8 w-8 rounded-full object-cover", src: "https://i.pravatar.cc/100", alt: "avatar" })))), /*#__PURE__*/




    React.createElement("div", { className: "flex justify-between items-center py-2" }, /*#__PURE__*/
    React.createElement("div", { className: "flex" }, /*#__PURE__*/
    React.createElement("h2", { className: "text-2xl font-semibold text-gray-900 leading-tight" }, "All Issues"), /*#__PURE__*/
    React.createElement("div", { className: "flex ml-6" }, /*#__PURE__*/
    React.createElement("span", { className: "-ml-2 rounded-full border-2 border-white" }, /*#__PURE__*/
    React.createElement("img", { className: "h-6 w-6 rounded-full object-cover", src: "https://i.pravatar.cc/100", alt: "avatar" })), /*#__PURE__*/

    React.createElement("span", { className: "-ml-2 rounded-full border-2 border-white" }, /*#__PURE__*/
    React.createElement("img", { className: "h-6 w-6 rounded-full object-cover", src: "https://i.pravatar.cc/100", alt: "avatar" })), /*#__PURE__*/

    React.createElement("span", { className: "-ml-2 rounded-full border-2 border-white" }, /*#__PURE__*/
    React.createElement("img", { className: "h-6 w-6 rounded-full object-cover", src: "https://i.pravatar.cc/100", alt: "avatar" })), /*#__PURE__*/

    React.createElement("span", { className: "-ml-2 rounded-full border-2 border-white" }, /*#__PURE__*/
    React.createElement("img", { className: "h-6 w-6 rounded-full object-cover", src: "https://i.pravatar.cc/100", alt: "avatar" })))), /*#__PURE__*/



    React.createElement("div", { className: "flex" }, /*#__PURE__*/
    React.createElement("span", { className: "inline-flex p-1 border bg-gray-200 rounded" }, /*#__PURE__*/
    React.createElement("button", { className: "px-2 py-1 rounded" }, /*#__PURE__*/
    React.createElement("svg", { className: " h-6 w-6 text-gray-600 ", height: "512", viewBox: "0 -53 384 384", width: "512", xmlns: "http://www.w3.org/2000/svg" }, /*#__PURE__*/
    React.createElement("path", { stroke: "currentColor", d: "M368 154.668H16c-8.832 0-16-7.168-16-16s7.168-16 16-16h352c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0M368 32H16C7.168 32 0 24.832 0 16S7.168 0 16 0h352c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0M368 277.332H16c-8.832 0-16-7.168-16-16s7.168-16 16-16h352c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0" }))), /*#__PURE__*/


    React.createElement("button", { className: "px-2 py-1 bg-white shadow rounded" }, /*#__PURE__*/
    React.createElement("svg", { className: " h-6 w-6 text-gray-600 ", height: "512", viewBox: "0 -53 384 384", width: "512", xmlns: "http://www.w3.org/2000/svg" }, /*#__PURE__*/
    React.createElement("path", { stroke: "currentColor", d: "M368 154.668H16c-8.832 0-16-7.168-16-16s7.168-16 16-16h352c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0M368 32H16C7.168 32 0 24.832 0 16S7.168 0 16 0h352c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0M368 277.332H16c-8.832 0-16-7.168-16-16s7.168-16 16-16h352c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0" })))), /*#__PURE__*/



    React.createElement("button", {
      className: "ml-5 flex items-center pl-2 pr-4 py-1 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700",
      onClick: () => setShowNewIssueModal(true)
    }, /*#__PURE__*/
    React.createElement("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none" }, /*#__PURE__*/
    React.createElement("path", {
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      d: "M12 7v10m5-5H7" })), /*#__PURE__*/


    React.createElement("span", { className: "ml-1" }, "New Issue")))))), /*#__PURE__*/


    // DragDropContext para la funcionalidad de arrastrar y soltar
    // Esto es un placeholder. La implementación real requiere la librería react-beautiful-dnd
    // y un manejo de estado más complejo para las columnas y los elementos.
    // <DragDropContext onDragEnd={onDragEnd}>
    React.createElement("div", { className: "flex-1 overflow-auto" }, /*#__PURE__*/
    React.createElement("main", { className: "p-3 inline-flex" }, /*#__PURE__*/

    // Columna de Backlogs
    React.createElement("div", { className: "p-3 w-80 flex-shrink-0 bg-gray-100 rounded" }, /*#__PURE__*/
    React.createElement("h3", { className: "text-sm font-medium text-gray-900" }, "Backlogs"), /*#__PURE__*/
    
    React.createElement("ul", { className: "mt-2" },
      filteredIssues.map((issue, index) => (
        React.createElement("li", { key: issue.id, className: "mt-3" }, /*#__PURE__*/
        React.createElement("a", { href: "#", className: "block p-5 bg-white rounded shadow" }, /*#__PURE__*/
        React.createElement("div", { className: "flex justify-between" }, /*#__PURE__*/
        React.createElement("p", { className: "text-sm font-medium leading-snug text-gray-900 text-left" }, issue.title), /*#__PURE__*/
        React.createElement("span", null, 
        React.createElement("img", {
          className: "h-6 w-6 rounded-full",
          src: issue.assignee, alt: "avatar" }))), /*#__PURE__*/
        React.createElement("div", { className: "flex justify-between items-baseline" }, /*#__PURE__*/
        React.createElement("div", { className: "text-sm text-gray-600" }, /*#__PURE__*/
        React.createElement("time", { dateTime: "2019-09-14" }, issue.date)), /*#__PURE__*/
        React.createElement("div", { className: "mt-2" }, /*#__PURE__*/
        React.createElement("span", { className: "px-2 py-1 leading-tight inline-flex items-center bg-teal-100 rounded" }, /*#__PURE__*/
        React.createElement("svg", { className: "h-2 w-2 text-teal-500", viewBox: "0 0 8 8", fill: "currentColor" }, /*#__PURE__*/
        React.createElement("circle", { cx: "4", cy: "4", r: "3" })), /*#__PURE__*/
        React.createElement("span", { className: "text-sm ml-2 font-medium text-teal-900" }, issue.tag))))))
      ))
    //     </ul>
    //   )}
    // </Droppable>
    ), /*#__PURE__*/


    // Las siguientes columnas son duplicados del HTML original,
    // para una implementación real de Trello, cada columna tendría su propio estado de issues
    // y se filtrarían/moverían entre ellas.
    React.createElement("div", { className: "flex-shrink-0 p-3 w-80 bg-gray-100 rounded ml-3" }, /*#__PURE__*/
    React.createElement("h3", { className: "text-sm font-medium text-gray-900" }, "In Progress"), /*#__PURE__*/
    React.createElement("ul", { className: "mt-2" },
      // Aquí irían las issues de "In Progress"
    )), /*#__PURE__*/

    React.createElement("div", { className: "flex-shrink-0 p-3 w-80 bg-gray-100 rounded ml-3" }, /*#__PURE__*/
    React.createElement("h3", { className: "text-sm font-medium text-gray-900" }, "Review"), /*#__PURE__*/
    React.createElement("ul", { className: "mt-2" },
      // Aquí irían las issues de "Review"
    )), /*#__PURE__*/

    React.createElement("div", { className: "flex-shrink-0 p-3 w-80 bg-gray-100 rounded ml-3" }, /*#__PURE__*/
    React.createElement("h3", { className: "text-sm font-medium text-gray-900" }, "Done"), /*#__PURE__*/
    React.createElement("ul", { className: "mt-2" },
      // Aquí irían las issues de "Done"
    ))
    )),

    // Modal para crear nueva issue
    showNewIssueModal && React.createElement(NewIssueModal, {
      onClose: () => setShowNewIssueModal(false),
      onSave: handleSaveNewIssue
    })
    ))))
  );
};

ReactDOM.render( React.createElement(App, null), document.getElementById('root'));
