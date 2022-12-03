import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh, MeshBasicMaterial, sRGBEncoding, Texture, Vector3 } from "three";

export default function KeyChron() {
  const gltf = useGLTF("./Keychron K2 browser.glb");

  const keysBakedTexture = useTexture(
    "./textures/keys_baked 2.jpg",
    (texture) => {
      (texture as Texture).flipY = false;
      (texture as Texture).encoding = sRGBEncoding;
    }
  );

  useEffect(() => {
    const doThingy = (e: any) => {
      if (e.repeat) return;
      const key = gltf.scene.getObjectByName(`Key_${e.code}`);
      if (!key) return;

      key.position.y -= 0.005;
    };

    const revertThingy = (e: any) => {
      const key = gltf.scene.getObjectByName(`Key_${e.code}`);
      if (!key) return;

      key.position.y += 0.005;
    };

    document.addEventListener("keydown", doThingy);
    document.addEventListener("keyup", revertThingy);

    return () => {
      document.removeEventListener("keydown", doThingy);
      document.removeEventListener("keyup", revertThingy);
    };
  }, []);

  useEffect(() => {
    if (!gltf) return;

    gltf.scene.traverse((child) => {
      if (child instanceof Mesh && child.name.startsWith("Key_")) {
        // Set the used uv map to the in blender added uv map for baking purposes
        if (child.geometry.attributes.uv2) {
          child.geometry.attributes.uv = child.geometry.attributes.uv2;
        }
        child.material = new MeshBasicMaterial({ map: keysBakedTexture });
      }
    });

    gltf.scene.scale.setScalar(60);
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}
