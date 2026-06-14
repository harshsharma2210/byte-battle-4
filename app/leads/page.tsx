"use client";

import { ArrowRight, CalendarDays, FileText, Phone, Plus, Wrench } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AIAssistant } from "@/components/AIAssistant";
import { interested3BhkLeads, leadStatusTabs, leads } from "@/lib/dummy-data";

type LeadListItem = {
  id: string;
  name: string;
  project: string;
  meta: string;
  alert: string;
  nextStep: string;
  primaryAction: string;
  configuration?: string;
};

export default function LeadsPage() {
  const [activeBucket, setActiveBucket] = useState("CLAIMED");
  const [configurationFilter, setConfigurationFilter] = useState("");
  const [toast, setToast] = useState("");

  const visibleLeads: LeadListItem[] =
    activeBucket === "INTERESTED" && configurationFilter === "3BHK" ? interested3BhkLeads : leads;
  const title =
    activeBucket === "INTERESTED" && configurationFilter === "3BHK"
      ? `${visibleLeads.length} Interested Leads`
      : `${visibleLeads.length} Claimed Leads`;

  return (
    <main className="phone-shell">
      <StatusBar time="5:10" battery="45" />
      <nav className="top-tabs leads-tabs" aria-label="Lead status">
        {leadStatusTabs.map((tab) => (
          <Link
            aria-current={tab === activeBucket ? "page" : undefined}
            className={tab === activeBucket ? "active" : ""}
            href={tab === "HOME" ? "/" : "/leads"}
            key={tab}
            onClick={(event) => {
              if (tab !== "HOME") {
                event.preventDefault();
                setActiveBucket(tab);
                setConfigurationFilter("");
                setToast("");
              }
            }}
          >
            {tab}
          </Link>
        ))}
      </nav>

      <section className="screen leads-screen">
        <div className="lead-list-header">
          <h1>{title}</h1>
          {configurationFilter && <span>{configurationFilter}</span>}
        </div>
        <div className="lead-list">
          {visibleLeads.map((lead) => (
            <article className="lead-card" key={lead.id}>
              <div className="lead-temperature" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="lead-meta">
                <Wrench size={18} />
                {lead.meta}
                <span>•</span>
                <ArrowRight size={18} />
                TRANSFERRED
              </div>
              <h2>{lead.name}</h2>
              <p>{lead.project}</p>
              {lead.configuration && <div className="config-chip">{lead.configuration}</div>}
              <div className="lead-alert">
                <span>!</span>
                {lead.alert}
              </div>
              <div className="lead-row">
                <strong>{lead.nextStep}</strong>
                {lead.primaryAction === "Schedule" ? (
                  <button type="button" className="outline-pill">
                    Schedule
                  </button>
                ) : (
                  <button type="button" className="outline-pill">
                    Call
                  </button>
                )}
              </div>
              <div className="enquiries">
                <FileText size={22} />
                2 Enquiries made so far
              </div>
              <div className="lead-actions" aria-label={`Actions for ${lead.name}`}>
                <Link href="/leads/kartik" aria-label="Open lead">
                  <ArrowRight size={42} />
                </Link>
                <button type="button" aria-label="Schedule event">
                  <CalendarDays size={38} />
                </button>
                <button type="button" aria-label="Call lead">
                  <Phone size={38} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Link className="floating-add" href="/leads/kartik" aria-label="Add lead">
        <Plus size={66} />
      </Link>
      <BottomNav active="Search" />
      {toast && <div className="filter-toast">{toast}</div>}
      <AIAssistant
        context={{
          screen: "bucket",
          label: `${activeBucket.toLowerCase().replaceAll("_", " ")} leads`,
          bucket: activeBucket,
          leadCount: visibleLeads.length,
        }}
        onActionComplete={(action) => {
          if (action.type === "filter_leads" && action.targetBucket === "INTERESTED" && action.filter === "3BHK") {
            setActiveBucket("INTERESTED");
            setConfigurationFilter("3BHK");
            setToast("Filter applied: 3BHK");
          }
        }}
      />
    </main>
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
    ["Home", "home"],
    ["Calendar", "calendar"],
    ["Search", "search"],
    ["Notifications", "bell"],
    ["More", "more"],
  ] as const;

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map(([label, icon]) => (
        <Link className={label === active ? "active" : ""} href={label === "Home" ? "/" : label === "Calendar" ? "/calendar" : "/leads"} key={label}>
          <NavIcon name={icon} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

function NavIcon({ name }: { name: "home" | "calendar" | "search" | "bell" | "more" }) {
  const icons = {
    home: <span className="nav-house" />,
    calendar: <CalendarDays size={34} strokeWidth={2.5} />,
    search: <span className="nav-search" />,
    bell: <span className="nav-bell" />,
    more: <span className="nav-more" />,
  };
  return icons[name];
}
