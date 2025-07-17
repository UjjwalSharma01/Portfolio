import SquareJsIcon from "@/assets/icons/toolbox/square-js.svg";
import SquareTsIcon from "@/assets/icons/toolbox/square-ts.svg";
import SolidityIcon from "@/assets/icons/toolbox/solidity.svg";
import HTML5Icon from "@/assets/icons/toolbox/html5.svg";
import CssIcon from "@/assets/icons/toolbox/css3.svg";
import ReactIcon from "@/assets/icons/toolbox/react.svg";
import ElectronIcon from "@/assets/icons/toolbox/electron.svg";
import GitIcon from "@/assets/icons/toolbox/git.svg";
import PolypaneIcon from "@/assets/icons/toolbox/polypane.svg";
import FirebaseIcon from "@/assets/icons/toolbox/firebase.svg";
import GithubIcon from "@/assets/icons/toolbox/github.svg";
import BunIcon from "@/assets/icons/toolbox/bun.svg";
import PostmanIcon from "@/assets/icons/toolbox/postman.svg";
import TailwindIcon from "@/assets/icons/toolbox/tailwind.svg";
import MongoDBIcon from "@/assets/icons/toolbox/mongo-db.svg";
import ViteIcon from "@/assets/icons/toolbox/vite.svg";
import VSCodeIcon from "@/assets/icons/toolbox/vs-code.svg";
import VercelIcon from "@/assets/icons/toolbox/vercel.svg";
import SwaggerIcon from "@/assets/icons/toolbox/swagger.svg";
import NodeJsIcon from "@/assets/icons/toolbox/node-js.svg";
import NestIcon from "@/assets/icons/toolbox/nest.svg";
import habitualImage from "@/assets/images/habitual.png";
import imageBuddy from "@/assets/images/imagebuddy.png";
import pollsay from "@/assets/images/pollsay.png";
import annadata from "@/assets/images/annadata.png";

const CONFIG = {
    email: "ujjwalsh2004@gmail.com",
    toolboxItems: [
        {
            title: "HTML5",
            iconType: HTML5Icon,
        },
        {
            title: "CSS",
            iconType: CssIcon,
        },
        {
            title: "JavaScript",
            iconType: SquareJsIcon,
        },
        {
            title: "React",
            iconType: ReactIcon,
        },
        {
            title: "Node.js",
            iconType: NodeJsIcon,
        },
        {
            title: "MongoDB",
            iconType: MongoDBIcon,
        },
        {
            title: "Firebase",
            iconType: FirebaseIcon,
        },
        {
            title: "Git",
            iconType: GitIcon,
        },
        {
            title: "Github",
            iconType: GithubIcon,
        },
        {
            title: "Postman",
            iconType: PostmanIcon,
        },
        {
            title: "Visual Studio Code",
            iconType: VSCodeIcon,
        },
    ],
    hobbies: [
        {
            title: "Problem Solving",
            emoji: "🧩",
            left: "5%",
            top: "3%",
            zIndex: 0,
        },
        {
            title: "Blockchain Tech",
            emoji: "⛓️",
            left: "50%",
            top: "3%",
            zIndex: 0,
        },
        {
            title: "Coding",
            emoji: "💻",
            left: "10%",
            top: "33%",
            zIndex: 0,
        },
        {
            title: "Learning",
            emoji: "📖",
            left: "35%",
            top: "40%",
            zIndex: -10,
        },
        {
            title: "Open Source",
            emoji: "🌐",
            left: "70%",
            top: "45%",
            zIndex: 0,
        },
        {
            title: "Tech Meetups",
            emoji: "👥",
            left: "5%",
            top: "65%",
            zIndex: 0,
        },
        {
            title: "Innovation",
            emoji: "�",
            left: "45%",
            top: "70%",
            zIndex: 0,
        },
    ],
    footerLinks: [
        {
            title: "LinkedIn",
            href: "https://linkedin.com/in/ujjwalsharma01",
        },
        {
            title: "Github",
            href: "https://github.com/UjjwalSharma01",
        },
        {
            title: "X",
            href: "https://x.com/sharma_ujjwal01",
        },
        {
            title: "Email",
            href: "mailto:ujjwalsh2004@gmail.com",
        },
    ],
    portfolioProjects: [
        {
            company: "Habitual",
            year: "2025",
            title: "AI-powered Habit Tracker",
            results: [
                { title: "Modern, minimalistic habit tracking app powered by AI suggestions and statistics." },
                { title: "Provides detailed feedback to improve routines and consistency among diverse tasks." },
                { title: "Stands out from existing solutions with actionable insights." },
            ],
            link: "https://habitual.ujjwalsharma.tech",
            image: habitualImage,
            linkText: "Live Demo",
        },
        {
            company: "ImageBuddy",
            year: "2025",
            title: "Privacy-focused Image Processing Platform",
            results: [
                { title: "Client-side platform for compression, resizing, and more—no server data harvesting." },
                { title: "Ensures user privacy by processing images locally in the browser." },
                { title: "Empowers users with fundamental image operations securely and efficiently." },
            ],
            link: "https://imagebuddy.vercel.app",
            image: imageBuddy,
            linkText: "Live Demo",
        },
        {
            company: "Pollsay",
            year: "2024",
            title: "Secure Feedback Platform",
            results: [
                { title: "Built secure feedback platform with 3-tier access and pseudonymized responses, boosting feedback by ∼35%." },
                { title: "Built real-time analytics dashboard, reducing processing time by 70% vs. spreadsheet methods." },
                { title: "Earned 4.5/5 rating from 20+ test users for interface design and security features." },
            ],
            link: "https://github.com/UjjwalSharma01/Pollsay",
            image: pollsay,
            linkText: "GitHub Repo",
        },
        {
            company: "Annadata",
            year: "2024",
            title: "Agri Advisory Platform",
            results: [
                { title: "Built agricultural advisory platform for India's farmer crisis (9000+ suicides), focusing on rural support." },
                { title: "Implemented backend with 22 Indian languages support, weather API, and government scheme database." },
                { title: "Developed CNN model on Streamlit cloud achieving over 90% accuracy." },
            ],
            link: "https://github.com/UjjwalSharma01/Anna",
            image: annadata, 
            linkText: "GitHub Repo",
        },
    ],
};

export const email = CONFIG.email;
export const toolBoxItems = CONFIG.toolboxItems;
export const hobbies = CONFIG.hobbies;
export const footerLinks = CONFIG.footerLinks;
export const portfolioProjects = CONFIG.portfolioProjects;
