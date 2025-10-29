"use client";

import { BookOpen } from "lucide-react";

interface ResearchPaper {
  title: string;
  link: string;
}

const researchPapers: ResearchPaper[] = [
  { title: "AI in Modern Education", link: "/research/ai-education.pdf" },
  {
    title: "Sustainable Energy Solutions",
    link: "/research/sustainable-energy.pdf",
  },
  { title: "Blockchain in Finance", link: "/research/blockchain-finance.pdf" },
  { title: "Advanced Robotics", link: "/research/advanced-robotics.pdf" },
  {
    title: "Environmental Studies",
    link: "/research/environmental-studies.pdf",
  },
];

export default function Research() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-purple-700 mb-12">
          Research Papers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchPapers.map((paper, index) => (
            <a
              key={index}
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start gap-3 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-2 text-purple-700">
                <BookOpen size={20} />
                <h3 className="text-lg font-semibold">{paper.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Click to view the full research paper.
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
