import { useState } from "react";
import TopBar from "./components/TopBar";
import CodePanel from "./components/CodePanel";
import ReviewPanel from "./components/ReviewPanel";
import { analyzeCode } from "./api/claude";
import { SAMPLE_CODE } from "./utils/samples";

export default function App() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [language, setLanguage] = useState("JavaScript");
  const [prUrl, setPrUrl] = useState("acme/api-service/pull/847");
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAnalyze() {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    setReviewData(null);
    try {
      const result = await analyzeCode(code, language);
      setReviewData(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setCode("");
    setReviewData(null);
    setError(null);
  }

  return (
    <div className="app">
      <TopBar prUrl={prUrl} onPrUrlChange={setPrUrl} />
      <div className="main">
        <CodePanel
          code={code}
          language={language}
          onCodeChange={setCode}
          onLanguageChange={setLanguage}
          onAnalyze={handleAnalyze}
          onLoadSample={() => setCode(SAMPLE_CODE)}
          onClear={handleClear}
          loading={loading}
        />
        <ReviewPanel
          reviewData={reviewData}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
