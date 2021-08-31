import './App.css';
import { Attributes } from './Attributes'
import { Attacks } from './Attacks'

function App() {
  return (
    <div>
      <head>
        <title>React PF Character Sheet</title>
      </head>
      <body>
        <h1>React Pathfinder Character Sheet</h1>
        <Attributes /><br />
        <Attacks />
      </body>
    </div>
  );
}

export default App;
