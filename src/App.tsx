import './App.css';
import AppContext from './AppContext'
import Display from './Display'
const style={
  maxWidth:"500px"
}
function App() {
  return (
      <AppContext style={style}>
        <Display/>
      </AppContext>
  );
}

export default App;
