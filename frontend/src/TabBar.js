import {UserTypes} from "./App";
import './TabBar.css';

function TabBar(props) {

    return <div id="tab-bar">
        <button id='placeholder'>Log Out</button>
        <div id='tabs'>
            {Object.values(props.tabs).map(t =>
                <button key={t}
                        className={t===props.activeTab ? 'tab active' : 'tab'}
                        onClick={()=>props.setActiveTab(t)}
                >{t}</button>
            )}
        </div>
        <button id='logout' onClick={()=>props.setUserType(UserTypes.NONE)}>Log Out</button>
        </div>
}

export default TabBar;