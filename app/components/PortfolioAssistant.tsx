"use client";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import {
  Button,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type AssistantAction = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

type AssistantMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  actions?: AssistantAction[];
};

type AssistantAnswer = Pick<AssistantMessage, "content" | "actions">;

type AssistantApiResponse = {
  answer?: unknown;
  actions?: unknown;
};

const MAX_CLIENT_QUESTION_LENGTH = 600;
const SAFE_INTERNAL_ACTION_PREFIXES = ["/cv/", "/certificates/"];
const SAFE_EXTERNAL_ACTION_HOSTS = new Set([
  "github.com",
  "www.github.com",
  "linkedin.com",
  "www.linkedin.com",
  "wa.me",
]);

const quickPrompts = [
  "What does Nicholas focus on?",
  "Explain Nicholas' tech stack",
  "What are the main projects?",
  "Which projects use real-time systems?",
  "How can I contact Nicholas?",
];

const unavailableAnswer: AssistantAnswer = {
  content:
    "Sorry, the chat cannot answer right now. Please try again shortly, or contact Nicholas from the contact section.",
};

const initialMessages: AssistantMessage[] = [
  {
    id: "assistant-welcome",
    role: "assistant",
    content:
      "Ask me about Nicholas' experience, tech stack, projects, CV, certifications, or contact details. Indonesian questions are welcome too.",
  },
];

function createMessageId(role: AssistantMessage["role"]) {
  return `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function isAssistantAction(value: unknown): value is AssistantAction {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const action = value as Record<string, unknown>;

  return (
    typeof action.label === "string" &&
    action.label.length > 0 &&
    action.label.length <= 48 &&
    typeof action.href === "string" &&
    action.href.length <= 240 &&
    isSafeActionHref(action.href) &&
    (typeof action.external === "boolean" || action.external === undefined) &&
    (typeof action.download === "boolean" || action.download === undefined)
  );
}

function isSafeActionHref(href: string) {
  if (href.startsWith("/")) {
    return SAFE_INTERNAL_ACTION_PREFIXES.some((prefix) => href.startsWith(prefix));
  }

  try {
    const url = new URL(href);

    return (
      url.protocol === "https:" &&
      SAFE_EXTERNAL_ACTION_HOSTS.has(url.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}

async function requestAssistantAnswer(
  question: string,
  history: AssistantMessage[],
): Promise<AssistantAnswer> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch("/api/assistant", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question.slice(0, MAX_CLIENT_QUESTION_LENGTH),
        history: history
          .slice(-6)
          .map((message) => ({
            role: message.role,
            content: message.content.slice(0, 700),
          })),
      }),
    });

    if (!response.ok) {
      return unavailableAnswer;
    }

    const data = (await response.json()) as AssistantApiResponse;

    if (typeof data.answer !== "string" || !data.answer.trim()) {
      return unavailableAnswer;
    }

    return {
      content: data.answer.trim(),
      actions: Array.isArray(data.actions)
        ? data.actions.filter(isAssistantAction)
        : undefined,
    };
  } catch {
    return unavailableAnswer;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export default function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>(initialMessages);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const visiblePrompts = useMemo(() => quickPrompts, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isOpen, isThinking]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const askQuestion = async (question: string) => {
    const cleanQuestion = question
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, MAX_CLIENT_QUESTION_LENGTH);

    if (!cleanQuestion || isThinking) {
      return;
    }

    const previousMessages = messages;

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: createMessageId("user"),
        role: "user",
        content: cleanQuestion,
      },
    ]);
    setInput("");
    setIsThinking(true);

    const answer = await requestAssistantAnswer(cleanQuestion, previousMessages);

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: createMessageId("assistant"),
        role: "assistant",
        ...answer,
      },
    ]);
    setIsThinking(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void askQuestion(input);
  };

  return (
    <div className="portfolio-assistant" aria-live="polite">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.aside
            key="assistant-panel"
            className="assistant-panel"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            aria-label="Ask me assistant"
          >
            <div className="assistant-header">
              <div className="flex min-w-0 items-center gap-3">
                <div className="assistant-avatar">
                  <SmartToyIcon fontSize="small" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-black text-white">
                    Ask me
                  </div>
                  <div className="assistant-status">
                    Portfolio Q&A | EN / ID
                  </div>
                </div>
              </div>
              <Tooltip title="Close chat">
                <IconButton
                  aria-label="Close chat"
                  color="primary"
                  onClick={() => setIsOpen(false)}
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>

            <div className="assistant-prompts">
              {visiblePrompts.map((prompt) => (
                <Chip
                  key={prompt}
                  label={prompt}
                  onClick={() => void askQuestion(prompt)}
                  size="small"
                  disabled={isThinking}
                />
              ))}
            </div>

            <div className="assistant-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`assistant-message-row ${
                    message.role === "user"
                      ? "assistant-message-row-user"
                      : "assistant-message-row-bot"
                  }`}
                >
                  <div className={`assistant-message assistant-message-${message.role}`}>
                    {message.content.split("\n").map((line, index) => (
                      <p key={`${message.id}-${index}`}>{line}</p>
                    ))}
                    {message.actions ? (
                      <div className="assistant-actions">
                        {message.actions.map((action) => (
                          <Button
                            key={`${message.id}-${action.label}`}
                            href={action.href}
                            target={action.external ? "_blank" : undefined}
                            rel={action.external ? "noreferrer" : undefined}
                            download={action.download}
                            size="small"
                            variant="outlined"
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
              {isThinking ? (
                <div className="assistant-message-row assistant-message-row-bot">
                  <div className="assistant-message assistant-message-assistant">
                    <div className="assistant-typing" aria-label="Assistant is typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              ) : null}
              <div ref={messagesEndRef} />
            </div>

            <form className="assistant-input-area" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="assistant-question">
                Ask me
              </label>
              <input
                id="assistant-question"
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={MAX_CLIENT_QUESTION_LENGTH}
                placeholder="Ask about Nicholas..."
                disabled={isThinking}
              />
              <Tooltip title="Send question">
                <span>
                  <IconButton
                    aria-label="Send question"
                    color="primary"
                    disabled={!input.trim() || isThinking}
                    type="submit"
                  >
                    <SendIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </form>
          </motion.aside>
        ) : (
          <motion.div
            key="assistant-launcher"
            className="assistant-launcher"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18 }}
          >
            <Button
              className="assistant-launcher-button"
              aria-label="Open Ask me chat"
              onClick={() => setIsOpen(true)}
              startIcon={<ChatBubbleOutlineIcon />}
              variant="contained"
            >
              <span className="assistant-launcher-label">Ask me</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
