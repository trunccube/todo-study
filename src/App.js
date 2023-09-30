import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [infoBars, setInfoBars] = useState([]);

    useEffect(() => {
        const storedContent = JSON.parse(localStorage.getItem('infoBars') || '[]');
        setInfoBars(storedContent);
    }, []);

    const handleAddContent = () => {
        if (inputValue.trim() === '') {
            alert('输入内容');
            return;
        }
        
        const newBars = [...infoBars, { content: inputValue, isChecked: false }];
        setInfoBars(newBars);
        localStorage.setItem('infoBars', JSON.stringify(newBars));
        setInputValue('');
    };

    const handleToggleCheck = (index) => {
        const newBars = [...infoBars];
        newBars[index].isChecked = !newBars[index].isChecked;
        setInfoBars(newBars);
        localStorage.setItem('infoBars', JSON.stringify(newBars));
    };

    return (
        <div className="container">
            <div className="inputRow">
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="内容"
                />
                <button onClick={handleAddContent}>生成</button>
            </div>
            <div className="actionRow">
                {infoBars.map((bar, index) => (
                    <InfoBar 
                        key={index} 
                        data={bar} 
                        onToggle={() => handleToggleCheck(index)}
                    />
                ))}
            </div>
        </div>
    );
}

function InfoBar({ data, onToggle }) {
    return (
        <div 
            className={`infoBar ${data.isChecked ? 'checked' : ''}`} 
            onClick={onToggle}
        >
            <span className="infoContent">{data.content}</span>
            <div className="checkbox"></div>
        </div>
    );
}

export default App;
