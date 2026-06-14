import { AlertTriangle, Bell, CalendarDays, Home, MoreVertical, Search } from "lucide-react";
import Link from "next/link";
import { AIAssistant } from "@/components/AIAssistant";
import { actionCards, leadStatusTabs, leadSummary } from "@/lib/dummy-data";

export default function HomePage() {
  return (
    <main className="phone-shell">
      <StatusBar time="5:11" battery="44" />
      <TopTabs tabs={leadStatusTabs} active="HOME" hrefFor={(tab) => (tab === "HOME" ? "/" : "/leads")} />

      <section className="screen home-screen">
        <h1>Upcoming events for today</h1>
        <div className="notice-strip">
          <span className="notice-left">
            <AlertTriangle size={26} strokeWidth={2.4} />
            No Event Scheduled
          </span>
          <Link href="/leads">Schedule Now</Link>
        </div>

        <h2>Action Required</h2>
        <div className="action-stack">
          {actionCards.map((card) => (
            <Link className="action-card" href={card.href} key={card.title}>
              <span>
                <strong>{card.title}</strong>
                <em>{card.action}</em>
              </span>
              <MiniIllustration type={card.illustration} />
            </Link>
          ))}
        </div>

        <h2>Leads Summary</h2>
        <div className="summary-grid">
          {leadSummary.map((item) => (
            <div className="summary-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <BottomNav active="Home" />
      <AIAssistant
        context={{
          screen: "home",
          label: "Home tab",
          summary: "Home tab · no event scheduled · 2 outdated events · 11 ignored leads",
        }}
      />
    </main>
  );
}

function TopTabs({
  tabs,
  active,
  hrefFor,
}: {
  tabs: string[];
  active: string;
  hrefFor: (tab: string) => string;
}) {
  return (
    <nav className="top-tabs" aria-label="Lead sections">
      {tabs.map((tab) => (
        <Link
          aria-current={tab === active ? "page" : undefined}
          className={tab === active ? "active" : ""}
          href={hrefFor(tab)}
          key={tab}
        >
          {tab}
        </Link>
      ))}
    </nav>
  );
}

function StatusBar({ time, battery }: { time: string; battery: string }) {
  return (
    <div className="status-bar" aria-hidden="true">
      <span className="status-time">{time}</span>
      <span className="dynamic-island">
        <span />
      </span>
      <span className="status-icons">
        <span className="signal" />
        <span>5G</span>
        <span className="battery">{battery}</span>
      </span>
    </div>
  );
}

function BottomNav({ active }: { active: string }) {
  const items = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Calendar", icon: CalendarDays, href: "/calendar" },
    { label: "Search", icon: Search, href: "/leads" },
    { label: "Notifications", icon: Bell, href: "/leads" },
    { label: "More", icon: MoreVertical, href: "/leads" },
  ];

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map(({ label, icon: Icon, href }) => (
        <Link className={label === active ? "active" : ""} href={href} key={label}>
          <Icon size={34} strokeWidth={2.5} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

function MiniIllustration({ type }: { type: string }) {
  return (
    <div className={`mini-illustration ${type}`} aria-hidden="true">
      <div className="illustration-disc" />
      <div className="illustration-page" />
      <div className="illustration-person" />
      <div className="illustration-accent" />
    </div>
  );
}
