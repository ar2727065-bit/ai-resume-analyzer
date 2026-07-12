import ResumeCard from "~/components/ResumeCard";
import type { Route } from "./+types/home";
import Navbar from "~/components/navbar";
import { resumes } from "../../constants";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Welcome to Resumind! Your AI-powered resume analyzer." },
  ];
}

export default function Home() {

     const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])
  return <main className = "bg-[url('/images/bg-main.svg')] bg-cover"> 
  <Navbar />  
    <section className = "main-section">
      <div className = "page-heading py-16">
        <h1 className = "main-section-title">Welcome to Resumind</h1>
       <h2 className = "main-section-subtitle">Your AI-powered resume analyzer</h2>
      </div>
    


    {resumes.length > 0 && (
   <div className = "resumes-section">

   {resumes.map((resume) => (
    <ResumeCard key = {resume.id} resume = {resume} />
   ))}

    </div>

    )}
     </section>
  </main>
}
