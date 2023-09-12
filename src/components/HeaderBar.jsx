export const HeaderBar = ({}) => {
  return (
    <div className="header-container p-6 w-full justify-between flex flex-row fixed top-6 left-0 z-50">
      <div className="font-neueMontreal text-2xl leading-6">
        <div>Coder</div>
        <div>Craftsman</div>
        <div>Designer</div>
        <div>Architect</div>
      </div>
      <div className="group font-neueMontreal text-2xl leading-6 items-end flex flex-col transition">
        <a
          href="#works"
          className="group-hover:opacity-30 hover:!opacity-100 hover:text-4xl ease-in-out duration-500 transition"
        >
          Works
        </a>
        <a
          href="#clients"
          className="group-hover:opacity-30 hover:!opacity-100 transition ease-in-out duration-500 hover:text-4xl"
        >
          Clients
        </a>
        <a
          href="#about"
          className="group-hover:opacity-30 hover:!opacity-100 hover:text-4xl ease-in-out duration-500 transition"
        >
          About
        </a>
        <a
          href="#contact"
          className="group-hover:opacity-30 hover:!opacity-100 hover:text-4xl ease-in-out duration-500 transition"
        >
          Contact
        </a>
      </div>
      <style>
        {`.header-container {
            color: var(--text-fade-color);
            transition: background-color 1s ease;
        }`}
      </style>
    </div>
  );
};
