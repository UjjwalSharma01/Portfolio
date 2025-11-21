import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import grainImage from "@/assets/images/grain.jpg";

const DigitalCore = ({ onLoaded, progress }: { onLoaded: () => void; progress: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [isExploding, setIsExploding] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Spin logic
            const speed = isExploding ? 10 : 1 + (progress / 100) * 2;
            meshRef.current.rotation.x += delta * speed * 0.2;
            meshRef.current.rotation.y += delta * speed * 0.2;

            // Explode/Implode logic
            if (isExploding) {
                meshRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), delta * 5);
                if (meshRef.current.scale.x < 0.01) {
                    onLoaded();
                }
            }
        }
    });

    useEffect(() => {
        if (progress >= 100 && !isExploding) {
            // Add a small delay before exploding to let the user see the 100% state
            const timeout = setTimeout(() => {
                setIsExploding(true);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [progress, isExploding]);

    return (
        <mesh ref={meshRef} scale={[1.5, 1.5, 1.5]}>
            <icosahedronGeometry args={[1, 1]} />
            <meshPhysicalMaterial
                color={new THREE.Color("#a78bfa")} // Accent: Soft Violet
                emissive={new THREE.Color("#a78bfa")}
                emissiveIntensity={isExploding ? 20 : 2 + (progress / 100) * 5} // High intensity for "fake" bloom
                roughness={0.2}
                metalness={0.8}
                wireframe={true}
            />
        </mesh>
    );
};

export const LoadingScreen = ({ onFinished }: { onFinished: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2; // Adjust speed here
            });
        }, 20);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-[#09090b] flex items-center justify-center transition-opacity duration-1000">
            <div
                className="absolute inset-0 z-0 opacity-5 mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url(${grainImage.src})`,
                }}
            ></div>

            <div className="w-full h-full max-w-md max-h-md aspect-square relative z-10">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <DigitalCore onLoaded={onFinished} progress={progress} />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
                </Canvas>
            </div>

            <div className="absolute bottom-12 left-0 w-full text-center text-[#a78bfa]/80 font-mono text-sm tracking-widest animate-pulse z-10">
                INITIALIZING SYSTEM... {progress}%
            </div>
        </div>
    );
};
