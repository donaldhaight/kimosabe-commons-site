import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Seo from "./components/Seo";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { ThemeProvider } from "./contexts/ThemeContext";
import Admin from "./pages/Admin";
import Apply from "./pages/Apply";
import BenefitReport from "./pages/BenefitReport";
import Contact from "./pages/Contact";
import Governance from "./pages/Governance";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import Participate from "./pages/Participate";
import Programs from "./pages/Programs";
import Resources from "./pages/Resources";
import Sponsor from "./pages/Sponsor";
import Territories from "./pages/Territories";
import TerritoryDetail from "./pages/TerritoryDetail";
import WhoWeServe from "./pages/WhoWeServe";

function Router() {
  const [location] = useLocation();

  return (
    <>
      <Seo path={location} />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/how-it-works" component={HowItWorks} />
            <Route path="/programs" component={Programs} />
            <Route path="/participate" component={Participate} />
            <Route path="/who-we-serve" component={WhoWeServe} />
            <Route path="/governance" component={Governance} />
            <Route path="/benefit-report" component={BenefitReport} />
            <Route path="/territories" component={Territories} />
            <Route path="/territories/:state" component={TerritoryDetail} />
            <Route path="/apply" component={Apply} />
            <Route path="/sponsor" component={Sponsor} />
            <Route path="/resources" component={Resources} />
            <Route path="/contact" component={Contact} />
            <Route path="/admin" component={Admin} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;