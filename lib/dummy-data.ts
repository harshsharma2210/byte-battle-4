export const leadStatusTabs = [
  "HOME",
  "FRESH",
  "CLAIMED",
  "INTERESTED",
  "MEETING DONE",
  "VISIT DONE",
  "NEGOTIATION",
  "BOOKING DONE",
  "FAILED",
];

export const leadSummary = [
  { value: 0, label: "FRESH" },
  { value: 3, label: "CLAIMED" },
  { value: 0, label: "INTERESTED" },
  { value: 0, label: "MEETING DONE" },
  { value: 6, label: "VISIT DONE" },
  { value: 2, label: "NEGOTIATION" },
  { value: 2, label: "BOOKING DONE" },
  { value: 0, label: "FAILED" },
];

export const actionCards = [
  {
    title: "2 leads have outdated events.",
    action: "View incomplete events",
    illustration: "calendar-art",
    href: "/leads",
  },
  {
    title: "11 leads are ignored.",
    action: "View Leads",
    illustration: "agent-art",
    href: "/leads",
  },
];

export const leads = [
  {
    id: "10608027",
    name: "Unnamed",
    project: "Anarock Support Testing Mandate",
    meta: "16 D AGO",
    alert: "No event scheduled",
    nextStep: "Plan your next event",
    primaryAction: "Schedule",
  },
  {
    id: "10608028",
    name: "Kartik",
    project: "Anarock Support Testing Mandate",
    meta: "NOT CALLED",
    alert: "Lead claimed ~ 2 mo ago",
    nextStep: "Get in touch now",
    primaryAction: "Call",
  },
  {
    id: "10608029",
    name: "Mrs.Sali Francis",
    project: "Anarock Support Testing Mandate",
    meta: "NOT CALLED",
    alert: "Lead claimed ~ 2 mo ago",
    nextStep: "Get in touch now",
    primaryAction: "Call",
  },
];

export const interested3BhkLeads = [
  {
    id: "10608031",
    name: "Rohan Shah",
    project: "Anarock Support Testing Mandate",
    meta: "INTERESTED",
    alert: "Interested in 3BHK",
    nextStep: "Share matching 3BHK inventory",
    primaryAction: "Call",
    configuration: "3BHK",
  },
  {
    id: "10608032",
    name: "Priya Mehta",
    project: "Anarock Support Testing Mandate",
    meta: "INTERESTED",
    alert: "Interested in 3BHK",
    nextStep: "Schedule site visit",
    primaryAction: "Schedule",
    configuration: "3BHK",
  },
];

export const leadDetail = {
  id: "10608028",
  name: "Kartik",
  project: "Anarock Support Testing Mandate",
  type: "Any",
  eventTypes: [
    { label: "Follow Up", kind: "follow" },
    { label: "Face to Face", kind: "face" },
    { label: "Site Visit", kind: "site" },
  ],
  pastEvents: [
    { label: "Follow Up", count: 0, kind: "follow" },
    { label: "Face to Face", count: 0, kind: "face" },
    { label: "Site Visit", count: 0, kind: "site" },
  ],
};

export const calendarDays = [
  { day: "Sun", date: 14, active: true },
  { day: "Mon", date: 15, active: false },
  { day: "Tue", date: 16, active: false },
  { day: "Wed", date: 17, active: false },
  { day: "Thu", date: 18, active: false },
  { day: "Fri", date: 19, active: false },
  { day: "Sat", date: 20, active: false },
];

export const calendarAgenda = [
  {
    date: 14,
    day: "Sun",
    summary: "1 Follow Up",
    events: [
      {
        id: "event-fu-kartik",
        kind: "follow",
        code: "FU",
        title: "Kartik",
        time: "02:09 PM - 02:11 PM",
      },
    ],
  },
  {
    date: 15,
    day: "Mon",
    summary: "1 F2F",
    events: [
      {
        id: "event-f2f-sali",
        kind: "face",
        code: "F2F",
        title: "Mrs.Sali Francis",
        time: "11:30 AM - 12:00 PM",
      },
    ],
  },
  {
    date: 16,
    day: "Tue",
    summary: "",
    events: [],
  },
  {
    date: 17,
    day: "Wed",
    summary: "1 Site Visit",
    events: [
      {
        id: "event-sv-kartik",
        kind: "site",
        code: "SV",
        title: "Kartik",
        time: "04:00 PM - 05:00 PM",
      },
    ],
  },
  {
    date: 18,
    day: "Thu",
    summary: "",
    events: [],
  },
  {
    date: 19,
    day: "Fri",
    summary: "1 Follow Up",
    events: [
      {
        id: "event-fu-unnamed",
        kind: "follow",
        code: "FU",
        title: "Unnamed",
        time: "10:15 AM - 10:30 AM",
      },
    ],
  },
  {
    date: 20,
    day: "Sat",
    summary: "",
    events: [],
  },
  {
    date: 21,
    day: "Sun",
    summary: "",
    events: [],
  },
];
