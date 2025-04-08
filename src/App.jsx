import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FirstScreen from './FirstScreen/FirstScreen';
import Faq from './Faq/Faq';
import Main from './Main/Main';
import TimetableDataSet from './Timetable/TimetableDataSet';
import TimetableCheck from './Timetable/TimetableCheck';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FirstScreen />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/main" element={<Main/>} />
      <Route path="/timetable" element={<TimetableDataSet />} />
      <Route path="/timetablecheck" element={<TimetableCheck />} />
      
    </Routes>
  );
}

export default App;