import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Weather from './coponents/Weather';

const App: React.FC = () => {
    return (
        <div className="App">
            <Weather />
        </div>
    );
};

export default App;
