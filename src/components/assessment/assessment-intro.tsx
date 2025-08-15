import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AssessmentIntroProps {
  onStart: () => void;
}

export function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">🧭</div>
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Pathfinder Readiness Assessment
        </h1>
        <h2 className="text-2xl text-muted-foreground">
          "Should I Become a Digital Twin Engineer?"
        </h2>
      </div>

      <Card className="bg-gradient-card shadow-strong border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            🎯 Purpose of the Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed">
            This test evaluates whether you are cognitively, psychologically, and technically fit to pursue 
            a career as a <strong>Digital Twin Engineer</strong> — a hybrid profession that bridges data modeling, 
            simulation, systems engineering, and IoT to create digital replicas of real-world systems.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-medium border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔍 What Is a Digital Twin?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">
              A Digital Twin is a virtual replica of a physical system — like a machine, process, or ecosystem — 
              used to simulate, analyze, and optimize its performance in real time. It combines data from IoT sensors, 
              AI models, and simulation engines.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💼 Common Careers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                "Digital Twin Engineer",
                "Simulation Architect", 
                "IoT Systems Engineer",
                "Cyber-Physical Systems Analyst",
                "Industrial Metaverse Developer",
                "Smart Infrastructure Specialist"
              ].map((career, index) => (
                <Badge key={index} variant="secondary" className="mr-2 mb-2">
                  {career}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-secondary shadow-medium border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            🧠 Ideal Skills & Personality Traits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-white">
            <ul className="space-y-2">
              <li>• Analytical and systems thinking</li>
              <li>• Interest in digital-physical system modeling</li>
              <li>• Familiarity with CAD, IoT, data analytics</li>
            </ul>
            <ul className="space-y-2">
              <li>• Patience and curiosity</li>
              <li>• Interdisciplinary mindset</li>
              <li>• High conscientiousness and openness to new tech</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-medium border-0">
        <CardHeader>
          <CardTitle>📊 Assessment Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">⏱️ Duration: 20-30 Minutes</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Psychometric Assessment: 10 questions</li>
                <li>• Technical & Aptitude: 10 questions</li>
                <li>• WISCAR Framework Analysis</li>
                <li>• Personalized Career Guidance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📈 What You'll Get</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Comprehensive readiness score</li>
                <li>• Detailed skill gap analysis</li>
                <li>• Personalized learning path</li>
                <li>• Career recommendations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={onStart}
          size="lg"
          className="px-12 py-4 text-lg bg-gradient-hero border-0 shadow-strong hover:shadow-medium transition-all duration-300 hover:scale-105"
        >
          Start Assessment 🚀
        </Button>
      </div>
    </div>
  );
}