import { Routes, Route } from 'react-router-dom';
import Navigation from 'components/Navigation/Navigation';
import Convertasion from 'pages/Convertasion/Convertasion';
import CurrentRate from 'pages/CurrentRate/CurrentRate';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Convertasion />} />
        <Route path="current-rate" element={<CurrentRate />} />
      </Route>
    </Routes>
  );
}

export default App;
