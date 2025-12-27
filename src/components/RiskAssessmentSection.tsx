import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, TrendingUp, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api, type BreastCancerParams } from "@/lib/api";

const RiskAssessmentSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState<BreastCancerParams>({
    age: 45,
    bmi: 24,
    family_history: false,
    breast_density: "medium",
    menopausal_status: "premenopausal",
    hormone_use: false,
    previous_biopsies: 0,
    first_menstruation_age: 13,
    first_pregnancy_age: null,
  });

  const [plotUrls, setPlotUrls] = useState<{
    riskScore?: string;
    factors?: string;
    timeline?: string;
  }>({});

  const handleInputChange = (field: keyof BreastCancerParams, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const loadPreset = async (presetName: string) => {
    try {
      const presets = await api.getPresets();
      const preset = presets[presetName];
      if (preset) {
        setFormData({
          age: preset.age,
          bmi: preset.bmi,
          family_history: preset.family_history,
          breast_density: preset.breast_density as any,
          menopausal_status: preset.menopausal_status as any,
          hormone_use: preset.hormone_use,
          previous_biopsies: preset.previous_biopsies,
          first_menstruation_age: preset.first_menstruation_age,
          first_pregnancy_age: preset.first_pregnancy_age,
        });
        toast({
          title: "Preset Loaded",
          description: `Loaded ${presetName.replace("_", " ")} profile`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load preset",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setPlotUrls({});

    try {
      const assessmentResult = await api.assessRisk(formData);
      setResult(assessmentResult);

      // Load plots
      const [riskScoreUrl, factorsUrl, timelineUrl] = await Promise.all([
        api.getRiskScorePlot(formData),
        api.getFactorsPlot(formData),
        api.getTimelinePlot(formData),
      ]);

      setPlotUrls({
        riskScore: riskScoreUrl,
        factors: factorsUrl,
        timeline: timelineUrl,
      });

      toast({
        title: "Assessment Complete",
        description: `Risk category: ${assessmentResult.risk_category}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to assess risk",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (category: string) => {
    switch (category) {
      case "low":
        return "bg-green-500";
      case "moderate":
        return "bg-yellow-500";
      case "high":
        return "bg-orange-500";
      case "very_high":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <section id="risk-assessment" className="py-20 bg-background relative overflow-hidden">
      {/* Background Image - Ghana healthcare */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=1920&h=1080&fit=crop"
          alt="Cancer screening and assessment in Ghana"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Ghana Flag Colors Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        background: "linear-gradient(135deg, #CE1126 0%, #FCD116 33%, #006B3F 66%)"
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Risk Assessment
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Breast Cancer Risk Assessment Tool
          </h2>
          <p className="text-muted-foreground text-lg">
            Complete this assessment to understand your personalized breast cancer risk profile and receive tailored recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Assessment Form</CardTitle>
              <CardDescription>
                Enter your information to get a personalized risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Quick Presets */}
                <div>
                  <Label className="mb-2 block">Quick Presets</Label>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => loadPreset("low_risk")}
                    >
                      Low Risk
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => loadPreset("moderate_risk")}
                    >
                      Moderate Risk
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => loadPreset("high_risk")}
                    >
                      High Risk
                    </Button>
                  </div>
                </div>

                {/* Age */}
                <div>
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>

                {/* BMI */}
                <div>
                  <Label htmlFor="bmi">Body Mass Index (BMI)</Label>
                  <Input
                    id="bmi"
                    type="number"
                    min="15"
                    max="60"
                    step="0.1"
                    value={formData.bmi}
                    onChange={(e) => handleInputChange("bmi", parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>

                {/* Breast Density */}
                <div>
                  <Label htmlFor="breast_density">Breast Density</Label>
                  <Select
                    value={formData.breast_density}
                    onValueChange={(value) => handleInputChange("breast_density", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="very_high">Very High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Menopausal Status */}
                <div>
                  <Label htmlFor="menopausal_status">Menopausal Status</Label>
                  <Select
                    value={formData.menopausal_status}
                    onValueChange={(value) => handleInputChange("menopausal_status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premenopausal">Premenopausal</SelectItem>
                      <SelectItem value="postmenopausal">Postmenopausal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* First Menstruation Age */}
                <div>
                  <Label htmlFor="first_menstruation_age">Age at First Menstruation</Label>
                  <Input
                    id="first_menstruation_age"
                    type="number"
                    min="8"
                    max="20"
                    value={formData.first_menstruation_age}
                    onChange={(e) => handleInputChange("first_menstruation_age", parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>

                {/* First Pregnancy Age */}
                <div>
                  <Label htmlFor="first_pregnancy_age">Age at First Pregnancy (or leave blank)</Label>
                  <Input
                    id="first_pregnancy_age"
                    type="number"
                    min="12"
                    max="60"
                    value={formData.first_pregnancy_age || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "first_pregnancy_age",
                        e.target.value ? parseFloat(e.target.value) : null
                      )
                    }
                  />
                </div>

                {/* Previous Biopsies */}
                <div>
                  <Label htmlFor="previous_biopsies">Number of Previous Breast Biopsies</Label>
                  <Input
                    id="previous_biopsies"
                    type="number"
                    min="0"
                    max="10"
                    value={formData.previous_biopsies}
                    onChange={(e) => handleInputChange("previous_biopsies", parseInt(e.target.value) || 0)}
                    required
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="family_history"
                      checked={formData.family_history}
                      onCheckedChange={(checked) => handleInputChange("family_history", checked)}
                    />
                    <Label htmlFor="family_history" className="cursor-pointer">
                      Family history of breast cancer
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hormone_use"
                      checked={formData.hormone_use}
                      onCheckedChange={(checked) => handleInputChange("hormone_use", checked)}
                    />
                    <Label htmlFor="hormone_use" className="cursor-pointer">
                      History of hormone replacement therapy use
                    </Label>
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Assessing..." : "Assess Risk"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Risk Score Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Assessment Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Risk Score</div>
                        <div className="text-3xl font-bold">{result.risk_score.toFixed(1)}%</div>
                      </div>
                      <Badge className={`${getRiskColor(result.risk_category)} text-white text-lg px-4 py-2`}>
                        {result.risk_category.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <div className="text-sm text-muted-foreground">Percentile Rank</div>
                        <div className="text-xl font-semibold">{result.metrics.percentile_rank.toFixed(0)}th</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Screening Frequency</div>
                        <div className="text-xl font-semibold">Every {result.metrics.screening_frequency_months} months</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Contributing Factors */}
                {Object.keys(result.contributing_factors).length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Contributing Factors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(result.contributing_factors).map(([factor, value]) => (
                          <div key={factor} className="flex justify-between items-center">
                            <span className="text-sm capitalize">{factor.replace("_", " ")}</span>
                            <Badge variant="secondary">{value.toFixed(1)}%</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Visualizations */}
                {plotUrls.riskScore && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Visualizations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="risk-score">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="risk-score">Risk Score</TabsTrigger>
                          <TabsTrigger value="factors">Factors</TabsTrigger>
                          <TabsTrigger value="timeline">Timeline</TabsTrigger>
                        </TabsList>
                        <TabsContent value="risk-score" className="mt-4">
                          <img src={plotUrls.riskScore} alt="Risk Score" className="w-full rounded" />
                        </TabsContent>
                        <TabsContent value="factors" className="mt-4">
                          <img src={plotUrls.factors} alt="Contributing Factors" className="w-full rounded" />
                        </TabsContent>
                        <TabsContent value="timeline" className="mt-4">
                          <img src={plotUrls.timeline} alt="Risk Timeline" className="w-full rounded" />
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Complete the assessment form to see your personalized risk results and recommendations.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskAssessmentSection;
