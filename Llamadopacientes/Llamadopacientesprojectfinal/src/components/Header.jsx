
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  }

  const handleClickTv = () => {
    navigate('/llamados-tv');
  };

  return (
    < >
    <header className="bg-custom-blue flex h-120 items-center">
      <div onClick={ handleClick } className="container w-1/5 h-1/5 max-w-full flex items-center ml-6">
        <img className="mr-auto md:ml-27 ml-27 w-2/6 h-2/5" alt="Logo Clínica" />
        <h1 className="text-2xl font-bold font-inknut-antiqua text-white">CLINICA <br/> JHON F CARPAS</h1>
      </div>
      <div onClick={ handleClickTv } className="ml-auto mr-35 mt-auto mb-3">
        <h1 className="text-1lg font-bold font-inknut-antiqua text-white">LLAMADO DE PACIENTES</h1>
      </div>
      <div className="flex md:mr-46 mr-10 ml-auto">
        <img className="flex ml-auto w-1/5 h-1/5" alt="Logo Representativo" />
      </div>
    </header>
    < />
  );
}

export default Header;