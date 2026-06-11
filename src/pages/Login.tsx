import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import DemoLoginButtons from "@/components/DemoLoginButtons";
import { Eye, EyeOff, RefreshCw, ArrowRight, Check } from "lucide-react";

const usernameSuggestions = [
  "QuietRiver", "HealingSoul", "BetterDaysAhead", "SilentBloom",
  "RebuildingHeart", "GentleStrength", "HopefulDawn", "StillWaters",
  "NewHorizon", "SoftThunder", "RisingPhoenix", "CalmAfterStorm",
];

function generateUsername() {
  return usernameSuggestions[Math.floor(Math.random() * usernameSuggestions.length)];
}

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"signin" | "join">(
    searchParams.get("tab") === "join" ? "join" : "signin"
  );

  // Form states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/community");
    }
  }, [isAuthenticated, navigate]);

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      navigate("/community");
      window.location.reload();
    },
    onError: (err) => setError(err.message),
  });

  const registerMutation = trpc.localAuth.register.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      navigate("/community");
      window.location.reload();
    },
    onError: (err) => setError(err.message),
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }
    loginMutation.mutate({ username, password });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    registerMutation.mutate({
      username,
      email: email || undefined,
      password,
    });
  };

  const isSubmitting = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Image */}
      <div className="hidden lg:flex lg:w-[45%] relative">
        <img
          src="/emotional-gradient.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dt-text)]/60 via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12">
          <h2 className="font-serif text-[36px] text-white leading-[1.2]">
            Your real identity stays private.
          </h2>
          <p className="text-[16px] text-white/80 mt-4 leading-relaxed">
            Speak honestly in a safe anonymous space. No judgment, no pressure,
            just genuine human connection.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center bg-[var(--dt-bg)] p-6 md:p-12">
        <motion.div
          className="w-full max-w-[420px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Glassmorphism Card */}
          <div className="bg-[var(--dt-card)]/85 backdrop-blur-xl border border-[var(--dt-border-light)] rounded-2xl shadow-dt-lg p-8">
            {/* Logo */}
            <Link to="/" className="block text-center mb-8">
              <span className="font-serif text-[24px] text-[var(--dt-text)]">
                DivorceTalk<span className="text-[var(--dt-primary)]">.in</span>
              </span>
            </Link>

            {/* Tabs */}
            <div className="flex mb-8 border-b border-[var(--dt-border)]">
              <button
                onClick={() => { setActiveTab("signin"); setError(""); }}
                className={`flex-1 pb-3 text-[14px] font-medium text-center transition-colors relative ${
                  activeTab === "signin"
                    ? "text-[var(--dt-primary)]"
                    : "text-[var(--dt-text-muted)] hover:text-[var(--dt-text)]"
                }`}
              >
                Sign In
                {activeTab === "signin" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--dt-primary)]"
                    layoutId="tab-indicator"
                  />
                )}
              </button>
              <button
                onClick={() => { setActiveTab("join"); setError(""); }}
                className={`flex-1 pb-3 text-[14px] font-medium text-center transition-colors relative ${
                  activeTab === "join"
                    ? "text-[var(--dt-primary)]"
                    : "text-[var(--dt-text-muted)] hover:text-[var(--dt-text)]"
                }`}
              >
                Join
                {activeTab === "join" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--dt-primary)]"
                    layoutId="tab-indicator"
                  />
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-4 p-3 rounded-xl bg-[#FFEBEE] text-[#B57171] text-[13px]"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {activeTab === "signin" ? (
                <motion.form
                  key="signin"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)] focus:ring-1 focus:ring-[var(--dt-primary)] transition-all"
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)] focus:ring-1 focus:ring-[var(--dt-primary)] transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--dt-text-muted)] hover:text-[var(--dt-text)] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-full bg-[var(--dt-primary)] text-white text-[14px] font-medium hover:bg-[var(--dt-primary-hover)] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                    {!isSubmitting && <ArrowRight size={16} />}
                  </button>
                </motion.form>
              ) : (
                <motion.form
                  key="join"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)] focus:ring-1 focus:ring-[var(--dt-primary)] transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setUsername(generateUsername())}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--dt-primary)] hover:text-[var(--dt-primary-hover)] transition-colors"
                      title="Generate username"
                    >
                      <RefreshCw size={16} />
                    </button>
                  </div>
                  <p className="text-[11px] text-[var(--dt-text-muted)] -mt-2 ml-1">
                    Click the refresh icon for suggestions
                  </p>
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)] focus:ring-1 focus:ring-[var(--dt-primary)] transition-all"
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password (8+ characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)] focus:ring-1 focus:ring-[var(--dt-primary)] transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--dt-text-muted)] hover:text-[var(--dt-text)] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--dt-bg)] border border-[var(--dt-border)] text-[var(--dt-text)] placeholder:text-[var(--dt-text-muted)] text-[14px] focus:outline-none focus:border-[var(--dt-primary)] focus:ring-1 focus:ring-[var(--dt-primary)] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-full bg-[var(--dt-primary)] text-white text-[14px] font-medium hover:bg-[var(--dt-primary-hover)] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Creating account..." : "Join Anonymously"}
                    {!isSubmitting && <ArrowRight size={16} />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Demo Login */}
            <div className="mt-6">
              <DemoLoginButtons variant="login" />
            </div>

            {/* Safety Copy */}
            <div className="mt-6 space-y-2">
              {[
                "No public real names",
                "Your profile stays anonymous",
                "Share only what feels comfortable",
              ].map((text) => (
                <div key={text} className="flex items-center gap-2 text-[12px] text-[var(--dt-text-muted)]">
                  <Check size={13} className="text-[var(--dt-secondary)]" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Back to Home */}
          <p className="text-center mt-6 text-[13px] text-[var(--dt-text-muted)]">
            <Link to="/" className="text-[var(--dt-primary)] hover:underline">
              ← Back to home
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
