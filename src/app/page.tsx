"use client";

import { motion } from "framer-motion";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Sparkles,
  Zap,
  Users,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AISchedulerLanding() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  const handleSchedule = async () => {
  if (!prompt.trim()) return;

  setIsLoading(true);
  try {
    console.log("🚀 Calling API...");
    
    const response = await fetch('/api/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    console.log("📨 API response:", data);
    
    setResult(data.message || "Meeting scheduled successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    setResult("Failed to schedule meeting. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Parsing",
      description:
        "Understands natural language to extract meeting details automatically",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Google Calendar Sync",
      description:
        "Seamlessly integrates with your Google Calendar for instant scheduling",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Smart Time Detection",
      description:
        "Automatically detects dates, times, and duration from your description",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Small dots */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
          {/* Medium circles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute w-2 h-2 bg-violet-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            />
          ))}
          {/* Large shapes */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`large-${i}`}
              className="absolute w-3 h-3 bg-teal-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -60, 0],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4,
              }}
            />
          ))}
          {/* Squares/diamonds */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`square-${i}`}
              className="absolute w-2 h-2 bg-blue-400/30 rotate-45"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [45, 90, 45],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-teal-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20"
            >
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered Scheduling
            </Badge>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent leading-tight sm:leading-normal md:leading-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Schedule Meetings with
              <br />
              Natural Language
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Simply describe your meeting in plain English, and our AI will
              automatically parse the details and add it to your Google
              Calendar. No more manual scheduling.
            </motion.p>
          </div>

          {/* Main Input Section */}
          <motion.div
            className="max-w-4xl mx-auto mt-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          >
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-blue-400">
                  Describe Your Meeting
                </CardTitle>
                <CardDescription className="text-center text-gray-400">
                  Tell us about your meeting in natural language - include who,
                  what, when, and where
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Example: Schedule a team standup meeting with John, Sarah, and Mike for tomorrow at 10 AM for 30 minutes to discuss the quarterly review. Send the meeting invite to everyone."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
                <Button
                  onClick={handleSchedule}
                  disabled={!prompt.trim() || isLoading}
                  className="cursor-pointer w-full bg-gradient-to-r from-blue-700 to-purple-700  text-white font-semibold py-5 transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(139,92,246,0.4)] transition-all duration-500 ease-out"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </>
                  )}
                </Button>

                {result && (
                  <div
                    className={`p-4 rounded-lg ${
                      result.includes("successfully")
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      {result}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Powerful{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our AI understands context and automatically handles the
              complexity of scheduling
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <Card
                  key={index}
                  className=" bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:border-violet-400"
                >
                  <CardHeader>
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 text-white">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              How It{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Three simple steps to schedule any meeting
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col space-y-8 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 },
              },
            }}
          >
            {[
              {
                step: "1",
                title: "Describe",
                description:
                  "Write your meeting details in natural language - just like you would tell a colleague",
              },
              {
                step: "2",
                title: "AI Processing",
                description:
                  "Our AI extracts meeting details, participants, time, and location from your description",
              },
              {
                step: "3",
                title: "Calendar Sync",
                description:
                  "Meeting is automatically created in Google Calendar with invites sent to all participants",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative flex items-start"
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
                }}
              >
                {/* Circle */}
                <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {item.step}
                </div>

                {/* Connecting line (except for last item) */}
                {index < 2 && (
                  <div className="absolute left-6 top-12 w-0.75 h-24 bg-gradient-to-b from-purple-500 to-blue-500 opacity-60"></div>
                )}

                {/* Content */}
                <div className="ml-8 mb-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © {currentYear} AI Meeting Scheduler. Streamline your scheduling
            with artificial intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
}
