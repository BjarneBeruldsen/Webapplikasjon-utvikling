import './App.css'; // Sørg for at denne importen er til stede
import Navbar from './Navbar';
import Valgmeny from './Valgmeny';
import Mat from './Mat';
import Do from './Do';
import Sovn from './Sovn';
import Arkiv from './Arkiv';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Valgmeny />
            </Route>
            <Route exact path="/arkiv">
              <Arkiv />
            </Route>
            <Route exact path="/mat">
              <Mat />
            </Route>
            <Route exact path="/do">
              <Do />
            </Route>
            <Route exact path="/sovn">
              <Sovn />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;