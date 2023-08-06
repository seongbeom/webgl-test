import {Canvas} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import Model from "./Model";

export default function App() {
    return (
        <Canvas camera={{position: [30, 30, 30]}}>
            <ambientLight intensity={2}/>
            <Model/>
            <OrbitControls/>
        </Canvas>
    )
}
