import {useGLTF} from '@react-three/drei';

const Model = () => {
    // Load the glTF model using useGLTF hook
    const gltf = useGLTF('/model.gltf');

    return (
        <group>
            <primitive object={gltf.scene}/>
        </group>
    );
};

export default Model;
