import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { GrainOverlay } from "@/components/GrainOverlay";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({ subsets: ["latin"], variable: "--font-serif", weight: ["400"] });

export const metadata: Metadata = {
    title: {
        default: "Ujjwal Sharma - Full Stack Developer",
        template: "%s | Ujjwal Sharma"
    },
    description: "Full Stack Developer & Computer Science student with expertise in React, Node.js, and modern web technologies. Top 0.3% NCAT performer with proven leadership experience. Building innovative solutions for real-world problems.",
    keywords: [
        "Ujjwal Sharma",
        "Full Stack Developer",
        "React Developer",
        "Node.js Developer",
        "JavaScript Developer",
        "Web Developer",
        "Computer Science",
        "Software Engineer",
        "Frontend Developer",
        "Backend Developer",
        "MERN Stack",
        "Portfolio",
        "Delhi",
        "India"
    ],
    authors: [{ name: "Ujjwal Sharma" }],
    creator: "Ujjwal Sharma",
    publisher: "Ujjwal Sharma",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://ujjwalsharma.tech",
        siteName: "Ujjwal Sharma - Full Stack Developer",
        title: "Ujjwal Sharma - Full Stack Developer",
        description: "Full Stack Developer & Computer Science student with expertise in React, Node.js, and modern web technologies. Top 0.3% NCAT performer with proven leadership experience.",
        images: [
            {
                url: "/images/pic.jpg",
                width: 1200,
                height: 630,
                alt: "Ujjwal Sharma - Full Stack Developer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Ujjwal Sharma - Full Stack Developer",
        description: "Full Stack Developer & Computer Science student with expertise in React, Node.js, and modern web technologies.",
        creator: "@ujjwalsharma01",
        images: ["/images/pic.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "your-google-verification-code", // Replace with actual verification code
    },
    alternates: {
        canonical: "https://ujjwalsharma.tech",
    },
    category: "technology",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/images/pic.jpg" />
                <meta name="theme-color" content="#111827" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": "Ujjwal Sharma",
                            "jobTitle": "Full Stack Developer",
                            "description": "Full Stack Developer & Computer Science student with expertise in React, Node.js, and modern web technologies.",
                            "url": "https://ujjwalsharma.tech",
                            "email": "ujjwalsh2004@gmail.com",
                            "telephone": "+918630684718",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Delhi",
                                "addressCountry": "India"
                            },
                            "alumniOf": {
                                "@type": "Organization",
                                "name": "Vivekananda Institute of Professional Studies",
                                "description": "B.Tech in Computer Science and Engineering"
                            },
                            "knowsAbout": [
                                "JavaScript",
                                "React",
                                "Node.js",
                                "Express.js",
                                "MongoDB",
                                "MySQL",
                                "Python",
                                "C++",
                                "Full Stack Development",
                                "Web Development"
                            ],
                            "sameAs": [
                                "https://linkedin.com/in/ujjwalsharma01",
                                "https://github.com/UjjwalSharma01",
                                "https://ujjwalsharma.tech"
                            ],
                            "image": "https://ujjwalsharma.tech/images/pic.jpg"
                        })
                    }}
                />
            </head>
            <body
                className={twMerge(
                    inter.variable,
                    calistoga.variable,
                    "bg-dark-bg text-primary-text font-sans antialiased"
                )}>
                <GrainOverlay />
                {children}
            </body>
        </html>
    );
}
