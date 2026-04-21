import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — Money Tree Conversions",
  description:
    "How Money Tree Conversions collects, uses, and protects personal information for our real estate lead platform.",
}

export default function PrivacyPage() {
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
          Privacy Policy — Money Tree Conversions
        </h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: April 21, 2026</p>

        <div className="space-y-8 text-[15px] sm:text-base leading-relaxed text-foreground/90">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">1. Who we are</h2>
            <p>
              Money Tree Conversions (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides an online
              software platform for real estate professionals to help generate, qualify, and follow up with
              leads using automation and artificial intelligence.
            </p>
            <p>
              <strong className="text-foreground">Mailing address:</strong> 2207 90B St, Edmonton, AB,
              Canada.
            </p>
            <p>
              <strong className="text-foreground">Contact (privacy):</strong>{" "}
              <a
                href="mailto:adminmtree@gmail.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                adminmtree@gmail.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">2. Scope</h2>
            <p>
              This policy describes how we collect, use, disclose, and protect personal information when you:
              (a) visit our public website; (b) create or use an account for our service at{" "}
              <a
                href="https://app.moneytreeleads.ca"
                className="text-primary underline-offset-4 hover:underline"
              >
                https://app.moneytreeleads.ca
              </a>
              ; (c) communicate with us; or (d) use features that process information about you or, where you
              are a business user, your leads and customers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">3. What we collect</h2>
            <p>We may collect:</p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                <strong className="text-foreground">Account and profile data</strong> — e.g. name, email,
                phone, brokerage or team name, billing details (processed by our payment provider where
                applicable), and password or authentication credentials in hashed form.
              </li>
              <li>
                <strong className="text-foreground">Service and usage data</strong> — e.g. IP address,
                device/browser type, log data, feature usage, approximate location derived from IP, and
                timestamps.
              </li>
              <li>
                <strong className="text-foreground">Content you or your leads provide</strong> — e.g.
                messages, form submissions, chat transcripts, scheduling information, and similar content
                processed through the platform.
              </li>
              <li>
                <strong className="text-foreground">Integrations</strong> — when you connect third-party
                services (e.g. calendar or CRM), we receive the information you authorize (such as tokens
                and content needed to provide the integration).
              </li>
              <li>
                <strong className="text-foreground">Support</strong> — information you send when you contact
                us.
              </li>
              <li>
                <strong className="text-foreground">Cookies and similar technologies</strong> on our site
                and app, where used for session, preferences, security, and analytics.
              </li>
            </ul>
            <p>
              We do not use this policy to override any{" "}
              <strong className="text-foreground">MLS board, association, or regulatory</strong> obligations
              that apply to you as a real estate professional; you remain responsible for compliance with the
              rules of your profession.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">4. How we use personal information</h2>
            <p>
              We use information to: provide, maintain, and improve the service; authenticate users; process
              subscriptions and payments; send operational and, where permitted, service-related
              communications; provide customer support; secure our systems; analyze usage; train and operate
              machine-learning models <em>only as permitted by our agreements and this policy</em>; and
              comply with law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">5. AI and automated processing</h2>
            <p>
              Parts of the service use artificial intelligence to interpret inputs, suggest or send
              follow-ups, and assist with lead handling.{" "}
              <strong className="text-foreground">Outputs may be inaccurate or incomplete.</strong> You are
              responsible for reviewing information before relying on it in a transaction or with clients.
              We do not use your personal information to make decisions that produce legal or similarly
              significant effects <em>solely</em> by automated means without human involvement where that is
              not permitted by law, except as described in product terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">6. When we share information</h2>
            <p>
              We may share information with: <strong className="text-foreground">service providers</strong>{" "}
              who host, secure, process payments, send email/SMS, provide analytics, or help us run the
              product (only as needed and subject to appropriate safeguards);{" "}
              <strong className="text-foreground">professional advisers</strong> (e.g. lawyers, accountants)
              when required; <strong className="text-foreground">successors</strong> in a merger, acquisition,
              or asset sale; and <strong className="text-foreground">authorities</strong> when we believe in
              good faith that disclosure is required by law, court order, or to protect rights, safety, or
              security. We do not sell your personal information in the ordinary sense of selling lists to
              random marketers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">7. International transfers</h2>
            <p>
              Your information may be processed in Canada, the United States, and other countries where our
              subprocessors operate. When personal information is transferred across borders, we use
              contractual or other means that provide a comparable level of protection where required by
              applicable law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">8. Retention</h2>
            <p>
              We keep personal information only as long as needed for the purposes above, to resolve
              disputes, enforce agreements, and meet legal, accounting, and reporting requirements. Retention
              periods vary by data type; contact us for more detail about specific categories.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">9. Your choices and rights (Canada)</h2>
            <p>
              Depending on applicable law, you may have the right to request{" "}
              <strong className="text-foreground">access</strong> to, <strong className="text-foreground">correction</strong>{" "}
              of, or <strong className="text-foreground">deletion</strong> of your personal information; to{" "}
              <strong className="text-foreground">withdraw consent</strong> (where processing is consent-based),
              subject to legal or contractual restrictions; to <strong className="text-foreground">complain</strong>{" "}
              to the Office of the Privacy Commissioner of Canada (OPC) or your provincial privacy commissioner
              where applicable.
            </p>
            <p>
              <strong className="text-foreground">Requests:</strong>{" "}
              <a
                href="mailto:adminmtree@gmail.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                adminmtree@gmail.com
              </a>
              . We may need to verify your identity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">10. Security</h2>
            <p>
              We use reasonable technical and organizational measures to protect personal information. No
              system is 100% secure; you should use a strong password and protect your account credentials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">11. Children</h2>
            <p>
              The service is not directed to individuals under 18 (or the age of majority in your province).
              We do not knowingly collect personal information from children for consumer purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">12. Changes</h2>
            <p>
              We may update this policy from time to time. We will post the updated version and revise the
              &quot;Last updated&quot; date. Material changes may be highlighted in-app or by email where
              appropriate.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">13. Contact</h2>
            <p>
              Questions:{" "}
              <a
                href="mailto:adminmtree@gmail.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                adminmtree@gmail.com
              </a>
              .
            </p>
            <p>
              <strong className="text-foreground">Address:</strong> 2207 90B St, Edmonton, AB, Canada.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
