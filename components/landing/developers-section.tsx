"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check, Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const codeExamples = [
  {
    label: "Install",
    code: `npm install @quolix/sdk

# or
yarn add @quolix/sdk
pnpm add @quolix/sdk`,
  },
  {
    label: "Initialize",
    code: `import { Quolix } from '@quolix/sdk'

const quolix = new Quolix({
  apiKey: process.env.QUOLIX_KEY
})`,
  },
  {
    label: "Deploy",
    code: `const app = await quolix.deploy({
  name: 'my-app',
  region: 'auto',
  scaling: {
    min: 1,
    max: 100
  }
})

console.log('Live at:', app.url)`,
  },
];

const features = [
  { 
    title: "TypeScript native", 
    description: "Full type safety with auto-generated types."
  },
  { 
    title: "Zero config", 
    description: "Sensible defaults engineered by Quolytech."
  },
  { 
    title: "Edge-ready", 
    description: "Runs anywhere: Node, Deno, Bun, browsers."
  },
  { 
    title: "12KB gzipped", 
    description: "Lightweight with zero dependencies."
  },
];

const codeAnimationStyles = `
  .dev-code-line {
    opacity: 0;
    transform: translateX(-8px);
    animation: devLineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  
  @keyframes devLineReveal {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .dev-code-char {
    opacity: 0;
    filter: blur(8px);
    animation: devCharReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  
  @keyframes devCharReveal {
    to {
      opacity: 1;
      filter: blur(0);
    }
  }
`;

export function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    toast.success("Snippet copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimLogs(["$ quolix deploy --env=production"]);
    
    const steps = [
      "✔ Packaging bundle: 12.4 KB (optimized)",
      "✔ Authenticating with Quolytech Edge Gateway... OK",
      "✔ Provisioning across 12 distributed regions...",
      "✔ Edge route established: https://my-app.quolix.sh (21ms latency)",
      "✨ Deployment live and healthy!",
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        setSimLogs((prev) => [...prev, step]);
        if (i === steps.length - 1) {
          setIsSimulating(false);
          toast.success("Simulation complete! App live at https://my-app.quolix.sh");
        }
      }, (i + 1) * 450);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="developers" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
                <span className="w-8 h-px bg-foreground/30" />
                For developers
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-foreground/15 text-muted-foreground bg-foreground/[0.03]">
                Made by Quolytech
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Built by devs.
              <br />
              <span className="text-muted-foreground">For devs.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              A thoughtfully designed SDK that gets out of your way. 
              Ship faster with intuitive APIs, lightning-fast edge execution, and exceptional documentation.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <h3 className="font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right: Code block */}
          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Tabs */}
              <div className="flex items-center border-b border-foreground/10">
                {codeExamples.map((example, idx) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => {
                      setActiveTab(idx);
                      setSimLogs([]);
                    }}
                    className={`px-6 py-4 text-sm font-mono transition-colors relative cursor-pointer ${
                      activeTab === idx && simLogs.length === 0
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {example.label}
                    {activeTab === idx && simLogs.length === 0 && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                    )}
                  </button>
                ))}
                
                {/* Interactive Simulation Tab Trigger */}
                <button
                  type="button"
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className={`px-4 py-4 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                    simLogs.length > 0
                      ? "text-emerald-500 font-medium"
                      : "text-muted-foreground hover:text-emerald-600"
                  }`}
                  title="Run edge deploy simulation"
                >
                  {isSimulating ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Deploying...</span>
                    </>
                  ) : simLogs.length > 0 ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Re-run</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Simulate</span>
                    </>
                  )}
                </button>

                <div className="flex-1" />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {/* Code content or Interactive Simulation Logs */}
              <div className="p-8 font-mono text-sm bg-foreground/[0.01] min-h-[220px]">
                {simLogs.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-foreground/10 pb-2 mb-3">
                      <span>Interactive Terminal</span>
                      <button
                        type="button"
                        onClick={() => setSimLogs([])}
                        className="text-muted-foreground hover:text-foreground underline underline-offset-2"
                      >
                        Back to Code
                      </button>
                    </div>
                    {simLogs.map((log, index) => (
                      <div
                        key={index}
                        className={`leading-relaxed animate-in fade-in-0 slide-in-from-left-2 duration-300 ${
                          log.startsWith("✨") || log.startsWith("✔ Edge")
                            ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                            : log.startsWith("$")
                            ? "text-foreground font-semibold"
                            : "text-foreground/80"
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                ) : (
                  <pre className="text-foreground/80">
                    {codeExamples[activeTab].code.split('\n').map((line, lineIndex) => (
                      <div 
                        key={`${activeTab}-${lineIndex}`} 
                        className="leading-loose dev-code-line"
                        style={{ animationDelay: `${lineIndex * 80}ms` }}
                      >
                        <span className="inline-flex">
                          {line.split('').map((char, charIndex) => (
                            <span
                              key={`${activeTab}-${lineIndex}-${charIndex}`}
                              className="dev-code-char"
                              style={{
                                animationDelay: `${lineIndex * 80 + charIndex * 15}ms`,
                              }}
                            >
                              {char === ' ' ? '\u00A0' : char}
                            </span>
                          ))}
                        </span>
                      </div>
                    ))}
                  </pre>
                )}
              </div>
            </div>
            
            {/* Links */}
            <div className="mt-6 flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <a 
                  href="#how-it-works" 
                  onClick={() => toast.info("Opening Quolix SDK documentation...")}
                  className="text-foreground hover:underline underline-offset-4"
                >
                  Read the docs
                </a>
                <span className="text-foreground/20">|</span>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Quolix GitHub repository is open source.");
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  View on GitHub
                </a>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                v2.4.0 • Zero dependencies
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
