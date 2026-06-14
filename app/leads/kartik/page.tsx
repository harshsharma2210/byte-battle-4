"use client";

import {
  ArrowLeft,
  Building2,
  ChevronDown,
  CheckCircle2,
  Download,
  Edit2,
  Mail,
  Mic,
  Phone,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AIAssistant } from "@/components/AIAssistant";
import { leadDetail } from "@/lib/dummy-data";
import { siteBasePath } from "@/lib/site-config";

export default function LeadDetailPage() {
  const [completedSiteVisit, setCompletedSiteVisit] = useState<{
    comment: string;
  } | null>(null);
  const [afterCallOpen, setAfterCallOpen] = useState(false);
  const [voiceFilling, setVoiceFilling] = useState(false);
  const [followUpDraft, setFollowUpDraft] = useState<{
    type: string;
    date: string;
    time: string;
    duration: string;
    reminder: string;
    note: string;
  } | null>(null);
  const [savedFollowUp, setSavedFollowUp] = useState<{
    type: string;
    date: string;
    time: string;
    duration: string;
    reminder: string;
    note: string;
  } | null>(null);
  const [afterCallResponse, setAfterCallResponse] = useState("");
  const voiceStartTimerRef = useRef<number | null>(null);
  const voiceFillTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (voiceStartTimerRef.current !== null) {
        window.clearTimeout(voiceStartTimerRef.current);
      }

      if (voiceFillTimerRef.current !== null) {
        window.clearTimeout(voiceFillTimerRef.current);
      }
    };
  }, []);

  function clearAfterCallTimers() {
    if (voiceStartTimerRef.current !== null) {
      window.clearTimeout(voiceStartTimerRef.current);
      voiceStartTimerRef.current = null;
    }

    if (voiceFillTimerRef.current !== null) {
      window.clearTimeout(voiceFillTimerRef.current);
      voiceFillTimerRef.current = null;
    }
  }

  function openAfterCallModal() {
    clearAfterCallTimers();
    setAfterCallOpen(true);
    setFollowUpDraft(null);
    setAfterCallResponse("");
    voiceStartTimerRef.current = window.setTimeout(fillFollowUpWithVoice, 350);
  }

  function closeAfterCallModal() {
    clearAfterCallTimers();
    setAfterCallOpen(false);
    setVoiceFilling(false);
  }

  function fillFollowUpWithVoice() {
    if (voiceFillTimerRef.current !== null) {
      window.clearTimeout(voiceFillTimerRef.current);
    }

    setVoiceFilling(true);
    setAfterCallResponse("");
    playModalBeep();
    voiceFillTimerRef.current = window.setTimeout(() => {
      setFollowUpDraft({
        type: "Follow Up",
        date: "Tomorrow",
        time: "11:00 AM",
        duration: "30 Mins",
        reminder: "10 Mins",
        note: "Create a follow-up event for this lead after the call.",
      });
      setVoiceFilling(false);
      voiceFillTimerRef.current = null;
    }, 6000);
  }

  function saveFollowUp() {
    if (!followUpDraft) return;
    setSavedFollowUp(followUpDraft);
    setVoiceFilling(false);
    setAfterCallResponse("Follow-up event has been created and updated in the system.");
  }

  return (
    <main className="phone-shell detail-shell">
      <StatusBar time="5:10" battery="45" />
      <header className="detail-header">
        <div className="detail-actions">
          <Link href="/leads" aria-label="Close lead">
            <X size={42} />
          </Link>
          <span />
          <button type="button" aria-label="Edit lead">
            <Edit2 size={31} />
          </button>
          <button type="button" aria-label="Send email">
            <Mail size={36} />
          </button>
          <button type="button" aria-label="Assign lead">
            <UserRound size={32} />
            <Download size={20} className="small-overlay" />
          </button>
        </div>
        <p>#{leadDetail.id}</p>
        <h1>{leadDetail.name}</h1>
        <h2>
          {leadDetail.project} <span>•</span> {leadDetail.type}
        </h2>
      </header>

      <section className="detail-content">
        <InfoRow title="Category" action="Update">
          <span className="flames" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </InfoRow>
        <InfoRow title="Status" action="Change Status">
          <strong>Claimed</strong>
        </InfoRow>
        <InfoRow title="Interested Properties" action="Select Properties">
          <span className="muted-value">No properties selected</span>
        </InfoRow>

        <section className="project-panel">
          <h2>{leadDetail.project}</h2>
          <p>Share more information about the project.</p>
          <PlanIllustration />
          <button type="button" className="primary-button">
            Share Project Details
          </button>
        </section>

        <section className="event-panel">
          <h2>Tap to schedule an event</h2>
          <div className="event-types">
            {leadDetail.eventTypes.map((event) => (
              <button
                className={event.kind === "site" && completedSiteVisit ? "completed" : ""}
                type="button"
                key={event.label}
              >
                <span className={event.kind}>
                  {event.kind === "follow" && <Phone size={28} />}
                  {event.kind === "face" && <UsersRound size={30} />}
                  {event.kind === "site" && completedSiteVisit ? (
                    <CheckCircle2 size={30} />
                  ) : (
                    event.kind === "site" && <Building2 size={30} />
                  )}
                </span>
                {event.label}
                {event.kind === "site" && completedSiteVisit && <em>Completed</em>}
              </button>
            ))}
          </div>
          {completedSiteVisit && (
            <div className="lead-event-comment">
              <strong>Site Visit Comment</strong>
              <p>{completedSiteVisit.comment}</p>
            </div>
          )}
          {savedFollowUp && (
            <div className="lead-event-comment followup">
              <strong>Follow-up Scheduled</strong>
              <p>
                {savedFollowUp.date} at {savedFollowUp.time} · {savedFollowUp.note}
              </p>
            </div>
          )}
        </section>

        <section className="past-events">
          <h2>Past Events</h2>
          <div className="past-grid">
            {leadDetail.pastEvents.map((event) => (
              <div key={event.label}>
                <strong className={event.kind}>{event.count}</strong>
                <span>{event.label}</span>
              </div>
            ))}
          </div>
        </section>

        <Link className="history-link" href="/leads">
          View all your past history
        </Link>

        <section className="notes-panel">
          <h2>Notes</h2>
          <div className="note-entry">
            <span>CC</span>
            <div>
              <strong>Sale in RD Aurum, Borivali West, Western Mumbai</strong>
              <p>test 2</p>
              <em>Lead Note · 4 mo ago</em>
            </div>
          </div>
          <button type="button" className="secondary-button">
            Add a Note
          </button>
        </section>

        <section className="additional-panel">
          <div>
            <h2>Additional Details</h2>
            <p>
              Have more information about
              <br />
              Kartik to add?
            </p>
          </div>
          <TabletIllustration />
        </section>
        <Link className="history-link add-link" href="/leads">
          Click here to add
        </Link>

        <InfoRow title="Additional Client Info" action="Edit" />

        <section className="transfer-panel">
          <button type="button" className="transfer-button">
            Transfer lead
          </button>
        </section>
      </section>

      <div className="sticky-call">
        <button type="button" className="call-button" onClick={openAfterCallModal}>
          <Phone size={28} />
          Call
        </button>
      </div>
      {afterCallOpen && (
        <section className="after-call-layer" role="dialog" aria-modal="true" aria-label="Schedule a follow up">
          <div className="after-call-screen">
            <header className="after-call-top">
              <div className="android-status" aria-hidden="true">
                <span />
                <span />
                <strong>12:30</strong>
              </div>
              <div className="after-call-title">
                <button type="button" aria-label="Back to lead" onClick={closeAfterCallModal}>
                  <ArrowLeft size={34} />
                </button>
                <h2>Schedule a Follow Up</h2>
              </div>
              <nav className="after-call-tabs" aria-label="Event type">
                <button type="button">Site Visit</button>
                <button className="active" type="button">Follow Up</button>
                <button type="button">Face to Face</button>
              </nav>
            </header>

            <div className="after-call-body">
              <div className={`after-call-ai ${voiceFilling ? "listening" : ""}`}>
                <button type="button" aria-label="Use SalesAI voice" onClick={fillFollowUpWithVoice}>
                  <Image src={`${siteBasePath}/ai-assistant-icon.png`} alt="" aria-hidden="true" width={46} height={46} />
                </button>
                <div>
                  <strong>{voiceFilling ? "Listening..." : "SalesAI voice fill"}</strong>
                  <span>“Create a follow-up event for this lead after the call.”</span>
                </div>
                <Mic size={24} />
              </div>

              <div className="after-call-fields schedule-form">
                <label>
                  <input value={followUpDraft?.date ?? ""} readOnly placeholder="Date of Follow Up" />
                </label>
                <label>
                  <input value={followUpDraft?.time ?? ""} readOnly placeholder="Time of Follow Up" />
                </label>
                <div className="after-call-grid">
                  <label className="select-field">
                    <span>Duration</span>
                    <input value={followUpDraft?.duration ?? "30 Mins"} readOnly />
                    <ChevronDown size={20} />
                  </label>
                  <label className="select-field">
                    <span>Remind me before</span>
                    <input value={followUpDraft?.reminder ?? "10 Mins"} readOnly />
                    <ChevronDown size={20} />
                  </label>
                </div>
                <label>
                  <textarea value={followUpDraft?.note ?? ""} readOnly placeholder="Add a note (Optional)" />
                </label>
              </div>

              {followUpDraft && !afterCallResponse && (
                <div className="after-call-confirm">
                  <CheckCircle2 size={20} />
                  <span>Follow-up event is ready to create.</span>
                  <button type="button" onClick={saveFollowUp}>Confirm</button>
                </div>
              )}

              {afterCallResponse && (
                <div className="after-call-response" role="status">
                  <CheckCircle2 size={18} />
                  <span>{afterCallResponse}</span>
                </div>
              )}

              <button
                className="schedule-follow-button"
                type="button"
                onClick={followUpDraft ? saveFollowUp : fillFollowUpWithVoice}
              >
                Schedule Follow Up
              </button>
            </div>
          </div>
        </section>
      )}
      <div className="toast">Contacts permission has been denied</div>
      <AIAssistant
        context={{
          screen: "lead-detail",
          label: "Lead detail",
          leadName: leadDetail.name,
          leadId: leadDetail.id,
          project: leadDetail.project,
          status: "Claimed",
        }}
        onActionComplete={(action) => {
          if (action.targetEventId === "lead-detail-site-visit") {
            setCompletedSiteVisit({
              comment:
                action.comment?.replace(/^Comment:\s*/i, "") ||
                "He did not like the typology and wants a 5BHK.",
            });
          }
        }}
      />
    </main>
  );
}

function playModalBeep() {
  try {
    const AudioContextConstructor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof globalThis.AudioContext }).webkitAudioContext;
    if (!AudioContextConstructor) return;
    const audio = new AudioContextConstructor();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.frequency.setValueAtTime(760, audio.currentTime);
    gain.gain.setValueAtTime(0.001, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.1, audio.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.14);
    oscillator.connect(gain);
    gain.connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + 0.16);
    window.setTimeout(() => audio.close(), 220);
  } catch {
    // The modal still shows the voice-first prototype state if audio is blocked.
  }
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

function InfoRow({
  title,
  action,
  children,
}: {
  title: string;
  action: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="info-row">
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button type="button">{action}</button>
    </section>
  );
}

function PlanIllustration() {
  return (
    <div className="plan-illustration" aria-hidden="true">
      <span className="sheet" />
      <span className="hand" />
      <span className="chart" />
    </div>
  );
}

function TabletIllustration() {
  return (
    <div className="tablet-illustration" aria-hidden="true">
      <span className="tablet" />
      <span className="hands" />
      <span className="keyboard" />
    </div>
  );
}
