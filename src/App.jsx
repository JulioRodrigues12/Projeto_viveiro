import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AbaPrincipal } from './components/Home/AbaPrincipal';
import { SobreNos } from './components/Sobre/SobreNos';
import { NossoTrabalho } from './components/Trabalho/NossoTrabalho';
import {AbaFrete} from './components/Cep/AbaFrete'
export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AbaPrincipal />} />
        <Route path="/sobre" element={<SobreNos />} />
        <Route path="/trabalho" element={<NossoTrabalho />} />
        <Route path="/cep" element={<AbaFrete/>}/>
      </Routes>
    </Router>
  );
}