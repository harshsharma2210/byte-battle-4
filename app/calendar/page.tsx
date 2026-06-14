"use client";

import {
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  Home,
  MoreVertical,
  Phone,
  Plus,
  Search,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AIAssistant } from "@/components/AIAssistant";
import { calendarAgenda, calendarDays } from "@/lib/dummy-data";

export default function CalendarPage() {
  const [completedSiteVisit, setCompletedSiteVisit] = useState<{
    eventId: string;
    comment: string;
  } | null>(null);

  return (
    <main className="phone-shell">
      <StatusBar time="2:11" battery="89" />
      <header className="calendar-week">
        <div className="week-strip" aria-label="Calendar week">
          {calendarDays.map((day) => (
            <button
              aria-pressed={day.active}
              className={day.active ? "active" : ""}
              type="button"
              key={`${day.day}-${day.date}`}
            >
              <span>{day.day}</span>
              <strong>{day.date}</strong>
            </button>
          ))}
        </div>
        <span className="week-handle" />
      </header>

      <section className="calendar-screen">
        {calendarAgenda.map((day) => (
          <article className="agenda-day" key={`${day.day}-${day.date}`}>
            <div className="agenda-date">
              <strong>{day.date}</strong>
              <span>{day.day}</span>
            </div>
            <div className="agenda-content">
              {day.summary && <h1 className={day.events[0]?.kind ?? ""}>{day.summary}</h1>}
              {day.events.map((event) => (
                <div
                  className={`agenda-event ${event.kind} ${
                    completedSiteVisit?.eventId === event.id ? "completed" : ""
                  }`}
                  key={event.id}
                >
                  <div className="event-main">
                    <EventIcon kind={event.kind} />
                    <div>
                      <strong>
                        {event.code} - {event.title}
                      </strong>
                      <span>{event.time}</span>
                      {completedSiteVisit?.eventId === event.id && (
                        <em>
                          <CheckCircle2 size={14} />
                          Completed
                        </em>
                      )}
                    </div>
                  </div>
                  <button type="button" aria-label={`Call ${event.title}`}>
                    <Phone size={36} />
                  </button>
                  {completedSiteVisit?.eventId === event.id && (
                    <p className="event-comment">{completedSiteVisit.comment}</p>
                  )}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <Link className="calendar-add" href="/leads/kartik" aria-label="Create calendar event">
        <Plus size={58} />
      </Link>
      <BottomNav active="Calendar" />
      <AIAssistant
        context={{
          screen: "calendar",
          label: "Calendar",
          summary: "Calendar · 1 follow up today · F2F and Site Visit scheduled this week",
          eventCount: 4,
        }}
        onActionComplete={(action) => {
          if (action.targetEventId === "event-sv-kartik") {
            setCompletedSiteVisit({
              eventId: action.targetEventId,
              comment:
                action.comment?.replace(/^Comment:\s*/i, "") ||
                "The lead did not like the 3BHK carpet area and wants something bigger.",
            });
          }
        }}
      />
    </main>
  );
}

function EventIcon({ kind }: { kind: string }) {
  if (kind === "face") return <UsersRound size={26} />;
  if (kind === "site") return <Building2 size={26} />;
  return <Phone size={26} />;
}

function StatusBar({ time, battery }: { time: string; battery: string }) {
  return (
    <div className="status-bar" aria-hidden="true">
      <span className="status-time">{time}</span>
      <span />
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
