import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from '../src/redux/index.js'
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>

)
