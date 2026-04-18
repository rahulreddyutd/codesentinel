const SYSTEM_PROMPT = `You are a senior security engineer and software architect performing a thorough code review.
Analyze the code provided and return ONLY a valid JSON object — no markdown fences, no preamble, no explanation outside the JSON.

Return this exact shape:
{
  "summary": "2–3 sentence executive summary covering the most critical findings",
  "scores": {
    "security": <integer 0-100>,
    "architecture": <integer 0-100>,
    "quality": <integer 0-100>
  },
  "security_issues": [
    {
      "title": "Short descriptive title",
      "severity": "critical" | "high" | "medium" | "low",
      "category": "e.g. SQL Injection / Broken Auth / Hardcoded Secret / IDOR / XSS",
      "description": "Why this is dangerous and what an attacker could do",
      "affected_code": "The exact problematic line(s) copied from the input",
      "suggestion": "Concrete fix with corrected code snippet where possible"
    }
  ],
  "architecture_suggestions": [
    {
      "title": "Short title",
      "type": "Pattern" | "Performance" | "Scalability" | "Maintainability" | "Observability" | "Security",
      "description": "Detailed recommendation",
      "impact": "Expected outcome if applied"
    }
  ],
  "quality_issues": [
    {
      "title": "Short title",
      "severity": "medium" | "low" | "info",
      "category": "e.g. Error Handling / DRY / Naming / Complexity / Testing",
      "description": "What the problem is",
      "affected_code": "The problematic snippet",
      "suggestion": "How to improve it"
    }
  ]
}

Scoring guide (0–100):
- Security: 100 = no known issues; deduct heavily for critical/high findings
- Architecture: 100 = clean separation, patterns applied well, scalable
- Quality: 100 = readable, tested, idiomatic

Be specific. Reference exact variable names, line patterns, and APIs from the submitted code.`;

export async function analyzeCode(code, language) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === "sk-ant-...") {
    throw new Error(
      "No API key found. Copy .env.example to .env and add your VITE_ANTHROPIC_API_KEY."
    );
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Review this ${language} code:\n\n\`\`\`${language.toLowerCase()}\n${code}\n\`\`\``,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Anthropic API error ${response.status}`);
  }

  const data = await response.json();
  const raw = data.content.map((b) => b.text || "").join("").trim();
  const clean = raw.replace(/^```json\s*/i, "").replace(/\s*```$/, "").trim();

  try {
    return JSON.parse(clean);
  } catch {
    throw new Error("Could not parse AI response — please try again.");
  }
}
