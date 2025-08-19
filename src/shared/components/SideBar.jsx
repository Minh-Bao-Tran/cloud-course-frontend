export default function SideBar(props) {
  return (
    <aside>
      <nav class="sidebar">
        <div class="avatar"></div>
        <a href="index.html">
          <button title="Dashboard">
            <svg viewBox="0 0 24 24">
              <path d="M3 9.5l9-7 9 7v11a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-11z" />
            </svg>
          </button>
        </a>
        <a href="flight-home.html">
          <button title="Flights">
            <svg viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </a>
        <a href="create-route.html">
          <button title="Create Route">
            <svg viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </a>
        <a href="settings.html">
          <button title="Settings">
            <svg viewBox="0 0 24 24">
              <path d="M12 2a7 7 0 0 0-7 7v1H4a4 4 0 0 0 0 8h14a4 4 0 0 0 0-8h-1V9a7 7 0 0 0-7-7z" />
            </svg>
          </button>
        </a>
        <a href="account.html">
          <button title="Account">
            <svg viewBox="0 0 24 24">
              <path d="M4 12h16M4 6h16M4 18h16" />
            </svg>
          </button>
        </a>
      </nav>
    </aside>
  );
}
