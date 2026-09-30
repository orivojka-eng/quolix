"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    name: "Starter",
    description: "For individuals and small projects",
    price: { monthly: 0, annual: 0 },
    features: [
      "Up to 3 projects",
      "1GB edge storage",
      "Community support",
      "Basic analytics",
      "Automatic SSL",
    ],
    cta: "Start free",
    popular: false,
  },
  {
    name: "Pro",
    description: "For growing teams and businesses",
    price: { monthly: 29, annual: 24 },
    features: [
      "Unlimited projects",
      "100GB edge storage",
      "Priority 24/7 support",
      "Advanced analytics",
      "Custom domains",
      "Team collaboration",
      "Quolix API access",
    ],
    cta: "Start trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale operations",
    price: { monthly: null, annual: null },
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "Dedicated Quolytech architect",
      "Custom integrations",
      "99.999% SLA guarantee",
      "On-premise option",
      "SOC 2 compliance",
      "Custom contracts",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("Pro");

  const handlePlanAction = (planName: string, cta: string) => {
    setSelectedPlan(planName);
    if (planName === "Starter") {
      toast.success("Starter Plan selected!", {
        description: "Zero credit card required. Initializing workspace...",
      });
    } else if (planName === "Pro") {
      toast.success("Pro Plan selected (14-day free trial)!", {
        description: "All premium features unlocked. Engineered by Quolytech.",
      });
    } else {
      toast.info("Quolytech Enterprise Sales", {
        description: "Connecting you with an enterprise solutions architect.",
      });
    }
  };

  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Pricing
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-foreground/15 text-muted-foreground bg-foreground/[0.03]">
              Made by Quolytech
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            Simple, transparent
            <br />
            <span className="text-stroke">pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Start free and scale as you grow with Quolix. No hidden fees, no surprises.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center gap-4 mb-16">
          <button
            type="button"
            onClick={() => setIsAnnual(false)}
            className={`text-sm transition-colors cursor-pointer ${
              !isAnnual ? "text-foreground font-medium" : "text-muted-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 bg-foreground/10 rounded-full p-1 transition-colors hover:bg-foreground/20 cursor-pointer"
            aria-label="Toggle annual billing"
          >
            <div
              className={`w-5 h-5 bg-foreground rounded-full transition-transform duration-300 ${
                isAnnual ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
          <button
            type="button"
            onClick={() => setIsAnnual(true)}
            className={`text-sm transition-colors cursor-pointer ${
              isAnnual ? "text-foreground font-medium" : "text-muted-foreground"
            }`}
          >
            Annual
          </button>
          {isAnnual && (
            <span className="ml-2 px-2 py-1 bg-foreground text-primary-foreground text-xs font-mono rounded">
              Save 17%
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {plans.map((plan, idx) => {
            const isSelected = selectedPlan === plan.name;
            return (
              <div
                key={plan.name}
                onClick={() => setSelectedPlan(plan.name)}
                className={`relative p-8 lg:p-12 bg-background transition-all cursor-pointer ${
                  plan.popular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-foreground" : ""
                } ${isSelected && !plan.popular ? "ring-1 ring-foreground/40" : ""}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest">
                    Most Popular
                  </span>
                )}

                {/* Plan Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-foreground/5 text-foreground">
                        Selected
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-3xl text-foreground mt-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-foreground/10">
                  {plan.price.monthly !== null ? (
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-5xl lg:text-6xl text-foreground">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  ) : (
                    <span className="font-display text-4xl text-foreground">Custom</span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanAction(plan.name, plan.cta);
                  }}
                  className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group cursor-pointer ${
                    plan.popular
                      ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                      : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          All plans include automatic updates, HTTPS, and DDoS protection.{" "}
          <button 
            type="button"
            onClick={() => toast.info("Full feature comparison matrix", {
              description: "Quolix delivers 99.99% uptime, global CDN, and zero configuration."
            })}
            className="underline underline-offset-4 hover:text-foreground transition-colors cursor-pointer"
          >
            Compare all features
          </button>
        </p>
      </div>
    </section>
  );
}
