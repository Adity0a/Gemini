import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts = [], setRecentPrompt, newChat } = useContext(Context); 

  const loadPrompt = async (prompt) => {
    try {
      setRecentPrompt(prompt);
      await onSent(prompt);
    } catch (error) {
      console.error('Error loading prompt:', error);
    }
  };

  return (
    <div className={`sidebar ${extended ? 'extended' : ''}`}>
      {/* Top Section */}
      <div className="top">
        <img 
          onClick={() => setExtended((prev) => !prev)} 
          className="menu" 
          src={assets.menu_icon} 
          alt="menu icon" 
        />
        
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="plus icon" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.length > 100 ? (
              prevPrompts.map((item, index) => (
                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="message icon" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              ))
            ) : (
              <p className="no-recent">No recent prompts available</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="bottom">
        {renderBottomItem(assets.question_icon, 'Help', extended)}
        {renderBottomItem(assets.history_icon, 'Activity', extended)}
        {renderBottomItem(assets.setting_icon, 'Setting', extended)}
      </div>
    </div>
  );
};

// Helper function to render bottom items for better readability
const renderBottomItem = (icon, label, extended) => (
  <div className="bottom-item recent-entry">
    <img src={icon} alt={`${label.toLowerCase()} icon`} />
    {extended && <p>{label}</p>}
  </div>
);

export default Sidebar;
