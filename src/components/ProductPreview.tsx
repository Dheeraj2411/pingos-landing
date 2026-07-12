import {
  Send,
  Smile,
  Check,
  Bot,
  TrendingUp,
  Users,
  MessageCircle,
} from "lucide-react";
import ChatBubble from "./ChatBubble";

export default function ProductPreview() {
  return (
    <section id="product" className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary-light uppercase tracking-widest">
            Product Preview
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text leading-tight">
            See PingOS in Action
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-text-secondary text-lg">
            The ultimate command center for your WhatsApp Business API, with
            real-time analytics and Official WABA automations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card overflow-hidden h-full flex flex-col bg-chat-bg">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-primary-dark text-white shadow-md z-10">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold shrink-0">
                PS
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[16px] font-medium leading-tight truncate">
                  Priya Sharma
                </div>
                <div className="text-[13px] text-white/80">online</div>
              </div>
              <div className="flex gap-4 opacity-90 shrink-0">
                <div className="w-5 h-5 rounded-full border-2 border-current" />
                <div className="w-5 h-5 rounded-full border-2 border-current" />
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <div className="text-center mb-6">
                <span className="bg-[#E1F3FB] text-text-secondary text-[12px] px-3 py-1 rounded-lg shadow-sm">
                  TODAY
                </span>
              </div>

              <ChatBubble
                message="Hi! I'm interested in the enterprise plan. Can you tell me about pricing?"
                time="10:32 AM"
                isOutbound={false}
              />

              <ChatBubble
                message="Thanks for reaching out, Priya! 🙌 Our Enterprise plan starts at $299/mo and includes unlimited messaging, priority support, and custom integrations."
                time="10:32 AM"
                isOutbound={true}
                isAutoReply={true}
                status="read"
              />

              <ChatBubble
                message="That sounds great! Can I schedule a demo?"
                time="10:34 AM"
                isOutbound={false}
              />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-surface-primary flex items-center gap-2">
              <button className="p-2 text-text-secondary shrink-0">
                <Smile className="w-6 h-6" />
              </button>
              <div className="flex-1 bg-white rounded-full px-4 py-2.5 text-[15px] text-text-muted flex items-center gap-2 shadow-sm">
                Type a message
              </div>
              <button className="p-2.5 bg-[#00A884] text-white rounded-full shadow-md shrink-0">
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: MessageCircle,
                  label: "Sent Today",
                  value: "2,847",
                  change: "+18%",
                  color: "text-primary",
                },
                {
                  icon: Users,
                  label: "New Leads",
                  value: "384",
                  change: "+24%",
                  color: "text-accent-green",
                },
                {
                  icon: TrendingUp,
                  label: "Open Rate",
                  value: "94.2%",
                  change: "+3.1%",
                  color: "text-accent",
                },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-4 flex flex-col">
                  <stat.icon className={`w-4 h-4 ${stat.color} mb-2`} />
                  <div className="text-xl font-bold text-text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-xs text-accent-green mt-1 font-medium">
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-6 grow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">
                    Message Activity
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5">Last 7 days</p>
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
                  <div key={i} className="flex-1 flex items-end gap-1">
                    <div
                      className="flex-1 bg-linear-to-t from-primary/30 to-primary/60 rounded-t-sm transition-all duration-500"
                      style={{ height: `${day.sent}%` }}
                    />
                    <div
                      className="flex-1 bg-linear-to-t from-accent-green/40 to-accent-green/70 rounded-t-sm transition-all duration-500"
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
                  ),
                )}
              </div>
            </div>

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
                    color: "text-accent-green",
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
                    color: "text-primary",
                  },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
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
          </div>
        </div>
      </div>
    </section>
  );
}
