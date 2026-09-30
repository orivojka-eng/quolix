"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import { toast } from "sonner";
import { InteractiveCommandPalette } from "./interactive-command-palette";
import { InteractiveDemoModal } from "./interactive-demo-modal";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Developers", href: "#developers" },
  { name: "Pricing", href: "#pricing" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"demo" | "create" | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Quolytech Single Sign-On", {
      description: "Connecting to secure developer gateway.",
    });
  };

  const handleStartCreating = () => {
    setIsMobileMenuOpen(false);
    setModalMode("create");
  };

  return (
    <>
      <header
        className={`fixed z-50 transition-all duration-500 ${
          isScrolled 
            ? "top-4 left-4 right-4" 
            : "top-0 left-0 right-0"
        }`}
      >
        <nav 
          className={`mx-auto transition-all duration-500 ${
            isScrolled || isMobileMenuOpen
              ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
              : "bg-transparent max-w-[1400px]"
          }`}
        >
          <div 
            className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
              isScrolled ? "h-14" : "h-20"
            }`}
          >
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <span className={`font-display tracking-tight transition-all duration-500 ${isScrolled ? "text-xl" : "text-2xl"}`}>
                Quolix
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-foreground/15 text-[10px] font-mono text-muted-foreground bg-foreground/[0.03]">
                by Quolytech
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </a>
              ))}

              {/* Command Palette Trigger */}
              <button
                type="button"
                onClick={() => setIsCmdOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/10 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all bg-foreground/[0.02]"
                title="Search commands (⌘K)"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
                <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-foreground/10 text-foreground/80 font-mono">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                type="button"
                onClick={handleSignIn} 
                className={`text-foreground/70 hover:text-foreground transition-all duration-500 cursor-pointer ${isScrolled ? "text-xs" : "text-sm"}`}
              >
                Sign in
              </button>
              <Button
                size="sm"
                onClick={handleStartCreating}
                className={`bg-foreground hover:bg-foreground/90 text-background rounded-full transition-all duration-500 cursor-pointer ${isScrolled ? "px-4 h-8 text-xs" : "px-6"}`}
              >
                Start creating
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCmdOpen(true)}
                className="p-2 text-foreground/70 hover:text-foreground"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

        </nav>
        
        {/* Mobile Menu - Full Screen Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
            isMobileMenuOpen 
              ? "opacity-100 pointer-events-auto" 
              : "opacity-0 pointer-events-none"
          }`}
          style={{ top: 0 }}
        >
          <div className="flex flex-col h-full px-8 pt-28 pb-8">
            {/* Navigation Links */}
            <div className="flex-1 flex flex-col justify-center gap-8">
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-5xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                    isMobileMenuOpen 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* Bottom CTAs */}
            <div className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${
              isMobileMenuOpen 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
            >
              <Button 
                variant="outline" 
                className="flex-1 rounded-full h-14 text-base"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleSignIn(e);
                }}
              >
                Sign in
              </Button>
              <Button 
                className="flex-1 bg-foreground text-background rounded-full h-14 text-base"
                onClick={handleStartCreating}
              >
                Start creating
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Command Palette */}
      <InteractiveCommandPalette 
        open={isCmdOpen} 
        onOpenChange={setIsCmdOpen} 
      />

      {/* Interactive Modal */}
      {modalMode && (
        <InteractiveDemoModal
          isOpen={true}
          onClose={() => setModalMode(null)}
          mode={modalMode}
        />
      )}
    </>
  );
}
