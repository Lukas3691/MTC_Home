"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Check, ArrowRight } from "lucide-react"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-xl font-bold text-foreground hover:opacity-80 transition-opacity"
              >
                Money Tree Conversions
              </button>
            </div>

            {/* Center Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                How it Works
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                FAQ
              </button>
            </div>

            {/* Right CTA Buttons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://mtc-realty-app.vercel.app/login"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 hidden sm:inline-flex"
              >
                Login
              </a>
              <a
                href="https://mtc-realty-app.vercel.app/signup"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 hidden sm:inline-flex"
              >
                Join up
              </a>
              <a
                href="https://mtc-realty-app.vercel.app/signup"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 sm:hidden"
              >
                Join up
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            {/* Left side - Text content */}
            <div className="flex-1 max-w-2xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6" style={{ lineHeight: '1.1' }}>
                REAL ESTATE LEADS, FINALLY ON <span className="font-extrabold text-[var(--primary)]">AUTOPILOT</span>.
              </h1>
              <p className="text-lg sm:text-xl text-foreground/70 mb-8 max-w-2xl leading-relaxed">
                AI-powered lead generation + follow-up for Canadian realtors. More showings, more closings—without chasing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://mtc-realty-app.vercel.app/signup"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 text-base py-6"
                >
                  Try it out
                </a>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-6"
                  onClick={() => scrollToSection("how-it-works")}
                >
                  See how it works
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right side - Wireframe house + growth chart */}
            <div className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end items-start">
              <div className="relative w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl min-h-[280px] flex items-start justify-center -mt-4">
                <Image
                  src="/hero-wireframe-house.png"
                  alt="Wireframe house with growth chart - real estate leads on autopilot"
                  width={720}
                  height={480}
                  className="w-full h-auto max-h-[min(85vh,560px)] object-contain object-center object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-12 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground mb-6">
            Trusted by Canadian Realtors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="text-lg font-semibold">REALTOR.ca</div>
            <div className="text-lg font-semibold">CREA</div>
            <div className="text-lg font-semibold">Real Estate Boards</div>
            <div className="text-lg font-semibold">Independent Agents</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need to grow your real estate business
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for Canadian markets, our AI platform handles lead generation and conversion so you can focus on closing deals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Lead Capture</CardTitle>
                <CardDescription>
                  Smart forms and chat widgets that capture leads 24/7, even when you're not available.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Follow-Up</CardTitle>
                <CardDescription>
                  Lightning-fast response times. Our AI reaches out to leads within seconds, not hours.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Scoring & Routing</CardTitle>
                <CardDescription>
                  Automatically prioritize hot leads and route them to the right agent at the right time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendar Booking</CardTitle>
                <CardDescription>
                  Let leads book showings directly. Syncs with your calendar to prevent double-booking.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CRM Integrations</CardTitle>
                <CardDescription>
                  Seamlessly connect with your existing CRM. Works with all major platforms used in Canada.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reporting & Conversion Tracking</CardTitle>
                <CardDescription>
                  See exactly where your leads come from and which strategies convert best. Data-driven insights.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 sm:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How it Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes. No technical knowledge required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Set Up Your Profile</h3>
              <p className="text-muted-foreground">
                Connect your CRM, add your calendar, and customize your AI assistant's personality to match your brand.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Deploy Lead Capture</h3>
              <p className="text-muted-foreground">
                Add our AI-powered forms and chat widgets to your website. They work automatically, capturing leads around the clock.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Watch Leads Convert</h3>
              <p className="text-muted-foreground">
                Our AI handles initial follow-up, qualifies leads, books showings, and hands off hot prospects directly to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Canadian Realtors Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardDescription className="text-base mb-4">
                  "I went from spending hours chasing leads to having qualified prospects book showings automatically. My conversion rate doubled in the first month."
                </CardDescription>
                <div>
                  <CardTitle className="text-lg">Sarah Chen</CardTitle>
                  <p className="text-sm text-muted-foreground">Toronto Real Estate Agent</p>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardDescription className="text-base mb-4">
                  "The AI follow-up is incredible. Leads get responses in seconds, and I only hear about the ones that are actually ready to buy. Game changer."
                </CardDescription>
                <div>
                  <CardTitle className="text-lg">Michael Thompson</CardTitle>
                  <p className="text-sm text-muted-foreground">Vancouver Real Estate Professional</p>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardDescription className="text-base mb-4">
                  "Built for Canadian markets means it understands our MLS system and local regulations. Finally, a tool that gets it."
                </CardDescription>
                <div>
                  <CardTitle className="text-lg">Jennifer Martinez</CardTitle>
                  <p className="text-sm text-muted-foreground">Calgary Real Estate Specialist</p>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 sm:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your business. All plans include our core AI features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$699</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-4">
                  Perfect for solo agents getting started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">Up to 50 leads/month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">AI follow-up included</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">Basic CRM integration</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">Email support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan - Most Popular */}
            <Card className="border-primary border-2 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                Most Popular
              </Badge>
              <CardHeader>
                <CardTitle>Professional</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$1099</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-4">
                  For growing teams and busy agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">Up to 200 leads/month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">Advanced AI follow-up</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">Lead scoring & routing</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">Calendar booking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">All CRM integrations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <CardDescription className="mt-4">
                  For brokerages and large teams
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">Unlimited leads</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">Multi-agent routing</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">Custom AI training</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">White-label options</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-sm">Dedicated account manager</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How does the AI lead generation work?
                </AccordionTrigger>
                <AccordionContent>
                  Our AI-powered forms and chat widgets capture leads from your website 24/7. The AI then immediately follows up with personalized messages, qualifies the lead, and can even book showings directly into your calendar. Hot leads are routed to you in real-time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Is this built specifically for Canadian real estate?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! Money Tree Conversions is built specifically for Canadian markets. We understand MLS systems, local regulations, and the unique needs of Canadian realtors. Our AI is trained on Canadian real estate data and terminology.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  What CRM systems do you integrate with?
                </AccordionTrigger>
                <AccordionContent>
                  We integrate with all major CRM platforms used in Canada, including Salesforce, HubSpot, Follow Up Boss, LionDesk, and many others. If you use a specific CRM, contact us and we'll work to add it.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  How quickly will I see results?
                </AccordionTrigger>
                <AccordionContent>
                  Most agents see qualified leads coming in within the first week. The AI starts working immediately after setup, and you'll typically see improved conversion rates within the first month as the system learns your preferences and market.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Can I customize the AI's responses?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely. You can customize the AI's tone, personality, and responses to match your brand. You can also set specific rules for how leads are handled, what information is collected, and when you want to be notified.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>
                  Is there a contract or can I cancel anytime?
                </AccordionTrigger>
                <AccordionContent>
                  No long-term contracts. You can cancel your subscription at any time. We're confident you'll love the results, but we want you to stay because it works, not because you're locked in.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to grow your real estate business?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join Canadian realtors who are already using AI to generate and convert more leads. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://mtc-realty-app.vercel.app/signup"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 text-base py-6"
              >
                Try it out
              </a>
              <a
                href="https://mtc-realty-app.vercel.app/signup"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 text-base py-6"
              >
                Join up
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Money Tree Conversions. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
