import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Przejdź do logowania" : "Przejdź do rejestracji"}
      </button>
      {isRegistering ? <RegisterForm /> : <LoginForm />}
    </div>
  );
}

export default App;






// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
