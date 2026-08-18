import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service — Money Tree Conversions",
  description:
    "Terms governing use of Money Tree Conversions software and services for real estate professionals.",
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 py-4">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Terms of Service — Money Tree Conversions
        </h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: April 21, 2026</p>

        <div className="space-y-8 text-[15px] sm:text-base leading-relaxed text-foreground/90">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">1. Agreement</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of the websites,
              applications, and services operated by or on behalf of Money Tree Conversions (the
              &quot;Service&quot;). <strong className="text-foreground">By using the Service, you agree to these Terms.</strong> If you are accepting on behalf of a company, you represent that you have authority to bind that company.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">2. The Service</h2>
            <p>
              The Service is a business software platform for real estate professionals, including lead
              capture, follow-up, automation, and related tools. We may add, change, or discontinue features.{" "}
              <strong className="text-foreground">
                The Service is not a substitute for professional, legal, or compliance advice
              </strong>{" "}
              regarding real estate, advertising, or privacy obligations you owe to your clients.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">3. Eligibility and accounts</h2>
            <p>
              You must be <strong className="text-foreground">legally able to form a binding contract</strong>{" "}
              in your jurisdiction (typically 18+ or the age of majority) and, where applicable, licensed or
              authorized in your real estate market. You are responsible for all activity under your account
              and for maintaining the <strong className="text-foreground">confidentiality of your credentials</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">4. Your conduct and acceptable use</h2>
            <p>You will not:</p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                use the Service unlawfully, fraudulently, or in violation of real-estate or marketing rules;
              </li>
              <li>upload malware or try to break or overload our systems;</li>
              <li>scrape, reverse engineer, or try to access non-public areas without permission;</li>
              <li>use the Service to send spam or harass others;</li>
              <li>misrepresent your identity or your brokerage; or</li>
              <li>
                use the Service in a way that infringes others&apos; intellectual property or privacy rights.
              </li>
            </ul>
            <p>
              We may <strong className="text-foreground">suspend or terminate</strong> access for violations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">5. Your content and data</h2>
            <p>
              You retain ownership of content you provide. You grant us a{" "}
              <strong className="text-foreground">non-exclusive, worldwide license</strong> to host, use,
              process, and display that content <em>only</em> as needed to provide and improve the Service,
              consistent with our Privacy Policy. <strong className="text-foreground">You</strong> represent
              that you have the <strong className="text-foreground">rights and consents</strong> needed to use
              and submit lead, client, or third-party data (including for automated messaging and AI features).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">6. Subscriptions, fees, and taxes</h2>
            <p>
              Fees and plans (e.g. as shown on our website) are as offered at the time of purchase, unless you
              have a <strong className="text-foreground">separate written agreement</strong>. Fees are typically
              billed in advance; <strong className="text-foreground">taxes</strong> (including GST/HST or other
              applicable taxes) may be added. <strong className="text-foreground">No refunds</strong> are
              guaranteed except as required by law or as explicitly stated in your plan; contact us to discuss
              enterprise or custom terms if applicable. We may <strong className="text-foreground">change</strong>{" "}
              pricing for future terms with <strong className="text-foreground">reasonable prior notice</strong>{" "}
              where required by law or contract.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">7. Free trials</h2>
            <p>
              If we offer a trial, we may end it and begin billing unless you cancel in accordance with the
              instructions we provide.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">8. AI disclaimer</h2>
            <p>
              The Service may use AI that generates or suggests text or actions.{" "}
              <strong className="text-foreground">You are responsible</strong> for compliance with your
              regulatory body and for <strong className="text-foreground">reviewing and approving</strong>{" "}
              communications before they are sent. We do not warrant that AI output is accurate, complete, or
              free from bias.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">9. Third-party services</h2>
            <p>
              Integrations (e.g. calendar, CRM) are subject to the third party&apos;s terms. We are not
              responsible for third-party services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">10. Intellectual property</h2>
            <p>
              The Service, including software, text, design, and branding, is owned by us and our licensors.{" "}
              <strong className="text-foreground">No</strong> rights are granted except the limited right to use
              the Service under these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">11. Confidentiality</h2>
            <p>
              We may have access to business information you provide. We will use reasonable efforts to protect
              it as described in our Privacy Policy and, where we enter into a{" "}
              <strong className="text-foreground">separate NDA</strong> or BAA, those terms will govern if they
              apply.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">12. Warranties</h2>
            <p className="uppercase tracking-tight text-sm sm:text-[15px] font-medium text-foreground">
              The service is provided &quot;as is&quot; and &quot;as available.&quot; To the maximum extent
              permitted by applicable law, we disclaim all warranties, express or implied, including
              merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">13. Limitation of liability</h2>
            <p className="uppercase tracking-tight text-sm sm:text-[15px] font-medium text-foreground">
              To the maximum extent permitted by applicable law: (A) in no event will our total liability
              exceed the amounts paid by you to us for the service in the six (6) months before the claim; (B)
              we are not liable for indirect, incidental, special, consequential, or punitive damages, or lost
              profits, data, or goodwill, even if advised of the possibility. Some jurisdictions do not allow
              certain limitations; in that case, our liability is limited to the maximum permitted by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">14. Indemnity</h2>
            <p>
              You will <strong className="text-foreground">defend and indemnify</strong> us and our officers,
              employees, and affiliates against claims arising from: your use of the Service; your content;
              your violation of these Terms; or your violation of third-party rights, including your clients
              and leads.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">15. Term and termination</h2>
            <p>
              These Terms apply while you use the Service. We may <strong className="text-foreground">suspend</strong>{" "}
              or <strong className="text-foreground">terminate</strong> access for breach, risk, or legal reasons.
              You may <strong className="text-foreground">stop using</strong> the Service; subscription sections
              above govern fees where applicable. Provisions that by nature should survive (e.g. liability
              limits, indemnity) survive termination.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">16. Governing law and venue</h2>
            <p>
              These Terms are governed by the{" "}
              <strong className="text-foreground">laws of the Province of Alberta and the laws of Canada applicable therein</strong>, without regard to conflict-of-law rules. You{" "}
              <strong className="text-foreground">irrevocably</strong> submit to the{" "}
              <strong className="text-foreground">exclusive jurisdiction</strong> of the courts in{" "}
              <strong className="text-foreground">Edmonton, Alberta</strong>, except that we may seek injunctive
              or equitable relief in any competent court.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">17. General</h2>
            <p>
              <strong className="text-foreground">Entire agreement</strong> (together with the Privacy Policy
              and any order form) constitutes the full agreement, unless a separate{" "}
              <strong className="text-foreground">signed</strong> agreement with you says otherwise. Severability;
              assignment; notices. We may assign these Terms; you may not without our consent.{" "}
              <strong className="text-foreground">Notices</strong> to you may be by email to your account. The{" "}
              <strong className="text-foreground">English</strong> version prevails if translated.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">18. Contact</h2>
            <p>
              <strong className="text-foreground">Address:</strong> 2207 90B St, Edmonton, AB, Canada.{" "}
              <strong className="text-foreground">Email:</strong>{" "}
              <a
                href="mailto:adminmtree@gmail.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                adminmtree@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
