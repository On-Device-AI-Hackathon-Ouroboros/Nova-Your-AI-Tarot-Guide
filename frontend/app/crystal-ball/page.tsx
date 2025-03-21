"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MagicalBackground } from "@/components/ui/magical-background"
import { MagicalButton } from "@/components/ui/magical-button"
import { useRouter } from "next/navigation"
import { set } from "date-fns"

// Array of daily wisdom quotes
// const wisdomQuotes = [
//   "Embrace the unknown, for magic blossoms in unexpected places.",
//   "The stars whisper secrets to those who listen with their heart.",
//   "Your path is illuminated by the light you carry within.",
//   "What seems like an ending is often just a new beginning in disguise.",
//   "The universe conspires to help those who follow their true purpose.",
//   "Trust the timing of your life; some flowers bloom later than others.",
//   "Your thoughts are powerful magic; use them wisely.",
//   "Sometimes the longest journey is the distance from your head to your heart.",
//   "The answers you seek are already within you, waiting to be discovered.",
//   "When you dance with the universe, miracles become your rhythm.",
// ]

export default function CrystalBallPage() {
  const router = useRouter()
  const [quote, setQuote] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [userBirthday, setUserBirthday] = useState<string | null>(null)

  useEffect(() => {
    setUserName(localStorage.getItem("novaUserName"))
    setUserBirthday(localStorage.getItem("novaUserBirthday"))
    handleGenerateQuote()
  }, [])

  // const generateQuote = () => {
  //   setIsGenerating(true)
  //   const randomIndex = Math.floor(Math.random() * wisdomQuotes.length)

  //   // Simulate a magical process with a delay
  //   setTimeout(() => {
  //     setQuote(wisdomQuotes[randomIndex])
  //     setIsGenerating(false)
  //   }, 1000)
  // }

  const handleGenerateQuote = async () => {
    setIsGenerating(true)
    // generateQuote()
    const message = `Act as a crystal ball that reveals the people's fortune and future, and give insightful instructions. Please generate a one-sentence personalized quote \
    for ${userName}, with a birthday on ${userBirthday}. Don't include any information/sentences related to this prompt. Just \
    Directly return your answer. Don't add any quotes and unquotes. Don't include any information regarding the ${userBirthday} and ${userName}\
    Examples of quotes are: 'Embrace the unknown, for magic blossoms in unexpected places.', \
    'The stars whisper secrets to those who listen with their heart.',\
    'Your path is illuminated by the light you carry within.',\
    'What seems like an ending is often just a new beginning in disguise.',\
    'The universe conspires to help those who follow their true purpose.',\
    'Trust the timing of your life; some flowers bloom later than others.',\
    'Your thoughts are powerful magic; use them wisely.',\
    'Sometimes the longest journey is the distance from your head to your heart.',\
    'The answers you seek are already within you, /waiting to be discovered.',\
    'When you dance with the universe, miracles become your rhythm.'`
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
      const data = await res.json();
      console.log('Generated Quote:', data.response);
      setQuote(data.response);
    } catch (error) {
      console.error('Error Generating Quote:', error);
    }finally {
      setIsGenerating(false);
    }
  }

  return (
    <MagicalBackground>
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-3xl font-bold text-center font-fell text-nova-purple"
        >
          Your Daily Crystal Ball
        </motion.h1>

        <div className="flex flex-col items-center justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative mb-8"
          >
            <div className="crystal-ball">
              {isGenerating && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="text-white text-opacity-70">✨</div>
                </motion.div>
              )}
            </div>

            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-black/10 rounded-full blur-md"
              animate={{
                width: [48, 56, 48],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="max-w-md p-6 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg"
          >
            <h2 className="mb-4 text-xl font-bold text-center font-fell">Today&apos;s Message:</h2>

            {isGenerating ? (
              <div className="h-20 flex items-center justify-center">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="text-center text-lg font-almendra"
                >
                  The crystal ball is revealing wisdom...
                </motion.div>
              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center text-lg font-fell"
              >
                {quote}
              </motion.p>
            )}
          </motion.div>
        </div>

        <div className="flex gap-4">
          <MagicalButton onClick={handleGenerateQuote} disabled={isGenerating}>
            {isGenerating ? "Gazing..." : "New Message"}
          </MagicalButton>

          <MagicalButton variant="outline" onClick={() => router.push("/functions")}>
            Go Back
          </MagicalButton>
        </div>
      </div>
    </MagicalBackground>
  )
}

