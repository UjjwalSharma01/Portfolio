import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";
import grainImage from "@/assets/images/grain.jpg";

const ResponsiveCamera = () => {
    const { camera, size } = useThree();

    useEffect(() => {
        const aspect = size.width / size.height;
        // If portrait mode (mobile), move camera back to fit the rings
        if (aspect < 1) {
            camera.position.z = 16;
        } else {
            camera.position.z = 10;
        }
        camera.updateProjectionMatrix();
    }, [size, camera]);

    return null;
};

const RotatingRing = ({ radius, speed, axis, color, isExploding }: { radius: number; speed: number; axis: 'x' | 'y' | 'z'; color: string; isExploding: boolean }) => {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            // Rotation
            if (axis === 'x') ref.current.rotation.x += delta * speed;
            if (axis === 'y') ref.current.rotation.y += delta * speed;
            if (axis === 'z') ref.current.rotation.z += delta * speed;

            // Explosion expansion
            if (isExploding) {
                ref.current.scale.lerp(new THREE.Vector3(20, 20, 20), delta * 2);
                if (ref.current.material instanceof THREE.Material) {
                    ref.current.material.opacity = THREE.MathUtils.lerp(ref.current.material.opacity, 0, delta * 5);
                }
            }
        }
    });

    return (
        <mesh ref={ref}>
            <torusGeometry args={[radius, 0.03, 32, 100]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                transparent
                opacity={0.4}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

const CoreGeometry = ({ isExploding, progress }: { isExploding: boolean; progress: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Complex spin
            meshRef.current.rotation.x += delta * 0.5;
            meshRef.current.rotation.y += delta * 0.8;

            // Pulse effect based on progress
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;

            if (isExploding) {
                // Warp jump effect: Scale up massively and fade out
                meshRef.current.scale.lerp(new THREE.Vector3(30, 30, 30), delta * 3);
                // Opacity fade handled in material prop if possible, or via ref
            } else {
                const baseScale = 1.5;
                meshRef.current.scale.set(baseScale * pulse, baseScale * pulse, baseScale * pulse);
            }
        }
    });

    return (
        <group>
            {/* Inner Solid Core */}
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1, 2]} />
                <meshPhysicalMaterial
                    color="#a78bfa"
                    emissive="#7c3aed"
                    emissiveIntensity={isExploding ? 5 : 0.5 + (progress / 100) * 1.5}
                    roughness={0.1}
                    metalness={0.9}
                    wireframe={true}
                    transparent
                    opacity={isExploding ? 0 : 0.8}
                />
            </mesh>

            {/* Inner Glow Sphere */}
            <mesh scale={isExploding ? [30, 30, 30] : [0.8, 0.8, 0.8]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#a78bfa" transparent opacity={isExploding ? 0 : 0.1} />
            </mesh>
        </group>
    );
};

const DigitalCore = ({ onLoaded, progress }: { onLoaded: () => void; progress: number }) => {
    const [isExploding, setIsExploding] = useState(false);

    useEffect(() => {
        if (progress >= 100 && !isExploding) {
            const timeout = setTimeout(() => {
                setIsExploding(true);
                // Trigger finish after the visual explosion
                setTimeout(onLoaded, 800);
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [progress, isExploding, onLoaded]);

    return (
        <group>
            <CoreGeometry isExploding={isExploding} progress={progress} />

            {/* Orbital Rings representing data streams or electron shells */}
            <RotatingRing radius={2.5} speed={0.4} axis="x" color="#a78bfa" isExploding={isExploding} />
            <RotatingRing radius={3.2} speed={0.3} axis="y" color="#8b5cf6" isExploding={isExploding} />
            <RotatingRing radius={3.8} speed={0.2} axis="z" color="#c4b5fd" isExploding={isExploding} />

            {/* Background Particles - Subtle Data Field */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </group>
    );
};

export const LoadingScreen = ({ onFinished }: { onFinished: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [isCanvasReady, setIsCanvasReady] = useState(false);

    const handleSkip = () => {
        // Mark as visited for future sessions
        localStorage.setItem('portfolio-visited', 'true');
        onFinished();
    };

    useEffect(() => {
        // Check if user has visited before
        const hasVisited = localStorage.getItem('portfolio-visited');
        if (hasVisited) {
            // Auto-skip for returning visitors
            onFinished();
            return;
        }

        // ESC key to skip
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleSkip();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [onFinished]);

    useEffect(() => {
        if (!isCanvasReady) return;

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
    }, [isCanvasReady]);

    return (
        <div className="fixed inset-0 z-50 bg-[#09090b] flex items-center justify-center transition-opacity duration-1000">
            <div
                className="absolute inset-0 z-0 opacity-5 mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url(${grainImage.src})`,
                }}
            ></div>

            <div className={`absolute inset-0 z-10 overflow-hidden transition-opacity duration-700 ${isCanvasReady ? 'opacity-100' : 'opacity-0'}`}>
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 45 }}
                    onCreated={() => setIsCanvasReady(true)}
                >
                    <ResponsiveCamera />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a78bfa" />
                    <DigitalCore onLoaded={onFinished} progress={progress} />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            <div className={`absolute bottom-12 left-0 w-full text-center text-[#a78bfa]/80 font-mono text-sm tracking-widest animate-pulse z-10 transition-opacity duration-700 ${isCanvasReady ? 'opacity-100' : 'opacity-0'}`}>
                INITIALIZING SYSTEM... {progress}%
            </div>

            {/* Skip Button - Mobile: Bottom Center, Desktop: Top Right */}
            <button
                onClick={handleSkip}
                className="absolute bottom-24 left-1/2 -translate-x-1/2 md:bottom-auto md:top-6 md:left-auto md:right-6 md:translate-x-0 z-20 px-6 py-3 md:px-4 md:py-2 text-base md:text-sm font-semibold md:font-medium text-white/90 md:text-white/70 hover:text-white bg-white/10 md:bg-transparent border border-white/20 hover:border-white/40 md:border-white/10 md:hover:border-white/30 rounded-full md:rounded-lg transition-all duration-300 hover:bg-white/20 md:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b] shadow-lg md:shadow-none backdrop-blur-sm active:scale-95"
                aria-label="Skip loading animation"
            >
                Skip Animation <span className="hidden md:inline text-xs text-white/50 ml-1">(ESC)</span>
            </button>
        </div>
    );
};
