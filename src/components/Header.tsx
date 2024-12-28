import LogoBridge from "../assets/LogoBridge.png";

const Header = () => {
  return (
    <header className="container mx-auto my-4 px-4 py-6">
      <img src={LogoBridge} alt="The Bridge" className="h-16" />
    </header>
  );
};

export default Header;
