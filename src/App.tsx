import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import KeyChron from "./KeyChron";

function ThreeScene() {
  return (
    <>
      <KeyChron />
    </>
  );
}

function App() {
  return (
    <div className="App h-screen bg-gradient-to-br from-[#150f0b] to-[#010311]">
      <Canvas camera={{ position: [0, 7, 8] }}>
        <ambientLight />
        <pointLight position={[5, -2, 3]} />
        <pointLight position={[-3, 4, -1]} />
        <OrbitControls />

        <axesHelper />
        <ThreeScene />
      </Canvas>
    </div>
  );
}

export default App;
