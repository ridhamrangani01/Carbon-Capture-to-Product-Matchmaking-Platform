"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Calendar,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  PhoneCall,
  User,
  Building,
  Mail,
  FileText,
  Loader2,
  Check,
  X,
  AlertCircle,
} from "lucide-react";

interface DemoRequest {
  id: string;
  fullName: string;
  workEmail: string;
  phone?: string | null;
  companyName: string;
  jobTitle?: string | null;
  companySize?: string | null;
  industry?: string | null;
  country?: string | null;
  role: string;
  message?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
  status: string;
  source: string;
  notes?: string | null;
  createdAt: string;
  scheduledAt?: string | null;
  user?: { id: string; name: string; email: string } | null;
  organization?: { id: string; name: string } | null;
}

export default function AdminDemoRequestsPage() {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);

  // Edit / Status Update Drawer State
  const [editStatus, setEditStatus] = useState("PENDING");
  const [editNotes, setEditNotes] = useState("");
  const [editScheduledAt, setEditScheduledAt] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchDemoRequests();
  }, []);

  async function fetchDemoRequests() {
    setLoading(true);
    try {
      const res = await fetch("/api/demo-requests");
      if (res.ok) {
        const json = await res.json();
        setRequests(json.data || []);
      }
    } catch (err) {
      console.error("[Admin Demo Requests Fetch Error]:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenDetail = (req: DemoRequest) => {
    setSelectedRequest(req);
    setEditStatus(req.status);
    setEditNotes(req.notes || "");
    setEditScheduledAt(req.scheduledAt ? new Date(req.scheduledAt).toISOString().slice(0, 16) : "");
    setUpdateMessage(null);
  };

  const handleUpdateStatus = async () => {
    if (!selectedRequest) return;
    setUpdating(true);
    setUpdateMessage(null);

    try {
      const res = await fetch(`/api/demo-requests/${selectedRequest.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          notes: editNotes,
          scheduledAt: editScheduledAt || null,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update demo request");

      setUpdateMessage("Demo request updated successfully!");
      fetchDemoRequests();

      // Update current selected request
      setSelectedRequest((prev) => (prev ? { ...prev, status: editStatus, notes: editNotes } : null));
    } catch (err: any) {
      setUpdateMessage(`Error: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.workEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Summary Statistics
  const totalCount = requests.length;
  const pendingCount = requests.filter((r) => r.status === "PENDING").length;
  const contactedCount = requests.filter((r) => r.status === "CONTACTED").length;
  const scheduledCount = requests.filter((r) => r.status === "SCHEDULED").length;
  const completedCount = requests.filter((r) => r.status === "COMPLETED").length;
  const cancelledCount = requests.filter((r) => r.status === "CANCELLED" || r.status === "REJECTED").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1"><Clock className="w-3 h-3" /> PENDING</span>;
      case "CONTACTED":
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1"><PhoneCall className="w-3 h-3" /> CONTACTED</span>;
      case "SCHEDULED":
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center gap-1"><Calendar className="w-3 h-3" /> SCHEDULED</span>;
      case "COMPLETED":
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> COMPLETED</span>;
      case "CANCELLED":
      case "REJECTED":
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1"><XCircle className="w-3 h-3" /> {status}</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-zinc-800 text-zinc-400">{status}</span>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#22c55e] tracking-wider flex items-center gap-1.5 mb-1">
              <Calendar className="w-4 h-4" /> Customer Inquiries & Product Demos
            </span>
            <h1 className="text-3xl font-display font-bold text-white">Demo Requests Governance</h1>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Review applicant details, manage demo scheduling, record internal notes, and track sales pipeline conversions.
            </p>
          </div>

          <button
            onClick={fetchDemoRequests}
            className="px-4 py-2 rounded-xl bg-[#06291d] border border-emerald-500/30 hover:border-emerald-500/60 text-xs font-bold text-emerald-400 transition-all self-start md:self-auto cursor-pointer"
          >
            Refresh Requests List
          </button>
        </div>

        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-[#06241a] border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-white/50">Total Requests</span>
            <p className="text-2xl font-bold text-white">{totalCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#06241a] border border-amber-500/30 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-amber-400">Pending Review</span>
            <p className="text-2xl font-bold text-amber-400">{pendingCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#06241a] border border-blue-500/30 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-blue-400">Contacted</span>
            <p className="text-2xl font-bold text-blue-400">{contactedCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#06241a] border border-purple-500/30 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-purple-400">Scheduled</span>
            <p className="text-2xl font-bold text-purple-400">{scheduledCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#06241a] border border-emerald-500/30 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-emerald-400">Completed</span>
            <p className="text-2xl font-bold text-emerald-400">{completedCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#06241a] border border-red-500/30 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-red-400">Cancelled / Rejected</span>
            <p className="text-2xl font-bold text-red-400">{cancelledCount}</p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#06241a] p-4 rounded-2xl border border-white/10">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, company, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#041a12] border border-white/15 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-white/40" />
            <span className="text-xs text-white/60 shrink-0">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#041a12] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-[#22c55e] focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Statuses ({totalCount})</option>
              <option value="PENDING">Pending ({pendingCount})</option>
              <option value="CONTACTED">Contacted ({contactedCount})</option>
              <option value="SCHEDULED">Scheduled ({scheduledCount})</option>
              <option value="COMPLETED">Completed ({completedCount})</option>
              <option value="CANCELLED">Cancelled ({cancelledCount})</option>
            </select>
          </div>
        </div>

        {/* Requests Data Table */}
        <div className="bg-[#06241a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-12 text-center text-white/60 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#22c55e]" />
              <p className="text-xs font-mono">Loading demo requests database...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="p-12 text-center text-white/60 space-y-3">
              <AlertCircle className="w-8 h-8 mx-auto text-amber-400" />
              <p className="text-sm font-semibold text-white">No Demo Requests Found</p>
              <p className="text-xs text-white/50 max-w-sm mx-auto">
                No demo requests match your search criteria or filter status.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black/30 text-[11px] font-bold text-white/50 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Applicant</th>
                    <th className="py-3.5 px-4">Company & Role</th>
                    <th className="py-3.5 px-4">Preferred Date</th>
                    <th className="py-3.5 px-4">Submitted At</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-white/90">
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-white/[0.04] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{req.fullName}</div>
                        <div className="text-[11px] text-white/50 font-mono">{req.workEmail}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-white">{req.companyName}</div>
                        <div className="text-[11px] text-emerald-400 font-mono">{req.role}</div>
                      </td>
                      <td className="py-3.5 px-4 text-white/70 font-mono">
                        {req.preferredDate ? `${req.preferredDate} ${req.preferredTime || ""}` : "Flexible / Unspecified"}
                      </td>
                      <td className="py-3.5 px-4 text-white/50 font-mono text-[11px]">
                        {new Date(req.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">{getStatusBadge(req.status)}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleOpenDetail(req)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 text-xs font-bold transition-all flex items-center gap-1.5 ml-auto cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" /> Inspect / Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Drawer: Detailed Request View & Status Management */}
        {selectedRequest && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#06241a] border border-white/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8 relative animate-in fade-in zoom-in duration-200">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#22c55e]" />
                  <h3 className="text-lg font-bold text-white">Demo Request #{selectedRequest.id}</h3>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                {updateMessage && (
                  <div
                    className={`p-3 rounded-xl text-xs font-semibold ${
                      updateMessage.startsWith("Error")
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {updateMessage}
                  </div>
                )}

                {/* Applicant Profile Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#041a12] p-4 rounded-xl border border-white/10 text-xs">
                  <div>
                    <span className="text-white/40 uppercase font-mono text-[10px] block">Full Name</span>
                    <span className="font-bold text-white text-sm">{selectedRequest.fullName}</span>
                  </div>
                  <div>
                    <span className="text-white/40 uppercase font-mono text-[10px] block">Work Email</span>
                    <span className="font-semibold text-emerald-400">{selectedRequest.workEmail}</span>
                  </div>
                  <div>
                    <span className="text-white/40 uppercase font-mono text-[10px] block">Company</span>
                    <span className="font-semibold text-white">{selectedRequest.companyName}</span>
                  </div>
                  <div>
                    <span className="text-white/40 uppercase font-mono text-[10px] block">Role</span>
                    <span className="font-semibold text-white">{selectedRequest.role}</span>
                  </div>
                  {selectedRequest.phone && (
                    <div>
                      <span className="text-white/40 uppercase font-mono text-[10px] block">Phone</span>
                      <span className="text-white">{selectedRequest.phone}</span>
                    </div>
                  )}
                  {selectedRequest.jobTitle && (
                    <div>
                      <span className="text-white/40 uppercase font-mono text-[10px] block">Job Title</span>
                      <span className="text-white">{selectedRequest.jobTitle}</span>
                    </div>
                  )}
                </div>

                {/* Message / Project Notes */}
                {selectedRequest.message && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-white/70">Applicant Message / Project Context:</span>
                    <div className="bg-[#041a12] border border-white/10 rounded-xl p-3.5 text-xs text-white/90 leading-relaxed italic">
                      "{selectedRequest.message}"
                    </div>
                  </div>
                )}

                {/* Admin Status & Scheduling Controls */}
                <div className="border-t border-white/10 pt-4 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Governance & Sales Status Management
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-white/70">Update Status</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="w-full bg-[#041a12] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:border-[#22c55e] focus:outline-none cursor-pointer"
                      >
                        <option value="PENDING">PENDING - New Inquiry</option>
                        <option value="CONTACTED">CONTACTED - Reached Out</option>
                        <option value="SCHEDULED">SCHEDULED - Demo Confirmed</option>
                        <option value="COMPLETED">COMPLETED - Demo Conducted</option>
                        <option value="CANCELLED">CANCELLED - Closed Inquiry</option>
                        <option value="REJECTED">REJECTED - Not Qualified</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-white/70">Scheduled Timestamp</label>
                      <input
                        type="datetime-local"
                        value={editScheduledAt}
                        onChange={(e) => setEditScheduledAt(e.target.value)}
                        className="w-full bg-[#041a12] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:border-[#22c55e] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-white/70">Internal Admin Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Add technical qualification notes, assigned account rep, or meeting outcome..."
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      className="w-full bg-[#041a12] border border-white/20 rounded-xl p-3 text-xs text-white placeholder-white/40 focus:border-[#22c55e] focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-xs font-semibold text-white/70 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  disabled={updating}
                  className="px-5 py-2 rounded-xl bg-[#22c55e] text-black text-xs font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {updating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving Changes...
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" /> Save Changes & Audit Log
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
