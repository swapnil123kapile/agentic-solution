import { create } from 'zustand';
import type {
  AIModel,
  ChatMessage,
  CollapseState,
  GeneratedSections,
  PitchBook,
  PitchBookSectionKey,
  StrategicRecommendations,
} from '@/types';
import { SECTION_ORDER } from '@/types';
import { emptyPitchBook, seededPitchBook } from '@/data/sampleData';
import { resolvePrompt } from '@/services/aiService';

// ============================================================
// Global application store (Zustand)
// ============================================================

const ALL_KEYS = SECTION_ORDER.map((s) => s.key);

function allCollapsed(value: boolean): CollapseState {
  return ALL_KEYS.reduce((acc, k) => {
    acc[k] = value;
    return acc;
  }, {} as CollapseState);
}

function allGenerated(value: boolean): GeneratedSections {
  return ALL_KEYS.reduce((acc, k) => {
    acc[k] = value;
    return acc;
  }, {} as GeneratedSections);
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface AppState {
  // chat
  messages: ChatMessage[];
  model: AIModel;
  loading: boolean;
  // pitchbook
  pitchbook: PitchBook;
  generatedSections: GeneratedSections;
  currentSection: PitchBookSectionKey | null;
  collapseState: CollapseState;
  pitchbookGenerated: boolean;
  // actions
  setModel: (m: AIModel) => void;
  sendPrompt: (prompt: string) => void;
  regenerateSection: (key: PitchBookSectionKey) => void;
  toggleCollapse: (key: PitchBookSectionKey) => void;
  collapseAll: (value: boolean) => void;
  toggleRecommendation: (id: string) => void;
  setPitchbookGenerated: (value: boolean) => void;
  resetChat: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  messages: [
    {
      id: uid(),
      role: 'assistant',
      content:
        "Hi Rahul 👋 — I'm your **PitchBook Advisory Assistant**. I can generate each section of your advisory pitchbook and update the live preview on the left. Try *Generate Executive Summary* or *Generate Full PitchBook* to get started.",
      createdAt: Date.now(),
    },
  ],
  model: 'GPT-4o',
  loading: false,
  pitchbook: { ...seededPitchBook },
  generatedSections: allGenerated(true), // seeded data shows as already generated
  currentSection: null,
  collapseState: allCollapsed(false),
  pitchbookGenerated: true, // seeded pitchbook is ready

  setModel: (m) => set({ model: m }),

  sendPrompt: (prompt) => {
    if (!prompt.trim() || get().loading) return;

    const userMsg: ChatMessage = {
      id: uid(),
      role: 'user',
      content: prompt,
      createdAt: Date.now(),
    };

    const assistantId = uid();
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      createdAt: Date.now(),
      streaming: true,
    };

    set((s) => ({
      messages: [...s.messages, userMsg, assistantMsg],
      loading: true,
    }));

    const intent = resolvePrompt(prompt);
    const { sectionKey } = intent;

    // If the prompt maps to a section (or full pitchbook), mark it generated
    // and update the preview immediately (the "AI" has produced structured output).
    if (sectionKey) {
      set((s) => ({
        pitchbook: { ...s.pitchbook, ...intent.payload },
        generatedSections: { ...s.generatedSections, [sectionKey]: true },
        currentSection: sectionKey,
      }));
    } else if (Object.keys(intent.payload).length > 0) {
      // Full pitchbook — mark all generated
      set((s) => ({
        pitchbook: { ...s.pitchbook, ...intent.payload },
        generatedSections: allGenerated(true),
        currentSection: null,
        pitchbookGenerated: true,
      }));
    }

    // Simulate streaming by progressively revealing the markdown.
    const full = intent.markdown;
    const chunks = chunkText(full, 4); // 4 chars per tick
    let i = 0;

    const tick = () => {
      if (i >= chunks.length) {
        set((s) => ({
          loading: false,
          messages: s.messages.map((m) =>
            m.id === assistantId ? { ...m, content: full, streaming: false } : m
          ),
        }));
        return;
      }
      i += 1;
      const partial = chunks.slice(0, i).join('');
      set((s) => ({
        messages: s.messages.map((m) =>
          m.id === assistantId ? { ...m, content: partial, streaming: true } : m
        ),
      }));
      setTimeout(tick, 18);
    };
    setTimeout(tick, 240);
  },

  regenerateSection: (key) => {
    // Re-apply the seed data for that section (simulates re-generation)
    set((s) => ({
      pitchbook: { ...s.pitchbook, ...seededPitchBookByKey(key) },
      generatedSections: { ...s.generatedSections, [key]: true },
      currentSection: key,
    }));
  },

  toggleCollapse: (key) =>
    set((s) => ({
      collapseState: { ...s.collapseState, [key]: !s.collapseState[key] },
    })),

  collapseAll: (value) => set({ collapseState: allCollapsed(value) }),

  toggleRecommendation: (id) =>
    set((s) => {
      const recs = s.pitchbook.strategicRecommendations as StrategicRecommendations | null;
      if (!recs) return s;
      return {
        pitchbook: {
          ...s.pitchbook,
          strategicRecommendations: {
            ...recs,
            recommendations: recs.recommendations.map((r) =>
              r.id === id ? { ...r, completed: !r.completed } : r
            ),
          },
        },
      };
    }),

  setPitchbookGenerated: (value) => set({ pitchbookGenerated: value }),

  resetChat: () =>
    set({
      messages: [
        {
          id: uid(),
          role: 'assistant',
          content:
            "Hi Rahul 👋 — I'm your **PitchBook Advisory Assistant**. How can I help build today's pitchbook?",
          createdAt: Date.now(),
        },
      ],
    }),
}));

// ---------- helpers ----------

function seededPitchBookByKey(key: PitchBookSectionKey): Partial<PitchBook> {
  switch (key) {
    case 'executiveSummary':
      return { executiveSummary: seededPitchBook.executiveSummary };
    case 'clientSnapshot':
      return { clientSnapshot: seededPitchBook.clientSnapshot };
    case 'industryOverview':
      return { industryOverview: seededPitchBook.industryOverview };
    case 'keyTrends':
      return { keyTrends: seededPitchBook.keyTrends };
    case 'competitiveLandscape':
      return { competitiveLandscape: seededPitchBook.competitiveLandscape };
    case 'growthOpportunities':
      return { growthOpportunities: seededPitchBook.growthOpportunities };
    case 'recentMA':
      return { recentMA: seededPitchBook.recentMA };
    case 'potentialTargets':
      return { potentialTargets: seededPitchBook.potentialTargets };
    case 'strategicRecommendations':
      return { strategicRecommendations: seededPitchBook.strategicRecommendations };
    case 'nextSteps':
      return { nextSteps: seededPitchBook.nextSteps };
    default:
      return {};
  }
}

function chunkText(text: string, size: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < text.length; i += size) out.push(text.slice(i, i + size));
  return out;
}
