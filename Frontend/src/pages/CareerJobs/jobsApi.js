import { apiUrl } from "../../utils/api";

export const EXPERIENCE_LEVELS = ["Freshers", "0-1 years", "1-3 years", "3-5 years", "5+ years"];
export const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
export const WORK_MODES = ["Remote", "Hybrid", "On-site"];

async function request(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    credentials: "include",
    ...options,
    ...(options.body && !(options.body instanceof FormData)
      ? { headers: { "Content-Type": "application/json", ...options.headers } }
      : {}),
  });
  const result = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result?.message || `Job request failed (${response.status}).`);
  return result;
}

function queryString(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
  });
  return query.size ? `?${query.toString()}` : "";
}

export function getJobCategories() {
  return request("/api/jobs/categories");
}

export function getPublicJobs(params) {
  return request(`/api/jobs${queryString(params)}`);
}

export function getPublicJob(slug) {
  return request(`/api/jobs/${encodeURIComponent(slug)}`);
}

export function getAdminJobs(params) {
  return request(`/api/admin/jobs${queryString(params)}`);
}

export function getAdminJob(id) {
  return request(`/api/admin/jobs/${encodeURIComponent(id)}`);
}

export function saveAdminJob(job, { jobId, logoFile, notificationFile, keepLogoId, keepNotificationFileId }) {
  const form = new FormData();
  form.set("job", JSON.stringify(job));
  if (keepLogoId) form.set("keepCompanyLogoId", keepLogoId);
  if (keepNotificationFileId) form.set("keepNotificationFileId", keepNotificationFileId);
  if (logoFile) form.append("companyLogo", logoFile, logoFile.name);
  if (notificationFile) form.append("notificationFile", notificationFile, notificationFile.name);
  const path = jobId ? `/api/admin/jobs/${encodeURIComponent(jobId)}` : "/api/admin/jobs";
  return request(path, { method: jobId ? "PUT" : "POST", body: form });
}

export function createAdminJob(job, uploads = {}) {
  return saveAdminJob(job, uploads);
}

export function updateAdminJob(id, job, uploads = {}) {
  return saveAdminJob(job, { ...uploads, jobId: id });
}

export function deleteAdminJob(id) {
  return request(`/api/admin/jobs/${encodeURIComponent(id)}`, { method: "DELETE" });
}
