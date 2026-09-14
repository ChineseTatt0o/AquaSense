import { useEffect, useRef, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Bell,
  Bot,
  Droplets,
  Factory,
  Gauge,
  Home,
  Leaf,
  LogOut,
  MapPin,
  MessageCircle,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
  Send,
  Settings,
  ShieldAlert,
  Sparkles,
  Square,
  Sprout,
  Sun,
  UserRound,
  Waves,
} from 'lucide-react';
import appData from './data/aquasenseData.json';

const dataGeneratorModel = appData.chatbot.model;

const iconMap = {
  Droplets,
  Gauge,
  Leaf,
  MapPin,
  ShieldAlert,
  Waves,
};

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'sensors', label: 'Sensors & Leaks', icon: Gauge },
  { id: 'agriculture', label: 'Agriculture', icon: Sprout },
  { id: 'crisis', label: 'Morocco Water Crisis', icon: Waves },
  { id: 'chatbot', label: 'Chatbot', icon: MessageCircle },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const profileOptions = [
  {
    id: 'individual',
    title: 'Individual',
    subtitle: 'Home usage, bills, leaks, and personal conservation.',
    icon: UserRound,
  },
  {
    id: 'farmer',
    title: 'Farmer',
    subtitle: 'Smart irrigation, crop health, and field-level savings.',
    icon: Sprout,
  },
  {
    id: 'factory',
    title: 'Factory',
    subtitle: 'Industrial sensors, production water costs, and reuse efficiency.',
    icon: Factory,
  },
];

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

function makeSeries(length, start, step, wave, key, labelPrefix) {
  const labelKey = key === 'moisture' || labelPrefix === 'D' ? 'day' : labelPrefix === 'W' ? 'week' : 'month';

  return Array.from({ length }, (_, index) => ({
    [labelKey]: `${labelPrefix}${index + 1}`,
    [key]: Math.max(0, Math.round(start + index * step + Math.sin(index / 2) * wave)),
  }));
}

function createProfileData(profile) {
  const data = cloneData(appData);

  if (profile === 'individual') {
    data.topBar.eyebrow = 'Individual water intelligence account';
    data.user.accountLabel = 'Individual AquaSense profile';
    data.dashboard.kpis = [
      { label: 'Liters saved this month', value: '1,280 L', icon: 'Droplets', color: 'text-sky-600' },
      { label: 'Leaks detected', value: '1 active / 2 resolved', icon: 'ShieldAlert', color: 'text-red-600' },
      { label: 'Estimated bill savings', value: '42 MAD', icon: 'Gauge', color: 'text-teal-700' },
      { label: 'Sensors online', value: '4 / 4', icon: 'MapPin', color: 'text-emerald-600' },
      { label: 'Water waste reduced', value: '11% vs last month', icon: 'Waves', color: 'text-cyan-600' },
      { label: 'Smart routines active', value: '3', icon: 'Leaf', color: 'text-lime-700' },
    ];
    data.dashboard.consumptionData = makeSeries(30, 218, -1.8, 8, 'liters', 'D');
    data.dashboard.personalSavings = [
      { source: 'Bathrooms', saved: 420 },
      { source: 'Kitchen', saved: 310 },
      { source: 'Laundry', saved: 260 },
      { source: 'Garden', saved: 190 },
      { source: 'Tank overflow', saved: 100 },
    ];
    data.dashboard.usageBreakdown = [
      { name: 'Bathrooms', value: 36, color: '#0ea5e9' },
      { name: 'Kitchen', value: 24, color: '#38bdf8' },
      { name: 'Laundry', value: 20, color: '#0891b2' },
      { name: 'Garden', value: 14, color: '#0f766e' },
      { name: 'Other', value: 6, color: '#94a3b8' },
    ];
    data.dashboard.alerts = [
      { tone: 'yellow', text: 'Unusual night flow - bathroom meter', time: '4 min ago' },
      { tone: 'green', text: 'Kitchen line pressure normalized', time: '22 min ago' },
      { tone: 'red', text: 'Possible drip leak - rooftop tank valve', time: '1 hr ago' },
      { tone: 'green', text: 'Laundry cycle optimization complete', time: '3 hrs ago' },
      { tone: 'yellow', text: 'Garden routine paused due to rain forecast', time: 'Yesterday' },
    ];
    data.dashboard.recommendations = [
      { title: 'Rooftop tank valve', text: 'Inspect the float valve today; the pattern suggests a small but continuous overflow.', impact: 'Save about 90 L/day' },
      { title: 'Bathroom night flow', text: 'Check the flush tank seal and close the branch valve overnight if flow continues.', impact: 'Medium priority' },
      { title: 'Garden routine', text: 'Keep irrigation paused for the next cycle because the forecast already covers soil needs.', impact: 'Low effort' },
    ];
    data.sensorsPage.map.shape = 'home';
    data.sensorsPage.map.activeSensors = '4 Sensors Monitored';
    data.sensorsPage.map.description = 'Home inlet, bathroom, kitchen, and rooftop tank';
    data.sensorsPage.map.markers = [
      { position: 'left-[48%] top-[36%] bg-yellow-400', label: 'Bathroom' },
      { position: 'left-[56%] top-[48%] bg-emerald-500', label: 'Kitchen' },
      { position: 'left-[44%] top-[60%] bg-red-500', label: 'Tank valve' },
      { position: 'left-[52%] top-[68%] bg-emerald-500', label: 'Laundry' },
    ];
    data.sensorsPage.sensors = [
      { id: 'AS-HOME-001', location: 'Main inlet valve', status: 'Online', reading: '24 L/hr', pressure: 3.2, alert: 'None' },
      { id: 'AS-HOME-002', location: 'Bathroom meter', status: 'Warning', reading: '16 L/hr', pressure: 4.1, alert: 'Night flow' },
      { id: 'AS-HOME-003', location: 'Kitchen supply line', status: 'Online', reading: '11 L/hr', pressure: 3.4, alert: 'None' },
      { id: 'AS-HOME-004', location: 'Rooftop tank valve', status: 'Critical', reading: '31 L/hr', pressure: 2.0, alert: 'Leak signature' },
    ];
    data.sensorsPage.riskPanel = [
      { title: 'High Risk Zones', count: '1', items: ['Rooftop tank valve - intermittent drip leak detected'] },
      { title: 'Medium Risk', count: '1', items: ['Bathroom meter - abnormal night flow'] },
      { title: 'Resolved This Week', count: '2', items: ['Kitchen line - pressure normalized', 'Laundry branch - routine optimized'] },
    ];
  }

  if (profile === 'factory') {
    data.topBar.eyebrow = 'Industrial water intelligence account';
    data.user.accountLabel = 'Factory AquaSense profile';
    data.dashboard.subtitle = 'Production water performance, industrial leak risk, and reuse efficiency';
    data.dashboard.kpis = [
      { label: 'Liters saved this month', value: '84,500 L', icon: 'Droplets', color: 'text-sky-600' },
      { label: 'Leaks detected', value: '2 active / 2 resolved', icon: 'ShieldAlert', color: 'text-red-600' },
      { label: 'Estimated bill savings', value: '3,920 MAD', icon: 'Gauge', color: 'text-teal-700' },
      { label: 'Sensors online', value: '6 / 6', icon: 'MapPin', color: 'text-emerald-600' },
      { label: 'Water waste reduced', value: '12% vs last month', icon: 'Waves', color: 'text-cyan-600' },
      { label: 'Reuse loops active', value: '6', icon: 'Leaf', color: 'text-lime-700' },
    ];
    data.dashboard.consumptionData = makeSeries(30, 9200, -95, 360, 'liters', 'D');
    data.dashboard.personalSavings = [
      { source: 'Cooling loop', saved: 28200 },
      { source: 'Wash line', saved: 18700 },
      { source: 'Boiler feed', saved: 14600 },
      { source: 'CIP cycle', saved: 12600 },
      { source: 'Reuse tank', saved: 10400 },
    ];
    data.dashboard.usageBreakdown = [
      { name: 'Cooling', value: 34, color: '#0ea5e9' },
      { name: 'Cleaning', value: 26, color: '#38bdf8' },
      { name: 'Processing', value: 22, color: '#0f766e' },
      { name: 'Boilers', value: 12, color: '#0891b2' },
      { name: 'Other', value: 6, color: '#94a3b8' },
    ];
    data.dashboard.alerts = [
      { tone: 'red', text: 'High flow anomaly - wash line 2', time: 'just now' },
      { tone: 'yellow', text: 'Cooling loop pressure drift', time: '11 min ago' },
      { tone: 'green', text: 'Reuse tank level stabilized', time: '38 min ago' },
      { tone: 'red', text: 'Valve leak detected - boiler feed', time: '2 hrs ago' },
      { tone: 'yellow', text: 'Sensor offline - CIP outlet', time: '4 hrs ago' },
    ];
    data.dashboard.recommendations = [
      { title: 'Wash line 2', text: 'Run a 20-minute isolation test before the afternoon production block.', impact: 'High priority' },
      { title: 'Cooling loop', text: 'Raise recirculation by 6% and compare pressure drift after one cycle.', impact: 'Save about 2,400 L/day' },
      { title: 'CIP outlet', text: 'Replace the intermittent sensor battery before the night sanitation run.', impact: 'Reliability fix' },
    ];
    data.sensorsPage.map.shape = 'factory';
    data.sensorsPage.map.activeSensors = '6 Sensors Monitored';
    data.sensorsPage.map.description = 'Production lines, cooling loop, boiler feed, and reuse tank';
    data.sensorsPage.map.markers = [
      { position: 'left-[44%] top-[38%] bg-red-500', label: 'Wash line' },
      { position: 'left-[58%] top-[45%] bg-yellow-400', label: 'Cooling' },
      { position: 'left-[50%] top-[57%] bg-emerald-500', label: 'Reuse tank' },
      { position: 'left-[61%] top-[62%] bg-red-500', label: 'Boiler feed' },
      { position: 'left-[39%] top-[52%] bg-yellow-400', label: 'CIP outlet' },
      { position: 'left-[52%] top-[70%] bg-emerald-500', label: 'Production line' },
    ];
    data.sensorsPage.sensors = [
      { id: 'AS-FACT-001', location: 'Wash line 2', status: 'Critical', reading: '1,840 L/hr', pressure: 6.9, alert: 'High flow' },
      { id: 'AS-FACT-002', location: 'Cooling loop inlet', status: 'Warning', reading: '2,420 L/hr', pressure: 5.6, alert: 'Pressure drift' },
      { id: 'AS-FACT-003', location: 'Reuse tank outlet', status: 'Online', reading: '1,180 L/hr', pressure: 4.2, alert: 'None' },
      { id: 'AS-FACT-004', location: 'Boiler feed valve', status: 'Critical', reading: '720 L/hr', pressure: 7.1, alert: 'Leak signature' },
      { id: 'AS-FACT-005', location: 'CIP outlet', status: 'Warning', reading: '610 L/hr', pressure: 3.8, alert: 'Sensor intermittent' },
      { id: 'AS-FACT-006', location: 'Production line 1', status: 'Online', reading: '1,340 L/hr', pressure: 4.7, alert: 'None' },
    ];
    data.sensorsPage.riskPanel = [
      { title: 'High Risk Zones', count: '2', items: ['Wash line 2 - sustained high flow', 'Boiler feed valve - leak signature'] },
      { title: 'Medium Risk', count: '2', items: ['Cooling loop - pressure drift', 'CIP outlet - intermittent readings'] },
      { title: 'Resolved This Week', count: '2', items: ['Production line 1 - pressure normalized', 'Filter backwash - schedule optimized'] },
    ];
    data.agriculture.title = 'Production Water Costs';
    data.agriculture.subtitle = 'Industrial water use, reuse savings, and process-level recommendations';
    data.agriculture.cards = [
      { label: 'Water used this week', value: '286,000 L' },
      { label: 'Recommended production window', value: 'Night cycle, 1am' },
      { label: 'Savings vs baseline', value: '18%' },
      { label: 'Reuse efficiency', value: '41%' },
    ];
    data.agriculture.soilMoisture = makeSeries(14, 72, -1.4, 4, 'moisture', 'Day ');
    data.agriculture.irrigationComparison = Array.from({ length: 8 }, (_, index) => ({
      week: `W${index + 1}`,
      aquasense: 248000 + index * 2100 + Math.round(Math.sin(index) * 4300),
      traditional: 302000 + index * 3600,
    }));
    data.agriculture.crops = [
      { plot: 'Wash line 1', cropType: 'Cleaning', soilMoisture: '62 MAD/m3', lastIrrigated: 'Today', recommendation: 'Reduce rinse duration by 8%' },
      { plot: 'Cooling loop', cropType: 'Cooling', soilMoisture: '44 MAD/m3', lastIrrigated: 'Today', recommendation: 'Increase recirculation setpoint' },
      { plot: 'Boiler feed', cropType: 'Steam', soilMoisture: '71 MAD/m3', lastIrrigated: 'Yesterday', recommendation: 'Inspect feed valve' },
      { plot: 'CIP cycle', cropType: 'Sanitation', soilMoisture: '58 MAD/m3', lastIrrigated: '2 hrs ago', recommendation: 'Shift cycle to off-peak' },
      { plot: 'Reuse tank', cropType: 'Recovery', soilMoisture: '29 MAD/m3', lastIrrigated: 'Online', recommendation: 'Optimal - maintain flow' },
      { plot: 'Filter backwash', cropType: 'Treatment', soilMoisture: '49 MAD/m3', lastIrrigated: 'Today', recommendation: 'Delay next backwash 6 hrs' },
    ];
  }

  data.settings.description = `${data.brand.name} is running with a ${profile} demo profile, mocked sensors, JSON-driven telemetry, local Aqua data generation, and local Ollama chat.`;
  return data;
}

function getNavItems(profile) {
  return navItems
    .filter((item) => !(profile === 'individual' && item.id === 'agriculture'))
    .map((item) => (profile === 'factory' && item.id === 'agriculture' ? { ...item, label: 'Production', icon: Factory } : item));
}

function getUsageBreakdown(profile, data = appData) {
  if (profile === 'individual') {
    return {
      title: 'Home Water Usage Breakdown',
      subtitle: 'Current month by household use',
      data: [
        { name: 'Bathrooms', value: 36, color: '#0ea5e9' },
        { name: 'Kitchen', value: 24, color: '#38bdf8' },
        { name: 'Laundry', value: 20, color: '#0891b2' },
        { name: 'Garden', value: 14, color: '#0f766e' },
        { name: 'Other', value: 6, color: '#94a3b8' },
      ],
    };
  }

  if (profile === 'factory') {
    return {
      title: 'Industrial Water Usage Breakdown',
      subtitle: 'Current month by production process',
      data: [
        { name: 'Cooling', value: 34, color: '#0ea5e9' },
        { name: 'Cleaning', value: 26, color: '#38bdf8' },
        { name: 'Processing', value: 22, color: '#0f766e' },
        { name: 'Boilers', value: 12, color: '#0891b2' },
        { name: 'Other', value: 6, color: '#94a3b8' },
      ],
    };
  }

  return {
    title: 'Farm Water Usage Breakdown',
    subtitle: 'Current month by farm use',
    data: data.dashboard.usageBreakdown,
  };
}

function normalizeProfileData(data, profile) {
  const usageBreakdown = getUsageBreakdown(profile, data);

  return {
    ...data,
    dashboard: {
      ...data.dashboard,
      usageBreakdown: usageBreakdown.data,
    },
  };
}

function formatDate() {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date('2026-05-16T12:00:00'));
}

function extractJsonObject(content) {
  const trimmed = content.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : trimmed;
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');

  if (start === -1 || end === -1) {
    throw new Error('No JSON object found in Aqua response');
  }

  return JSON.parse(candidate.slice(start, end + 1));
}

function mergeDemoData(base, generated) {
  if (Array.isArray(base)) {
    return Array.isArray(generated) && generated.length > 0 ? generated : base;
  }

  if (base && typeof base === 'object') {
    return Object.keys(base).reduce((merged, key) => {
      merged[key] = mergeDemoData(base[key], generated?.[key]);
      return merged;
    }, {});
  }

  return generated ?? base;
}

function lockCriticalFields(generatedData, baseData = appData) {
  const mergedData = mergeDemoData(baseData, generatedData);
  const baseSensorKpi = baseData.dashboard.kpis.find((kpi) => kpi.label === 'Sensors online');
  const mergedKpis = mergedData.dashboard.kpis.map((kpi) => (kpi.label === 'Sensors online' && baseSensorKpi ? baseSensorKpi : kpi));
  const lockedSensors = baseData.sensorsPage.sensors.map((baseSensor, index) => ({
    ...(mergedData.sensorsPage.sensors[index] || baseSensor),
    id: baseSensor.id,
    location: baseSensor.location,
    status: baseSensor.status,
  }));
  const lockedRiskPanel = baseData.sensorsPage.riskPanel.map((baseRisk, index) => ({
    ...(mergedData.sensorsPage.riskPanel[index] || baseRisk),
    title: baseRisk.title,
    count: baseRisk.count,
  }));

  return {
    ...mergedData,
    brand: baseData.brand,
    user: baseData.user,
    dashboard: {
      ...mergedData.dashboard,
      kpis: mergedKpis,
    },
    sensorsPage: {
      ...mergedData.sensorsPage,
      sensors: lockedSensors,
      riskPanel: lockedRiskPanel,
      map: {
        ...mergedData.sensorsPage.map,
        activeSensors: baseData.sensorsPage.map.activeSensors,
        markers: baseData.sensorsPage.map.markers,
      },
    },
    topBar: {
      ...baseData.topBar,
      status: mergedData?.topBar?.status || baseData.topBar.status,
    },
    chatbot: {
      ...baseData.chatbot,
      starters: mergedData?.chatbot?.starters || baseData.chatbot.starters,
      emptyStateTitle: mergedData?.chatbot?.emptyStateTitle || baseData.chatbot.emptyStateTitle,
      title: baseData.chatbot.title,
      subtitle: baseData.chatbot.subtitle,
      model: baseData.chatbot.model,
      ollamaUrl: baseData.chatbot.ollamaUrl,
      systemPrompt: baseData.chatbot.systemPrompt,
    },
  };
}

async function generateDataWithAqua(currentData) {
  const response = await fetch(appData.chatbot.ollamaUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: dataGeneratorModel,
      stream: false,
      format: 'json',
      messages: [
        {
          role: 'system',
          content:
            'You generate sensible demo JSON for AquaSense, a Morocco water intelligence prototype. Return valid JSON only. Do not include markdown. Do not change the number of monitored or online sensors.',
        },
        {
          role: 'user',
          content: `Create a fresh realistic demo dataset using exactly this JSON schema. Preserve the same object keys and array shapes. Keep all values sensible for the current AquaSense profile. Do not rename AquaSense, do not change the user identity, and do not change Ollama/chatbot connection fields. Do not change dashboard.kpis where label is "Sensors online". Do not change sensorsPage.map.activeSensors. Vary numeric values, chart series, statuses, alerts, recommendations, and short explanatory text.\n\nCurrent JSON:\n${JSON.stringify(currentData)}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`${dataGeneratorModel} returned ${response.status}`);
  }

  const payload = await response.json();
  const generated = extractJsonObject(payload?.message?.content || '');
  return lockCriticalFields(generated, currentData);
}

function App() {
  const [profile, setProfile] = useState(null);
  const [data, setData] = useState(() => createProfileData('farmer'));
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isGeneratingData, setIsGeneratingData] = useState(false);
  const [generationError, setGenerationError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('aquasense-theme') !== 'light';
  });
  const Page = {
    dashboard: Dashboard,
    sensors: SensorsLeaks,
    agriculture: Agriculture,
    crisis: WaterCrisis,
    chatbot: Chatbot,
    settings: SettingsPage,
  }[activePage];
  const profileNavItems = getNavItems(profile);

  function toggleTheme() {
    setIsDarkMode((current) => {
      const next = !current;
      window.localStorage.setItem('aquasense-theme', next ? 'dark' : 'light');
      return next;
    });
  }

  async function handleGenerateData() {
    setIsGeneratingData(true);
    setGenerationError('');

    try {
      const nextData = await generateDataWithAqua(data);
      setData(normalizeProfileData(nextData, profile));
    } catch (error) {
      setGenerationError('Aqua could not generate new data. Make sure Ollama is running and Aqua:latest is installed.');
    } finally {
      setIsGeneratingData(false);
    }
  }

  function handleSelectProfile(nextProfile) {
    setProfile(nextProfile);
    setData(normalizeProfileData(createProfileData(nextProfile), nextProfile));
    setActivePage('dashboard');
    setGenerationError('');
  }

  function handleLogout() {
    setProfile(null);
    setActivePage('dashboard');
    setGenerationError('');
  }

  function handlePointerMove(event) {
    event.currentTarget.style.setProperty('--cursor-x', `${event.clientX}px`);
    event.currentTarget.style.setProperty('--cursor-y', `${event.clientY}px`);
  }

  useEffect(() => {
    function updateTilt(event) {
      const surface = event.target.closest('button, .card');
      if (!surface) return;
      const rect = surface.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      surface.style.setProperty('--tilt-x', `${(-y * 14).toFixed(2)}deg`);
      surface.style.setProperty('--tilt-y', `${(x * 16).toFixed(2)}deg`);
    }

    function resetTilt(event) {
      const surface = event.target.closest?.('button, .card');
      if (!surface || surface.matches(':hover')) return;
      surface.style.setProperty('--tilt-x', '0deg');
      surface.style.setProperty('--tilt-y', '0deg');
    }

    document.addEventListener('pointermove', updateTilt);
    document.addEventListener('pointerleave', resetTilt, true);
    document.addEventListener('pointerout', resetTilt, true);
    return () => {
      document.removeEventListener('pointermove', updateTilt);
      document.removeEventListener('pointerleave', resetTilt, true);
      document.removeEventListener('pointerout', resetTilt, true);
    };
  }, []);

  if (!profile) {
    return (
      <div
        className={`app-shell min-h-screen text-slate-900 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}
        onPointerMove={handlePointerMove}
      >
        <LoginScreen isDarkMode={isDarkMode} onSelectProfile={handleSelectProfile} toggleTheme={toggleTheme} />
      </div>
    );
  }

  return (
    <div
      className={`app-shell min-h-screen text-slate-900 transition-colors duration-300 lg:flex ${isDarkMode ? 'dark' : ''}`}
      onPointerMove={handlePointerMove}
    >
      <Sidebar
        activePage={activePage}
        data={data}
        isCollapsed={isSidebarCollapsed}
        navItems={profileNavItems}
        setActivePage={setActivePage}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <main className={`min-w-0 flex-1 transition-[margin] duration-500 ease-out ${isSidebarCollapsed ? 'lg:ml-24' : 'lg:ml-56'}`}>
        <TopBar
          data={data}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
        <div className="p-4 sm:p-5 xl:p-6">
          <Page
            data={data}
            generationError={generationError}
            isGeneratingData={isGeneratingData}
            onLogout={handleLogout}
            onGenerateData={handleGenerateData}
            profile={profile}
          />
        </div>
      </main>
    </div>
  );
}

function LoginScreen({ isDarkMode, onSelectProfile, toggleTheme }) {
  const ThemeIcon = isDarkMode ? Sun : Moon;

  return (
    <main className="relative z-10 grid min-h-screen place-items-center px-5 py-10">
      <div className="w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-500/20 ring-1 ring-sky-300/30">
              <Droplets className="h-8 w-8 text-sky-300" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-950">{appData.brand.name}</div>
              <div className="text-sm text-slate-500">{appData.brand.tagline}</div>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="grid h-11 w-11 place-items-center rounded-xl bg-white/70 text-slate-700 ring-1 ring-white/70 backdrop-blur transition hover:bg-sky-50 dark:bg-sky-950/55 dark:text-sky-100 dark:ring-sky-300/15"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <ThemeIcon className="h-5 w-5" />
          </button>
        </div>

        <section className="card no-tilt p-6 sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-sky-600 dark:text-sky-300">Choose a demo profile</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Log in to AquaSense</h1>
            <p className="mt-3 text-slate-600">
              Select the kind of account you want to present. This changes the dashboard, available pages, and water telemetry while keeping the prototype identity consistent.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {profileOptions.map((option) => {
              const Icon = option.icon;

              return (
                <button
                  className="rounded-lg border border-white/60 bg-white/60 p-5 text-left shadow-lg shadow-slate-950/5 ring-1 ring-white/60 backdrop-blur transition hover:border-sky-300 hover:bg-sky-50/80 dark:border-sky-300/15 dark:bg-sky-950/35 dark:text-sky-50 dark:hover:bg-sky-900/60"
                  key={option.id}
                  onClick={() => onSelectProfile(option.id)}
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-950/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-xl font-bold">{option.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{option.subtitle}</p>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function Sidebar({ activePage, data, isCollapsed, navItems, setActivePage, setIsCollapsed }) {
  const ToggleIcon = isCollapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <aside
      className={`bg-midnight/95 text-white shadow-2xl shadow-sky-950/25 backdrop-blur-2xl transition-all duration-500 ease-out lg:fixed lg:z-30 ${
        isCollapsed
          ? 'lg:left-4 lg:top-[50vh] lg:max-h-[calc(100vh-2rem)] lg:w-20 lg:-translate-y-1/2 lg:overflow-y-auto lg:rounded-[2rem] lg:ring-1 lg:ring-sky-300/20'
          : 'lg:inset-y-0 lg:left-0 lg:w-56 lg:translate-y-0'
      }`}
    >
      <div className={`flex flex-col p-5 transition-all duration-500 ${isCollapsed ? 'gap-4 lg:h-auto lg:items-center lg:px-2 lg:py-4' : 'h-full gap-6'}`}>
        <div className={`flex items-center gap-3 ${isCollapsed ? 'lg:w-full lg:justify-center lg:gap-0' : ''}`}>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky-500/20 ring-1 ring-sky-300/30">
            <Droplets className="h-7 w-7 text-sky-300" />
          </div>
          <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? 'lg:hidden' : 'w-36 opacity-100'}`}>
            <div className="text-xl font-bold leading-tight">{data.brand.name}</div>
            <div className="text-xs text-sky-200">{data.brand.arabicLabel}</div>
          </div>
        </div>
        <button
          onClick={() => setIsCollapsed((current) => !current)}
          className={`hidden h-10 items-center justify-center rounded-2xl bg-white/10 text-sky-100 ring-1 ring-white/15 backdrop-blur transition hover:bg-white/15 lg:flex ${
            isCollapsed ? 'w-12' : 'w-full gap-2'
          }`}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ToggleIcon className="h-5 w-5" />
          <span className={`text-sm font-semibold transition-all duration-300 ${isCollapsed ? 'lg:hidden' : ''}`}>Collapse</span>
        </button>
        <p className={`text-sm text-slate-300 transition-all duration-300 ${isCollapsed ? 'lg:hidden' : ''}`}>
          {data.brand.tagline}
        </p>

        <nav className={`grid gap-2 ${isCollapsed ? 'lg:w-full lg:justify-items-center' : ''}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const selected = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${
                  isCollapsed ? 'lg:h-12 lg:w-12 lg:justify-center lg:px-0' : 'gap-3'
                } ${
                  selected
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-950/30 ring-1 ring-sky-200/20'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'lg:w-0 lg:opacity-0' : 'w-auto opacity-100'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className={`rounded-2xl bg-white/10 p-3 ring-1 ring-white/15 backdrop-blur transition-all duration-500 ${isCollapsed ? 'lg:grid lg:h-12 lg:w-12 lg:place-items-center lg:p-0' : 'mt-auto'}`}>
          <div className={`flex items-center gap-3 ${isCollapsed ? 'lg:justify-center lg:gap-0' : ''}`}>
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-500 text-sm font-bold">{data.user.initials}</div>
            <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? 'lg:hidden' : 'w-36 opacity-100'}`}>
              <div className="text-sm font-semibold">{data.user.name}</div>
              <div className="text-xs text-slate-300">{data.user.accountLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ data, isDarkMode, toggleTheme }) {
  const ThemeIcon = isDarkMode ? Sun : Moon;

  return (
    <header className="topbar-glass sticky top-0 z-20">
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 xl:px-8">
        <div>
          <div className="text-sm font-medium text-slate-500">{data.topBar.eyebrow}</div>
          <div className="text-lg font-semibold text-slate-900">{formatDate()}</div>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-300/20">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            {data.topBar.status}
          </span>
          <button
            onClick={toggleTheme}
            className="relative grid h-10 w-10 place-items-center rounded-lg bg-white/70 text-slate-700 ring-1 ring-white/70 backdrop-blur transition hover:bg-sky-50 dark:bg-sky-950/55 dark:text-sky-100 dark:ring-sky-300/15 dark:hover:bg-sky-900/65"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Light mode' : 'Dark mode'}
          >
            <ThemeIcon className="h-5 w-5" />
          </button>
          <button className="relative grid h-10 w-10 place-items-center rounded-lg bg-white/70 text-slate-700 ring-1 ring-white/70 backdrop-blur transition hover:bg-sky-50 dark:bg-sky-950/55 dark:text-sky-100 dark:ring-sky-300/15 dark:hover:bg-sky-900/65">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Dashboard({ data, profile }) {
  const consumptionData = data.dashboard.consumptionData;
  const personalSavings = data.dashboard.personalSavings;
  const usageBreakdown = getUsageBreakdown(profile, data);

  return (
    <PageShell title={data.dashboard.title} subtitle={data.dashboard.subtitle}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.dashboard.kpis.map((kpi) => {
          const Icon = iconMap[kpi.icon] || Droplets;

          return (
          <div className="card p-5" key={kpi.label}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-950">{kpi.value}</p>
              </div>
              <Icon className={`h-7 w-7 ${kpi.color}`} />
            </div>
          </div>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-5">
          <ChartCard title="Daily Water Consumption" subtitle="Last 30 days, liters per day">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={consumptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `${v / 1000}k`} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => `${value.toLocaleString()} L`} />
                <Line type="monotone" dataKey="liters" stroke="#0ea5e9" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <div className="grid gap-5 lg:grid-cols-2">
            <ChartCard title="Water Saved by Source" subtitle="Your monthly conservation impact">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={personalSavings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="source" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${v / 1000}k`} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => `${value.toLocaleString()} L`} />
                  <Bar dataKey="saved" radius={[6, 6, 0, 0]} fill="#0f766e" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title={usageBreakdown.title} subtitle={usageBreakdown.subtitle}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={usageBreakdown.data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3}>
                    {usageBreakdown.data.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid gap-2">
                {usageBreakdown.data.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                      {item.name}
                    </span>
                    <strong>{item.value}%</strong>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>
        <AlertsPanel data={data} />
      </div>

      {data.dashboard.recommendations?.length > 0 && (
        <RecommendationsPanel recommendations={data.dashboard.recommendations} />
      )}
    </PageShell>
  );
}

const mapMarkerFallbacks = [
  { left: 45, top: 36 },
  { left: 55, top: 44 },
  { left: 43, top: 58 },
  { left: 61, top: 34 },
  { left: 50, top: 68 },
  { left: 36, top: 48 },
  { left: 64, top: 60 },
];

const markerColors = {
  'bg-red-500': '#ef4444',
  'bg-yellow-400': '#facc15',
  'bg-emerald-500': '#10b981',
  'bg-green-500': '#22c55e',
  'bg-sky-500': '#0ea5e9',
};

function getMapMarkerStyle(marker, index) {
  const fallback = mapMarkerFallbacks[index % mapMarkerFallbacks.length];
  const left = marker.position?.match(/left-\[(\d+)%\]/)?.[1] || fallback.left;
  const top = marker.position?.match(/top-\[(\d+)%\]/)?.[1] || fallback.top;
  const colorClass = Object.keys(markerColors).find((className) => marker.position?.includes(className));

  return {
    left: `${left}%`,
    top: `${top}%`,
    '--marker-color': markerColors[colorClass] || markerColors['bg-sky-500'],
  };
}

function SensorMapGraphic({ shape }) {
  if (shape === 'home') {
    return (
      <div className="absolute left-1/2 top-1/2 z-0 flex h-56 w-64 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <Home className="h-40 w-40 text-sky-300/45 drop-shadow-[0_0_24px_rgba(14,165,233,0.18)] dark:text-cyan-200/25" strokeWidth={1.4} />
      </div>
    );
  }

  if (shape === 'factory') {
    return (
      <div className="absolute left-1/2 top-1/2 z-0 flex h-56 w-72 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <Factory className="h-44 w-44 text-sky-300/45 drop-shadow-[0_0_24px_rgba(14,165,233,0.18)] dark:text-cyan-200/25" strokeWidth={1.3} />
      </div>
    );
  }

  return (
    <div className="absolute left-1/2 top-1/2 z-0 grid h-52 w-72 -translate-x-1/2 -translate-y-1/2 grid-cols-3 gap-3 rounded-2xl border border-sky-300/50 p-3 dark:border-cyan-200/20">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          className="rounded-xl border border-sky-300/45 bg-sky-50/25 shadow-inner dark:border-cyan-200/15 dark:bg-sky-300/5"
          key={index}
        />
      ))}
    </div>
  );
}

function SensorsLeaks({ data }) {
  return (
    <PageShell title={data.sensorsPage.title} subtitle={data.sensorsPage.subtitle}>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-5">
          <div className="card relative min-h-[360px] overflow-hidden p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.2),transparent_35%),radial-gradient(circle_at_70%_55%,rgba(15,118,110,0.18),transparent_30%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.22),transparent_35%),radial-gradient(circle_at_70%_55%,rgba(45,212,191,0.18),transparent_30%)]" />
            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">{data.sensorsPage.map.label}</p>
              <h2 className="mt-2 text-2xl font-bold">{data.sensorsPage.map.activeSensors}</h2>
              <p className="mt-1 text-sm text-slate-500">{data.sensorsPage.map.description}</p>
            </div>
            <SensorMapGraphic shape={data.sensorsPage.map.shape} />
            {data.sensorsPage.map.markers.map((marker, index) => (
              <div key={marker.label} className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={getMapMarkerStyle(marker, index)}>
                <span className="block h-4 w-4 rounded-full shadow-lg ring-4 ring-white dark:ring-slate-950/70" style={{ background: 'var(--marker-color)' }} />
              </div>
            ))}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap gap-2 rounded-lg bg-white/70 p-3 text-xs font-semibold text-slate-700 shadow-lg ring-1 ring-white/70 backdrop-blur dark:bg-slate-950/60 dark:text-sky-100 dark:ring-sky-300/15">
              {data.sensorsPage.map.markers.map((marker, index) => (
                <div className="flex items-center gap-2" key={`legend-${marker.label}`} style={getMapMarkerStyle(marker, index)}>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--marker-color)' }} />
                  <span>{marker.label}</span>
                </div>
              ))}
            </div>
          </div>
          <SensorTable data={data} />
        </div>
        <LeakRiskPanel data={data} />
      </div>
    </PageShell>
  );
}

function RecommendationsPanel({ recommendations }) {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-sky-500" />
        <h2 className="text-lg font-bold">Recommended Next Actions</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {recommendations.map((recommendation) => (
          <div className="rounded-lg border border-slate-200 bg-white/45 p-4 dark:border-sky-300/15 dark:bg-slate-950/25" key={recommendation.title}>
            <p className="font-bold text-slate-950">{recommendation.title}</p>
            <p className="mt-2 text-sm text-slate-500">{recommendation.text}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-sky-600">{recommendation.impact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Agriculture({ data }) {
  const isFactory = data.agriculture.title === 'Production Water Costs';
  const cropRows = data.agriculture.crops.map((crop) => [
    crop.plot,
    crop.cropType,
    crop.soilMoisture,
    crop.lastIrrigated,
    crop.recommendation,
  ]);

  return (
    <PageShell title={data.agriculture.title} subtitle={data.agriculture.subtitle}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.agriculture.cards.map((card) => (
          <div className="card p-5" key={card.label}>
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <p className="mt-2 text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <ChartCard
          title={isFactory ? 'Process Water Cost Index' : 'Soil Moisture Level'}
          subtitle={isFactory ? '14-day process cost pressure score' : '14-day average across your active plots'}
        >
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.agriculture.soilMoisture}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Line dataKey="moisture" stroke="#0f766e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard
          title={isFactory ? 'Optimized vs Baseline Use' : 'Irrigation Method Comparison'}
          subtitle={isFactory ? 'Weekly liters by production planning mode' : 'Your weekly use vs traditional estimate'}
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.agriculture.irrigationComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" />
              <YAxis tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(value) => `${value.toLocaleString()} L`} />
              <Bar dataKey="aquasense" name={isFactory ? 'Optimized' : 'AquaSense-guided'} fill="#0ea5e9" radius={[6, 6, 0, 0]} />
              <Bar dataKey="traditional" name={isFactory ? 'Baseline' : 'Traditional'} fill="#94a3b8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <DataTable
        headers={isFactory ? ['Process', 'Use Type', 'Water Cost', 'Last Active', 'Recommendation'] : ['Plot', 'Crop Type', 'Soil Moisture', 'Last Irrigated', 'Recommendation']}
        rows={cropRows}
      />
    </PageShell>
  );
}

function WaterCrisis({ data }) {
  return (
    <PageShell title={data.crisis.title} subtitle={data.crisis.subtitle}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {data.crisis.stats.map((stat) => (
          <div className="card p-5" key={stat.label}>
            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold text-sky-700">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-500">{stat.detail}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        <ChartCard title="Dam Fill Rate" subtitle="Last 12 months">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data.crisis.damFill}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Line dataKey="fill" stroke="#0ea5e9" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Regional Water Availability" subtitle="m3/person/year">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.crisis.availability}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="region" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip formatter={(value) => `${value} m3`} />
              <Bar dataKey="m3" fill="#0f766e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Demand vs Supply" subtitle="Projection, billion m3">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data.crisis.demandSupply}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="demand" stroke="#ef4444" fill="#fecaca" name="Demand" />
              <Area type="monotone" dataKey="supply" stroke="#0ea5e9" fill="#bae6fd" name="Supply" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {data.crisis.textBlocks.map((block) => (
          <article className="card p-5" key={block.title}>
            <h3 className="text-lg font-bold">{block.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{block.text}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function Chatbot({ data }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef(null);

  function stopGeneration() {
    abortControllerRef.current?.abort();
  }

  async function sendMessage(text = input) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    const updateAssistantMessage = (content) => {
      setMessages([...nextMessages, { role: 'assistant', content }]);
    };

    setMessages([...nextMessages, { role: 'assistant', content: '' }]);
    setInput('');
    setIsLoading(true);
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    let accumulated = '';

    try {
      const response = await fetch(data.chatbot.ollamaUrl, {
        method: 'POST',
        signal: abortController.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: data.chatbot.model,
          stream: true,
          messages: [
            { role: 'system', content: data.chatbot.systemPrompt },
            ...nextMessages,
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama returned ${response.status}`);
      }

      if (!response.body) {
        const data = await response.json();
        updateAssistantMessage(data?.message?.content || 'Aqua responded, but no message content was returned by Ollama.');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      function handleStreamLine(line) {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;

        const payload = JSON.parse(trimmedLine);
        if (payload.error) {
          throw new Error(payload.error);
        }

        const token = payload?.message?.content || '';
        if (token) {
          accumulated += token;
          updateAssistantMessage(accumulated);
        }
      }

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          buffer += decoder.decode();
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        lines.forEach(handleStreamLine);
      }

      if (buffer.trim()) {
        handleStreamLine(buffer);
      }

      if (!accumulated.trim()) {
        updateAssistantMessage('Aqua responded, but no message content was returned by Ollama.');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        updateAssistantMessage(accumulated || 'Response stopped.');
        return;
      }

      updateAssistantMessage(
        'I could not connect to the local Aqua model. Make sure Ollama is running at http://127.0.0.1:11434/ and that the Aqua:latest model is available.',
      );
    } finally {
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }

  useEffect(() => () => abortControllerRef.current?.abort(), []);

  return (
    <PageShell title={data.chatbot.title} subtitle={data.chatbot.subtitle}>
      <div className="card no-tilt flex min-h-[680px] flex-col overflow-hidden">
        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          {messages.length === 0 && (
            <div className="mx-auto max-w-3xl py-8 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sky-100 text-sky-700">
                <Bot className="h-8 w-8" />
              </div>
              <h2 className="mt-4 text-2xl font-bold">{data.chatbot.emptyStateTitle}</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {data.chatbot.starters.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="rounded-lg border border-slate-200 bg-white/70 p-4 text-left text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:border-sky-300 hover:bg-sky-50 dark:border-sky-300/20 dark:bg-sky-950/45 dark:text-sky-50 dark:shadow-sky-950/30 dark:hover:border-cyan-200/40 dark:hover:bg-sky-900/70"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((message, index) => (
            <ChatBubble message={message} key={`${message.role}-${index}`} />
          ))}
        </div>
        <div className="border-t border-slate-200 bg-white/75 p-4 backdrop-blur dark:border-sky-300/15 dark:bg-slate-950/45">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
              placeholder="Ask AquaSense Assistant..."
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
            {isLoading ? (
              <button
                onClick={stopGeneration}
                className="grid h-12 w-12 place-items-center rounded-lg bg-red-500 text-white shadow-lg shadow-red-950/20"
                title="Stop generation"
                aria-label="Stop generation"
              >
                <Square className="h-4 w-4 fill-current" />
              </button>
            ) : (
              <button onClick={() => sendMessage()} className="grid h-12 w-12 place-items-center rounded-lg bg-sky-500 text-white shadow-lg shadow-sky-200 dark:shadow-sky-950/40">
                <Send className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function SettingsPage({ data, generationError, isGeneratingData, onGenerateData, onLogout, profile }) {
  return (
    <PageShell title={data.settings.title} subtitle={data.settings.subtitle}>
      <div className="card max-w-3xl p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sky-600 ring-1 ring-sky-400/20 dark:text-sky-200">
              <Sparkles className="h-3.5 w-3.5" />
              Aqua Data Generator
            </div>
            <h2 className="mt-4 text-xl font-bold">Generate fresh demo telemetry</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Ask <strong>Aqua:latest</strong> to produce a new sensible AquaSense dataset for the dashboard, sensors, agriculture, crisis stats, alerts, and recommendations. Brand, user identity, chat connection settings, and sensor counts stay locked.
            </p>
            {generationError && <p className="mt-3 text-sm font-semibold text-red-300">{generationError}</p>}
          </div>
          <button
            onClick={onGenerateData}
            disabled={isGeneratingData}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-sky-500 px-4 text-sm font-bold text-white shadow-lg shadow-sky-950/20 ring-1 ring-sky-200/25 transition hover:bg-sky-400 disabled:cursor-wait disabled:opacity-70"
          >
            {isGeneratingData ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {isGeneratingData ? 'Generating...' : 'Generate Values'}
          </button>
        </div>
      </div>
      <div className="card max-w-3xl p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-300 ring-1 ring-red-400/20">
              <LogOut className="h-3.5 w-3.5" />
              Account Session
            </div>
            <h2 className="mt-4 text-xl font-bold">Switch demo profile</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              You are currently viewing the <strong className="capitalize">{profile}</strong> account. Return to the profile selection screen to log in as an individual, farmer, or factory.
            </p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-red-500/90 px-4 text-sm font-bold text-white shadow-lg shadow-red-950/20 ring-1 ring-red-200/25 transition hover:bg-red-400"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </div>
    </PageShell>
  );
}

function PageShell({ title, subtitle, children }) {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">{title}</h1>
        <p className="mt-1 text-slate-600">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="card p-5">
      <div className="mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function AlertsPanel({ data }) {
  const colors = {
    red: 'bg-red-500',
    yellow: 'bg-yellow-400',
    green: 'bg-emerald-500',
  };
  return (
    <aside className="card h-fit p-5">
      <h2 className="text-lg font-bold">Recent Alerts</h2>
      <div className="mt-4 space-y-3">
        {data.dashboard.alerts.map((alert) => (
          <div key={`${alert.text}-${alert.time}`} className="rounded-lg border border-slate-200 p-3">
            <div className="flex gap-3">
              <span className={`mt-1 h-3 w-3 rounded-full ${colors[alert.tone]}`} />
              <div>
                <p className="text-sm font-semibold">{alert.text}</p>
                <p className="mt-1 text-xs text-slate-500">{alert.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function SensorTable({ data }) {
  const statusClasses = {
    Online: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    Warning: 'bg-yellow-50 text-yellow-700 ring-yellow-200',
    Critical: 'bg-red-50 text-red-700 ring-red-200',
  };
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-lg font-bold">Sensor Network</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              {['Sensor ID', 'Location', 'Status', 'Last Reading', 'Pressure (bar)', 'Alert'].map((header) => (
                <th className="px-4 py-3 font-semibold" key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.sensorsPage.sensors.map((sensor) => (
              <tr key={sensor.id}>
                <td className="px-4 py-3 font-semibold">{sensor.id}</td>
                <td className="px-4 py-3">{sensor.location}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${statusClasses[sensor.status]}`}>{sensor.status}</span>
                </td>
                <td className="px-4 py-3">{sensor.reading}</td>
                <td className="px-4 py-3">{sensor.pressure}</td>
                <td className="px-4 py-3">{sensor.alert}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LeakRiskPanel({ data }) {
  return (
    <div className="space-y-4">
      {data.sensorsPage.riskPanel.map((risk) => (
        <div className="card p-5" key={risk.title}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold">{risk.title}</h2>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-bold text-sky-700">{risk.count}</span>
          </div>
          <div className="mt-4 space-y-3">
            {risk.items.map((item) => (
              <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600" key={item}>{item}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DataTable({ headers, rows }) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              {headers.map((header) => (
                <th className="px-4 py-3 font-semibold" key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.join('-')}>
                {row.map((cell, index) => (
                  <td className={`px-4 py-3 ${index === 0 ? 'font-semibold' : ''}`} key={`${cell}-${index}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MarkdownText({ text }) {
  const chunks = [];
  const codeFenceRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeFenceRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      chunks.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    chunks.push({ type: 'code', language: match[1], content: match[2].trimEnd() });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    chunks.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return (
    <div className="markdown-text">
      {chunks.map((chunk, index) =>
        chunk.type === 'code' ? (
          <pre key={`code-${index}`} className="overflow-x-auto rounded-lg bg-slate-950/90 p-3 text-xs leading-5 text-sky-50">
            <code>{chunk.content}</code>
          </pre>
        ) : (
          <MarkdownBlocks content={chunk.content} key={`text-${index}`} />
        ),
      )}
    </div>
  );
}

function MarkdownBlocks({ content }) {
  const blocks = content
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, blockIndex) => {
    const lines = block.split('\n').map((line) => line.trimEnd());
    const heading = block.match(/^(#{1,3})\s+(.+)$/);
    const unordered = lines.every((line) => /^[-*]\s+/.test(line.trim()));
    const ordered = lines.every((line) => /^\d+\.\s+/.test(line.trim()));

    if (heading) {
      const Tag = heading[1].length === 1 ? 'h3' : heading[1].length === 2 ? 'h4' : 'h5';
      return (
        <Tag className="font-bold text-slate-900 dark:text-sky-50" key={`heading-${blockIndex}`}>
          {renderInlineMarkdown(heading[2])}
        </Tag>
      );
    }

    if (unordered || ordered) {
      const ListTag = unordered ? 'ul' : 'ol';
      return (
        <ListTag className={`${unordered ? 'list-disc' : 'list-decimal'} space-y-1 pl-5`} key={`list-${blockIndex}`}>
          {lines.map((line, lineIndex) => (
            <li key={`${blockIndex}-${lineIndex}`}>
              {renderInlineMarkdown(line.replace(/^[-*]\s+|^\d+\.\s+/, ''))}
            </li>
          ))}
        </ListTag>
      );
    }

    return (
      <p key={`paragraph-${blockIndex}`}>
        {lines.map((line, lineIndex) => (
          <span key={`${blockIndex}-${lineIndex}`}>
            {renderInlineMarkdown(line)}
            {lineIndex < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}

function renderInlineMarkdown(text) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (link) {
      return (
        <a className="font-semibold text-sky-600 underline decoration-sky-400/60 underline-offset-2 dark:text-sky-300" href={link[2]} key={`${part}-${index}`} rel="noreferrer" target="_blank">
          {link[1]}
        </a>
      );
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code className="rounded bg-slate-200/80 px-1.5 py-0.5 text-[0.85em] font-semibold text-slate-900 dark:bg-sky-950/80 dark:text-sky-100" key={`${part}-${index}`}>
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>;
    }

    return part;
  });
}

function ChatBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sky-100 text-sky-700">
          <Droplets className="h-5 w-5" />
        </div>
      )}
      <div className={`max-w-3xl rounded-2xl px-4 py-3 text-sm leading-6 ${isUser ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
        {isUser && <p className="whitespace-pre-wrap">{message.content}</p>}
        {!isUser && message.content && <MarkdownText text={message.content} />}
        {!isUser && !message.content && (
          <span className="inline-flex items-center gap-2 text-slate-500 dark:text-sky-200">
            Aqua is thinking
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
          </span>
        )}
      </div>
      {isUser && <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-800 text-xs font-bold text-white">AB</div>}
    </div>
  );
}

export default App;
