"use client";

import {
  CalendarCheck2,
  CheckCircle2,
  Keyboard,
  Mic,
  MicOff,
  Send,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { siteBasePath } from "@/lib/site-config";

type AssistantContext =
  | {
      screen: "home";
      label: string;
      summary: string;
    }
  | {
      screen: "bucket";
      label: string;
      bucket: string;
      leadCount: number;
    }
  | {
      screen: "calendar";
      label: string;
      summary: string;
      eventCount: number;
    }
  | {
      screen: "lead-detail";
      label: string;
      leadName: string;
      leadId: string;
      project: string;
      status: string;
    };

type DraftAction = {
  title: string;
  type: "schedule_site_visit" | "mark_event_done" | "prioritize_leads" | "summarize" | "filter_leads";
  details: string[];
  comment?: string;
  targetEventId?: string;
  targetBucket?: string;
  filter?: string;
};

type Props = {
  context: AssistantContext;
  onActionComplete?: (action: DraftAction) => void;
};

export function AIAssistant({ context, onActionComplete }: Props) {
  const [open, setOpen] = useState(false);
  const [inputMode, setInputMode] = useState<"voice" | "keypad">("voice");
  const [text, setText] = useState("");
  const [draft, setDraft] = useState<DraftAction | null>(null);
  const [appliedActions, setAppliedActions] = useState<string[]>([]);
  const [assistantResponse, setAssistantResponse] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const openTimerRef = useRef<number | null>(null);
  const voiceTimerRef = useRef<number | null>(null);

  const suggestions = useMemo(() => getSuggestions(context), [context]);

  useEffect(() => {
    return () => {
      if (openTimerRef.current !== null) {
        window.clearTimeout(openTimerRef.current);
      }

      if (voiceTimerRef.current !== null) {
        window.clearTimeout(voiceTimerRef.current);
      }
    };
  }, []);

  function clearAssistantTimers() {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    if (voiceTimerRef.current !== null) {
      window.clearTimeout(voiceTimerRef.current);
      voiceTimerRef.current = null;
    }
  }

  function submitPrompt(prompt?: string) {
    const promptText = prompt?.trim() || text.trim() || getPrototypeVoicePrompt(context);

    setAssistantResponse("");
    setDraft(createDraft(promptText, context));
    setText("");
    setVoiceStatus("");
  }

  function applyDraft() {
    if (!draft) return;

    onActionComplete?.(draft);
    if (
      draft.type === "mark_event_done" &&
      (draft.targetEventId === "event-sv-kartik" || draft.targetEventId === "lead-detail-site-visit")
    ) {
      setAssistantResponse("Site visit event has been marked completed with the comment and updated in the system.");
    }
    setAppliedActions((items) => [`${draft.title} saved`, ...items].slice(0, 3));
    setDraft(null);
  }

  function openAssistant() {
    setOpen(true);
    setInputMode("voice");
    clearAssistantTimers();
    openTimerRef.current = window.setTimeout(() => {
      playOpenBeep();
      runHardcodedVoicePrototype();
    }, 80);
  }

  function closeAssistant() {
    clearAssistantTimers();
    setOpen(false);
    setListening(false);
    setVoiceStatus("");
  }

  function startVoice() {
    runHardcodedVoicePrototype();
  }

  function runHardcodedVoicePrototype() {
    if (voiceTimerRef.current !== null) {
      window.clearTimeout(voiceTimerRef.current);
    }

    setListening(true);
    setVoiceStatus("Listening prototype active. Demo command will be used automatically.");
    voiceTimerRef.current = window.setTimeout(() => {
      setListening(false);
      submitPrompt(getPrototypeVoicePrompt(context));
      voiceTimerRef.current = null;
    }, 6000);
  }

  function playOpenBeep() {
    try {
      const AudioContext = window.AudioContext || (window as AudioWindow).webkitAudioContext;
      if (!AudioContext) return;
      const audio = new AudioContext();
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(740, audio.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(980, audio.currentTime + 0.08);
      gain.gain.setValueAtTime(0.001, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, audio.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.16);
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.start();
      oscillator.stop(audio.currentTime + 0.17);
      window.setTimeout(() => audio.close(), 240);
    } catch {
      // Audio can be blocked by browser settings; the visual listening state still runs.
    }
  }

  return (
    <>
      <button
        className="ai-fab"
        type="button"
        aria-label="Open AI assistant"
        onClick={openAssistant}
      >
        <Image src={`${siteBasePath}/ai-assistant-icon.png`} alt="" aria-hidden="true" width={56} height={56} />
      </button>

      {open && (
        <div className="ai-layer" role="dialog" aria-modal="true" aria-label="AI assistant">
          <button className="ai-scrim" type="button" aria-label="Close AI assistant" onClick={closeAssistant} />
          <section className="ai-sheet">
            <header className="ai-header">
              <span className="ai-avatar">
                <Image src={`${siteBasePath}/ai-assistant-icon.png`} alt="" aria-hidden="true" width={42} height={42} />
              </span>
              <div>
                <h2>AI Assistant</h2>
                <p>{context.label}</p>
              </div>
              <button type="button" aria-label="Close" onClick={closeAssistant}>
                <X size={24} />
              </button>
            </header>

            <div className="ai-context-card">
              <span>Context</span>
              <strong>{getContextLine(context)}</strong>
            </div>

            <div className="ai-suggestions" aria-label="Suggested AI actions">
              {suggestions.map((suggestion) => (
                <button type="button" key={suggestion} onClick={() => submitPrompt(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>

            <section className={`ai-voice-first ${listening ? "listening" : ""}`}>
              <button
                className="ai-voice-orb"
                type="button"
                aria-label={listening ? "Listening" : "Start voice command"}
                onClick={() => {
                  playOpenBeep();
                  startVoice();
                }}
              >
                {listening ? <MicOff size={36} /> : <Mic size={36} />}
              </button>
              <div>
                <strong>{listening ? "Listening..." : "Tap and speak"}</strong>
                <span>{getVoiceHint(context)}</span>
              </div>
              <button
                className="ai-keypad-toggle"
                type="button"
                onClick={() => setInputMode(inputMode === "voice" ? "keypad" : "voice")}
              >
                <Keyboard size={18} />
                Keypad
              </button>
            </section>

            {draft && (
              <section className="ai-draft">
                <div className="ai-draft-title">
                  {draft.type === "mark_event_done" ? <CheckCircle2 size={21} /> : <CalendarCheck2 size={21} />}
                  <strong>{draft.title}</strong>
                </div>
                <ul>
                  {draft.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                {draft.comment && <p>{draft.comment}</p>}
                <div className="ai-draft-actions">
                  <button type="button" onClick={() => setDraft(null)}>
                    Edit
                  </button>
                  <button type="button" onClick={applyDraft}>
                    Confirm
                  </button>
                </div>
              </section>
            )}

            {assistantResponse && (
              <div className="ai-response" role="status">
                <CheckCircle2 size={18} />
                <span>{assistantResponse}</span>
              </div>
            )}

            {appliedActions.length > 0 && (
              <div className="ai-applied">
                {appliedActions.map((action) => (
                  <span key={action}>
                    <CheckCircle2 size={16} />
                    {action}
                  </span>
                ))}
              </div>
            )}

            {inputMode === "keypad" && (
              <form
                className="ai-composer"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitPrompt();
                }}
              >
                <textarea
                  value={text}
                  rows={1}
                  placeholder={getPlaceholder(context)}
                  onChange={(event) => setText(event.target.value)}
                />
                <button type="submit" aria-label="Send instruction">
                  <Send size={22} />
                </button>
              </form>
            )}
            {voiceStatus && <p className="ai-voice-status">{voiceStatus}</p>}
          </section>
        </div>
      )}
    </>
  );
}

type AudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

function getSuggestions(context: AssistantContext) {
  if (context.screen === "lead-detail") {
    return [
      "Mark the site visit event for this lead as completed and add comment: He did not like the typology and wants a 5BHK.",
      "Create a site visit tomorrow 5 PM, add note: client prefers west-facing unit",
      "Draft follow up for this lead",
    ];
  }

  if (context.screen === "bucket") {
    return [
      "Show me leads interested in 3BHK",
      "Show leads that need action today",
      "Create follow ups for not called leads",
    ];
  }

  if (context.screen === "calendar") {
    return [
      "Mark this site visit as completed and add comment: The lead did not like the 3BHK carpet area and wants something bigger.",
      "Create a site visit for Kartik tomorrow 5 PM",
      "Summarize this week's events",
    ];
  }

  return [
    "Summarize today's work",
    "Find ignored leads",
    "Plan my next three actions",
  ];
}

function getPrototypeVoicePrompt(context: AssistantContext) {
  if (context.screen === "lead-detail") {
    return "Mark the site visit event for this lead as completed and add comment: He did not like the typology and wants a 5BHK.";
  }

  if (context.screen === "calendar") {
    return "Mark this site visit as completed and add comment: The lead did not like the 3BHK carpet area and wants something bigger.";
  }

  if (context.screen === "bucket") {
    return "Show me leads interested in 3BHK";
  }

  return "Summarize today's work and plan my next three actions";
}

function getVoiceHint(context: AssistantContext) {
  if (context.screen === "lead-detail") {
    return "Say: create site visit, mark done, or add comment";
  }

  if (context.screen === "calendar") {
    return "Say: mark event done, reschedule, or summarize week";
  }

  if (context.screen === "bucket") {
    return "Say: prioritize leads, schedule follow ups, or summarize bucket";
  }

  return "Say: summarize today or plan my next actions";
}

function createDraft(prompt: string, context: AssistantContext): DraftAction {
  const normalized = prompt.toLowerCase();
  const comment = extractComment(prompt);

  if (
    context.screen === "bucket" &&
    normalized.includes("lead") &&
    normalized.includes("interested") &&
    normalized.includes("3bhk")
  ) {
    return {
      title: "Apply 3BHK interested leads filter",
      type: "filter_leads",
      details: [
        "Bucket: Interested",
        "Configuration: 3BHK",
        "Action: Show matching leads",
      ],
      targetBucket: "INTERESTED",
      filter: "3BHK",
    };
  }

  if (normalized.includes("done") || normalized.includes("mark")) {
    const isCalendarSiteVisit = context.screen === "calendar" && normalized.includes("site visit");
    const isLeadDetailSiteVisit = context.screen === "lead-detail" && normalized.includes("site visit");

    return {
      title: isCalendarSiteVisit || isLeadDetailSiteVisit ? "Complete site visit" : "Mark site visit done",
      type: "mark_event_done",
      details: [
        context.screen === "lead-detail"
          ? `Lead: ${context.leadName}`
          : context.screen === "calendar"
            ? "Calendar: SV - Kartik"
            : `Bucket: ${context.label}`,
        "Event: Site Visit",
        "Outcome: Completed",
      ],
      comment: comment || "Comment: Customer visit completed and outcome captured.",
      targetEventId: isCalendarSiteVisit
        ? "event-sv-kartik"
        : isLeadDetailSiteVisit
          ? "lead-detail-site-visit"
          : undefined,
    };
  }

  if (normalized.includes("site visit") || normalized.includes("visit")) {
    return {
      title: "Create site visit",
      type: "schedule_site_visit",
      details: [
        context.screen === "lead-detail" ? `Lead: ${context.leadName}` : `Context: ${context.label}`,
        `When: ${extractDateTime(prompt)}`,
        "Event type: Site Visit",
      ],
      comment: comment || "Note: Confirm location and send reminder before the visit.",
    };
  }

  if (context.screen === "bucket") {
    return {
      title: "Prioritize claimed leads",
      type: "prioritize_leads",
      details: [
        `${context.leadCount} leads in ${context.bucket}`,
        "Top action: call not-called leads first",
        "Next action: schedule missing events",
      ],
    };
  }

  if (context.screen === "calendar") {
    return {
      title: "Summarize calendar",
      type: "summarize",
      details: [
        `${context.eventCount} events scheduled this week`,
        "Today: Follow Up with Kartik",
        "Next: F2F and Site Visit events need confirmation",
      ],
    };
  }

  return {
    title: "Summarize screen",
    type: "summarize",
    details: [
      getContextLine(context),
      "Recommended: handle outdated events before new lead work",
      "Next action: open claimed bucket and schedule pending visits",
    ],
  };
}

function extractDateTime(prompt: string) {
  const timeMatch = prompt.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/i);
  const dayMatch = prompt.match(/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i);
  const day = dayMatch?.[0] ?? "Tomorrow";
  const time = timeMatch?.[0] ?? "5:00 PM";
  return `${capitalize(day)} at ${time.toUpperCase()}`;
}

function extractComment(prompt: string) {
  const match = prompt.match(/(?:comment|note|remarks?)\s*:?\s*(.+)$/i);
  return match ? `Comment: ${match[1].trim()}` : "";
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function getContextLine(context: AssistantContext) {
  if (context.screen === "lead-detail") {
    return `${context.leadName} · ${context.status} · ${context.project}`;
  }

  if (context.screen === "bucket") {
    return `${context.bucket} bucket · ${context.leadCount} leads`;
  }

  if (context.screen === "calendar") {
    return context.summary;
  }

  return context.summary;
}

function getPlaceholder(context: AssistantContext) {
  if (context.screen === "lead-detail") {
    return "Say site visit details or event outcome";
  }

  if (context.screen === "bucket") {
    return "Ask for lead actions";
  }

  if (context.screen === "calendar") {
    return "Say event update or ask calendar help";
  }

  return "Ask what to do next";
}
