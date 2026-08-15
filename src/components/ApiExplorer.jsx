import React, { useState, useEffect } from 'react';
import { Terminal, Server, CheckCircle, Database, ExternalLink, Play, Copy, RefreshCw, FileText, Code2, ShieldCheck, Flame } from 'lucide-react';

export default function ApiExplorer({ showToast }) {
  const [activeTab, setActiveTab] = useState('interactive');
  const [selectedEndpoint, setSelectedEndpoint] = useState('health');
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [swaggerJson, setSwaggerJson] = useState(null);
  const [copied, setCopied] = useState(false);

  // Payload states for testing POST routes
  const [donationPayload, setDonationPayload] = useState({
    donorName: 'Devotee Anjaneyulu',
    phone: '9866125609',
    email: 'anjaneyulu@example.com',
    amount: 10016,
    seva: 'ఆలయ గర్భాలయ నిర్మాణ విరాళం (Temple Construction)',
    mode: 'Online (UPI)',
    city: 'పామినివాండ్లవూరు'
  });

  const [poojaPayload, setPoojaPayload] = useState({
    devoteeName: 'K. Sita Ramanamma',
    phone: '9440123456',
    gothram: 'Kashyapa',
    poojaName: 'శ్రీ సీతా రామ కళ్యాణం',
    bookingDate: '2026-08-28',
    timeSlot: '09:00 AM - 11:30 AM',
    amount: 1116
  });

  const [volunteerPayload, setVolunteerPayload] = useState({
    fullName: 'R. Varadarajulu',
    phone: '9885098850',
    email: 'varada@example.com',
    village: 'పామినివాండ్లవూరు',
    serviceInterest: 'Annadanam & Divine Service'
  });

  useEffect(() => {
    fetchSwaggerSpec();
    executeApiCall('health');
  }, []);

  const fetchSwaggerSpec = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/openapi.json');
      if (res.ok) {
        const data = await res.json();
        setSwaggerJson(data);
      }
    } catch (err) {
      console.warn("Backend swagger server offline or using fallback spec", err);
    }
  };

  const executeApiCall = async (endpointKey) => {
    setLoading(true);
    setApiResponse(null);
    setSelectedEndpoint(endpointKey);

    const baseUrl = 'http://localhost:5000';
    let url = `${baseUrl}/api/health`;
    let method = 'GET';
    let body = null;

    if (endpointKey === 'health') {
      url = `${baseUrl}/api/health`;
    } else if (endpointKey === 'donations-list') {
      url = `${baseUrl}/api/donations`;
    } else if (endpointKey === 'donations-stats') {
      url = `${baseUrl}/api/donations/stats`;
    } else if (endpointKey === 'donations-post') {
      url = `${baseUrl}/api/donations`;
      method = 'POST';
      body = donationPayload;
    } else if (endpointKey === 'poojas-list') {
      url = `${baseUrl}/api/poojas/bookings`;
    } else if (endpointKey === 'poojas-post') {
      url = `${baseUrl}/api/poojas/bookings`;
      method = 'POST';
      body = poojaPayload;
    } else if (endpointKey === 'events-list') {
      url = `${baseUrl}/api/events`;
    } else if (endpointKey === 'volunteers-list') {
      url = `${baseUrl}/api/volunteers`;
    } else if (endpointKey === 'volunteers-post') {
      url = `${baseUrl}/api/volunteers`;
      method = 'POST';
      body = volunteerPayload;
    } else if (endpointKey === 'devotees-list') {
      url = `${baseUrl}/api/devotees`;
    } else if (endpointKey === 'database-dump') {
      url = `${baseUrl}/api/database`;
    }

    try {
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (body) options.body = JSON.stringify(body);

      const res = await fetch(url, options);
      const status = res.status;
      const data = await res.json();
      setApiResponse({
        status: `${status} ${res.statusText || (status === 200 || status === 201 ? 'OK' : '')}`,
        timestamp: new Date().toLocaleTimeString(),
        endpoint: url,
        method: method,
        data: data
      });
      if (showToast) showToast(`API Request executed successfully! (${status})`);
    } catch (err) {
      setApiResponse({
        status: 'FETCH_ERROR / Server Offline',
        endpoint: url,
        method: method,
        error: 'Could not connect to Express REST server at http://localhost:5000. Ensure server is running with `npm run server`!',
        details: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const copySpec = () => {
    if (swaggerJson) {
      navigator.clipboard.writeText(JSON.stringify(swaggerJson, null, 2));
      setCopied(true);
      if (showToast) showToast("OpenAPI JSON copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="gold-card p-6 md:p-8 mb-8 border-2 border-amber-500/40 rounded-2xl bg-gradient-to-r from-amber-50/80 to-amber-100/40 dark:from-stone-900 dark:to-amber-950/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold text-xs rounded-full border border-amber-500/30 mb-3">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Swagger (OpenAPI 3.0) REST Specification</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-amber-900 dark:text-amber-100 flex items-center gap-3">
              <Server className="w-8 h-8 text-amber-600" />
              <span>SRSC API Explorer & Swagger UI</span>
            </h1>
            <p className="text-amber-800/80 dark:text-amber-200/80 text-sm md:text-base mt-2 max-w-3xl">
              Complete documentation and live testing studio for Sri Rama Seva Committee RESTful APIs. Connected to secure SQLite / JSON persistent database.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="http://localhost:5000/api-docs"
              target="_blank"
              rel="noreferrer"
              className="btn-autofit px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-600/30 transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Swagger UI (/api-docs)</span>
            </a>

            <a
              href="http://localhost:5000/api/openapi.json"
              target="_blank"
              rel="noreferrer"
              className="btn-autofit px-4 py-3 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold rounded-xl transition-all flex items-center gap-2 text-sm"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span>OpenAPI JSON</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-amber-500/20 mb-6 gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('interactive')}
          className={`btn-autofit px-5 py-2.5 font-bold text-sm rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'interactive'
              ? 'border-amber-600 text-amber-700 dark:text-amber-300 bg-amber-500/10'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-amber-600'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>Interactive REST Tester</span>
        </button>

        <button
          onClick={() => setActiveTab('routes')}
          className={`btn-autofit px-5 py-2.5 font-bold text-sm rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'routes'
              ? 'border-amber-600 text-amber-700 dark:text-amber-300 bg-amber-500/10'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-amber-600'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>API Routes & Schemas</span>
        </button>

        <button
          onClick={() => setActiveTab('raw')}
          className={`btn-autofit px-5 py-2.5 font-bold text-sm rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'raw'
              ? 'border-amber-600 text-amber-700 dark:text-amber-300 bg-amber-500/10'
              : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-amber-600'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Raw Swagger Spec</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE TESTER */}
      {activeTab === 'interactive' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Menu: Endpoints List */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-3 px-1 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Available Endpoints</span>
            </h3>

            {/* Health */}
            <button
              onClick={() => executeApiCall('health')}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                selectedEndpoint === 'health'
                  ? 'border-amber-500 bg-amber-500/15 shadow-sm font-bold text-amber-900 dark:text-amber-200'
                  : 'border-amber-500/20 bg-stone-50 dark:bg-stone-900/50 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-500 text-white font-mono text-xs font-bold rounded">GET</span>
                <span className="text-sm font-semibold">/api/health</span>
              </div>
              <span className="text-xs text-stone-500">System Health</span>
            </button>

            {/* Donations GET */}
            <button
              onClick={() => executeApiCall('donations-list')}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                selectedEndpoint === 'donations-list'
                  ? 'border-amber-500 bg-amber-500/15 shadow-sm font-bold text-amber-900 dark:text-amber-200'
                  : 'border-amber-500/20 bg-stone-50 dark:bg-stone-900/50 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-500 text-white font-mono text-xs font-bold rounded">GET</span>
                <span className="text-sm font-semibold">/api/donations</span>
              </div>
              <span className="text-xs text-stone-500">Donations List</span>
            </button>

            {/* Donations Stats */}
            <button
              onClick={() => executeApiCall('donations-stats')}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                selectedEndpoint === 'donations-stats'
                  ? 'border-amber-500 bg-amber-500/15 shadow-sm font-bold text-amber-900 dark:text-amber-200'
                  : 'border-amber-500/20 bg-stone-50 dark:bg-stone-900/50 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-500 text-white font-mono text-xs font-bold rounded">GET</span>
                <span className="text-sm font-semibold">/api/donations/stats</span>
              </div>
              <span className="text-xs text-stone-500">Fund Stats</span>
            </button>

            {/* Donations POST */}
            <button
              onClick={() => executeApiCall('donations-post')}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                selectedEndpoint === 'donations-post'
                  ? 'border-amber-500 bg-amber-500/15 shadow-sm font-bold text-amber-900 dark:text-amber-200'
                  : 'border-amber-500/20 bg-stone-50 dark:bg-stone-900/50 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-600 text-white font-mono text-xs font-bold rounded">POST</span>
                <span className="text-sm font-semibold">/api/donations</span>
              </div>
              <span className="text-xs text-stone-500">Create Donation</span>
            </button>

            {/* Poojas GET */}
            <button
              onClick={() => executeApiCall('poojas-list')}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                selectedEndpoint === 'poojas-list'
                  ? 'border-amber-500 bg-amber-500/15 shadow-sm font-bold text-amber-900 dark:text-amber-200'
                  : 'border-amber-500/20 bg-stone-50 dark:bg-stone-900/50 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-500 text-white font-mono text-xs font-bold rounded">GET</span>
                <span className="text-sm font-semibold">/api/poojas/bookings</span>
              </div>
              <span className="text-xs text-stone-500">Bookings List</span>
            </button>

            {/* Poojas POST */}
            <button
              onClick={() => executeApiCall('poojas-post')}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                selectedEndpoint === 'poojas-post'
                  ? 'border-amber-500 bg-amber-500/15 shadow-sm font-bold text-amber-900 dark:text-amber-200'
                  : 'border-amber-500/20 bg-stone-50 dark:bg-stone-900/50 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-600 text-white font-mono text-xs font-bold rounded">POST</span>
                <span className="text-sm font-semibold">/api/poojas/bookings</span>
              </div>
              <span className="text-xs text-stone-500">Book Pooja</span>
            </button>

            {/* Events GET */}
            <button
              onClick={() => executeApiCall('events-list')}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                selectedEndpoint === 'events-list'
                  ? 'border-amber-500 bg-amber-500/15 shadow-sm font-bold text-amber-900 dark:text-amber-200'
                  : 'border-amber-500/20 bg-stone-50 dark:bg-stone-900/50 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-500 text-white font-mono text-xs font-bold rounded">GET</span>
                <span className="text-sm font-semibold">/api/events</span>
              </div>
              <span className="text-xs text-stone-500">Events List</span>
            </button>

            {/* Devotees GET */}
            <button
              onClick={() => executeApiCall('devotees-list')}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                selectedEndpoint === 'devotees-list'
                  ? 'border-amber-500 bg-amber-500/15 shadow-sm font-bold text-amber-900 dark:text-amber-200'
                  : 'border-amber-500/20 bg-stone-50 dark:bg-stone-900/50 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-500 text-white font-mono text-xs font-bold rounded">GET</span>
                <span className="text-sm font-semibold">/api/devotees</span>
              </div>
              <span className="text-xs text-stone-500">Devotees List</span>
            </button>

            {/* Database GET */}
            <button
              onClick={() => executeApiCall('database-dump')}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                selectedEndpoint === 'database-dump'
                  ? 'border-amber-500 bg-amber-500/15 shadow-sm font-bold text-amber-900 dark:text-amber-200'
                  : 'border-amber-500/20 bg-stone-50 dark:bg-stone-900/50 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-purple-600 text-white font-mono text-xs font-bold rounded">GET</span>
                <span className="text-sm font-semibold">/api/database</span>
              </div>
              <span className="text-xs text-stone-500">Full DB Dump</span>
            </button>
          </div>

          {/* Right Panel: Test Controls & Live Output */}
          <div className="lg:col-span-8 space-y-6">
            {/* Request Builder for POST endpoints */}
            {selectedEndpoint.includes('post') && (
              <div className="gold-card p-5 border border-amber-500/30 rounded-xl">
                <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm mb-3 flex items-center justify-between">
                  <span>JSON Request Body Payload:</span>
                  <span className="text-xs font-mono text-amber-600">application/json</span>
                </h4>

                {selectedEndpoint === 'donations-post' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium mb-1 text-stone-700 dark:text-stone-300">Donor Name</label>
                      <input
                        type="text"
                        value={donationPayload.donorName}
                        onChange={(e) => setDonationPayload({ ...donationPayload, donorName: e.target.value })}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1 text-stone-700 dark:text-stone-300">Amount (₹)</label>
                      <input
                        type="number"
                        value={donationPayload.amount}
                        onChange={(e) => setDonationPayload({ ...donationPayload, amount: Number(e.target.value) })}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1 text-stone-700 dark:text-stone-300">Seva Purpose</label>
                      <input
                        type="text"
                        value={donationPayload.seva}
                        onChange={(e) => setDonationPayload({ ...donationPayload, seva: e.target.value })}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1 text-stone-700 dark:text-stone-300">Phone</label>
                      <input
                        type="text"
                        value={donationPayload.phone}
                        onChange={(e) => setDonationPayload({ ...donationPayload, phone: e.target.value })}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-stone-900"
                      />
                    </div>
                  </div>
                )}

                {selectedEndpoint === 'poojas-post' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-medium mb-1 text-stone-700 dark:text-stone-300">Devotee Name</label>
                      <input
                        type="text"
                        value={poojaPayload.devoteeName}
                        onChange={(e) => setPoojaPayload({ ...poojaPayload, devoteeName: e.target.value })}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1 text-stone-700 dark:text-stone-300">Pooja Name</label>
                      <input
                        type="text"
                        value={poojaPayload.poojaName}
                        onChange={(e) => setPoojaPayload({ ...poojaPayload, poojaName: e.target.value })}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1 text-stone-700 dark:text-stone-300">Gothram</label>
                      <input
                        type="text"
                        value={poojaPayload.gothram}
                        onChange={(e) => setPoojaPayload({ ...poojaPayload, gothram: e.target.value })}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1 text-stone-700 dark:text-stone-300">Date</label>
                      <input
                        type="date"
                        value={poojaPayload.bookingDate}
                        onChange={(e) => setPoojaPayload({ ...poojaPayload, bookingDate: e.target.value })}
                        className="w-full p-2 border rounded-lg bg-white dark:bg-stone-900"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => executeApiCall(selectedEndpoint)}
                  disabled={loading}
                  className="btn-autofit mt-4 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-md flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Execute POST Request</span>
                </button>
              </div>
            )}

            {/* Response Preview Box */}
            <div className="bg-stone-950 text-stone-100 rounded-2xl p-6 border border-stone-800 shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-amber-500" />
                  <span className="font-mono text-sm font-bold text-amber-400">Response Terminal</span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  {apiResponse?.status && (
                    <span className={`px-2.5 py-1 rounded font-bold ${
                      apiResponse.status.includes('200') || apiResponse.status.includes('201')
                        ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-900/60 text-rose-300 border border-rose-500/40'
                    }`}>
                      {apiResponse.status}
                    </span>
                  )}

                  <button
                    onClick={() => executeApiCall(selectedEndpoint)}
                    className="p-1.5 hover:bg-stone-800 text-stone-400 hover:text-white rounded transition-colors"
                    title="Re-run API Call"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="py-12 text-center text-amber-400/80 font-mono text-sm animate-pulse flex items-center justify-center gap-3">
                  <RefreshCw className="w-5 h-5 animate-spin text-amber-500" />
                  <span>Executing HTTP Request to database server...</span>
                </div>
              ) : apiResponse ? (
                <pre className="font-mono text-xs overflow-x-auto text-emerald-400/90 leading-relaxed max-h-96">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              ) : (
                <p className="text-stone-500 font-mono text-xs py-8 text-center">
                  Select an endpoint from the left menu to execute live REST request...
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ROUTES LIST */}
      {activeTab === 'routes' && (
        <div className="space-y-4">
          <div className="gold-card p-6 rounded-xl border border-amber-500/30">
            <h3 className="font-bold text-lg text-amber-900 dark:text-amber-200 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-600" />
              <span>Documented API Routes (OpenAPI 3.0)</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-emerald-600 text-white rounded font-bold">GET</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">/api/health</span>
                </div>
                <span className="text-stone-500">System health, database engine, donor count</span>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-emerald-600 text-white rounded font-bold">GET</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">/api/donations</span>
                </div>
                <span className="text-stone-500">Chronological donations list with receipt IDs</span>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-blue-600 text-white rounded font-bold">POST</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">/api/donations</span>
                </div>
                <span className="text-stone-500">Submit donation record & save into DB</span>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-emerald-600 text-white rounded font-bold">GET</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">/api/poojas/bookings</span>
                </div>
                <span className="text-stone-500">Pooja & Seva reserved slots list</span>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-blue-600 text-white rounded font-bold">POST</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">/api/poojas/bookings</span>
                </div>
                <span className="text-stone-500">Reserve a Pooja slot with devotee name & gothram</span>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-emerald-600 text-white rounded font-bold">GET</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">/api/events</span>
                </div>
                <span className="text-stone-500">Temple festival & Brahmotsavam schedules</span>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-purple-600 text-white rounded font-bold">GET</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">/api/database</span>
                </div>
                <span className="text-stone-500">Export database JSON backup</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RAW SWAGGER SPEC */}
      {activeTab === 'raw' && (
        <div className="bg-stone-950 text-stone-100 rounded-2xl p-6 border border-stone-800 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-800">
            <h3 className="font-mono text-sm font-bold text-amber-400 flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              <span>swagger.json (OpenAPI 3.0 Specification)</span>
            </h3>

            <button
              onClick={copySpec}
              className="btn-autofit px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono rounded flex items-center gap-1.5 transition-colors"
            >
              {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Spec'}</span>
            </button>
          </div>

          <pre className="font-mono text-xs overflow-x-auto text-amber-300/80 leading-relaxed max-h-96">
            {swaggerJson ? JSON.stringify(swaggerJson, null, 2) : 'Loading swagger.json specification...'}
          </pre>
        </div>
      )}
    </div>
  );
}
