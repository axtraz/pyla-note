"use client";

import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Example from "@/../public/images/example.png";
import { Button } from "@/components/ui/button";

export default function Home() {
    const imageRef = useRef<HTMLDivElement>(null);

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150, mass: 0.6 };
    const smoothRotateX = useSpring(rotateX, springConfig);
    const smoothRotateY = useSpring(rotateY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!imageRef.current) return;

            const rect = imageRef.current.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            const mouseX = e.clientX - (rect.left + width / 2);
            const mouseY = e.clientY - (rect.top + height / 2);

            const maxRotation = 15;

            const rX = -(mouseY / (height / 2)) * maxRotation;
            const rY = (mouseX / (width / 2)) * maxRotation;

            rotateX.set(rX);
            rotateY.set(rY);
        };

        const handleMouseLeave = () => {
            rotateX.set(0);
            rotateY.set(0);
        };

        const currentRef = imageRef.current;
        if (currentRef) {
            currentRef.addEventListener("mousemove", handleMouseMove);
            currentRef.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener("mousemove", handleMouseMove);
                currentRef.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [rotateX, rotateY]);

    return (
        <div className="flex min-h-screen w-full flex-col items-center overflow-hidden bg-[#020617] px-4 pt-40 pb-20">
            <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-full max-w-3xl -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

            <h1 className="mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-6xl leading-tight font-extrabold text-transparent">
                Pyla Note
            </h1>

            <p className="mb-8 max-w-lg text-center text-xl text-slate-400">
                Connect your notes. Build your knowledge.
            </p>
            <Button
                asChild
                size="lg"
                className="text-md z-10 h-12 rounded-xl bg-[#155dfc] px-8 text-white shadow-[0_0_20px_rgba(21,93,252,0.2)] transition-all hover:bg-[#155dfc]/90"
            >
                <Link href="/notes/projects" className="flex items-center gap-2">
                    Get started for free
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
            <p className="mt-4 text-sm text-slate-500 italic">Free forever. No credit card required.</p>
            <div className="mt-16 flex items-center justify-center" style={{ perspective: "1000px" }}>
                <motion.div
                    ref={imageRef}
                    className="cursor-pointer select-none"
                    style={{
                        rotateX: smoothRotateX,
                        rotateY: smoothRotateY,
                        transformStyle: "preserve-3d",
                    }}
                >
                    <Image src={Example.src} alt="Example" width={1024} height={1024} className="rounded-2xl" />
                </motion.div>
            </div>
        </div>
    );
}
