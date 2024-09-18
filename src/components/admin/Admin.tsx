
import TechConfig from "./TechConfig";
import ColorConfig  from "./ColorConfig";
const Admin = () => {


  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div role="tablist" className="tabs tabs-lifted">
            {/* Tech TAB */}
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="TechConfig"
              defaultChecked
            />
            <TechConfig/>
            {/* Color TAB */}
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="Color Config"
            />
            <ColorConfig/>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Admin;
