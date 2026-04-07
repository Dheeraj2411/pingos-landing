"use client";

import { motion } from "framer-motion";
import {
  Send,
  Smile,
  Paperclip,
  Check,
  CheckCheck,
  Bot,
  TrendingUp,
  Users,
  MessageCircle,
} from "lucide-react";

export default function ProductPreview() {
  return (
    <section id="product" className="relative py-28 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary-light uppercase tracking-widest">
            Product Preview
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text leading-tight">
            See PingOS in Action
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-text-secondary text-lg">
            A powerful command center for your customer conversations,
            with real-time analytics and AI-powered automations.
          </p>
        </motion.div>

        {/* Two-Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chat UI */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-card overflow-hidden h-full">
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border-subtle">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/30 flex items-center justify-center text-sm font-bold">
                  PS
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-text-primary">
                    Priya Sharma
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs text-text-muted">
                      Online • WhatsApp
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-primary-light bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                  <Bot className="w-3 h-3" />
                  AI Active
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-4 min-h-[320px] bg-surface-primary/30">
                {/* Incoming */}
                <div className="flex gap-2 max-w-[80%]">
                  <div className="bg-surface-elevated rounded-2xl rounded-tl-md px-4 py-2.5">
                    <p className="text-sm text-text-primary">
                      Hi! I&apos;m interested in the enterprise plan. Can you tell me
                      about pricing?
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[10px] text-text-muted">
                        10:32 AM
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bot Reply */}
                <div className="flex gap-2 max-w-[80%] ml-auto flex-row-reverse">
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-md px-4 py-2.5">
                    <div className="flex items-center gap-1 mb-1">
                      <Bot className="w-3 h-3 text-primary-light" />
                      <span className="text-[10px] text-primary-light font-medium">
                        Auto-reply
                      </span>
                    </div>
                    <p className="text-sm text-text-primary">
                      Thanks for reaching out, Priya! 🙌 Our Enterprise plan
                      starts at $299/mo and includes unlimited messaging,
                      priority support, and custom integrations.
                    </p>
                    <div className="flex items-center gap-1 mt-1 justify-end">
                      <span className="text-[10px] text-text-muted">
                        10:32 AM
                      </span>
                      <CheckCheck className="w-3 h-3 text-blue-400" />
                    </div>
                  </div>
                </div>

                {/* Follow-up */}
                <div className="flex gap-2 max-w-[80%]">
                  <div className="bg-surface-elevated rounded-2xl rounded-tl-md px-4 py-2.5">
                    <p className="text-sm text-text-primary">
                      That sounds great! Can I schedule a demo?
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[10px] text-text-muted">
                        10:34 AM
                      </span>
                    </div>
                  </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex gap-2 max-w-[80%] ml-auto flex-row-reverse">
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary-light animate-bounce" />
                      <span
                        className="w-2 h-2 rounded-full bg-primary-light animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-primary-light animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border-subtle flex items-center gap-2">
                <button className="p-2 text-text-muted hover:text-text-secondary transition-colors">
                  <Paperclip className="w-4 h-4" />
                </button>
                <div className="flex-1 bg-surface-elevated rounded-xl px-4 py-2 text-sm text-text-muted">
                  Type a message...
                </div>
                <button className="p-2 text-text-muted hover:text-text-secondary transition-colors">
                  <Smile className="w-4 h-4" />
                </button>
                <button className="p-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Analytics Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Stats Cards Row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  icon: MessageCircle,
                  label: "Sent Today",
                  value: "2,847",
                  change: "+18%",
                  color: "text-blue-400",
                },
                {
                  icon: Users,
                  label: "New Leads",
                  value: "384",
                  change: "+24%",
                  color: "text-emerald-400",
                },
                {
                  icon: TrendingUp,
                  label: "Open Rate",
                  value: "94.2%",
                  change: "+3.1%",
                  color: "text-purple-400",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 flex flex-col"
                >
                  <stat.icon className={`w-4 h-4 ${stat.color} mb-2`} />
                  <div className="text-xl font-bold text-text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-xs text-emerald-400 mt-1 font-medium">
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>

            {/* Activity Chart Mock */}
            <div className="glass-card p-6 flex-grow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">
                    Message Activity
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5">
                    Last 7 days
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-text-muted">Sent</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-text-muted">Received</span>
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="flex items-end gap-3 h-40">
                {[
                  { sent: 60, recv: 45 },
                  { sent: 80, recv: 55 },
                  { sent: 45, recv: 35 },
                  { sent: 90, recv: 70 },
                  { sent: 75, recv: 60 },
                  { sent: 95, recv: 80 },
                  { sent: 85, recv: 65 },
                ].map((day, i) => (
                  <div
                    key={i}
                    className="flex-1 flex items-end gap-1"
                  >
                    <div
                      className="flex-1 bg-gradient-to-t from-primary/40 to-primary/80 rounded-t-md transition-all duration-500"
                      style={{ height: `${day.sent}%` }}
                    />
                    <div
                      className="flex-1 bg-gradient-to-t from-accent/30 to-accent/60 rounded-t-md transition-all duration-500"
                      style={{ height: `${day.recv}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 text-[10px] text-text-muted">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <span key={day} className="flex-1 text-center">
                      {day}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-5">
              <h4 className="text-sm font-semibold text-text-primary mb-3">
                Recent Activity
              </h4>
              <div className="space-y-3">
                {[
                  {
                    text: "Campaign 'Summer Sale' delivered to 1,247 contacts",
                    time: "2m ago",
                    icon: Check,
                    color: "text-emerald-400",
                  },
                  {
                    text: 'Automation "Welcome Flow" triggered 38 times',
                    time: "15m ago",
                    icon: Bot,
                    color: "text-primary-light",
                  },
                  {
                    text: "New lead captured: Maria Garcia (WhatsApp)",
                    time: "32m ago",
                    icon: Users,
                    color: "text-cyan-400",
                  },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5">
                      <item.icon
                        className={`w-3.5 h-3.5 ${item.color}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-secondary truncate">
                        {item.text}
                      </p>
                    </div>
                    <span className="text-[10px] text-text-muted shrink-0">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
