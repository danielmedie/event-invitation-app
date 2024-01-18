import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Load Axios
import './api/axios';

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import App from './components/App';


if (document.getElementById('root')) {
    ReactDOM.createRoot(document.getElementById("root")).render(
		<React.StrictMode>
			<BrowserRouter>
            	<App/>
			</BrowserRouter>
        </React.StrictMode>
    )
}