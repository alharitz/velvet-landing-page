"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section className="section-space bg-background border-t border-line">
      <div className="container-shared max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <small>Stay Connected</small>
          <h2 className="mt-4 mb-6">New Releases & Stories</h2>
          <p className="text-muted mb-12 max-w-lg mx-auto">
            Receive updates on new collections and behind-the-scenes insights delivered to your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-4 text-sm font-sans border-b-2 border-line bg-transparent text-ink placeholder-muted focus:border-ink transition-colors"
                disabled={subscribed}
              />
            </div>
            <Button variant="primary" type="submit" disabled={subscribed}>
              {subscribed ? "✓ Subscribed" : "Subscribe"}
            </Button>
          </form>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-accent text-sm mt-4"
            >
              {error}
            </motion.p>
          )}

          {/* Success */}
          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-accent text-sm mt-4"
            >
              Demo only. No email was saved.
            </motion.p>
          )}

          <p className="text-xs text-muted mt-8">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
