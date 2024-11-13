import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header className="bg-primary">
        <div className="w-[90%] mx-auto">
          <Link to="/">
            <p className="text-white py-2">Rechercher un contact</p>
          </Link>
        </div>
      </header>
      <main className="bg-slate-100 min-h-screen">
        <div className="w-[90%] mx-auto py-4">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Layout;
