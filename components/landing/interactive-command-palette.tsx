"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { toast } from "sonner";
import { 
  Laptop, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Layers, 
  Copy, 
  ExternalLink, 
  Play, 
  Building2 
} from "lucide-react";

interface InteractiveCommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRunSimulation?: () => void;
}

export function InteractiveCommandPalette({
  open,
  onOpenChange,
  onRunSimulation,
}: InteractiveCommandPaletteProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const handleNavigate = (id: string, name: string) => {
    onOpenChange(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      toast.info(`Navigated to ${name}`);
    }
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText("npm install @quolix/sdk");
    onOpenChange(false);
    toast.success("Copied `npm install @quolix/sdk` to clipboard!");
  };

  const handleSimulate = () => {
    onOpenChange(false);
    if (onRunSimulation) {
      onRunSimulation();
    } else {
      const devEl = document.getElementById("developers");
      if (devEl) devEl.scrollIntoView({ behavior: "smooth" });
      toast.success("Quolix build triggered across 12 edge nodes!");
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search Quolix..." />
      <CommandList>
        <CommandEmpty>No matching command found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => handleNavigate("features", "Features")}>
            <Sparkles className="mr-2 h-4 w-4 text-foreground/70" />
            <span>Capabilities & Features</span>
            <CommandShortcut>#features</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("how-it-works", "How It Works")}>
            <Layers className="mr-2 h-4 w-4 text-foreground/70" />
            <span>Workflow & Architecture</span>
            <CommandShortcut>#process</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("developers", "Developers")}>
            <Terminal className="mr-2 h-4 w-4 text-foreground/70" />
            <span>Developers & SDK</span>
            <CommandShortcut>#sdk</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("pricing", "Pricing")}>
            <CreditCard className="mr-2 h-4 w-4 text-foreground/70" />
            <span>Pricing & Plans</span>
            <CommandShortcut>#pricing</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("security", "Security")}>
            <ShieldCheck className="mr-2 h-4 w-4 text-foreground/70" />
            <span>Enterprise Security</span>
            <CommandShortcut>#security</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={handleCopyCommand}>
            <Copy className="mr-2 h-4 w-4 text-foreground/70" />
            <span>Copy SDK Install Command</span>
            <CommandShortcut>npm i</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={handleSimulate}>
            <Play className="mr-2 h-4 w-4 text-emerald-500" />
            <span>Run Edge Deployment Simulation</span>
            <CommandShortcut>⌘R</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => {
            onOpenChange(false);
            toast.success("Made by Quolytech — Next-generation AI platform engineering.");
          }}>
            <Building2 className="mr-2 h-4 w-4 text-foreground/70" />
            <span>About Quolytech</span>
            <CommandShortcut>Made by Quolytech</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
