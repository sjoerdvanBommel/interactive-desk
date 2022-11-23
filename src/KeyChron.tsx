import { useGLTF } from "@react-three/drei";

export default function KeyChron() {
  const gltf = useGLTF("./Keychron K2.glb");

  return <primitive object={gltf.scene} />;
}
