function ToggleButton({ isSidebarOpen, toggleSidebar }) {
    return (
      <button onClick={toggleSidebar} className="lg:hidden px-4 py-2 absolute top-4 left-4 z-10">
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
    );
  }
  
  export default ToggleButton;
  