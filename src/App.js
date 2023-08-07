import {Canvas} from '@react-three/fiber'
import {CameraControls} from '@react-three/drei'
import Model from "./Model";
import {useRef, useState} from "react";
import * as THREE from 'three'

const CAMERA_POSITION_LABELS = ['X', 'Y', 'Z'];
const {DEG2RAD} = THREE.MathUtils;

export default function App() {
    const cameraControlRef = useRef();
    const [lightIntensity, setLightIntensity] = useState(2);
    const [cameraPosition, setCameraPosition] = useState([30, 30, 30]);

    const handleChangeCameraPosition = (index, value) => {
        const newCameraPosition = [...cameraPosition];
        newCameraPosition[index] = value;
        setCameraPosition(newCameraPosition);

        cameraControlRef.current?.setPosition(...newCameraPosition, true);
    }

    const handleChangeLightIntensity = (event) => {
        setLightIntensity(event.target.value);
    }

    const rotateTheta = (angle) => {
        cameraControlRef.current?.rotate(angle * DEG2RAD, 0, true);
    };

    const rotatePhi = (angle) => {
        cameraControlRef.current?.rotate(0, angle * DEG2RAD, true);
    };

    return (
        <>
            <div id="canvas">
                <Canvas camera={{position: cameraPosition}}>
                    <CameraControls
                        ref={cameraControlRef}
                    />
                    <ambientLight intensity={lightIntensity}/>
                    <Model/>
                </Canvas>
            </div>
            <div>
                {/* Rotate */}
                <div>
                    <span>Rotate Theta </span>
                    <button onClick={() => rotateTheta(45)}>+45º</button>
                    <button onClick={() => rotateTheta(-90)}>-90º</button>
                    <button onClick={() => rotateTheta(360)}>+360º</button>
                </div>
                <div>
                    <span>Rotate Phi </span>
                    <button onClick={() => rotatePhi(20)}>+20º</button>
                    <button onClick={() => rotatePhi(-40)}>-40º</button>
                </div>
                {/* Camera Position */}
                {CAMERA_POSITION_LABELS.map((label, index) => (
                    <div key={index}>
                        <label htmlFor={'cameraPosition' + label}>Camera
                            Position {label}: {cameraPosition[index]}</label>
                        <input type="range" min="0" max="100" step="1" value={cameraPosition[index]}
                               id={'cameraPosition' + label}
                               onChange={(event) => handleChangeCameraPosition(index, event.target.value)}/>
                    </div>
                ))}
                {/* Light Intensity */}
                <label htmlFor="lightIntensity">Light Intensity: {lightIntensity}</label>
                <input type="range" min="0" max="10" step="0.1" value={lightIntensity} id="lightIntensity"
                       onChange={handleChangeLightIntensity}/>
            </div>
        </>
    )
}
