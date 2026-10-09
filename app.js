const { createClient } = window.supabase;
const sb = createClient(MIDORI_CONFIG.SUPABASE_URL, MIDORI_CONFIG.SUPABASE_KEY);

let MIDORI_PORTAL_FUNCTIONS = [];

const ROLE_LABEL = {
  admin: 'Administration',
  professor: 'Professeur',
  surveillant: 'Surveillant',
  student: 'Élève',
  psychologue: 'Psychologue',
  infirmiere: 'Infirmière',
  recruteur_wl: 'Recruteur WL'
};

const HOME = {
  admin: 'dashboard.html',
  professor: 'prof-space.html',
  surveillant: 'supervisor-space.html',
  student: 'student-space.html',
  psychologue: 'psych-space.html',
  infirmiere: 'nurse-space.html',
  recruteur_wl: 'wl.html'
};

const NAV = {
  recruteur_wl: [
    ['Recrutement WL', [
      ['wl.html', '📋', 'Registre WL'],
      ['wl.html?view=profiles', '👥', 'Gestion des profils'],
      ['wl-import.html', '📥', 'Import WL en masse'],
      ['migration.html', '🔄', 'Migration des profils'],
      ['access.html', '🔐', 'Accès & comptes'],
      ['profiles.html', '🔄', 'Mes profils'],
      ['profile.html', '👤', 'Mon profil']
    ]]
  ],
  admin: [
    ['Général', [
      ['dashboard.html', '📊', 'Tableau de bord'],
      ['messages.html', '✉️', 'Messagerie'],
      ['announcements.html', '📣', 'Annonces'],
      ['events.html', '🎪', 'Calendrier RP']
    ]],
    ['Scolarité', [
      ['students.html', '🎓', 'Élèves'],
      ['professors.html', '👩‍🏫', 'Professeurs'],
      ['supervisors.html', '🛡️', 'Surveillants'],
      ['classes.html', '🏫', 'Classes'],
      ['subjects.html', '📚', 'Matières'],
      ['timetable.html', '🗓️', 'Emploi du temps']
    ]],
    ['Suivi', [
      ['attendance.html', '📝', 'Fiches d’appel'],
      ['absences.html', '⏱️', 'Absences'],
      ['grades.html', '💯', 'Notes'],
      ['homework.html', '📓', 'Devoirs'],
      ['points.html', '⭐', 'Points / Réputation'],
      ['discipline.html', '⚖️', 'Discipline'],
      ['clubs.html', '🌸', 'Clubs'],
      ['supervisor-reports.html', '📄', 'Rapports surveillants']
    ]],
    ['Administration', [
      ['wl.html?view=profiles', '👥', 'Gestion des profils'],
      ['access.html', '🔐', 'Accès & comptes'],
      ['logs.html', '🕘', 'Journal d’activité'],
      ['profile.html', '👤', 'Mon profil']
    ]]
  ],
  professor: [
    ['Mon espace', [
      ['prof-space.html', '🏠', 'Accueil'],
      ['messages.html', '✉️', 'Messagerie'],
      ['prof-attendance.html', '📝', 'Fiches d’appel'],
      ['prof-grades.html', '💯', 'Notes'],
      ['prof-homework.html', '📓', 'Devoirs'],
      ['prof-resources.html', '📁', 'Ressources'],
      ['prof-timetable.html', '🗓️', 'Emploi du temps'],
      ['announcements.html', '📣', 'Annonces'],
      ['events.html', '🎪', 'Calendrier RP'],
      ['profile.html', '👤', 'Mon profil']
    ]]
  ],
  surveillant: [
    ['Mon espace', [
      ['supervisor-space.html', '🏠', 'Accueil'],
      ['messages.html', '✉️', 'Messagerie'],
      ['supervisor-absences.html', '⏱️', 'Absences & retards'],
      ['supervisor-sanctions.html', '⚖️', 'Sanctions'],
      ['supervisor-reports.html', '📄', 'Rapports'],
      ['announcements.html', '📣', 'Annonces'],
      ['events.html', '🎪', 'Calendrier RP'],
      ['profile.html', '👤', 'Mon profil']
    ]]
  ],
  student: [
    ['Mon espace', [
      ['student-space.html', '🏠', 'Accueil'],
      ['messages.html', '✉️', 'Messagerie'],
      ['student-grades.html', '💯', 'Mes notes'],
      ['student-homework.html', '📓', 'Mes devoirs'],
      ['student-timetable.html', '🗓️', 'Mon emploi du temps'],
      ['student-attendance.html', '⏱️', 'Mes absences'],
      ['student-points.html', '⭐', 'Ma réputation'],
      ['student-appointments.html', '🩺', 'Mes rendez-vous'],
      ['student-clubs.html', '🌸', 'Mes clubs'],
      ['announcements.html', '📣', 'Annonces'],
      ['events.html', '🎪', 'Calendrier RP'],
      ['profile.html', '👤', 'Mon profil']
    ]]
  ],
  psychologue: [
    ['Mon espace', [
      ['psych-space.html', '🏠', 'Accueil'],
      ['messages.html', '✉️', 'Messagerie'],
      ['psych-appointments.html', '🧠', 'Rendez-vous'],
      ['psych-records.html', '🔒', 'Dossiers confidentiels'],
      ['announcements.html', '📣', 'Annonces'],
      ['events.html', '🎪', 'Calendrier RP'],
      ['profile.html', '👤', 'Mon profil']
    ]]
  ],
  infirmiere: [
    ['Mon espace', [
      ['nurse-space.html', '🏠', 'Accueil'],
      ['messages.html', '✉️', 'Messagerie'],
      ['nurse-appointments.html', '🩺', 'Rendez-vous'],
      ['nurse-records.html', '🔒', 'Dossiers infirmerie'],
      ['announcements.html', '📣', 'Annonces'],
      ['events.html', '🎪', 'Calendrier RP'],
      ['profile.html', '👤', 'Mon profil']
    ]]
  ]
};

const TITLE = {
  'dashboard.html': 'Tableau de bord', 'messages.html': 'Messagerie', 'homework-submissions.html': 'Remises de devoirs', 'announcements.html': 'Annonces', 'students.html': 'Élèves', 'student-profile.html': 'Dossier élève',
  'professors.html': 'Professeurs', 'supervisors.html': 'Surveillants', 'classes.html': 'Classes',
  'subjects.html': 'Matières', 'timetable.html': 'Emploi du temps', 'attendance.html': 'Fiches d’appel',
  'absences.html': 'Absences', 'grades.html': 'Notes', 'homework.html': 'Devoirs',
  'points.html': 'Points / Réputation', 'discipline.html': 'Discipline', 'clubs.html': 'Clubs',
  'access.html': 'Accès & comptes', 'profile-management.html': 'Gestion des profils', 'migration.html': 'Migration des profils', 'wl-import.html': 'Import WL en masse', 'wl.html': 'Registre WL', 'profiles.html': 'Mes profils', 'logs.html': 'Journal d’activité', 'events.html': 'Calendrier RP', 'profile.html': 'Mon profil',
  'prof-space.html': 'Espace professeur', 'prof-attendance.html': 'Fiches d’appel', 'prof-grades.html': 'Notes',
  'prof-homework.html': 'Devoirs', 'prof-resources.html': 'Ressources', 'prof-timetable.html': 'Emploi du temps',
  'supervisor-space.html': 'Espace surveillant', 'supervisor-absences.html': 'Absences & retards',
  'supervisor-sanctions.html': 'Sanctions', 'supervisor-reports.html': 'Rapports',
  'student-space.html': 'Espace élève', 'student-grades.html': 'Mes notes', 'student-homework.html': 'Mes devoirs',
  'student-timetable.html': 'Mon emploi du temps', 'student-attendance.html': 'Mes absences', 'student-points.html': 'Ma réputation',
  'student-appointments.html': 'Mes rendez-vous', 'student-clubs.html': 'Mes clubs',
  'psych-space.html': 'Espace psychologue', 'psych-appointments.html': 'Rendez-vous', 'psych-records.html': 'Dossiers confidentiels',
  'nurse-space.html': 'Espace infirmière', 'nurse-appointments.html': 'Rendez-vous', 'nurse-records.html': 'Dossiers infirmerie'
};

const PAGE_ROLES = {
  'dashboard.html': ['admin'], 'wl.html': ['admin','recruteur_wl'], 'profiles.html': ['admin','recruteur_wl','professor','surveillant','student','psychologue','infirmiere'], 'messages.html': ['admin','professor','surveillant','student','psychologue','infirmiere'], 'homework-submissions.html': ['admin','professor'], 'access.html': ['admin','recruteur_wl'], 'profile-management.html': ['admin','recruteur_wl'], 'wl-import.html': ['admin','recruteur_wl'], 'migration.html': ['admin','recruteur_wl'], 'students.html': ['admin'], 'professors.html': ['admin'],
  'supervisors.html': ['admin'], 'classes.html': ['admin'], 'subjects.html': ['admin'], 'timetable.html': ['admin'],
  'attendance.html': ['admin', 'professor', 'surveillant'], 'absences.html': ['admin', 'professor', 'surveillant'],
  'grades.html': ['admin', 'professor'], 'homework.html': ['admin', 'professor'], 'points.html': ['admin'],
  'discipline.html': ['admin', 'surveillant'], 'clubs.html': ['admin'], 'supervisor-reports.html': ['admin','surveillant'], 'events.html': ['admin','professor','surveillant','student','psychologue','infirmiere'], 'logs.html': ['admin'],
  'announcements.html': ['admin', 'professor', 'surveillant', 'student', 'psychologue', 'infirmiere'],
  'profile.html': ['admin', 'recruteur_wl', 'professor', 'surveillant', 'student', 'psychologue', 'infirmiere'], 'student-profile.html': ['admin'],
  'prof-space.html': ['professor'], 'prof-attendance.html': ['professor'], 'prof-grades.html': ['professor'],
  'prof-homework.html': ['professor'], 'prof-resources.html': ['professor'], 'prof-timetable.html': ['professor'],
  'supervisor-space.html': ['surveillant'], 'supervisor-absences.html': ['surveillant'],
  'supervisor-sanctions.html': ['surveillant'], 'supervisor-reports.html': ['admin','surveillant'],
  'student-space.html': ['student'], 'student-grades.html': ['student'], 'student-homework.html': ['student'],
  'student-timetable.html': ['student'], 'student-attendance.html': ['student'], 'student-points.html': ['student'], 'student-appointments.html': ['student'],
  'student-clubs.html': ['student'], 'psych-space.html': ['psychologue'], 'psych-appointments.html': ['psychologue'],
  'psych-records.html': ['psychologue'], 'nurse-space.html': ['infirmiere'], 'nurse-appointments.html': ['infirmiere'],
  'nurse-records.html': ['infirmiere']
};

const qs = s => document.querySelector(s);
const qsa = s => [...document.querySelectorAll(s)];
const esc = v => String(v ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
const dateFR = v => { if (!v) return '—'; const d = new Date(`${v}T00:00:00`); return isNaN(d) ? v : d.toLocaleDateString('fr-FR'); };
const dtFR = v => { if (!v) return '—'; const d = new Date(v); return isNaN(d) ? v : d.toLocaleString('fr-FR'); };
const today = () => new Date().toISOString().slice(0, 10);
const errMsg = e => e?.message || e?.error_description || e?.details || 'Une erreur est survenue.';

function toast(msg, type = 'success') {
  const x = document.createElement('div');
  x.className = `notice ${type}`;
  x.textContent = msg;
  Object.assign(x.style, { position: 'fixed', right: '18px', bottom: '18px', zIndex: 999, boxShadow: '0 15px 40px rgba(0,0,0,.14)', maxWidth: '480px' });
  document.body.appendChild(x);
  setTimeout(() => x.remove(), 4200);
}
function openModal(id) { qs(`#${id}`)?.classList.add('open'); }
function closeModal(id) { qs(`#${id}`)?.classList.remove('open'); }
function closeBindings() { qsa('[data-close]').forEach(b => b.onclick = () => closeModal(b.dataset.close)); }
function head(title, sub) { return `<div class="head"><h1>${title}</h1><p>${sub}</p></div>`; }
function statCard(label, val, icon = '•') { return `<div class="card stat"><div><div class="muted">${esc(label)}</div><div class="n">${esc(val)}</div></div><div class="brand-mark" style="width:42px;height:42px">${icon}</div></div>`; }
function tableEmpty(colspan, msg = 'Aucune donnée.') { return `<tr><td colspan="${colspan}" class="empty">${esc(msg)}</td></tr>`; }
function modal(id, title, formHtml) { return `<div class="modal" id="${id}"><div class="modal-box"><div class="modal-head"><h3>${esc(title)}</h3><button class="close" data-close="${id}">✕</button></div>${formHtml}</div></div>`; }
function opts(rows, val = 'id', lab = 'name', sel = '') { return `<option value="">— Sélectionner —</option>${rows.map(r => `<option value="${esc(r[val])}" ${String(r[val]) === String(sel) ? 'selected' : ''}>${esc(r[lab])}</option>`).join('')}`; }
function badge(v) { const s = String(v ?? ''); return `<span class="tag">${esc(s)}</span>`; }
const RP_STATUS_LABEL = { normal: 'Normal', delinquant: 'Délinquant', parfait: 'Parfait' };
const rpStatusLabel = v => RP_STATUS_LABEL[String(v || 'normal')] || 'Normal';
const rpStatusBadge = v => { const k=String(v || 'normal'); const cls=k==='delinquant'?'red':(k==='parfait'?'':'yellow'); return `<span class="tag ${cls}">${k==='delinquant'?'🔴':k==='parfait'?'⭐':'🟢'} ${esc(rpStatusLabel(k))}</span>`; };
const isStudentProfile = x => String(x?.profile_kind || x?.role || '').toLowerCase() === 'student';
const rpStatusBadgeIfStudent = x => isStudentProfile(x) ? rpStatusBadge(x?.rp_status) : '';
const rpStatusLabelIfStudent = x => isStudentProfile(x) ? rpStatusLabel(x?.rp_status) : '—';

async function session() {
  const r = await sb.auth.getSession();
  if (r.error) throw r.error;
  return r.data.session;
}
async function currentUser() {
  const r = await sb.auth.getUser();
  if (r.error) throw r.error;
  return r.data.user;
}

async function currentProfile() {
  const user = await currentUser();
  if (!user) return null;

  // Retrouver la personne liée au compte Supabase Auth.
  const personResult = await sb
    .from('midori_people')
    .select('id, active')
    .eq('auth_user_id', user.id)
    .maybeSingle();

  if (personResult.error) throw personResult.error;
  if (!personResult.data || personResult.data.active === false) return null;

  // Retrouver le profil lié à cette personne.
  const profileResult = await sb
    .from('profiles')
    .select('*')
    .eq('person_id', personResult.data.id)
    .eq('active', true)
    .maybeSingle();

  if (profileResult.error) throw profileResult.error;
  if (!profileResult.data) return null;

  const profile = profileResult.data;

  // Adapter le rôle de la nouvelle base aux rôles attendus par le site.
  if (profile.role === 'administrateur') {
    profile.role = 'admin';
  }

  return profile;
}

async function guard(roles = []) {
  const s = await session();
  if (!s) { location.href = 'index.html'; return null; }
  const p = await currentProfile();
  if (!p || p.active === false) {
    location.href = 'index.html?e=profil';
    return null;
  }
  if (roles.length && !roles.includes(p.role)) {
    location.href = HOME[p.role] || 'index.html';
    return null;
  }
  return { session: s, profile: p };
}
async function logout() { await sb.auth.signOut(); location.href = 'index.html'; }

function portalModeFor(p) {
  const allowed = MIDORI_PORTAL_FUNCTIONS.map(x => x.function_code);
  const saved = localStorage.getItem('midori_portal_mode');
  if (saved === 'wl' && allowed.includes('recruteur_wl')) return 'wl';
  if (saved === 'cpe' && allowed.includes('cpe')) return 'cpe';
  if (allowed.includes('cpe')) return 'cpe';
  if (allowed.includes('recruteur_wl')) return 'wl';
  return p.role === 'recruteur_wl' ? 'wl' : 'cpe';
}

function setPortalMode(mode, p) {
  const allowed = MIDORI_PORTAL_FUNCTIONS.map(x => x.function_code);
  if (!allowed.includes(mode)) {
    toast('Cette fonction n’est pas attribuée à votre compte.', 'error');
    return;
  }
  // Les boutons utilisent les vrais codes de fonction (ex. recruteur_wl),
  // tandis que le mode d’interface utilise les codes courts (wl / cpe).
  const portalMode = mode === 'recruteur_wl' ? 'wl' : 'cpe';
  localStorage.setItem('midori_portal_mode', portalMode);
  if (portalMode === 'wl') {
    location.assign('wl.html');
    return;
  }
  location.assign(HOME[p.role] || 'dashboard.html');
}

async function loadPortalFunctions(p) {
  const r = await sb.rpc('midori_get_my_functions');
  if (!r.error && Array.isArray(r.data) && r.data.length) {
    MIDORI_PORTAL_FUNCTIONS = r.data;
    return MIDORI_PORTAL_FUNCTIONS;
  }
  // Compatibilité avec les anciennes données si la migration n'est pas encore installée.
  MIDORI_PORTAL_FUNCTIONS = p.role === 'admin'
    ? [{function_code:'cpe',label:'CPE / Administration',icon:'🏫'},{function_code:'recruteur_wl',label:'Recruteur WL',icon:'📋'}]
    : (p.role === 'recruteur_wl' ? [{function_code:'recruteur_wl',label:'Recruteur WL',icon:'📋'}] : [{function_code:'cpe',label:ROLE_LABEL[p.role] || p.role,icon:'🏫'}]);
  return MIDORI_PORTAL_FUNCTIONS;
}

function navForProfile(p) {
  const mode = portalModeFor(p);
  if (mode === 'wl') return NAV.recruteur_wl;
  return NAV[p.role] || [];
}

function shell(p) {
  const page = location.pathname.split('/').pop() || 'dashboard.html';
  const mode = portalModeFor(p);
  let nav = '';
  navForProfile(p).forEach(group => {
    nav += `<div class="nav-section">${esc(group[0])}</div>`;
    group[1].forEach(item => {
      nav += `<a href="${item[0]}" class="${page === item[0] ? 'active' : ''}" ${item[0] === 'wl.html' ? 'data-portal-nav="recruteur_wl"' : ''}><span>${item[1]}</span><span style="display:flex;gap:7px;align-items:center">${esc(item[2])}${item[0] === 'messages.html' ? '<span id="mailBadge" class="tag red" style="display:none;padding:2px 6px;font-size:10px"></span>' : ''}</span></a>`;
    });
  });
  document.body.className = '';
  document.body.innerHTML = `
    <div class="page-shell">
      <aside class="sidebar" id="sidebar">
        <div class="brand">
          <img class="school-logo" src="data:image/jpeg;base64,/9j//gCneyJtZXRhZGF0YSI6ImRpc2NvcmQiLCJtZXRhZGF0YV92ZXJzaW9uIjoiMC4xLjAiLCJlbmNvZGVyIjoianBlZ2xpIiwiZW5jb2Rlcl92ZXJzaW9uIjoiMC4xLjAiLCJlbmNvZGVyX2hhc2giOiJiYzE5Y2EyMzkzZjc5YmZlMGE0YTk1MThmNzdlNGFkMzNjZTFhYjdhIiwicXVhbGl0eSI6Njl9/+IB2ElDQ19QUk9GSUxFAAEBAAAByAAAAAAEMAAAbW50clJHQiBYWVogB+AAAQABAAAAAAAAYWNzcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAPbWAAEAAAAA0y0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJZGVzYwAAAPAAAAAkclhZWgAAARQAAAAUZ1hZWgAAASgAAAAUYlhZWgAAATwAAAAUd3RwdAAAAVAAAAAUclRSQwAAAWQAAAAoZ1RSQwAAAWQAAAAoYlRSQwAAAWQAAAAoY3BydAAAAYwAAAA8bWx1YwAAAAAAAAABAAAADGVuVVMAAAAIAAAAHABzAFIARwBCWFlaIAAAAAAAAG+iAAA49QAAA5BYWVogAAAAAAAAYpkAALeFAAAY2lhZWiAAAAAAAAAkoAAAD4QAALbPWFlaIAAAAAAAAPbWAAEAAAAA0y1wYXJhAAAAAAAEAAAAAmZmAADypwAADVkAABPQAAAKWwAAAAAAAAAAbWx1YwAAAAAAAAABAAAADGVuVVMAAAAgAAAAHABHAG8AbwBnAGwAZQAgAEkAbgBjAC4AIAAyADAAMQA2/9sAhAAICAgOCg4PDg4PFA8QDxQVFRMTFRUYExYVFhMYGBkYGhoYGRgZFxwcHBcZGhweHhwaHCIhIhwiHx8iJSElISEbAQcGBg0KDQsMDAsQCw4LEA8PDAwPDxINDg0ODRIUERARERARFBIQEA0QEBITERQUERMUDxEPFBMTExMdHx0cHO3/wAARCATmBOYDASIAAhEBAxEB/8QBogAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoLEAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+foBAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKCxEAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2yiiiuw8cKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAsFFJ0ppdR/Fx9aVzSNGT2gPoqLz0/vVGbpP8ilzI2jl9V7UpFmiqrXaD39sUz7aP7v60vaI0jldZ/8ALsu1y3iq98q3EIPzTf8AoK9f6VsTakkSM7DAUE15peXb6pc7jxngDrtVazqVFbQ93h3JJ+1VWquWMCi0TRKknrz9NvSvW9Ou1u4I5QfvD5vZu9cJc24ki2j04+q03w9rH2N/JcZjkP8A3y1Z0p2Pb4iy542lzQ/iQPTKKpfbV/u/rR9tH939a6PaI+I/sqt/IXaKrfa0/wAilW6Q98fUUe0RnLLqy/5dSLFFQidD/FUm8Hv+tPmRlLC1FvAdRRRVGdgooooJCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoopCcdeKCoU3LoLRVd7lF75qs97/dWolUSO2llVWf2bGjTWYDqcfjWS9w7fxfh0pVt5ZOisf0H5molV7HZDJYx1qVeUvtdIO+fwqFr0c4WnJpkh+8Qv6mrSaWg+8xP6Cp9qzaOHw1Ppzma1459qjM7n+LrW+tlCv8ABn68/wA6sKgXgDAqLsv61Tj8FBHNCCZuNrfjnFSjT5ieVx+IroqKQf2hPoo/cYa6W/cr+pqX+yv+mn6f/ZVsUUGbxlT+cyxpaf3m/T/4mlGmR+p/T/CtOigj6zP+c4PxcEt7dUQYMrj1+6vJ/XFclpUXDP68Vv8AjeUGS3Tuocn8SuP5Gs6yTbCnuM/99c0pbn2WUXjhoX/5eXLVc1fxeXLx/FzXS1kasnCN7kf99f8A6qR30Xr6npWmQRXdrDLjl0BPJ+93/wDHs1a/suP+836f/E1l+EpQ1hGo/gZ1P13E/wBa6irPgsTOcKlSKl8E2ZR0tD0Zh+RqL+yf9v8AT/7KtqikTHF1F9swDpknqv5n/wCJqE2Mw/h/UV0tFBpHH1OrucsVlTnDDHfmhblx/FmuoqN4lf7wBx6jNO4/rkZfFTg/kYC3jDqM1Mt4p6jH61ovYRN/Dj6cVVfSh/C3580/aMUlhqnxQ5Bq3CH+LFTA59/pVF9OlXphv8+9VmR4uoZffpVqqZSyqlP4KljYorJW6cd81YS9z95ce9WqqOWrktSPwvnL1FQpOj/xc+nSpqrmPPqUJwdpQCiiiqMwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooBIKKjklVOpx7d6pSXh/hGPeolUSO2hllSr9mxoE468VXkukX3+lZrO0h9c9AKtxafI+M/KPfr+VZyq9j04ZXRpa1KlyNrxm6cCoPnkPds/jW5Fp0a8t8/wCgq8iKgwowPYYrOTbN1i6dPSlTsYEemyN1G0frV6PTEX7xLfoK1KKRhPGVJfaII7dI/uqB+HP51PRS0HO23uFFFFABRRRQAUUUUAJRUE0ywqXchVUZJPAArzrU/GErsUtfkX++Rlj9AflH/AqZ2YHLauJdqcfn0PS80V4mdSv5Tv8AOm/4CWA/T5atQ+JL+A4Mu7b/AAuoP5n73/j1TzHpz4Yq292pBmt42hxNBJ/fQj/vk5/9mqjaPuhT6Af988VU1fWjqaReYm14s8j7pBxnjt0FLpc2V2f3f5NQe/gsPOlh6UKkfehc1KydVf5UX3z/AN8j/wCvWtXPalNvk2j+D+fekdFCN5Ho3hCLy7FWP/LR2b9dv/stdVXktt4nls7eO3gjHyZ+ZvViScBenzGqcmt6hc/8tnP+4Av/AKAtPmPm6vD9arUqVJOFOM5s9nzRXi0es39tz50n/A/m/wDQ67TRfFa3JENyPLkPRv4WPp7GnzHLjMgrUY86/eR/uHb0UlLQeOFFFFABRRRQAUmKWigCo9nE/VB/L+VUn0ofwNj681r0UGkMROO0jmZLGWP+HP05qFZHTofwrrKhkgST7yg0HVHML6TjzmEl4f4hn3q2lwj98H0PFPl0tT9xsex5FZstnJH1XP05FWqrREsLh63w/u5GrRWOk7p0P4VbS8B+8Me9axqpnBXyWpDWPvl2imq4boc06tDzJQcXaQUUUUCCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooBK4UVXkuVT3PpVCS4aT29qzlUSPTwuTzqe9J8kS/JcqnuaoyXTP7D0pYbSSXoMD1PArWh05E+9859+n5VjKbZ6cKVDDbLnkYscLy/dGf5fnWpDpndz+A/xrVAx04xTqkzq4+ctF7hFHCkf3RipqSloOVtvcKKKKACiiigBKWimM6qMkjFAWHUVRk1CJP4s49OaqPqv91Pz4pm0MNOW0f0NiisH7VcS/dB+oXj9aX7LcyfeOPq3H/jtBf1ZL4qkY/ibLSKnLMB+OKrvexL/GD9Of5VRXS2/if9M1ONLj9WP5UByUlvUc/kcF4s1jz3FvEfkXBf3bsPw/r7VjWNiMb5PwH9avX/h2+e4mZISULtt+Zfu546t/drGWea2fa+7jqjZz+vSokfa5b7L2UKVCa819v5nSUx41cYYZ9utU31CJRnPvjqai/tWP+635D/4qg39nIbcaYp5j4Pp2NULRHWZOCOf/ANdbEN/HLxnBPrxmrtBXtJJWYyTO0464OK5eO3eVtuPrXV00nGSeMUE06vLsUodOjj+9859+n5VeAxxWe+pRKe7fQUz+1Y/7rfkP/iqByjJ7mi6BxhhkHrXP3tp5Byv3T+h9K0ptQQJuQ7j2rNggudQfZErSH8l/H+EUAmqavUnyRPQvDWuCeDy5m/eRcZ5yy9j/AE/CuoF3G3Rx+JxXB+HNAuIJ3a4iKIUP8QPzZH91vTNdg2lp/CzD8jVnxmYQw/tZ8kn6/Y+Rphwehp1Yh0xxyrD9RTfKuo+hJ987v0NByfV4v4an36G7S1z4vpo/vr+YINWk1Rf4lI/WgTwk1t7xrUtVEvIn6OP5fzq1mkYyi1uLRRRQIKKKKACkpaKAKktpHL95efXoazJtMYcp8314NbtLQbUsTOG0jkWVozzlT+VWUuyPvc+/eugeNZBhhmsybSweYzj2PSmpNbHS8RSrK1WAscyydD+HepKxZInh+8Mf59amiu2X73zfzraNXucWJyW65qMuaPY1KKjSZZOh/DvUlaHkVKU4O04hRRRTICiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAopkkix/e49u9Zst0z8DgfqaiVRI78JllSs77RL0twsfufSs+S4aT/AApsMDyn5R+PYVs2+nJHy/zn9BWEptnsQpUcLsueRlQWjy9BgevateCwSPr859+n5VfopHPXxc6m/ux7C0tFFIwCiiigAooqN5VQZZgB9aASuPpKy5dTUcIM/oKqeZcXH3c49uB+dM3WEe8vcNiS5SP7zAVQk1RR91d3v0FMj0sn77fgP8avx2cSdFz9eaCv3Uf7/wCBl/aLif7o/IYH5mnLp0knLtj/AMeNblLQL6218MeQzU0yNfvZb+VXEgRPuqB745qekpGM6kpbyCloooJCiiigBtcL4w0wzLHPFGzyA7TtBPy4Jycf3WH613dJTN8Hi5YepGpDeJ43p/h26u25jaJB1ZwR+QbrXcx+D7IR7WV2b+/vIP5fd/8AHa6sUtKx14vOq1Z35+T/AAaHket+GpNPHmJ+8h9f4l+v/wAVVPTbhnPltyAMj2rvfE+qpawNDjc8ysoHs3BJrzSwmWJyznHHue4pSPqMor1q9C9WN/8An3U6s6WubvbhpXKfwg4x6mtf+0YP736H/wCJrFS48q4Ey/NskD/98nNI7YRklNqGvT1Ow0nwf5qiS7LJn/lmvB/E/wBK1NQ8H28if6PmJx7lg31zXSaffx3sKzR/db8we4NX8VZ8RWzXEe05nNxlD7HRHiNxo13A+wwOfdVLD8xXqXh+wFnaRrt2u4DP2O4jof8Ad+7+FbYFOoHmGb1MVGMZrlt2FooopHnBRRRQAmKqvZxP1Qfy/lVukoGm1sZT6Wh+6xH6iqv2KeI/Ic/Q4/St+kxTNo4ua39/1MJb6aPiRfz+WrcepRt97Kn6ZFaLKDwelU5NPiftt+nFBftacvjjy/4C0kit90g/rUlYL6dJHzG2f/HTSLeTQnDjP14P50C+rKX8OXN+Bv0VnRajG/X5T79Pzq+CG5BoMJ05R3iPooopEhRRRQBGyhhgjINZs+mKeYzt9u1atFBdKrKD0kcnJE8R+YY9DU8d2y8N83866JkDDDDIrKuNM7x/l/8AXpxlbY7frNOsuWrEfHIr/d59u9PrEZWiPOVIq3DedA/51tGr3ODF5O0ual78TQopqsD05FOrU8eUHF2YUUUUCCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiio5JVj69ew9alysaUqM6jtGI8nHJqjLeAcJz71XlnaT6dhUlvZPNz91fX1+lZSq9j3sLltOguerqyv80p/vE/ia1LfTe8n/fI/qa0oLdIR8o/HuanrIqvjXLSPuRGqgQYUYHpT6KKDjCiiigApKSqc96kXfJ9BTHGm5OyLlVZryOLqefTqayWuZrg4QY+n9TU8OmdDI34D/Gg6PYQhrUl8kRyahJJ8sYx+uaSPT5ZTukOP1NbUcKRjCrgVLQH1rl0hHkKcVjHH23H35q5QKWkc7k5asKKKKBBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHL654e/tNkfzvK2Aj7u7P/jy1weuaEdL8v995nmZ/h29Mf7TetexYzXmvjS8JljgwNqrvz7kkY9ulKR72QY2s61Klz/ul0OHrsdM8J/breOf7Rs8zPy+Xnvjrv9q46vWfCV2bizwwA8pinHGRgHP61MT2uIcXUpU6cqU+T33saej6Z/Z0Ah37+S2cY6+1a1LRWh8RObm5Sl8UtxaKKKQgooooAKKKKACiiigAooooAKKKKACmMgYYIyDTqWgDNm02N/u/Ifbp+VUDbz23KdP9nn9K6CimbwxUlo/fj2Zixan2kH4j/CtSKZJR8pBpk1rHL94c+o4NZUmnyRHdG2f0NBdqVTb93L8DeorCi1B0OJBn8MGtaK4SUfKw/rQZVcPKG5YooopGQUUUUAQSwLKMMM/zrFn09o+U+ZfTuK6Cig2o4iVPY5KOVo/u8etaUVysmAeD6etXbiySXn7revr9awprd4T8w/wNXGbR1Tp0sWtfckbNFZkN2VwG5H6itFHDDI5FbRqJnh4vATovX4R1FFFWcYUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFJ0pHcICTwKy5rkvx/D6etRKokd+Cy2dd32gWZrvHCc+pqiqtI3HJNTW9q8x46etb8FukI+Xqep7mueTbPa9pTwy5KfvS7lK204L80nJ9Ow/xrVoopHDUqSm7sWiiiggSiioZZliGWOKY4xvoiUGqs94kXU8+nesua+eU7Yxj/wBCqWHTifmlP4f4mg6Y4eMFepL5dSB7mW5O1Bge39TVqDTAOZDn27VppGsYwowPapKCamKurQjyRGoioMKMCn0UUjnCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAErOutLtrpt0sSuwGMkc4rRpKY4zcXdS5fQxzoNkf+XeP/AL5Aq9bWcVqu2GNY1JyQoxzVuigcqspKzk2LRRRSJCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAIJoFmHzDP8AOsebTnT5oznH4Gt6ig1pYiUNjCi1B0O2QZ/DFa8UySjKnNNmtklHzD8e9Y8tlJAd0Zz9OtM2tTq7fu5fgdBRWNb6l2k49/8AGtdWDDIOaDCrQlB6j6KKKRmFMdA4wwyDT6KAMG604r80fI9O4/xrPSRozxXW1QubFZfmHyt+h+tM7qGMTXLV9+JUhuFkx/e9KsViSRNCcMP/AK9W4Lvs/wCBrWFXuceOynT2lH3omhRSA5pa2PFCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKhlmWPryT0FRT3ITIXlv5Vn/NK394msZ1LbHs4DKr+/V9yPYJJDIefwHpV+108t80nA9O9W7SwEfzPy36CtKsTsxGM05KekRFUKMDgDoKfSUtBxBRRRQA0UhIHWoJ7lYRljWNJNLdHao49P8TTNqWHctX7ke5cuNRA4j+Y+vb/AOvVWK0kuDvc4H6/gKv21gsfzN8zfoK0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RP8AhxLFFFFIwCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBKzdQ/g/H+laVZ9+OFNBrhvjiWoPuJ9B/Kpqr2rZjWrFMzno5GfqMZePj+HmufrsKTAoOrD410lbluchRXX4FGBSN/7Uf8pyKqT0H6U2uvYcVyNB04PFOrze6PjUuwA9eK6wVzVmcSp+X6V0tBx5nL34oY7hBVJm3dgKfOfm6cY/CmUGNKCSuIRik/rT8cZ/AUlM05gpre3XtU8RDfK3PpVlY1XoMUjKVWwq9OetPoooOcKKKKACkNLRQB5pq1r9hu938E35Z7/wDj3zfjTa6/XrD7ZbOFH7xPmX1JXqP+BD+lcTayb09xwa8jFUuWR4GYUeSd/wCcnooornOMgmtlk9j61padr0tmRHc5kj7P1Yf/ABX/AKFVSmOgcEHnNVTqODujSjXlTd0ejxvHcJuUhkcfUEV5m0P2S6mgPrx9Oo/8dNS2d9NpjZT54j95f89DVvXJI5zBewnKt8j+23nB98Z/KuqvUVWN/tQO7E1VXhzfagV6z5B9nk3j7jda0OtRTR+YhX8vrXGecQXq5QN6c/h/nFWkbcoPqAaoxt5kDKf4f/ZeRU9qcxr7ZH60AF2cRN74/nXe2/8Aq4/91f5Vwsq5MQxnLqPXNegV62VR0kzqw32gooor1ToCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKilTejr6ggflUtFTON0Jnn9ufk2nqny/8AfNV5RmeP/P8AerQubf7NcSx/wt86/wDAvvVmXT7JFb2OP/Hq+Yqw5ZSR50o2dh1r+8d398Cr9VLJcR/Uk/0/pU8j7FLen61IFC9lyQnpyasRRtI3my8senoB2qraxea29uxz9TWrQAVVmulT5R8zelRSTtIdkX4mrENusXue5oAriCSbmRsD0q8owAPQYpaKBEckgjXce361veGbA/NdyD5n+57Duf6f/rrDsbM6lcBP+WKcufX/APar0tECAKowB+WK78FQ+2z1ctw3/LxklFFFegesFFFFACUVRuJDnYpx3NQb5M7s5I7d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0p1FFg55fzDdg9P0o2D0/SnUUWDnl/MN2D0/SjYPT9KdRRYOeX8w3YPT9KNg9P0p1FFg55fzDdg9P0o2D0/SnUUWDnl/MN2D0/SjYPT9KdRRYOeX8xCbdC27YCfXFMeziY529fcirNFHKjWGLnF3VUYEUfwgY9qXYPT9KdRRYy9rL+YbtX0H5VG8SvgYHrUpHf0qP9M1E5dD1MBT5lzcw5Y1AHA49qXYPT9KQdPf1NPqo6nJi4unL4huwen6UbB6fpTqKdjm55fzDGjVgQV6jB4qqLGL+59OTV2ihxTNqONqU/hmU/sEP939TTVsIgT8v6mrpGfcUdKj2SOn+16nLbm94pjT4T/D+po+wRY+729T/wDFVdIz1opqCCtmtSUYpSn94wIo/hAA7Ypdq/3R+VOoqjg9rL+YQDHsKWiimKTbCiiigQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFADfX3oxjjt606ip5EdDxc7WCiiiqOcKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAQ80hGefTtTqKTimbUsTKCshB+VLRRRGNiKtVzd2FFFFMgKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//2Q==" alt="Midori High" style="width:44px;height:44px;object-fit:contain;object-position:center;display:block;flex:0 0 44px;">
          <div><strong>Midori High</strong><small>Portail administratif</small></div>
        </div>
        <nav class="nav">${nav}</nav>
      </aside>
      <section class="main">
        <header class="topbar">
          <div style="display:flex;gap:9px;align-items:center">
            <button class="menu" id="menu">☰</button>
            <div><strong>${esc(TITLE[page] || 'Portail')}</strong></div>
          </div>
          <div class="top-user">
            <div class="avatar">${esc((p.full_name || p.username || '?').slice(0, 1).toUpperCase())}</div>
            <div style="text-align:right"><strong style="font-size:13px;display:block">${esc(p.full_name || p.username)}</strong><span style="font-size:11px;color:#77827e">${esc(mode === 'wl' ? 'Recruteur WL' : (p.role === 'admin' ? 'CPE / Administration' : (ROLE_LABEL[p.role] || p.role)))}</span></div>
            ${MIDORI_PORTAL_FUNCTIONS.length > 1 ? `<div style="display:flex;gap:6px;align-items:center">${MIDORI_PORTAL_FUNCTIONS.map(f => `<button type="button" class="btn ${((f.function_code==='recruteur_wl'&&mode==='wl')||(f.function_code==='cpe'&&mode==='cpe')) ? 'primary' : 'secondary'} small" data-portal-function="${esc(f.function_code)}">${esc(f.icon)} ${esc(f.function_code==='recruteur_wl'?'WL':'CPE')}</button>`).join('')}</div>` : ''}
            <button id="logout" class="logout">Déconnexion</button>
          </div>
        </header>
        <main class="content" id="app"></main>
      </section>
    </div>`;
  qs('#logout').onclick = logout;
  qs('#menu').onclick = () => qs('#sidebar').classList.toggle('open');
  qsa('[data-portal-function]').forEach(b => b.addEventListener('click', () => setPortalMode(b.dataset.portalFunction, p)));
  qsa('[data-portal-nav="recruteur_wl"]').forEach(a => a.addEventListener('click', (e) => { e.preventDefault(); setPortalMode('recruteur_wl', p); }));
  loadUnreadBadge();
}


async function rows(table, select = '*', cfg = {}) {
  // Récupération paginée pour ne jamais perdre les fiches au-delà de 1 000 lignes.
  // Les appels avec cfg.limit restent limités à la quantité demandée.
  const PAGE_SIZE = 1000;
  const requestedLimit = Number.isFinite(Number(cfg.limit)) && Number(cfg.limit) > 0 ? Number(cfg.limit) : null;
  const target = requestedLimit || Infinity;
  const out = [];
  let from = 0;

  while (out.length < target) {
    const size = Math.min(PAGE_SIZE, target - out.length);
    let q = sb.from(table).select(select);
    if (cfg.order) q = q.order(cfg.order, { ascending: cfg.ascending ?? true });
    if (cfg.filters) cfg.filters.forEach(f => { q = q[f.op || 'eq'](f.column, f.value); });
    q = q.range(from, from + size - 1);

    const r = await q;
    if (r.error) throw r.error;
    const page = r.data || [];
    out.push(...page);

    if (page.length < size || page.length === 0) break;
    from += page.length;
  }

  return requestedLimit ? out.slice(0, requestedLimit) : out;
}
async function add(table, row) { const r = await sb.from(table).insert(row).select().single(); if (r.error) throw r.error; return r.data; }
async function update(table, id, row) { const r = await sb.from(table).update(row).eq('id', id).select().single(); if (r.error) throw r.error; return r.data; }
async function remove(table, id) { const r = await sb.from(table).delete().eq('id', id); if (r.error) throw r.error; }
async function hardDelete(entity, id) {
  const { data, error } = await sb.functions.invoke('admin-hard-delete', { body: { entity, id } });
  if (error) {
    let message = errMsg(error);
    try { const ctx = await error.context?.json?.(); if (ctx?.error) message = ctx.error; } catch (_) {}
    throw new Error(message);
  }
  if (data?.error) throw new Error(data.error);
  return data || {};
}
async function log(action, entity, entityId = null, details = null) {
  try { await sb.from('activity_logs').insert({ actor_profile_id: (await currentUser())?.id || null, action, entity, entity_id: entityId, details: details || null }); } catch (_) {}
}


const MESSAGE_BUCKET = 'midori-messages';

function roleLabel(role) { return ROLE_LABEL[role] || role || 'Utilisateur'; }

async function messageDirectory() {
  const r = await sb.rpc('list_message_recipients');
  if (r.error) throw r.error;
  return r.data || [];
}

async function loadUnreadBadge() {
  const badge = qs('#mailBadge');
  if (!badge) return;
  try {
    const user = await currentUser();
    if (!user) return;
    const r = await sb.from('messages').select('id', { count:'exact', head:true }).eq('recipient_id', user.id).is('read_at', null);
    if (r.error) throw r.error;
    const n = r.count || 0;
    badge.textContent = n > 99 ? '99+' : String(n);
    badge.style.display = n ? 'inline-flex' : 'none';
  } catch (_) {}
}

function safeFileName(name) {
  return String(name || 'fichier').replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120);
}

async function sendInternalMessage({ recipientId, subject, body, files = [], homeworkId = null }) {
  const user = await currentUser();
  if (!user) throw new Error('Session expirée.');
  if (!recipientId) throw new Error('Destinataire manquant.');
  const messageId = crypto.randomUUID();
  let message = null;
  const uploadedPaths = [];
  try {
    const r = await sb.from('messages').insert({
      id: messageId,
      sender_id: user.id,
      recipient_id: recipientId,
      subject: String(subject || '').trim() || '(Sans objet)',
      body: String(body || '').trim(),
      homework_id: homeworkId || null
    }).select().single();
    if (r.error) throw r.error;
    message = r.data;

    for (const file of Array.from(files || [])) {
      if (!file || !file.name) continue;
      if (file.size > 10 * 1024 * 1024) throw new Error(`Le fichier « ${file.name} » dépasse 10 Mo.`);
      const path = `${user.id}/${messageId}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
      const up = await sb.storage.from(MESSAGE_BUCKET).upload(path, file, { upsert:false, contentType:file.type || 'application/octet-stream' });
      if (up.error) throw up.error;
      uploadedPaths.push(path);
      const ar = await sb.from('message_attachments').insert({
        message_id: messageId,
        file_name: file.name,
        storage_path: path,
        mime_type: file.type || 'application/octet-stream',
        size_bytes: file.size
      });
      if (ar.error) throw ar.error;
    }
    return message;
  } catch (er) {
    if (uploadedPaths.length) {
      try { await sb.storage.from(MESSAGE_BUCKET).remove(uploadedPaths); } catch (_) {}
    }
    if (message) {
      try { await sb.from('messages').delete().eq('id', messageId); } catch (_) {}
    }
    throw er;
  }
}

async function deleteInternalMessage(messageId) {
  if (!messageId) throw new Error('Message introuvable.');
  const ar = await sb.from('message_attachments').select('id,storage_path').eq('message_id', messageId);
  if (ar.error) throw ar.error;
  const paths = (ar.data || []).map(x => x.storage_path).filter(Boolean);
  if (paths.length) {
    const sr = await sb.storage.from(MESSAGE_BUCKET).remove(paths);
    if (sr.error) throw sr.error;
  }
  const mr = await sb.from('messages').delete().eq('id', messageId);
  if (mr.error) throw mr.error;
}

async function renderMessages(p) {
  const user = await currentUser();
  const directory = await messageDirectory();
  const people = new Map(directory.map(x => [x.id, x]));
  const [inboxR, sentR] = await Promise.all([
    sb.from('messages').select('id,sender_id,recipient_id,subject,body,homework_id,sent_at,read_at').eq('recipient_id', user.id).order('sent_at',{ascending:false}).limit(200),
    sb.from('messages').select('id,sender_id,recipient_id,subject,body,homework_id,sent_at,read_at').eq('sender_id', user.id).order('sent_at',{ascending:false}).limit(200)
  ]);
  if (inboxR.error) throw inboxR.error;
  if (sentR.error) throw sentR.error;
  const inbox = inboxR.data || [];
  const sent = sentR.data || [];
  const personName = id => people.get(id)?.full_name || people.get(id)?.username || 'Utilisateur';
  const displayRows = (list, mode) => list.map(m => {
    const other = mode === 'inbox' ? personName(m.sender_id) : personName(m.recipient_id);
    return `<div class="item msg-item ${!m.read_at && mode==='inbox' ? 'msg-unread' : ''}" data-msg="${esc(m.id)}" data-mode="${mode}" role="button" tabindex="0">
      <div style="min-width:0;text-align:left;flex:1"><strong>${esc(m.subject || '(Sans objet)')}</strong><span>${mode==='inbox'?'De':'À'} : ${esc(other)} · ${dtFR(m.sent_at)}</span><p style="margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:760px">${esc(m.body || '')}</p></div>
      <div class="actions" style="flex-shrink:0">${m.homework_id ? '<span class="tag">📓 Devoir</span>' : ''}${!m.read_at && mode==='inbox' ? '<span class="tag red" style="margin-left:5px">Nouveau</span>' : ''}<button type="button" class="btn danger small" data-delete-message="${esc(m.id)}">🗑️</button></div>
    </div>`;
  }).join('') || '<div class="card empty">Aucun message.</div>';

  qs('#app').innerHTML = head('Messagerie', 'Messagerie interne de Midori High — uniquement pour le RP.') +
    `<div class="toolbar"><div class="actions"><button id="composeMsg" class="btn primary">✉️ Nouveau message</button><span class="tag">${inbox.filter(x=>!x.read_at).length} non lu(s)</span></div></div>` +
    `<div class="grid g2"><div class="card"><div class="toolbar"><h3>Boîte de réception</h3></div><div class="list">${displayRows(inbox,'inbox')}</div></div><div class="card"><div class="toolbar"><h3>Messages envoyés</h3></div><div class="list">${displayRows(sent,'sent')}</div></div></div>` +
    modal('msgCompose','Nouveau message', `<form id="msgForm" class="form"><div class="field full"><label>Destinataire</label><select name="recipient_id" required>${opts(directory.filter(x=>x.id!==user.id).sort((a,b)=>String(a.full_name).localeCompare(String(b.full_name),'fr')),'id','full_name')}</select></div><div class="field full"><label>Objet</label><input name="subject" required maxlength="180"></div><div class="field full"><label>Message</label><textarea name="body" required placeholder="Écrivez votre message RP…"></textarea></div><div class="field full"><label>Pièces jointes <span class="muted">(3 fichiers max, 10 Mo chacun)</span></label><input name="files" type="file" multiple></div><div class="field full"><button class="btn primary">Envoyer</button></div></form>`) +
    `<div id="messageModalHost"></div>`;

  qs('#composeMsg').onclick=()=>openModal('msgCompose');
  closeBindings();
  qs('#msgForm').onsubmit = async e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const files = Array.from(e.target.querySelector('[name="files"]').files || []);
    if (files.length > 3) { toast('Maximum 3 pièces jointes.', 'error'); return; }
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn?.disabled) return;
    try {
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Envoi…'; }
      const m = await sendInternalMessage({ recipientId:f.get('recipient_id'), subject:f.get('subject'), body:f.get('body'), files });
      await log('create','message',m.id,null);
      toast('Message envoyé.');
      closeModal('msgCompose');
      await renderMessages(p);
    } catch (er) { toast(errMsg(er),'error'); if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Envoyer'; } }
  };

  qsa('[data-msg]').forEach(btn => btn.onclick = async () => {
    const id = btn.dataset.msg;
    const mode = btn.dataset.mode;
    try {
      const list = mode === 'inbox' ? inbox : sent;
      const m = list.find(x=>x.id===id);
      if (!m) return;
      if (mode === 'inbox' && !m.read_at) {
        const ur = await sb.rpc('mark_message_read',{p_message_id:id});
        if (ur.error) throw ur.error;
        m.read_at = new Date().toISOString();
      }
      const ar = await sb.from('message_attachments').select('id,file_name,storage_path,mime_type,size_bytes').eq('message_id',id).order('id');
      if (ar.error) throw ar.error;
      const sender = people.get(m.sender_id)?.full_name || 'Utilisateur';
      const recipient = people.get(m.recipient_id)?.full_name || 'Utilisateur';
      const attachmentHtml = (ar.data||[]).map(a=>`<button type="button" class="btn secondary small" data-download="${esc(a.id)}" data-path="${esc(a.storage_path)}">📎 ${esc(a.file_name)}</button>`).join(' ') || '<span class="muted">Aucune pièce jointe.</span>';
      const canReply = mode === 'inbox';
      const host=qs('#messageModalHost');
      host.innerHTML=modal('msgView','Message',`<div class="card" style="box-shadow:none;padding:0;border:0"><div class="muted">De : ${esc(sender)}<br>À : ${esc(recipient)}<br>${dtFR(m.sent_at)}</div><h2 style="font-size:21px;margin:15px 0 10px">${esc(m.subject)}</h2><div style="white-space:pre-wrap;line-height:1.6">${esc(m.body)}</div><div style="margin-top:16px"><strong>Pièces jointes</strong><div class="actions" style="margin-top:8px">${attachmentHtml}</div></div><div class="actions" style="margin-top:18px">${canReply?'<button id="replyMsg" class="btn primary">↩️ Répondre</button>':''}<button id="deleteMsgView" class="btn danger">🗑️ Supprimer</button><button class="btn secondary" data-close="msgView">Fermer</button></div></div>`);
      openModal('msgView'); closeBindings();
      qsa('[data-download]').forEach(x=>x.onclick=async()=>{
        try { const r=await sb.storage.from(MESSAGE_BUCKET).createSignedUrl(x.dataset.path,60); if(r.error) throw r.error; window.open(r.data.signedUrl,'_blank'); } catch(er){ toast(errMsg(er),'error'); }
      });
      qs('#replyMsg')?.addEventListener('click',()=>{
        closeModal('msgView');
        qs('#msgCompose [name="recipient_id"]').value=m.sender_id;
        qs('#msgCompose [name="subject"]').value=`Re: ${m.subject}`;
        qs('#msgCompose [name="body"]').value=`\n\n--- Message précédent ---\n${m.body}`;
        openModal('msgCompose');
      });
      qs('#deleteMsgView')?.addEventListener('click', async () => {
        if (!confirm('Supprimer définitivement ce message ?')) return;
        const b = qs('#deleteMsgView');
        try {
          b.disabled = true;
          await hardDelete('message', m.id);
          closeModal('msgView');
          toast('Message supprimé.');
          await renderMessages(p);
          await loadUnreadBadge();
        } catch (er) {
          b.disabled = false;
          toast(errMsg(er), 'error');
        }
      });
      await loadUnreadBadge();
      btn.classList.remove('msg-unread');
    } catch (er) { toast(errMsg(er),'error'); }
  });
  qsa('[data-delete-message]').forEach(btn => btn.onclick = async e => {
    e.stopPropagation();
    if (!confirm('Supprimer définitivement ce message ?')) return;
    try {
      btn.disabled = true;
      await hardDelete('message', btn.dataset.deleteMessage);
      toast('Message supprimé.');
      await renderMessages(p);
      await loadUnreadBadge();
    } catch (er) {
      btn.disabled = false;
      toast(errMsg(er), 'error');
    }
  });

}

async function renderHomeworkSubmissions(p) {
  const id = new URLSearchParams(location.search).get('id');
  if (!id) { qs('#app').innerHTML = head('Remises de devoirs','Sélectionnez un devoir depuis l’espace devoirs.')+'<div class="card empty">Aucun devoir sélectionné.</div>'; return; }
  const hr = await sb.from('homework').select('id,title,description,due_date,attachment_url,classes(name),subjects(name),professors(full_name)').eq('id',id).maybeSingle();
  if (hr.error) throw hr.error;
  if (!hr.data) { qs('#app').innerHTML = '<div class="notice error">Devoir introuvable ou non accessible.</div>'; return; }
  const homework=hr.data;
  const sr=await sb.from('homework_submissions').select('id,homework_id,student_id,message_id,submitted_at,status,note,students(full_name,username,class_name,rp_status)').eq('homework_id',id).order('submitted_at',{ascending:false});
  if(sr.error) throw sr.error;
  const list=sr.data||[];
  qs('#app').innerHTML=head('Remises de devoirs',`${esc(homework.title)} · ${esc(homework.classes?.name||'')} · ${esc(homework.subjects?.name||'')}`)+
    `<div class="card" style="margin-bottom:15px"><strong>Date limite :</strong> ${dateFR(homework.due_date)}<br><span class="muted">${esc(homework.description||'')}</span></div>`+
    `<div class="card"><div class="toolbar"><h3>${list.length} remise(s)</h3></div><div class="table-wrap"><table class="table"><thead><tr><th>Élève</th><th>Date</th><th>Statut</th><th>Commentaire</th><th>Pièces jointes</th></tr></thead><tbody>${list.map(x=>`<tr><td><strong>${esc(x.students?.full_name||'')}</strong><span>${esc(x.students?.class_name||x.students?.username||'')}</span><span>${rpStatusBadge(x.students?.rp_status)}</span></td><td>${dtFR(x.submitted_at)}</td><td><select class="sub-status" data-sub="${esc(x.id)}"><option ${x.status==='Envoyé'?'selected':''}>Envoyé</option><option ${x.status==='En retard'?'selected':''}>En retard</option><option ${x.status==='Lu'?'selected':''}>Lu</option><option ${x.status==='Corrigé'?'selected':''}>Corrigé</option></select></td><td>${esc(x.note||'—')}</td><td><div class="actions" data-files="${esc(x.message_id)}"><span class="muted">Chargement…</span></div></td></tr>`).join('')||tableEmpty(5,'Aucune remise pour le moment.')}</tbody></table></div></div>`;
  for(const x of list){
    const fr=await sb.from('message_attachments').select('file_name,storage_path').eq('message_id',x.message_id);
    const box=qs(`[data-files="${x.message_id}"]`);
    if(fr.error){ if(box) box.innerHTML='<span class="muted">Impossible de charger les fichiers.</span>'; continue; }
    if(box) box.innerHTML=(fr.data||[]).map(a=>`<button type="button" class="btn secondary small" data-path="${esc(a.storage_path)}">📎 ${esc(a.file_name)}</button>`).join(' ')||'<span class="muted">Aucun fichier</span>';
  }
  qsa('[data-path]').forEach(b=>b.onclick=async()=>{try{const r=await sb.storage.from(MESSAGE_BUCKET).createSignedUrl(b.dataset.path,60);if(r.error)throw r.error;window.open(r.data.signedUrl,'_blank')}catch(er){toast(errMsg(er),'error')}});
  qsa('[data-sub]').forEach(sel=>sel.onchange=async()=>{try{await update('homework_submissions',sel.dataset.sub,{status:sel.value});await log('update','homework_submission',sel.dataset.sub,{status:sel.value});toast('Statut mis à jour.')}catch(er){toast(errMsg(er),'error')}});
}

function reputation(total) {
  const n = Number(total || 0);
  if (n >= 600) return 'Parfait';
  if (n >= 100) return 'Normal';
  if (n <= -100) return 'Délinquant';
  return 'Zone intermédiaire';
}
function pointReference() {
  return `<div class="notice"><strong>Repères RP</strong><br>600 pts = Parfait · 100 pts = Normal · −100 pts = Délinquant.<br><span class="muted">Les valeurs entre ces repères restent une zone intermédiaire.</span></div>`;
}

function loginErrorMessage(er) {
  const code = er?.code || '';
  const msg = String(er?.message || '').toLowerCase();

  if (msg.includes('invalid api key') || msg.includes('api key')) {
    return 'Clé Supabase invalide : vérifiez config.js et la clé Publishable de votre projet.';
  }

  if (code === 'invalid_credentials' || msg.includes('invalid login credentials')) {
    return 'E-mail ou mot de passe incorrect.';
  }

  if (code === 'email_not_confirmed' || msg.includes('email not confirmed')) {
    return 'Ce compte n’est pas confirmé dans Supabase Authentication.';
  }

  if (code === 'user_not_found') {
    return 'Aucun compte Supabase ne correspond à cette adresse e-mail.';
  }

  return errMsg(er);
}

function showLoginError(message) {
  const errorEl = qs('#loginError');
  if (!errorEl) return;

  errorEl.textContent = message || '';
  errorEl.style.display = message ? 'block' : 'none';
}

async function initLogin() {
  const form = qs('#loginForm');
  if (!form) return;

  const params = new URLSearchParams(location.search);

  if (params.get('e')) {
    showLoginError(
      'Votre accès au portail est désactivé ou votre profil n’est pas correctement lié. Contactez l’administration.'
    );
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const email = String(form.elements.email?.value || '').trim().toLowerCase();
    const password = String(form.elements.password?.value || '');

    showLoginError('');

    if (!email) {
      showLoginError('Veuillez saisir votre e-mail Midori.');
      return;
    }

    if (!password) {
      showLoginError('Veuillez saisir votre mot de passe.');
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Connexion…';
    }

    try {
      // Connexion directe avec l’e-mail du compte Supabase.
      // Aucun pseudo Roblox, identifiant "admin" ou RPC de résolution n’est utilisé.
      const r = await sb.auth.signInWithPassword({
        email,
        password
      });

      if (r.error) throw r.error;

      // Le profil doit déjà exister dans public.profiles.
      // Cette fonction ne doit pas bloquer la connexion si elle n’existe pas.
      try {
        await sb.rpc('ensure_current_profile');
      } catch (_) {}

      const p = await currentProfile();

      if (!p) {
        await sb.auth.signOut();
        throw new Error(
          'Connexion réussie, mais aucun profil Midori High n’est lié à ce compte.'
        );
      }

      if (p.active === false) {
        await sb.auth.signOut();
        throw new Error(
          'Votre accès au portail est désactivé. Contactez l’administration.'
        );
      }

      location.href = HOME[p.role] || 'dashboard.html';

    } catch (er) {
      console.error('Midori High — erreur de connexion', er);
      showLoginError(loginErrorMessage(er));
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Se connecter';
      }
    }
  });
}



async function enhanceClassFilteredTables() {
  const tables = qsa('table.table');
  if (!tables.length) return;
  let classes = [];
  try { classes = await rows('classes', 'id,name', { order: 'name' }); } catch (_) { return; }
  if (!classes.length) return;
  const classNames = classes.map(c => String(c.name || '').trim()).filter(Boolean);
  const classKey = value => {
    const s = String(value || '').toLowerCase();
    const m = s.match(/(1|2|3)\s*(?:ere|ère|eme|ème|e|er|nd|rd)?\s*[- ]?\s*([abc])/i);
    if (m) return `${m[1]}-${m[2].toLowerCase()}`;
    const n = Number((s.match(/^[123]/) || ['99'])[0]);
    const letter = (s.match(/[abc](?:$|\b)/i) || ['z'])[0].toLowerCase();
    return `${String(n).padStart(2,'0')}-${letter}`;
  };
  const normText = v => String(v || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const collator = new Intl.Collator('fr', { sensitivity: 'base', numeric: true });

  for (const table of tables) {
    const card = table.closest('.card') || table.parentElement;
    if (!card || card.querySelector('.class-filter-bar')) continue;
    const headers = [...table.querySelectorAll('thead th')].map(th => normText(th.textContent));
    const classIndex = headers.findIndex(h => h.includes('classe'));
    const studentIndex = headers.findIndex(h => h.includes('eleve') || h.includes('etudiant') || h.includes('personnage'));
    if (classIndex < 0 && studentIndex < 0) continue;

    const bar = document.createElement('div');
    bar.className = 'toolbar class-filter-bar';
    bar.style.margin = '0 0 12px';
    bar.innerHTML = `<label style="display:flex;align-items:center;gap:8px;font-weight:600">🏫 Classe <select class="search class-filter-select" style="min-width:180px"><option value="">Toutes les classes</option>${classNames.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('')}</select></label>`;
    const wrap = table.parentElement;
    card.insertBefore(bar, wrap);
    const select = bar.querySelector('.class-filter-select');
    const tbody = table.tBodies[0];
    if (!tbody) continue;

    const getClass = tr => {
      const cell = classIndex >= 0 ? tr.cells[classIndex] : null;
      const hay = normText(cell ? cell.textContent : tr.textContent);
      const hit = classNames.find(c => hay.includes(normText(c)));
      return hit || '';
    };
    const getName = tr => {
      if (studentIndex >= 0 && tr.cells[studentIndex]) return tr.cells[studentIndex].textContent.trim();
      return tr.cells[0]?.textContent?.trim() || '';
    };
    const sortRows = () => {
      [...tbody.rows].sort((a,b) => {
        const ak = classKey(getClass(a)), bk = classKey(getClass(b));
        const c = collator.compare(ak,bk);
        return c || collator.compare(getName(a), getName(b));
      }).forEach(tr => tbody.appendChild(tr));
    };
    const filterRows = () => {
      const wanted = normText(select.value);
      [...tbody.rows].forEach(tr => {
        const cn = normText(getClass(tr));
        tr.style.display = !wanted || cn === wanted ? '' : 'none';
      });
      sortRows();
    };
    select.onchange = filterRows;
    sortRows();
  }
}

async function renderDashboard() {
  const [students, professors, classes, absences] = await Promise.all([
    sb.from('students').select('id', { count: 'exact', head: true }),
    sb.from('professors').select('id', { count: 'exact', head: true }),
    sb.from('classes').select('id', { count: 'exact', head: true }),
    sb.from('absences').select('id', { count: 'exact', head: true }).eq('date', today()).eq('type', 'absence')
  ]);
  const counts = [students, professors, classes, absences];
  counts.forEach(r => { if (r.error) throw r.error; });
  const announces = await rows('announcements', 'id,title,content,published_at', { order: 'published_at', ascending: false, limit: 4 });
  qs('#app').innerHTML = head('Tableau de bord', 'Vue générale de Midori High.') +
    `<div class="grid g4">${statCard('Élèves', students.count ?? 0, '🎓')}${statCard('Professeurs', professors.count ?? 0, '👩‍🏫')}${statCard('Classes', classes.count ?? 0, '🏫')}${statCard('Absences aujourd’hui', absences.count ?? 0, '⏱️')}</div>` +
    `<div class="grid g2" style="margin-top:15px"><div class="hero"><h2>Midori High</h2><p>Une école d’excellence : suivi scolaire, présence, réputation et vie de l’établissement.</p><div class="actions" style="margin-top:16px"><a href="attendance.html" class="btn secondary">📝 Ouvrir une fiche d’appel</a><a href="points.html" class="btn secondary">⭐ Gérer les points</a></div></div><div class="card"><h3 style="margin-bottom:12px">Dernières annonces</h3><div class="list">${announces.map(a => `<div class="item"><div><strong>${esc(a.title)}</strong><span>${dtFR(a.published_at)}</span><p style="margin-top:5px">${esc(String(a.content || '').slice(0, 150))}</p></div></div>`).join('') || '<div class="empty">Aucune annonce.</div>'}</div></div></div>`;
}

async function renderAnnouncements(p) {
  const isAdmin = p.role === 'admin';
  const list = await rows('announcements', '*', { order: 'published_at', ascending: false, limit: 200 });
  qs('#app').innerHTML = head('Annonces', 'Informations officielles de Midori High.') +
    (isAdmin ? `<div class="toolbar"><button id="aa" class="btn primary">+ Nouvelle annonce</button></div>` : '') +
    `<div class="list">${list.map(a => `<article class="card"><div class="toolbar" style="margin-bottom:8px"><div><h3>${esc(a.title)}</h3><span class="muted">${dtFR(a.published_at)} · ${a.published ? 'Publiée' : 'Brouillon'}</span></div>${isAdmin ? `<button class="btn danger small" data-del-ann="${esc(a.id)}">Supprimer</button>` : ''}</div><p style="white-space:pre-wrap">${esc(a.content)}</p></article>`).join('') || '<div class="card empty">Aucune annonce.</div>'}</div>` +
    (isAdmin ? modal('am', 'Nouvelle annonce', `<form id="af" class="form"><div class="field full"><label>Titre</label><input name="title" required></div><div class="field full"><label>Contenu</label><textarea name="content" required></textarea></div><div class="field"><label>État</label><select name="published"><option value="true">Publier</option><option value="false">Brouillon</option></select></div><div class="field full"><button class="btn primary">Enregistrer</button></div></form>`) : '');
  if (isAdmin) {
    qs('#aa').onclick = () => openModal('am');
    closeBindings();
    qs('#af').onsubmit = async e => { e.preventDefault(); const f = new FormData(e.target); try { const r = await add('announcements', { title: f.get('title'), content: f.get('content'), published: f.get('published') === 'true', published_at: new Date().toISOString() }); await log('create', 'announcement', r.id, { title: r.title }); toast('Annonce enregistrée.'); location.reload(); } catch (er) { toast(errMsg(er), 'error'); } };
    qsa('[data-del-ann]').forEach(b => b.onclick = async () => { if (!confirm('⚠️ Supprimer définitivement cette annonce ?\n\nCette action est irréversible.')) return; try { b.disabled=true; b.textContent='Suppression…'; await hardDelete('announcement', b.dataset.delAnn); toast('Annonce supprimée définitivement.'); location.reload(); } catch (er) { b.disabled=false; b.textContent='Supprimer'; toast(errMsg(er), 'error'); } });
  }
}

async function adminCrudPage({ title, sub, table, fields, select = '*', order = 'created_at', searchPlaceholder = 'Rechercher…' }) {
  const list = await rows(table, select, { order, ascending: false });
  const visibleFields=fields.filter(f=>f.table!==false);
  const formFields = fields.map(f => `<div class="field ${f.full ? 'full' : ''}"><label>${esc(f.label)}</label>${f.html}</div>`).join('');
  qs('#app').innerHTML = head(title, sub) + `<div class="toolbar"><input id="search" class="search" placeholder="${esc(searchPlaceholder)}"><button id="addBtn" class="btn primary">+ Ajouter</button></div><div class="card"><div class="table-wrap"><table class="table"><thead><tr>${visibleFields.map(f => `<th>${esc(f.label)}</th>`).join('')}<th>Actions</th></tr></thead><tbody id="rows">${list.map(r => `<tr>${visibleFields.map(f => `<td>${esc(f.display ? f.display(r) : r[f.name] ?? '')}</td>`).join('')}<td><button class="btn secondary small" data-edit="${esc(r.id)}">Modifier</button> <button class="btn danger small" data-del="${esc(r.id)}">Supprimer</button></td></tr>`).join('') || tableEmpty(visibleFields.length + 1)}</tbody></table></div></div>` + modal('genericModal', `Ajouter — ${title}`, `<form id="genericForm" class="form"><input type="hidden" name="__id">${formFields}<div class="field full"><button class="btn primary">Enregistrer</button></div></form>`);
  qs('#addBtn').onclick = () => { qs('#genericForm').reset(); openModal('genericModal'); };
  closeBindings();
  qs('#search').oninput = e => { const q = e.target.value.toLowerCase(); qsa('#rows tr').forEach(tr => tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none'); };
  qsa('[data-del]').forEach(b => b.onclick = async () => { if (!confirm('⚠️ SUPPRESSION DÉFINITIVE\n\nCette suppression efface la ligne et les données directement liées.\n\nCette action est irréversible. Continuer ?')) return; try { b.disabled=true; b.textContent='Suppression…'; await hardDelete(table, b.dataset.del); toast('Supprimé définitivement.'); location.reload(); } catch (er) { b.disabled=false; b.textContent='Supprimer'; toast(errMsg(er), 'error'); } });
  qsa('[data-edit]').forEach(b => b.onclick = () => { const r=list.find(x=>String(x.id)===String(b.dataset.edit)); if(!r)return; const form=qs('#genericForm'); form.reset(); form.elements.__id.value=r.id; fields.forEach(f=>{if(!f.name)return;const el=form.elements[f.name];if(!el)return;if(el.tagName==='SELECT')el.value=String(r[f.name]??'');else if(el.type==='checkbox')el.checked=!!r[f.name];else el.value=r[f.name]??'';}); qs('#genericModal .modal-head h3').textContent=`Modifier — ${title}`; openModal('genericModal'); });
  qs('#genericForm').onsubmit = async e => { e.preventDefault(); const f = new FormData(e.target); try { const obj = {}; fields.forEach(x => { if (x.name) obj[x.name] = x.type === 'number' ? Number(f.get(x.name) || 0) : (f.get(x.name) || null); }); const id=f.get('__id'); const r=id?await update(table,id,obj):await add(table,obj); await log(id?'update':'create', table, r.id, null); toast(id?'Modification enregistrée.':'Enregistré.'); closeModal('genericModal'); location.reload(); } catch (er) { toast(errMsg(er), 'error'); } };
}

async function renderStudents() {
  const classes = await rows('classes', 'id,name', { order: 'name' });
  const list = await rows('students', 'id,username,full_name,class_name,class_id,created_at,rp_status', { order: 'full_name' });
  const classFor = s => s.class_name || classes.find(c => String(c.id) === String(s.class_id))?.name || '—';
  list.sort((a,b) => {
    const ca = classFor(a), cb = classFor(b);
    const ka = String(ca).match(/(\d)/)?.[1] || '9', kb = String(cb).match(/(\d)/)?.[1] || '9';
    return Number(ka) - Number(kb) || new Intl.Collator('fr',{numeric:true,sensitivity:'base'}).compare(ca,cb) || new Intl.Collator('fr',{numeric:true,sensitivity:'base'}).compare(a.full_name||'',b.full_name||'');
  });
  qs('#app').innerHTML = head('Élèves', 'Gestion des élèves, classes et accès.') + `<div class="toolbar class-filter-bar"><input id="ss" class="search" placeholder="Rechercher un élève…"><select id="studentClassFilter" class="search"><option value="">🏫 Toutes les classes</option>${classes.map(c=>`<option value="${esc(c.name)}">${esc(c.name)}</option>`).join('')}</select><button id="addStudent" class="btn primary">+ Ajouter</button></div><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Pseudo</th><th>Nom</th><th>Classe</th><th>Statut RP</th><th>Accès</th><th>Actions</th></tr></thead><tbody id="studentRows">${list.map(s => `<tr><td>${esc(s.username)}</td><td>${esc(s.full_name)}</td><td>${esc(classFor(s))}</td><td>${rpStatusBadge(s.rp_status)}</td><td><a class="btn secondary small" href="access.html?role=student&fiche_id=${encodeURIComponent(s.id)}">Gérer</a></td><td><a class="btn secondary small" href="student-profile.html?id=${esc(s.id)}">Dossier</a> <button class="btn danger small" data-del-student="${esc(s.id)}">Supprimer</button></td></tr>`).join('') || tableEmpty(6)}</tbody></table></div></div>` + modal('sm', 'Nouvel élève', `<form id="sf" class="form"><div class="field"><label>Pseudo Roblox</label><input name="username" required></div><div class="field"><label>Nom complet</label><input name="full_name" required></div><div class="field"><label>Classe</label><select name="class_id">${opts(classes)}</select></div><div class="field full"><button class="btn primary">Créer l’élève</button></div></form>`);
  qs('#addStudent').onclick = () => openModal('sm');
  closeBindings();
  const applyStudentFilters = () => {
    const q = qs('#ss').value.trim().toLowerCase();
    const c = qs('#studentClassFilter').value.trim().toLowerCase();
    qsa('#studentRows tr').forEach(tr => {
      const okSearch = !q || tr.textContent.toLowerCase().includes(q);
      const classCell = (tr.cells[2]?.textContent || '').trim().toLowerCase();
      const okClass = !c || classCell === c;
      tr.style.display = okSearch && okClass ? '' : 'none';
    });
  };
  qs('#ss').oninput = applyStudentFilters;
  qs('#studentClassFilter').onchange = applyStudentFilters;
  qs('#sf').onsubmit = async e => { e.preventDefault(); const f = new FormData(e.target); try { const c = classes.find(x => x.id === f.get('class_id')); const r = await add('students', { username: f.get('username'), full_name: f.get('full_name'), class_id: f.get('class_id') || null, class_name: c?.name || null }); await log('create', 'student', r.id, { username: r.username }); toast('Élève créé.'); location.reload(); } catch (er) { toast(errMsg(er), 'error'); } };
  qsa('[data-del-student]').forEach(b => b.onclick = async () => { if (!confirm('⚠️ SUPPRESSION DÉFINITIVE\n\nCet élève, son profil portail et toutes ses données scolaires/santé/RP liées seront supprimés.\n\nCette action est irréversible. Continuer ?')) return; const second = prompt('Pour confirmer, tapez SUPPRIMER'); if (second !== 'SUPPRIMER') { toast('Suppression annulée.','error'); return; } try { b.disabled=true; b.textContent='Suppression…'; await hardDelete('student', b.dataset.delStudent); toast('Élève supprimé définitivement.'); location.reload(); } catch (er) { b.disabled=false; b.textContent='Supprimer'; toast(errMsg(er), 'error'); } });
}

async function renderStudentProfile(p, asAdmin = false) {
  const id = new URLSearchParams(location.search).get('id') || p.student_id;
  if (!id) { qs('#app').innerHTML = `<div class="card error">Aucun dossier élève n’est lié à ce compte.</div>`; return; }
  const s = await sb.from('students').select('*').eq('id', id).single(); if (s.error) throw s.error;
  const abs = await rows('absences', '*', { order: 'date', ascending: false, limit: 30 });
  const myAbs = abs.filter(a => a.student_id === id);
  const pts = await rows('student_points', 'points,reason,category,created_at,comment,attendance_id', { order: 'created_at', ascending: false, limit: 100 });
  const myPts = pts.filter(x => x.student_id === id);
  const total = myPts.reduce((n, x) => n + Number(x.points || 0), 0);
  qs('#app').innerHTML = head(`Dossier — ${esc(s.data.full_name)}`, 'Informations scolaires et suivi RP.') +
    `<div class="grid g4">${statCard('Classe', s.data.class_name || '—', '🏫')}${statCard('Absences', myAbs.filter(x => x.type === 'absence').length, '⏱️')}${statCard('Retards', myAbs.filter(x => x.type === 'retard').length, '⌛')}${statCard('Réputation', `${total} pts`, '⭐')}${statCard('Statut RP', rpStatusLabel(s.data.rp_status), '🎭')}</div>` +
    `<div class="grid g2" style="margin-top:15px"><div class="card"><h3>Profil</h3><p style="margin-top:10px"><strong>Pseudo :</strong> ${esc(s.data.username)}</p><p><strong>Nom :</strong> ${esc(s.data.full_name)}</p><p><strong>Classe :</strong> ${esc(s.data.class_name || '—')}</p><p><strong>Statut RP :</strong> ${rpStatusBadge(s.data.rp_status)}</p></div><div class="card"><h3>Réputation</h3><p style="margin-top:10px;font-size:22px;font-weight:800">${total} pts</p><p class="muted">${esc(reputation(total))}</p>${pointReference()}</div></div>` +
    `<div class="card" style="margin-top:15px"><h3>Derniers événements de présence</h3><div class="table-wrap" style="margin-top:12px"><table class="table"><thead><tr><th>Date</th><th>Type</th><th>Motif</th><th>Justifié</th></tr></thead><tbody>${myAbs.map(a => `<tr><td>${dateFR(a.date)}</td><td>${badge(a.type)}</td><td>${esc(a.motif || '—')}</td><td>${a.justifie ? 'Oui' : 'Non'}</td></tr>`).join('') || tableEmpty(4)}</tbody></table></div></div>`;
  if (!asAdmin) document.title = `Dossier — ${s.data.full_name}`;
}

async function renderClasses() {
  await adminCrudPage({ title: 'Classes', sub: 'Structure des classes de Midori High.', table: 'classes', fields: [
    { name: 'name', label: 'Nom', html: '<input name="name" required>' },
    { name: 'level', label: 'Niveau', html: '<input name="level" placeholder="1ère / 2ème / 3ème année">' },
    { name: 'section', label: 'Section', html: '<input name="section" placeholder="A / B / C">' }
  ], searchPlaceholder: 'Rechercher une classe…' });
}
async function renderSubjects() {
  await adminCrudPage({ title: 'Matières', sub: 'Matières enseignées au lycée.', table: 'subjects', fields: [
    { name: 'name', label: 'Matière', html: '<input name="name" required>' },
    { name: 'description', label: 'Description', html: '<textarea name="description"></textarea>', full: true }
  ], searchPlaceholder: 'Rechercher une matière…' });
}

async function renderProfessors() {
  const classes = await rows('classes', 'id,name', { order: 'name' });
  const list = await rows('professors', 'id,username,full_name,subject,email,phone,active,note,created_at', { order: 'created_at', ascending: false });
  const links = await rows('professor_classes', 'professor_id,class_id,classes(name)');
  const access = await rows('profiles', 'id,username,role,active', { order: 'username' });
  qs('#app').innerHTML = head('Professeurs', 'Fiches des enseignants et classes prises en charge.') + `<div class="toolbar"><input id="ps" class="search" placeholder="Rechercher un professeur…"><button id="pa" class="btn primary">+ Ajouter</button></div><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Pseudo</th><th>Nom</th><th>Matière</th><th>Classes</th><th>Accès</th><th>Actions</th></tr></thead><tbody id="pr">${list.map(r => { const cs = links.filter(l => l.professor_id === r.id).map(l => l.classes?.name).filter(Boolean); const profAccess = access.find(a => a.username === r.username && a.role === 'professor'); return `<tr><td>${esc(r.username)}</td><td>${esc(r.full_name)}</td><td>${esc(r.subject || '—')}</td><td>${esc(cs.join(', ') || '—')}</td><td>${profAccess ? (profAccess.active ? '<span class="tag">Actif</span>' : '<span class="tag red">Désactivé</span>') : '<span class="tag yellow">Non créé</span>'}</td><td><button class="btn secondary small" data-edit-prof="${esc(r.id)}">Modifier</button> <a class="btn secondary small" href="access.html?role=professor&fiche_id=${encodeURIComponent(r.id)}">Accès</a> <button class="btn danger small" data-del-prof="${esc(r.id)}">Supprimer</button></td></tr>`; }).join('') || tableEmpty(6)}</tbody></table></div></div>` + modal('pm', 'Professeur', `<form id="pf" class="form"><input type="hidden" name="id"><div class="field"><label>Pseudo</label><input name="username" required></div><div class="field"><label>Nom complet</label><input name="full_name" required></div><div class="field"><label>Matière</label><input name="subject"></div><div class="field"><label>E-mail</label><input name="email" type="email"></div><div class="field"><label>Téléphone</label><input name="phone"></div><div class="field"><label>Actif</label><select name="active"><option value="true">Oui</option><option value="false">Non</option></select></div><div class="field full"><label>Classes</label><div class="checkgrid">${classes.map(c => `<label><input type="checkbox" name="class_ids" value="${esc(c.id)}"> ${esc(c.name)}</label>`).join('') || '<span class="muted">Créez d’abord des classes.</span>'}</div></div><div class="field full"><label>Note interne</label><textarea name="note"></textarea></div><div class="field full"><button class="btn primary">Enregistrer</button></div></form>`);
  qs('#pa').onclick = () => { qs('#pf').reset(); qs('#pf [name="id"]').value = ''; qsa('input[name="class_ids"]').forEach(x => x.checked = false); openModal('pm'); };
  closeBindings();
  qs('#ps').oninput = e => { const q = e.target.value.toLowerCase(); qsa('#pr tr').forEach(tr => tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none'); };
  qsa('[data-edit-prof]').forEach(b => b.onclick = () => { const r = list.find(x => x.id === b.dataset.editProf); qs('#pf').reset(); Object.entries({ id: r.id, username: r.username, full_name: r.full_name, subject: r.subject || '', email: r.email || '', phone: r.phone || '', active: String(r.active !== false), note: r.note || '' }).forEach(([k,v]) => { if (qs(`#pf [name="${k}"]`)) qs(`#pf [name="${k}"]`).value = v; }); const ids = links.filter(x => x.professor_id === r.id).map(x => x.class_id); qsa('input[name="class_ids"]').forEach(x => x.checked = ids.includes(x.value)); openModal('pm'); });
  qsa('[data-del-prof]').forEach(b => b.onclick = async () => { if (!confirm('⚠️ SUPPRESSION DÉFINITIVE\n\nCe professeur, son profil portail et toutes ses données liées seront supprimés.\n\nCette action est irréversible. Continuer ?')) return; const second=prompt('Pour confirmer, tapez SUPPRIMER'); if(second!=='SUPPRIMER'){toast('Suppression annulée.','error');return;} try { b.disabled=true; b.textContent='Suppression…'; await hardDelete('professor', b.dataset.delProf); toast('Professeur supprimé définitivement.'); location.reload(); } catch (er) { b.disabled=false; b.textContent='Supprimer'; toast(errMsg(er), 'error'); } });
  qs('#pf').onsubmit = async e => { e.preventDefault(); const f = new FormData(e.target); try { let r; const obj = { username: f.get('username'), full_name: f.get('full_name'), subject: f.get('subject') || null, email: f.get('email') || null, phone: f.get('phone') || null, active: f.get('active') === 'true', note: f.get('note') || null }; if (f.get('id')) r = await update('professors', f.get('id'), obj); else r = await add('professors', obj); const old = links.filter(x => x.professor_id === r.id); for (const x of old) await remove('professor_classes', x.id); for (const cid of f.getAll('class_ids')) await add('professor_classes', { professor_id: r.id, class_id: cid }); await log(f.get('id') ? 'update' : 'create', 'professor', r.id, { username: r.username }); toast('Professeur enregistré.'); location.reload(); } catch (er) { toast(errMsg(er), 'error'); } };
}

async function renderSupervisors() {
  await adminCrudPage({ title: 'Surveillants', sub: 'Gestion des fiches de surveillance.', table: 'supervisors', fields: [
    { name: 'username', label: 'Pseudo', html: '<input name="username" required>' },
    { name: 'full_name', label: 'Nom complet', html: '<input name="full_name" required>' },
    { name: 'email', label: 'E-mail', html: '<input name="email" type="email">' },
    { name: 'phone', label: 'Téléphone', html: '<input name="phone">' },
    { name: 'active', label: 'Actif', html: '<select name="active"><option value="true">Oui</option><option value="false">Non</option></select>' },
    { name: 'note', label: 'Note interne', html: '<textarea name="note"></textarea>', full: true }
  ], searchPlaceholder: 'Rechercher un surveillant…' });
}

async function renderTimetable() {
  const [classes, professors, subjects, list] = await Promise.all([
    rows('classes', 'id,name', { order: 'name' }),
    rows('professors', 'id,full_name,username', { order: 'full_name' }),
    rows('subjects', 'id,name', { order: 'name' }),
    rows('timetable', 'id,class_id,professor_id,subject_id,day_of_week,start_time,end_time,room,classes(name),professors(full_name),subjects(name)', { order: 'day_of_week' })
  ]);
  const days = ['', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  qs('#app').innerHTML = head('Emploi du temps', 'Construisez le planning de Midori High.') + `<div class="toolbar"><input id="ts" class="search" placeholder="Rechercher classe, prof ou matière…"><button id="ta" class="btn primary">+ Ajouter un cours</button></div><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Jour</th><th>Horaire</th><th>Classe</th><th>Professeur</th><th>Matière</th><th>Salle</th><th>Actions</th></tr></thead><tbody id="tr">${list.map(r => `<tr><td>${days[r.day_of_week]}</td><td>${String(r.start_time).slice(0,5)}–${String(r.end_time).slice(0,5)}</td><td>${esc(r.classes?.name || '')}</td><td>${esc(r.professors?.full_name || '')}</td><td>${esc(r.subjects?.name || '')}</td><td>${esc(r.room || '—')}</td><td><button class="btn danger small" data-del-time="${esc(r.id)}">Supprimer</button></td></tr>`).join('') || tableEmpty(7)}</tbody></table></div></div>` + modal('tm', 'Cours', `<form id="tf" class="form"><div class="field"><label>Jour</label><select name="day_of_week" required>${days.slice(1).map((d,i) => `<option value="${i+1}">${d}</option>`).join('')}</select></div><div class="field"><label>Classe</label><select name="class_id" required>${opts(classes)}</select></div><div class="field"><label>Professeur</label><select name="professor_id" required>${opts(professors, 'id', 'full_name')}</select></div><div class="field"><label>Matière</label><select name="subject_id" required>${opts(subjects)}</select></div><div class="field"><label>Début</label><input name="start_time" type="time" required></div><div class="field"><label>Fin</label><input name="end_time" type="time" required></div><div class="field"><label>Salle</label><input name="room"></div><div class="field full"><button class="btn primary">Enregistrer</button></div></form>`);
  qs('#ta').onclick = () => openModal('tm'); closeBindings();
  qs('#ts').oninput = e => { const q = e.target.value.toLowerCase(); qsa('#tr tr').forEach(tr => tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none'); };
  qsa('[data-del-time]').forEach(b => b.onclick = async () => { if (!confirm('⚠️ Supprimer définitivement ce cours et ses feuilles d’appel liées ?\n\nCette action est irréversible.')) return; try { b.disabled=true; b.textContent='Suppression…'; await hardDelete('timetable', b.dataset.delTime); toast('Cours supprimé définitivement.'); location.reload(); } catch (er) { b.disabled=false; b.textContent='Supprimer'; toast(errMsg(er), 'error'); } });
  qs('#tf').onsubmit = async e => { e.preventDefault(); const f = new FormData(e.target); try { const r = await add('timetable', { class_id: f.get('class_id'), professor_id: f.get('professor_id'), subject_id: f.get('subject_id'), day_of_week: Number(f.get('day_of_week')), start_time: f.get('start_time'), end_time: f.get('end_time'), room: f.get('room') || null }); await log('create', 'timetable', r.id, null); toast('Cours ajouté.'); location.reload(); } catch (er) { toast(errMsg(er), 'error'); } };
}

async function findLinkedRow(table, p, linkField, label) {
  // 1) Liaison officielle par ID stocké dans profiles.
  if (p?.[linkField]) {
    const linked = await sb.from(table).select('*').eq('id', p[linkField]).maybeSingle();
    if (linked.error) throw linked.error;
    if (linked.data) return linked.data;
  }

  // 2) Secours : identifiant portail / pseudo, sans tenir compte des majuscules.
  const username = String(p?.username || '').trim();
  if (username) {
    const byUsername = await sb.from(table).select('*').ilike('username', username).maybeSingle();
    if (byUsername.error) throw byUsername.error;
    if (byUsername.data) return byUsername.data;
  }

  // 3) Secours : e-mail si la fiche du personnel en possède un.
  const email = String(p?.email || '').trim().toLowerCase();
  if (email && ['professors'].includes(table)) {
    const byEmail = await sb.from(table).select('*').ilike('email', email).maybeSingle();
    if (byEmail.error) throw byEmail.error;
    if (byEmail.data) return byEmail.data;
  }

  // 4) Dernier secours : nom complet exact, utile pour les anciens comptes.
  const fullName = String(p?.full_name || '').trim();
  if (fullName) {
    const byName = await sb.from(table).select('*').ilike('full_name', fullName).maybeSingle();
    if (byName.error) throw byName.error;
    if (byName.data) return byName.data;
  }

  throw new Error(`Aucune fiche ${label} ne correspond à cet accès. Vérifiez que le compte portail est bien relié à une fiche ${label}.`);
}

async function professorRow(p) {
  return findLinkedRow('professors', p, 'professor_id', 'professeur');
}

async function supervisorRow(p) {
  return findLinkedRow('supervisors', p, 'supervisor_id', 'surveillant');
}

async function professorClasses(profId) {
  return rows('professor_classes', 'class_id,classes(id,name)', { order: 'created_at' }).then(x => x.filter(a => a.class_id).filter(a => a.classes));
}

async function renderAttendance(p, profOnly = false) {
  const courses = await rows('timetable', 'id,class_id,professor_id,subject_id,day_of_week,start_time,end_time,room,classes(name),professors(full_name,username),subjects(name)', { order: 'day_of_week' });
  let currentProf = null;
  if (p.role === 'professor' || profOnly) currentProf = await professorRow(p);
  const allowedCourses = currentProf ? courses.filter(c => c.professor_id === currentProf.id) : courses;
  const initialDate = today();
  qs('#app').innerHTML = head('Fiches d’appel', p.role === 'professor' ? 'Faites l’appel de vos cours.' : 'Suivi des présences par cours et par date.') +
    `<div class="card"><div class="form"><div class="field"><label>Date</label><input id="attDate" type="date" value="${initialDate}"></div><div class="field"><label>Cours</label><select id="attCourse">${allowedCourses.length ? opts(allowedCourses.map(c => ({ id: c.id, name: `${['','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'][c.day_of_week]} · ${String(c.start_time).slice(0,5)}–${String(c.end_time).slice(0,5)} · ${c.classes?.name || ''} · ${c.subjects?.name || ''}` }))) : '<option value="">Aucun cours configuré</option>'}</select></div></div><div id="courseInfo" class="notice" style="margin-top:12px">Sélectionnez un cours.</div></div><div id="attBox" style="margin-top:15px"></div>`;
  const courseSelect = qs('#attCourse'); const dateInput = qs('#attDate');
  const load = async () => {
    const course = allowedCourses.find(c => c.id === courseSelect.value);
    if (!course) { qs('#courseInfo').innerHTML = 'Aucun cours disponible pour cette date. Configurez d’abord l’emploi du temps.'; qs('#attBox').innerHTML = ''; return; }
    const dayExpected = course.day_of_week;
    const selectedDay = new Date(`${dateInput.value}T00:00:00`).getDay() || 7;
    if (selectedDay !== dayExpected) qs('#courseInfo').innerHTML = `<strong>${esc(course.subjects?.name || '')}</strong> · ${esc(course.classes?.name || '')} · ${String(course.start_time).slice(0,5)}–${String(course.end_time).slice(0,5)}<br><span class="muted">Attention : ce cours est normalement prévu le ${['','lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'][dayExpected]}.</span>`;
    else qs('#courseInfo').innerHTML = `<strong>${esc(course.subjects?.name || '')}</strong> · ${esc(course.classes?.name || '')} · ${String(course.start_time).slice(0,5)}–${String(course.end_time).slice(0,5)} · Salle ${esc(course.room || '—')}`;
    const students = await rows('students', 'id,username,full_name,class_name,rp_status', { order: 'full_name' });
    const inClass = students.filter(s => s.class_id === course.class_id || s.class_name === course.classes?.name);
    const att = await sb.from('attendance').select('*').eq('timetable_id', course.id).eq('date', dateInput.value); if (att.error) throw att.error;
    const map = new Map((att.data || []).map(a => [a.student_id, a]));
    qs('#attBox').innerHTML = `<div class="card"><div class="toolbar"><div><strong>${inClass.length}</strong> élève(s)</div><button id="saveAtt" class="btn primary">Enregistrer l’appel</button></div><div class="table-wrap"><table class="table"><thead><tr><th>Élève</th><th>Statut</th><th>Heure d’arrivée</th><th>Motif</th><th>Commentaire</th></tr></thead><tbody>${inClass.map(s => { const a = map.get(s.id); return `<tr class="att-row" data-student="${esc(s.id)}"><td><strong>${esc(s.full_name)}</strong><span>${esc(s.username)}</span><span>${rpStatusBadge(s.rp_status)}</span></td><td><select class="att-status"><option value="present" ${!a || a.status === 'present' ? 'selected' : ''}>Présent</option><option value="absent" ${a?.status === 'absent' ? 'selected' : ''}>Absent</option><option value="retard" ${a?.status === 'retard' ? 'selected' : ''}>Retard</option></select></td><td><input class="att-arrival" type="time" value="${esc(a?.arrival_time || '')}"></td><td><input class="att-reason" value="${esc(a?.reason || '')}" placeholder="Motif"></td><td><input class="att-comment" value="${esc(a?.comment || '')}" placeholder="Note RP"></td></tr>`; }).join('') || tableEmpty(5, 'Aucun élève dans cette classe.')}</tbody></table></div></div>`;
    qs('#saveAtt').onclick = async () => {
      const b = qs('#saveAtt'); b.disabled = true; b.textContent = 'Enregistrement…';
      try {
        for (const row of qsa('.att-row')) {
          const studentId = row.dataset.student; const status = row.querySelector('.att-status').value; const arrival = row.querySelector('.att-arrival').value || null; const reason = row.querySelector('.att-reason').value.trim() || null; const comment = row.querySelector('.att-comment').value.trim() || null;
          const r = await sb.rpc('save_attendance', { p_timetable_id: course.id, p_student_id: studentId, p_date: dateInput.value, p_status: status, p_arrival_time: status === 'retard' ? arrival : null, p_reason: status === 'absent' ? reason : null, p_comment: comment, p_justified: false });
          if (r.error) throw r.error;
        }
        toast('Fiche d’appel enregistrée.');
        await log('update', 'attendance', null, { timetable_id: course.id, date: dateInput.value });
        await load();
      } catch (er) { toast(errMsg(er), 'error'); } finally { b.disabled = false; b.textContent = 'Enregistrer l’appel'; }
    };
  };
  const refreshCoursesForDate = () => { const selectedDay = new Date(`${dateInput.value}T00:00:00`).getDay() || 7; const c = allowedCourses.filter(x => x.day_of_week === selectedDay); courseSelect.innerHTML = c.length ? opts(c.map(x => ({ id: x.id, name: `${String(x.start_time).slice(0,5)}–${String(x.end_time).slice(0,5)} · ${x.classes?.name || ''} · ${x.subjects?.name || ''}` }))) : '<option value="">Aucun cours ce jour</option>'; load(); };
  dateInput.onchange = refreshCoursesForDate;
  courseSelect.onchange = load;
  refreshCoursesForDate();
}

async function renderAbsences(p) {
  const list = await rows('absences', 'id,student_id,attendance_id,date,type,heure_arrivee,motif,justifie,created_at,students(full_name,class_name,username,rp_status)', { order: 'date', ascending: false, limit: 500 });
  qs('#app').innerHTML = head('Absences', 'Vue globale des absences et retards.') + `<div class="toolbar"><input id="as" class="search" placeholder="Rechercher un élève…"><select id="afilter" class="search" style="min-width:170px"><option value="">Tous</option><option value="absence">Absences</option><option value="retard">Retards</option><option value="nonjust">Non justifiées</option></select></div><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Élève</th><th>Classe</th><th>Date</th><th>Type</th><th>Heure</th><th>Motif</th><th>Justifié</th><th>Action</th></tr></thead><tbody id="arows">${list.map(r => `<tr data-type="${esc(r.type)}" data-just="${r.justifie ? 'yes' : 'no'}"><td>${esc(r.students?.full_name || '')}<span>${esc(r.students?.username || '')}</span><span>${rpStatusBadge(r.students?.rp_status)}</span></td><td>${esc(r.students?.class_name || '')}</td><td>${dateFR(r.date)}</td><td>${r.type === 'absence' ? '<span class="tag red">Absence</span>' : '<span class="tag yellow">Retard</span>'}</td><td>${esc(r.heure_arrivee ? String(r.heure_arrivee).slice(0,5) : '—')}</td><td>${esc(r.motif || '—')}</td><td>${r.justifie ? '<span class="tag">Oui</span>' : '<span class="tag red">Non</span>'}</td><td>${(p.role === 'admin' || p.role === 'surveillant') ? `<button class="btn secondary small" data-justify="${esc(r.id)}">${r.justifie ? 'Retirer' : 'Justifier'}</button>` : '—'}</td></tr>`).join('') || tableEmpty(8)}</tbody></table></div></div>`;
  qs('#as').oninput = e => filterAbs(e.target.value, qs('#afilter').value); qs('#afilter').onchange = e => filterAbs(qs('#as').value, e.target.value);
  function filterAbs(search, filter) { const q = search.toLowerCase(); qsa('#arows tr').forEach(tr => { const text = tr.textContent.toLowerCase(); const okText = !q || text.includes(q); const okFilter = !filter || (filter === 'nonjust' ? tr.dataset.just === 'no' : tr.dataset.type === filter); tr.style.display = okText && okFilter ? '' : 'none'; }); }
  qsa('[data-justify]').forEach(b => b.onclick = async () => { try { const id = b.dataset.justify; const target = list.find(x => x.id === id); await update('absences', id, { justifie: !target.justifie }); if (target.attendance_id) await sb.from('attendance').update({ justified: !target.justifie }).eq('id', target.attendance_id); await log('update', 'absence', id, { justifie: !target.justifie }); toast(target.justifie ? 'Justification retirée.' : 'Absence justifiée.'); location.reload(); } catch (er) { toast(errMsg(er), 'error'); } });
}

async function renderGrades(p, restricted = false) {
  const subjects = await rows('subjects', 'id,name', { order: 'name' });
  const students = await rows('students', 'id,full_name,username,class_id,class_name', { order: 'full_name' });
  let prof = null; if (p.role === 'professor' || restricted) prof = await professorRow(p);
  const list = await rows('grades', 'id,student_id,professor_id,subject_id,value,coefficient,label,comment,grade_date,created_at,students(full_name,class_name,rp_status),subjects(name),professors(full_name)', { order: 'grade_date', ascending: false, limit: 500 });
  let visible = prof ? list.filter(g => g.professor_id === prof.id) : list;
  if (p.role === 'student') visible = list.filter(g => g.student_id === p.student_id);
  const form = p.role === 'admin' || p.role === 'professor';
  qs('#app').innerHTML = head('Notes', p.role === 'student' ? 'Votre relevé de notes.' : 'Gestion des évaluations scolaires.') + (form ? `<div class="toolbar"><button id="ga" class="btn primary">+ Ajouter une note</button></div>` : '') +
    `<div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Élève</th><th>Matière</th><th>Note</th><th>Coefficient</th><th>Évaluation</th><th>Date</th><th>Professeur</th></tr></thead><tbody>${visible.map(g => `<tr><td>${esc(g.students?.full_name || '')}<span>${esc(g.students?.class_name || '')}</span><span>${rpStatusBadge(g.students?.rp_status)}</span></td><td>${esc(g.subjects?.name || '')}</td><td><strong>${g.value == null ? '—' : Number(g.value).toFixed(2) + '/20'}</strong></td><td>${esc(g.coefficient ?? 1)}</td><td>${esc(g.label || '—')}</td><td>${dateFR(g.grade_date)}</td><td>${esc(g.professors?.full_name || '—')}</td></tr>`).join('') || tableEmpty(7)}</tbody></table></div></div>` +
    (form ? modal('gm', 'Ajouter une note', `<form id="gf" class="form"><div class="field full"><label>Élève</label><select name="student_id" required>${opts(students, 'id', 'full_name')}</select></div><div class="field"><label>Matière</label><select name="subject_id" required>${opts(subjects)}</select></div><div class="field"><label>Note /20</label><input name="value" type="number" min="0" max="20" step="0.01" required></div><div class="field"><label>Coefficient</label><input name="coefficient" type="number" min="0.1" step="0.1" value="1" required></div><div class="field"><label>Évaluation</label><input name="label" placeholder="Contrôle, examen, oral…"></div><div class="field"><label>Date</label><input name="grade_date" type="date" value="${today()}" required></div><div class="field full"><label>Commentaire</label><textarea name="comment"></textarea></div><div class="field full"><button class="btn primary">Enregistrer</button></div></form>`) : '');
  if (form) { qs('#ga').onclick = () => openModal('gm'); closeBindings(); qs('#gf').onsubmit = async e => { e.preventDefault(); const f = new FormData(e.target); try { const professor_id = p.role === 'professor' ? (await professorRow(p)).id : null; if (p.role === 'professor' && !professor_id) throw new Error('Professeur introuvable.'); const r = await add('grades', { student_id: f.get('student_id'), subject_id: f.get('subject_id'), professor_id, value: Number(f.get('value')), coefficient: Number(f.get('coefficient') || 1), label: f.get('label') || null, comment: f.get('comment') || null, grade_date: f.get('grade_date') }); await log('create', 'grade', r.id, { value: r.value }); toast('Note enregistrée.'); location.reload(); } catch (er) { toast(errMsg(er), 'error'); } }; }
}

async function renderHomework(p, restricted = false) {
  const subjects = await rows('subjects', 'id,name', { order:'name' });
  const classes = await rows('classes', 'id,name', { order:'name' });
  const students = await rows('students', 'id,class_id,full_name');
  let prof = null;
  if (p.role === 'professor' || restricted) prof = await professorRow(p);
  const list = await rows('homework', 'id,class_id,professor_id,subject_id,title,description,due_date,attachment_url,published,created_at,classes(name),subjects(name),professors(full_name)', { order:'due_date', ascending:true, limit:300 });
  let visible = list;
  if (prof) visible = list.filter(x => x.professor_id === prof.id);
  if (p.role === 'student') visible = list.filter(x => students.find(s => s.id === p.student_id && s.class_id === x.class_id));

  let submissions = [];
  if (p.role === 'student') {
    const sr = await sb.from('homework_submissions').select('id,homework_id,submitted_at,status,note').eq('student_id',p.student_id).order('submitted_at',{ascending:false});
    if (sr.error) throw sr.error;
    submissions = sr.data || [];
  } else if (visible.length) {
    const sr = await sb.from('homework_submissions').select('id,homework_id').in('homework_id', visible.map(x=>x.id));
    if (sr.error) throw sr.error;
    submissions = sr.data || [];
  }
  const subCounts = new Map();
  submissions.forEach(x=>subCounts.set(x.homework_id,(subCounts.get(x.homework_id)||0)+1));
  const latestSubmission = new Map();
  submissions.filter(x=>x.submitted_at).forEach(x=>{ if(!latestSubmission.has(x.homework_id)) latestSubmission.set(x.homework_id,x); });

  let directory = [];
  if (p.role === 'student') directory = await messageDirectory();
  const professorRecipientByRow = new Map(directory.filter(x=>x.professor_id).map(x=>[x.professor_id,x]));
  const canCreate = p.role === 'admin' || p.role === 'professor';
  const now = new Date();
  qs('#app').innerHTML = head(p.role === 'student' ? 'Mes devoirs' : 'Devoirs', 'Travail à effectuer et suivi des classes.') +
    (canCreate ? `<div class="toolbar"><button id="ha" class="btn primary">+ Nouveau devoir</button></div>` : '') +
    `<div class="list">${visible.map(x => {
      const latest = latestSubmission.get(x.id);
      const rec = p.role === 'student' ? professorRecipientByRow.get(x.professor_id) : null;
      const due = x.due_date ? new Date(`${x.due_date}T23:59:59`) : null;
      const overdue = due && now > due;
      return `<article class="card"><div class="toolbar"><div><h3>${esc(x.title)}</h3><span class="muted">${esc(x.classes?.name || '')} · ${esc(x.subjects?.name || '')} · À rendre le ${dateFR(x.due_date)}</span></div><div class="actions">${x.attachment_url ? `<a class="btn secondary small" href="${esc(x.attachment_url)}" target="_blank">Ouvrir le document</a>` : ''}${canCreate ? `<a class="btn secondary small" href="homework-submissions.html?id=${esc(x.id)}">📥 ${subCounts.get(x.id)||0} rendu(s)</a>` : (rec ? `<button class="btn primary small" data-submit-homework="${esc(x.id)}">📤 Rendre le devoir</button>` : '')}</div></div><p style="white-space:pre-wrap">${esc(x.description || '')}</p><div class="muted" style="margin-top:9px">${x.professors?.full_name ? `Professeur : ${esc(x.professors.full_name)}` : ''}${p.role==='student' && latest ? ` · Dernier envoi : ${dtFR(latest.submitted_at)} · <strong>${esc(latest.status || (overdue ? 'En retard' : 'Envoyé'))}</strong>` : ''}</div>${p.role==='student' && !rec ? `<div class="notice" style="margin-top:12px">⚠️ Aucun professeur n’est associé à ce devoir. Contactez l’administration.</div>` : ''}</article>`;
    }).join('') || '<div class="card empty">Aucun devoir.</div>'}</div>` +
    (canCreate ? modal('hm', 'Nouveau devoir', `<form id="hf" class="form"><div class="field"><label>Titre</label><input name="title" required></div><div class="field"><label>Classe</label><select name="class_id" required>${opts(classes)}</select></div><div class="field"><label>Matière</label><select name="subject_id" required>${opts(subjects)}</select></div><div class="field"><label>Date limite</label><input name="due_date" type="date" required></div><div class="field full"><label>Lien de document</label><input name="attachment_url" type="url"></div><div class="field full"><label>Description</label><textarea name="description"></textarea></div><div class="field"><label>Publié</label><select name="published"><option value="true">Oui</option><option value="false">Non</option></select></div><div class="field full"><button class="btn primary">Enregistrer</button></div></form>`) : '') +
    (p.role === 'student' ? modal('hsm','Rendre un devoir',`<form id="hsf" class="form"><input type="hidden" name="homework_id"><div class="field full"><label>Commentaire au professeur</label><textarea name="note" placeholder="Bonjour, voici mon devoir…"></textarea></div><div class="field full"><label>Fichier(s) <span class="muted">3 maximum, 10 Mo chacun</span></label><input name="files" type="file" multiple required></div><div class="field full"><button class="btn primary">📤 Envoyer mon devoir</button></div></form>`) : '');

  if (canCreate) {
    qs('#ha').onclick=()=>openModal('hm'); closeBindings();
    qs('#hf').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target);try{let professor_id=null;if(p.role==='professor')professor_id=prof.id;const r=await add('homework',{class_id:f.get('class_id'),subject_id:f.get('subject_id'),professor_id,title:f.get('title'),description:f.get('description')||null,due_date:f.get('due_date'),attachment_url:f.get('attachment_url')||null,published:f.get('published')==='true'});await log('create','homework',r.id,null);toast('Devoir enregistré.');location.reload()}catch(er){toast(errMsg(er),'error')}};
  }
  if(p.role==='student'){
    qsa('[data-submit-homework]').forEach(b=>b.onclick=()=>{const hw=visible.find(x=>x.id===b.dataset.submitHomework);const rec=professorRecipientByRow.get(hw?.professor_id);if(!hw||!rec){toast('Professeur introuvable pour ce devoir.','error');return;}qs('#hsf [name="homework_id"]').value=hw.id;qs('#hsf [name="files"]').value='';qs('#hsf [name="note"]').value='';openModal('hsm');closeBindings();});
    qs('#hsf').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target);const hw=visible.find(x=>x.id===f.get('homework_id'));if(!hw)return;const rec=professorRecipientByRow.get(hw.professor_id);const files=Array.from(e.target.querySelector('[name="files"]').files||[]);if(!files.length){toast('Ajoutez au moins un fichier.','error');return;}if(files.length>3){toast('Maximum 3 fichiers.','error');return;}try{const due=hw.due_date?new Date(`${hw.due_date}T23:59:59`):null;const status=due&&new Date()>due?'En retard':'Envoyé';const subject=`Remise de devoir — ${hw.title}`;const body=(f.get('note')||`Bonjour, je vous transmets mon devoir « ${hw.title} ».`) + `

Remise automatique via le portail Midori High.`;const m=await sendInternalMessage({recipientId:rec.id,subject,body,files,homeworkId:hw.id});const r=await add('homework_submissions',{homework_id:hw.id,student_id:p.student_id,message_id:m.id,status,note:f.get('note')||null});await log('create','homework_submission',r.id,{homework_id:hw.id});toast('Votre devoir a été envoyé au professeur.');closeModal('hsm');location.reload()}catch(er){toast(errMsg(er),'error')}};
  }
}

async function renderPoints() {
  const students = await rows('students', 'id,full_name,username,class_name,rp_status', { order: 'full_name' });
  const pts = await rows('student_points', 'id,student_id,points,reason,category,created_by,comment,created_at', { order: 'created_at', ascending: false, limit: 1000 });
  const totals = students.map(s => ({ ...s, total: pts.filter(p => p.student_id === s.id).reduce((a, b) => a + Number(b.points || 0), 0) }));
  const rules = { 'Bonne action': 3, 'Respect du personnel': 4, 'Présence en cours': 5, 'Participation / réussite aux examens': 7, 'Prise en charge d’une situation': 10, 'Participation à un club': 12, 'Signalement d’un élève perturbateur': 2, 'Mauvaise action': -4, 'Absence': -7, 'Manque de respect envers le personnel': -6, 'Bagarre': -15, 'Dégradation': -15 };
  qs('#app').innerHTML = head('Points / Réputation', 'Barème RP centralisé des élèves.') + pointReference() + `<div class="toolbar" style="margin-top:14px"><input id="ptsSearch" class="search" placeholder="Rechercher un élève…"><button id="pta" class="btn primary">+ Ajouter / retirer des points</button></div><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Élève</th><th>Classe</th><th>Total</th><th>Réputation</th><th>Actions</th></tr></thead><tbody id="ptr">${totals.map(s => `<tr><td>${esc(s.full_name)}<span>${esc(s.username)}</span><span>${rpStatusBadge(s.rp_status)}</span></td><td>${esc(s.class_name || '—')}</td><td><strong>${s.total}</strong></td><td>${badge(reputation(s.total))}</td><td><a class="btn secondary small" href="student-profile.html?id=${esc(s.id)}">Dossier</a></td></tr>`).join('') || tableEmpty(5)}</tbody></table></div></div><div class="card" style="margin-top:15px"><h3>Derniers mouvements</h3><div class="table-wrap" style="margin-top:10px"><table class="table"><thead><tr><th>Date</th><th>Élève</th><th>Points</th><th>Motif</th><th>Auteur</th><th>Commentaire</th></tr></thead><tbody>${pts.slice(0, 100).map(x => `<tr><td>${dtFR(x.created_at)}</td><td>${esc(students.find(s => s.id === x.student_id)?.full_name || '')}</td><td><strong>${Number(x.points) > 0 ? '+' : ''}${Number(x.points)}</strong></td><td>${esc(x.reason)}</td><td>${esc(x.created_by || '—')}</td><td>${esc(x.comment || '—')}</td></tr>`).join('') || tableEmpty(6)}</tbody></table></div></div>` + modal('ptm', 'Points', `<form id="ptf" class="form"><div class="field full"><label>Élève</label><select name="student_id" required>${opts(students, 'id', 'full_name')}</select></div><div class="field"><label>Règle</label><select id="ruleSelect"><option value="">— Choisir un barème —</option>${Object.entries(rules).map(([k,v]) => `<option value="${esc(k)}" data-points="${v}">${esc(k)} (${v > 0 ? '+' : ''}${v})</option>`).join('')}<option value="custom">Personnalisé</option></select></div><div class="field"><label>Points</label><input id="pointValue" name="points" type="number" step="1" required></div><div class="field"><label>Catégorie</label><select name="category"><option value="bonus">Bonus</option><option value="malus">Malus</option></select></div><div class="field"><label>Motif</label><input id="pointReason" name="reason" required></div><div class="field full"><label>Commentaire</label><textarea name="comment"></textarea></div><div class="field full"><button class="btn primary">Enregistrer</button></div></form>`);
  qs('#ptsSearch').oninput = e => { const q = e.target.value.toLowerCase(); qsa('#ptr tr').forEach(tr => tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none'); };
  qs('#pta').onclick = () => openModal('ptm'); closeBindings();
  qs('#ruleSelect').onchange = e => { const option = e.target.selectedOptions[0]; if (e.target.value === 'custom') return; qs('#pointValue').value = option?.dataset.points || ''; qs('#pointReason').value = e.target.value || ''; if (Number(qs('#pointValue').value) < 0) qs('#ptf [name="category"]').value = 'malus'; else qs('#ptf [name="category"]').value = 'bonus'; };
  qs('#ptf').onsubmit = async e => { e.preventDefault(); const f = new FormData(e.target); try { const n = Number(f.get('points')); if (!Number.isFinite(n)) throw new Error('Nombre de points invalide.'); const r = await add('student_points', { student_id: f.get('student_id'), points: n, reason: f.get('reason'), category: f.get('category'), created_by: (await currentUser())?.email || 'Administration', comment: f.get('comment') || null }); await log('create', 'student_points', r.id, { points: n, reason: r.reason }); toast('Points enregistrés.'); location.reload(); } catch (er) { toast(errMsg(er), 'error'); } };
}

async function renderDiscipline(p) {
  const students = await rows('students', 'id,full_name,class_name', { order: 'full_name' });
  const list = await rows('sanctions', 'id,student_id,supervisor_id,date,category,reason,points_delta,duration,status,created_at,students(full_name,class_name,rp_status),supervisors(full_name)', { order: 'date', ascending: false, limit: 500 });
  const canCreate = p.role === 'admin' || p.role === 'surveillant';
  const supervisor = p.role === 'surveillant' ? await supervisorRow(p) : null;
  const visible = p.role === 'surveillant' ? list.filter(x => x.supervisor_id === supervisor.id) : list;
  qs('#app').innerHTML = head('Discipline', 'Sanctions, comportements et suivi RP.') +
    (canCreate ? `<div class="toolbar"><button id="dna" class="btn primary">+ Nouvelle sanction</button></div>` : '') +
    `<div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Élève</th><th>Catégorie</th><th>Motif</th><th>Points</th><th>Durée</th><th>Statut</th><th>Par</th></tr></thead><tbody>${visible.map(x => `<tr><td>${dateFR(x.date)}</td><td>${esc(x.students?.full_name || '')}<span>${esc(x.students?.class_name || '')}</span><span>${rpStatusBadge(x.students?.rp_status)}</span></td><td>${esc(x.category)}</td><td>${esc(x.reason)}</td><td>${Number(x.points_delta || 0)}</td><td>${esc(x.duration || '—')}</td><td>${badge(x.status)}</td><td>${esc(x.supervisors?.full_name || 'Administration')}</td></tr>`).join('') || tableEmpty(8)}</tbody></table></div></div>` +
    (canCreate ? modal('dm', 'Nouvelle sanction', `<form id="df" class="form"><div class="field full"><label>Élève</label><select name="student_id" required>${opts(students, 'id', 'full_name')}</select></div><div class="field"><label>Catégorie</label><input name="category" required placeholder="Comportement, bagarre…"></div><div class="field"><label>Date</label><input name="date" type="date" value="${today()}" required></div><div class="field"><label>Points</label><input name="points_delta" type="number" value="0"></div><div class="field"><label>Durée</label><input name="duration"></div><div class="field"><label>Statut</label><select name="status"><option>Enregistrée</option><option>En cours</option><option>Terminée</option></select></div><div class="field full"><label>Motif</label><textarea name="reason" required></textarea></div><div class="field full"><button class="btn primary">Enregistrer</button></div></form>`) : '');
  if (canCreate) {
    qs('#dna').onclick = () => openModal('dm');
    closeBindings();
    qs('#df').onsubmit = async e => {
      e.preventDefault();
      const f = new FormData(e.target);
      try {
        const r = await add('sanctions', {
          student_id: f.get('student_id'), supervisor_id: supervisor?.id || null,
          date: f.get('date'), category: f.get('category'), reason: f.get('reason'),
          points_delta: Number(f.get('points_delta') || 0), duration: f.get('duration') || null,
          status: f.get('status')
        });
        const delta = Number(r.points_delta || 0);
        if (delta) {
          await add('student_points', {
            student_id: r.student_id, points: delta, reason: `Sanction — ${r.category}`,
            category: delta < 0 ? 'malus' : 'bonus',
            created_by: (await currentUser())?.email || ROLE_LABEL[p.role], comment: r.reason
          });
        }
        await log('create', 'sanction', r.id, null);
        toast('Sanction enregistrée.');
        location.reload();
      } catch (er) { toast(errMsg(er), 'error'); }
    };
  }
}


async function renderEvents(p) {
  const isAdmin = p.role === 'admin';
  const list = await rows('school_events', 'id,title,description,event_date,start_time,end_time,location,event_type,created_by,created_at', { order: 'event_date', ascending: true, limit: 500 });
  qs('#app').innerHTML = head('Calendrier RP', 'Événements scolaires, clubs et moments importants de Midori High.') +
    (isAdmin ? `<div class="toolbar"><button id="ea" class="btn primary">+ Ajouter un événement</button></div>` : '') +
    `<div class="list">${list.map(x => `<article class="card"><div class="toolbar"><div><h3>${esc(x.title)}</h3><span class="muted">${dateFR(x.event_date)}${x.start_time ? ` · ${String(x.start_time).slice(0,5)}` : ''}${x.end_time ? `–${String(x.end_time).slice(0,5)}` : ''} · ${esc(x.event_type || 'Événement')}</span></div><div class="actions">${x.location ? badge(x.location) : ''}${isAdmin ? `<button class="btn danger small" data-del-event="${esc(x.id)}">Supprimer</button>` : ''}</div></div><p style="white-space:pre-wrap">${esc(x.description || '')}</p></article>`).join('') || '<div class="card empty">Aucun événement programmé.</div>'}</div>` +
    (isAdmin ? modal('em', 'Nouvel événement', `<form id="ef" class="form"><div class="field"><label>Titre</label><input name="title" required></div><div class="field"><label>Type</label><select name="event_type"><option>Événement scolaire</option><option>Club</option><option>Cérémonie</option><option>Examen</option><option>Sortie</option><option>RP libre</option></select></div><div class="field"><label>Date</label><input name="event_date" type="date" value="${today()}" required></div><div class="field"><label>Début</label><input name="start_time" type="time"></div><div class="field"><label>Fin</label><input name="end_time" type="time"></div><div class="field full"><label>Lieu</label><input name="location" placeholder="Gymnase, scène, ville…"></div><div class="field full"><label>Description</label><textarea name="description"></textarea></div><div class="field full"><button class="btn primary">Enregistrer</button></div></form>`) : '');
  if (isAdmin) {
    qs('#ea').onclick = () => openModal('em');
    closeBindings();
    qs('#ef').onsubmit = async e => {
      e.preventDefault();
      const f = new FormData(e.target);
      try {
        const u = await currentUser();
        const r = await add('school_events', { title: f.get('title'), description: f.get('description') || null, event_date: f.get('event_date'), start_time: f.get('start_time') || null, end_time: f.get('end_time') || null, location: f.get('location') || null, event_type: f.get('event_type'), created_by: u?.id || null });
        await log('create', 'school_event', r.id, null);
        toast('Événement ajouté.');
        location.reload();
      } catch (er) { toast(errMsg(er), 'error'); }
    };
    qsa('[data-del-event]').forEach(b => b.onclick = async () => {
      if (!confirm('Supprimer cet événement ?')) return;
      try { await hardDelete('school_event', b.dataset.delEvent); toast('Événement supprimé définitivement.'); location.reload(); }
      catch (er) { toast(errMsg(er), 'error'); }
    });
  }
}

async function renderAdminClubs() {
  const [list, students, requests, members] = await Promise.all([
    rows('clubs', '*', { order: 'created_at', ascending: false }),
    rows('students', 'id,full_name,username', { order: 'full_name' }),
    rows('club_requests', 'id,club_id,student_id,message,status,created_at,clubs(name),students(full_name,class_name,username,rp_status)', { order: 'created_at', ascending: false, limit: 300 }),
    rows('club_members', 'id,club_id,student_id,role,joined_at,clubs(name),students(full_name,class_name,username,rp_status)', { order: 'joined_at', ascending: false, limit: 500 })
  ]);
  qs('#app').innerHTML = head('Clubs', 'Vie scolaire, présidence, candidatures et membres.') +
    `<div class="toolbar"><button id="ca" class="btn primary">+ Créer un club</button></div>` +
    `<div class="list">${list.map(c => `<div class="card"><div class="toolbar"><div><h3>${esc(c.name)}</h3><span class="muted">${esc(c.status)} · président : ${esc(students.find(s => s.id === c.president_student_id)?.full_name || 'non défini')}</span></div><button class="btn danger small" data-del-club="${esc(c.id)}">Supprimer</button></div><p>${esc(c.description || '')}</p><div class="muted" style="margin-top:9px">${members.filter(m=>m.club_id===c.id).length} membre(s) · ${requests.filter(r=>r.club_id===c.id && r.status==='En attente').length} candidature(s) en attente</div></div>`).join('') || '<div class="card empty">Aucun club.</div>'}</div>` +
    `<div class="card" style="margin-top:15px"><h3>Candidatures</h3><div class="table-wrap" style="margin-top:10px"><table class="table"><thead><tr><th>Date</th><th>Élève</th><th>Club</th><th>Message</th><th>Statut</th><th>Action</th></tr></thead><tbody>${requests.map(r=>`<tr><td>${dtFR(r.created_at)}</td><td>${esc(r.students?.full_name||'')}<span>${esc(r.students?.class_name||'')}</span><span>${rpStatusBadge(r.students?.rp_status)}</span></td><td>${esc(r.clubs?.name||'')}</td><td>${esc(r.message)}</td><td>${badge(r.status)}</td><td>${r.status==='En attente'?`<button class="btn secondary small" data-approve-request="${esc(r.id)}">Accepter</button> <button class="btn danger small" data-reject-request="${esc(r.id)}">Refuser</button>`:'—'}</td></tr>`).join('')||tableEmpty(6)}</tbody></table></div></div>` +
    `<div class="card" style="margin-top:15px"><h3>Membres</h3><div class="table-wrap" style="margin-top:10px"><table class="table"><thead><tr><th>Club</th><th>Élève</th><th>Classe</th><th>Rôle</th><th>Depuis</th><th>Action</th></tr></thead><tbody>${members.map(m=>`<tr><td>${esc(m.clubs?.name||'')}</td><td>${esc(m.students?.full_name||'')}<span>${rpStatusBadge(m.students?.rp_status)}</span></td><td>${esc(m.students?.class_name||'')}</td><td>${esc(m.role||'Membre')}</td><td>${dateFR(m.joined_at?.slice(0,10))}</td><td><button class="btn danger small" data-del-member="${esc(m.id)}">Retirer</button></td></tr>`).join('')||tableEmpty(6)}</tbody></table></div></div>` +
    modal('cm', 'Créer un club', `<form id="cf" class="form"><div class="field"><label>Nom</label><input name="name" required></div><div class="field"><label>Statut</label><select name="status"><option>Actif</option><option>En préparation</option><option>Fermé</option></select></div><div class="field full"><label>Président</label><select name="president_student_id"><option value="">À définir</option>${students.map(s => `<option value="${esc(s.id)}">${esc(s.full_name)}</option>`).join('')}</select></div><div class="field full"><label>Description</label><textarea name="description"></textarea></div><div class="field full"><button class="btn primary">Créer</button></div></form>`);
  qs('#ca').onclick = () => openModal('cm');
  closeBindings();
  qs('#cf').onsubmit = async e => { e.preventDefault(); const f = new FormData(e.target); try { const r = await add('clubs', { name: f.get('name'), description: f.get('description') || null, president_student_id: f.get('president_student_id') || null, status: f.get('status') }); await log('create', 'club', r.id, null); toast('Club créé.'); location.reload(); } catch (er) { toast(errMsg(er), 'error'); } };
  qsa('[data-del-club]').forEach(b => b.onclick = async () => { if (!confirm('⚠️ Supprimer définitivement ce club, ses membres et demandes ?\n\nCette action est irréversible.')) return; try { b.disabled=true; b.textContent='Suppression…'; await hardDelete('club', b.dataset.delClub); toast('Club supprimé définitivement.'); location.reload(); } catch (er) { b.disabled=false; b.textContent='Supprimer'; toast(errMsg(er), 'error'); } });
  qsa('[data-del-member]').forEach(b => b.onclick = async () => { if (!confirm('Retirer définitivement cet élève du club ?')) return; try { await hardDelete('club_member', b.dataset.delMember); toast('Membre retiré définitivement.'); location.reload(); } catch (er) { toast(errMsg(er), 'error'); } });
  qsa('[data-approve-request]').forEach(b => b.onclick = async () => { const req=requests.find(x=>x.id===b.dataset.approveRequest); if(!req)return; try { await add('club_members',{club_id:req.club_id,student_id:req.student_id,role:'Membre'}); await update('club_requests',req.id,{status:'Acceptée'}); await log('update','club_request',req.id,{status:'Acceptée'}); toast('Candidature acceptée.'); location.reload(); } catch(er){toast(errMsg(er),'error');} });
  qsa('[data-reject-request]').forEach(b => b.onclick = async () => { try { await update('club_requests',b.dataset.rejectRequest,{status:'Refusée'}); await log('update','club_request',b.dataset.rejectRequest,{status:'Refusée'}); toast('Candidature refusée.'); location.reload(); } catch(er){toast(errMsg(er),'error');} });
}


async function renderWLRegistry(p) {
  if (!['admin','recruteur_wl'].includes(p.role)) throw new Error('Accès réservé aux recruteurs WL.');
  const { data, error } = await sb.from('wl_registry')
    .select('id,profile_id,person_id,rp_last_name,rp_first_name,discord_username,roblox_username,school_year,section,class_name,profile_kind,is_alt,club,function_name,recruiter_profile_id,validated_at,active,removed_at')
    .eq('active', true)
    .order('validated_at', { ascending: false });
  if (error) throw error;
  const list = data || [];
  // wl_registry possède plusieurs relations vers profiles (profile_id, recruiter_profile_id).
  // On évite l'embed automatique ambigu et on récupère les statuts RP séparément.
  const profileIds = [...new Set(list.map(x => x.profile_id).filter(Boolean))];
  let rpByProfile = {};
  if (profileIds.length) {
    const { data: profRows, error: profError } = await sb.from('profiles').select('id,rp_status').in('id', profileIds);
    if (profError) throw profError;
    rpByProfile = Object.fromEntries((profRows || []).map(x => [String(x.id), x.rp_status || 'normal']));
  }
  list.forEach(x => { x.rp_status = rpByProfile[String(x.profile_id)] || 'normal'; });
  // Les recruteurs WL autorisés consultent le registre WL complet, pas uniquement leurs propres recrutements.
  const my = list;

  qs('#app').innerHTML =
    head('Registre WL', 'Registre administratif des personnes déjà validées par votre équipe.') +
    `<div class="notice" style="margin-bottom:15px">🔒 Le site ne communique pas avec Discord. Après votre validation interne, utilisez ce formulaire pour enregistrer la personne dans le registre WL.</div>` +
    `<div class="toolbar class-filter-bar"><input id="wlSearch" class="search" placeholder="Rechercher un personnage…"><select id="wlClassFilter" class="search"><option value="">🏫 Toutes les classes</option></select><button id="wlAdd" class="btn primary">＋ Ajouter une WL</button><a href="wl-import.html" class="btn secondary">📥 Importer en masse</a><button id="wlSyncSchool" class="btn secondary">🔗 Synchroniser Scolarité</button></div>` +
    `<div class="card"><div class="toolbar" style="margin-bottom:12px"><button class="btn secondary" data-wl-tab="students">🎓 Élèves</button><button class="btn secondary" data-wl-tab="staff">🏫 Personnel</button></div><div id="wlStudentsSection"><h3>🎓 Élèves</h3><div class="table-wrap"><table class="table"><thead><tr><th>Personnage</th><th>Discord</th><th>Roblox</th><th>Classe</th><th>Type / Statut RP</th><th>E-mail scolaire</th><th>Actions</th></tr></thead><tbody id="wlStudentRows"></tbody></table></div></div><div id="wlStaffSection" style="display:none"><h3>🏫 Personnel</h3><div class="table-wrap"><table class="table"><thead><tr><th>Personnage</th><th>Fonction</th><th>Discord</th><th>Roblox</th><th>Type</th><th>E-mail scolaire</th><th>Actions</th></tr></thead><tbody id="wlStaffRows"></tbody></table></div></div></div>` +
    modal('wlm', 'Ajouter une WL validée', `<form id="wlf" class="form">
      <div class="field"><label>Nom RP</label><input name="rp_last_name" required></div>
      <div class="field"><label>Prénom RP</label><input name="rp_first_name" required></div>
      <div class="field"><label>Pseudo Discord</label><input name="discord_username"></div>
      <div class="field"><label>Pseudo Roblox</label><input name="roblox_username"></div>
      <div class="field"><label>Année</label><input name="school_year"></div>
      <div class="field"><label>Section</label><input name="section"></div>
      <div class="field"><label>Classe</label><input name="class_name"></div>
      <div class="field"><label>Type de profil</label><select name="profile_kind"><option value="student">Élève</option><option value="professor">Professeur</option><option value="surveillant">Surveillant</option><option value="psychologue">Psychologue</option><option value="infirmiere">Infirmière</option></select></div>
      <div class="field"><label>Personnage</label><select name="is_alt"><option value="false">Principal</option><option value="true">ALT PERSO</option></select></div>
      <div class="field" id="wlRpStatusField"><label>Statut RP (élève uniquement)</label><select name="rp_status"><option value="normal">🟢 Normal</option><option value="delinquant">🔴 Délinquant</option><option value="parfait">⭐ Parfait</option></select></div>
      <div class="field" id="wlRpStatusReasonField"><label>Motif du statut (élève uniquement, optionnel)</label><input name="rp_status_reason" placeholder="Création WL, évolution RP…"></div>
      <div class="field"><label>Club</label><input name="club"></div>
      <div class="field"><label>Fonction</label><input name="function_name"></div>
      <div class="field"><label>E-mail scolaire (optionnel)</label><input name="school_email" type="email" placeholder="prenom@midori.fr"></div>
      <div class="field full"><label>Rattachement de la personne</label>
        <select name="person_mode" id="wlPersonMode">
          <option value="new">➕ Nouvelle personne</option>
          <option value="existing">🔎 Personne existante</option>
        </select>
      </div>
      <div class="field full" id="wlExistingWrap" style="display:none">
        <label>Rechercher une personne existante</label>
        <input id="wlPersonSearch" autocomplete="off" placeholder="Nom RP, Discord ou Roblox…">
        <select name="person_id" id="wlPersonSelect" size="4" style="margin-top:8px">
          <option value="">Commencez à rechercher une personne…</option>
        </select>
        <div class="muted" id="wlPersonHint" style="margin-top:7px">Une personne existante permet notamment de rattacher un ALT PERSO au même compte.</div>
      </div>
      <div class="field full"><div class="notice">La WL doit déjà avoir été validée sur Discord avant cet enregistrement. Pour un ALT ou un profil supplémentaire, choisissez <strong>Personne existante</strong> puis sélectionnez la personne concernée. Le compte de connexion n'est pas créé ici.</div></div>
      <div class="field full"><button class="btn primary">Enregistrer la WL validée</button></div>
    </form>`);

  const classFilter = qs('#wlClassFilter');
  try { const cls = await rows('classes','id,name',{order:'name'}); classFilter.innerHTML = '<option value="">🏫 Toutes les classes</option>' + (cls||[]).map(c=>`<option value="${esc(c.name)}">${esc(c.name)}</option>`).join(''); } catch (_) {}
  qs('#wlAdd').onclick = () => openModal('wlm');
  qs('#wlSyncSchool').onclick = async () => { if (!confirm('Synchroniser le registre WL actif vers les fiches scolaires ?\n\nLes élèves/professeurs/surveillants déjà liés seront mis à jour, les fiches manquantes seront créées.')) return; try { const { data, error } = await sb.rpc('midori_sync_all_wl_school_links'); if(error) throw error; toast(`Synchronisation terminée : ${data?.students_created ?? 0} élèves, ${data?.professors_created ?? 0} professeurs, ${data?.supervisors_created ?? 0} surveillants.`); location.reload(); } catch(er) { toast(errMsg(er),'error'); } };
  const renderWLRows = () => {
    const q = (qs('#wlSearch')?.value || '').trim().toLowerCase();
    const wantedClass = (qs('#wlClassFilter')?.value || '').trim().toLowerCase();
    const filtered = my.filter(x => { const hay = `${x.rp_last_name||''} ${x.rp_first_name||''} ${x.discord_username||''} ${x.roblox_username||''} ${x.school_email||''} ${x.class_name||''} ${x.function_name||''}`.toLowerCase(); return (!q || hay.includes(q)) && (!wantedClass || String(x.class_name||'').trim().toLowerCase() === wantedClass); });
    const classOrder = x => { const m=String(x||'').match(/(\d)/); return `${m?m[1]:'9'}-${String(x||'').toLowerCase()}`; };
    filtered.sort((a,b)=>classOrder(a.class_name).localeCompare(classOrder(b.class_name),'fr',{numeric:true,sensitivity:'base'}) || `${a.rp_last_name||''} ${a.rp_first_name||''}`.localeCompare(`${b.rp_last_name||''} ${b.rp_first_name||''}`,'fr',{numeric:true,sensitivity:'base'}));
    const row = x => `<tr data-wl-row><td><strong>${esc(x.rp_last_name)} ${esc(x.rp_first_name)}</strong></td><td>${esc(x.discord_username || '—')}</td><td>${esc(x.roblox_username || '—')}</td><td>${esc(x.class_name || '—')}</td><td>${x.is_alt ? '<span class="tag yellow">🟣 ALT PERSO</span>' : '<span class="tag">Principal</span>'}${isStudentProfile(x) ? `<br>${rpStatusBadge(x.rp_status)}` : ''}</td><td>${esc(x.school_email || '—')}</td><td><a class="btn secondary small" href="profile-management.html?profile=${encodeURIComponent(x.profile_id)}">✏️ Modifier</a> <button class="btn danger small" data-remove-wl="${esc(x.id)}">🗑️ Retirer</button></td></tr>`;
    const staffRow = x => `<tr><td><strong>${esc(x.rp_last_name)} ${esc(x.rp_first_name)}</strong></td><td>${esc(x.function_name || ROLE_LABEL[x.profile_kind] || 'Personnel')}</td><td>${esc(x.discord_username || '—')}</td><td>${esc(x.roblox_username || '—')}</td><td>${x.is_alt ? '<span class="tag yellow">🟣 ALT PERSO</span>' : '<span class="tag">Principal</span>'}</td><td>${esc(x.school_email || '—')}</td><td><a class="btn secondary small" href="profile-management.html?profile=${encodeURIComponent(x.profile_id)}">✏️ Modifier</a> <button class="btn danger small" data-remove-wl="${esc(x.id)}">🗑️ Retirer</button></td></tr>`;
    qs('#wlStudentRows').innerHTML = filtered.filter(isStudentProfile).map(row).join('') || tableEmpty(7, 'Aucun élève dans le registre WL.');
    qs('#wlStaffRows').innerHTML = filtered.filter(x => !isStudentProfile(x)).map(staffRow).join('') || tableEmpty(7, 'Aucun personnel dans le registre WL.');
    qsa('[data-remove-wl]').forEach(b => b.onclick = async () => { if (!confirm('⚠️ SUPPRESSION DÉFINITIVE DE LA WL\n\nLe profil, ses données liées et son compte Supabase Authentication seront supprimés.\n\nCette action est irréversible. Continuer ?')) return; const second=prompt('Pour confirmer, tapez SUPPRIMER'); if(second!=='SUPPRIMER'){toast('Suppression annulée.','error');return;} try { b.disabled=true; b.textContent='Suppression…'; const rowId=b.dataset.removeWl; const {data:row,error:rowErr}=await sb.from('wl_registry').select('profile_id').eq('id',rowId).maybeSingle(); if(rowErr)throw rowErr; if(!row?.profile_id) throw new Error('Profil WL introuvable.'); await hardDelete('profile',row.profile_id); toast('WL et profil supprimés définitivement.'); location.reload(); } catch (er) { b.disabled=false; b.textContent='🗑️ Retirer'; toast(errMsg(er), 'error'); } });
  };
  qs('#wlSearch').oninput = renderWLRows;
  qs('#wlClassFilter').onchange = renderWLRows;
  qsa('[data-wl-tab]').forEach(b => b.onclick = () => { const student = b.dataset.wlTab === 'students'; qs('#wlStudentsSection').style.display = student ? '' : 'none'; qs('#wlStaffSection').style.display = student ? 'none' : ''; });
  renderWLRows();
  closeBindings();
  const wlKind = qs('#wlf')?.querySelector('[name=profile_kind]');
  const wlStatusField = qs('#wlRpStatusField');
  const wlStatusReasonField = qs('#wlRpStatusReasonField');
  const syncWLStatusFields = () => {
    const isStudent = wlKind?.value === 'student';
    if (wlStatusField) wlStatusField.style.display = isStudent ? '' : 'none';
    if (wlStatusReasonField) wlStatusReasonField.style.display = isStudent ? '' : 'none';
  };
  wlKind?.addEventListener('change', syncWLStatusFields);
  syncWLStatusFields();

  // Recherche sécurisée des personnes existantes pour éviter les doublons.
  const personMode = qs('#wlPersonMode');
  const existingWrap = qs('#wlExistingWrap');
  const personSearch = qs('#wlPersonSearch');
  const personSelect = qs('#wlPersonSelect');
  const personHint = qs('#wlPersonHint');
  let personSearchTimer = null;

  const renderPersonOptions = (people) => {
    if (!people.length) {
      personSelect.innerHTML = '<option value="">Aucune personne trouvée</option>';
      return;
    }
    personSelect.innerHTML = '<option value="">— Sélectionner une personne —</option>' + people.map(x => {
      const discord = x.discord_username || 'Discord non renseigné';
      const roblox = x.roblox_username || 'Roblox non renseigné';
      const names = x.profile_names || 'Aucun profil';
      return `<option value="${esc(x.person_id)}">${esc(names)} · ${esc(discord)} · ${esc(roblox)} · ${x.profile_count || 0} profil(s)</option>`;
    }).join('');
  };

  const searchPeople = async () => {
    const q = String(personSearch.value || '').trim();
    if (!q) {
      personSelect.innerHTML = '<option value="">Commencez à rechercher une personne…</option>';
      return;
    }
    personHint.textContent = 'Recherche en cours…';
    const { data, error } = await sb.rpc('midori_search_people', { p_search: q });
    if (error) {
      personHint.textContent = 'Impossible de rechercher les personnes.';
      toast(errMsg(error), 'error');
      return;
    }
    renderPersonOptions(data || []);
    personHint.textContent = (data || []).length
      ? `${data.length} personne(s) trouvée(s). Sélectionnez la personne à laquelle rattacher ce profil.`
      : 'Aucune personne trouvée. Vérifiez le pseudo Discord ou Roblox.';
  };

  personMode.onchange = () => {
    const existing = personMode.value === 'existing';
    existingWrap.style.display = existing ? '' : 'none';
    personSearch.required = existing;
    personSelect.required = existing;
    if (!existing) {
      personSearch.value = '';
      personSelect.innerHTML = '<option value="">Commencez à rechercher une personne…</option>';
      personHint.textContent = 'Une personne existante permet notamment de rattacher un ALT PERSO au même compte.';
    }
  };

  personSearch.oninput = () => {
    clearTimeout(personSearchTimer);
    personSearchTimer = setTimeout(searchPeople, 300);
  };

  qs('#wlSearch').oninput = e => {
    const q = e.target.value.trim().toLowerCase();
    qsa('[data-wl-row]').forEach(r => r.style.display = !q || r.dataset.search.includes(q) ? '' : 'none');
  };
  qs('#wlf').onsubmit = async e => {
    e.preventDefault();
    try {
      const f = new FormData(e.target);
      const payload = {
        p_rp_last_name: String(f.get('rp_last_name')||'').trim(),
        p_rp_first_name: String(f.get('rp_first_name')||'').trim(),
        p_discord_username: String(f.get('discord_username')||'').trim() || null,
        p_roblox_username: String(f.get('roblox_username')||'').trim() || null,
        p_school_year: String(f.get('school_year')||'').trim() || null,
        p_section: String(f.get('section')||'').trim() || null,
        p_class_name: String(f.get('class_name')||'').trim() || null,
        p_profile_kind: String(f.get('profile_kind')||'student'),
        p_is_alt: f.get('is_alt') === 'true',
        p_club: String(f.get('club')||'').trim() || null,
        p_function_name: String(f.get('function_name')||'').trim() || null,
        p_school_email: String(f.get('school_email')||'').trim().toLowerCase() || null,
        p_person_id: f.get('person_mode') === 'existing' ? (String(f.get('person_id')||'').trim() || null) : null
      };
      if (f.get('person_mode') === 'existing' && !payload.p_person_id) {
        throw new Error('Sélectionnez une personne existante.');
      }
      const { data, error } = await sb.rpc('midori_add_validated_wl', payload);
      if (error) throw error;
      const { error: finalizeError } = await sb.rpc('midori_finalize_wl_profile', {
        p_registry_id: data,
        p_discord_username: payload.p_discord_username,
        p_roblox_username: payload.p_roblox_username,
        p_rp_status: f.get('profile_kind') === 'student' ? String(f.get('rp_status') || 'normal') : 'normal',
        p_reason: String(f.get('rp_status_reason') || '').trim() || null
      });
      if (finalizeError) throw finalizeError;
      try { await sb.rpc('midori_sync_wl_school_record', { p_registry_id: data }); } catch (syncError) { console.warn('Synchronisation WL → fiche scolaire non disponible:', syncError); }
      await log('create', 'wl_registry', data, { validated_on_discord: true, is_alt: payload.p_is_alt, rp_status: payload.p_profile_kind === 'student' ? (f.get('rp_status') || 'normal') : null });
      toast('WL enregistrée. Le profil est maintenant rattaché à cette personne.');
      closeModal('wlm');
      location.reload();
    } catch (er) { toast(errMsg(er), 'error'); }
  };
  qsa('[data-remove-wl]').forEach(b => b.onclick = async () => {
    if (!confirm('⚠️ SUPPRESSION DÉFINITIVE DE LA WL\n\nLe profil, ses données liées et son compte Supabase Authentication seront supprimés.\n\nCette action est irréversible. Continuer ?')) return;
    const second=prompt('Pour confirmer, tapez SUPPRIMER');
    if(second!=='SUPPRIMER'){toast('Suppression annulée.','error');return;}
    try {
      b.disabled=true; b.textContent='Suppression…';
      const {data:row,error:rowErr}=await sb.from('wl_registry').select('profile_id').eq('id',b.dataset.removeWl).maybeSingle();
      if(rowErr) throw rowErr;
      if(!row?.profile_id) throw new Error('Profil WL introuvable.');
      await hardDelete('profile',row.profile_id);
      toast('WL et profil supprimés définitivement.');
      location.reload();
    } catch (er) { b.disabled=false; b.textContent='🗑️ Retirer'; toast(errMsg(er), 'error'); }
  });
}

async function renderProfilesChooser(p) {
  // V10: Accès & comptes wired to admin-create-user/admin-reset-user-password.
  // V9: uses the new midori_profile_links table when installed.
  let links = [];
  try {
    const r = await sb.from('midori_profile_links').select('profile_id,profiles(id,email,username,full_name,role,active,student_id,professor_id,supervisor_id)').eq('person_id', p.person_id);
    if (!r.error) links = (r.data || []).map(x => x.profiles).filter(Boolean);
  } catch (_) {}
  if (!links.length) links = [p];
  qs('#app').innerHTML = head('Mes profils WL', 'Profils et personnages rattachés à votre personne.') +
    `<div class="notice" style="margin-bottom:15px">Les profils/ALT sont gérés dans l'espace WL. La modération Discord n'utilise pas cet espace.</div>` +
    `<div class="grid g2">${links.map(x => `<div class="card"><div class="toolbar"><div><h3>${esc(x.full_name || x.username || 'Profil')}</h3><div class="muted">${esc(ROLE_LABEL[x.role] || x.role)} · ${x.active === false ? 'Désactivé' : 'Actif'}</div></div><span class="brand-mark">${x.role === 'student' ? '🎓' : x.role === 'professor' ? '🧑‍🏫' : x.role === 'surveillant' ? '🛡️' : '👤'}</span></div><button class="btn primary" data-select-profile="${esc(x.id)}" ${x.active === false ? 'disabled' : ''}>Utiliser ce profil</button></div>`).join('')}</div>`;
  qsa('[data-select-profile]').forEach(b => b.onclick = () => {
    localStorage.setItem('midori_active_profile_id', b.dataset.selectProfile);
    toast('Profil sélectionné. Rechargez la page d’accueil pour appliquer le contexte.');
    setTimeout(() => location.href = HOME[p.role] || 'dashboard.html', 500);
  });
}


async function renderWLImport(p) {
  if (!['admin','recruteur_wl'].includes(p.role)) throw new Error('Accès réservé aux recruteurs WL et administrateurs.');
  qs('#app').innerHTML = head('Import WL en masse', 'Ajoutez rapidement une liste de WL déjà validées, sans passer par 30 formulaires.') +
    `<div class="notice" style="margin-bottom:15px">⚠️ Cet import ne crée pas de mot de passe et ne communique pas avec Discord. Les profils Administration et les cas ambigus doivent rester en traitement manuel.</div>` +
    `<div class="card"><div class="field"><label>Fichier CSV WL préparé</label><input id="wlBulkFile" type="file" accept=".csv,text/csv"></div><div class="toolbar" style="margin-top:12px"><button id="wlBulkImport" class="btn primary" disabled>📥 Importer les lignes sûres</button><a class="btn secondary" href="wl.html">← Retour au registre WL</a></div><div id="wlBulkStatus" class="muted" style="margin-top:10px">Sélectionnez le fichier CSV.</div></div>` +
    `<div id="wlBulkPreview" class="card" style="margin-top:15px;display:none"><h3>Prévisualisation</h3><div class="table-wrap" style="margin-top:10px"><table class="table"><thead><tr><th>Nom RP</th><th>Discord</th><th>Roblox</th><th>Type</th><th>Personne</th></tr></thead><tbody id="wlBulkRows"></tbody></table></div></div>` +
    `<div class="card" style="margin-top:15px"><h3>Règles</h3><p class="muted">Les lignes avec un person_id existant sont rattachées directement. Pour un duo Principal + ALT du même groupe, le Principal est traité avant l'ALT. Une erreur sur une ligne n'arrête pas le reste du lot.</p></div>`;

  const fileEl = qs('#wlBulkFile');
  const importBtn = qs('#wlBulkImport');
  const statusEl = qs('#wlBulkStatus');
  const preview = qs('#wlBulkPreview');
  const body = qs('#wlBulkRows');
  let rows = [];

  const parseCSV = text => {
    const lines=[]; let row=[], field='', quoted=false;
    for(let i=0;i<text.length;i++){
      const ch=text[i], next=text[i+1];
      if(quoted){ if(ch==='"' && next==='"'){ field+='"'; i++; } else if(ch==='"'){ quoted=false; } else field+=ch; }
      else if(ch==='"'){ quoted=true; }
      else if(ch===','){ row.push(field); field=''; }
      else if(ch==='\n'){ row.push(field); lines.push(row); row=[]; field=''; }
      else if(ch!=='\r'){ field+=ch; }
    }
    if(field!=='' || row.length){ row.push(field); lines.push(row); }
    if(!lines.length) return [];
    const header=lines.shift().map(x=>String(x||'').trim());
    return lines.filter(r=>r.some(x=>String(x||'').trim())).map(r=>Object.fromEntries(header.map((h,i)=>[h,String(r[i]??'').trim()])));
  };

  const escHtml = v => esc(String(v ?? ''));
  const deriveClass = (year, section) => {
    const m=String(year||'').match(/([123])/);
    const sec=String(section||'').trim();
    return m && sec ? `${m[1]}-${sec}` : null;
  };
  const kindFunction = kind => ({professor:'Professeur',surveillant:'Surveillant',psychologue:'Psychologue',infirmiere:'Infirmière'}[kind] || null);

  fileEl.onchange = async () => {
    rows=[]; importBtn.disabled=true; preview.style.display='none';
    const file=fileEl.files?.[0]; if(!file) return;
    try {
      rows=parseCSV(await file.text()).filter(r => r.nom_rp && (r.profile_kind==='student' || r.profile_kind==='professor' || r.profile_kind==='surveillant' || r.profile_kind==='psychologue' || r.profile_kind==='infirmiere'));
      if(!rows.length) throw new Error('Aucune ligne importable trouvée dans le CSV.');
      // Principals first, then ALTs.
      rows.sort((a,b)=>String(a.is_alt).localeCompare(String(b.is_alt)));
      body.innerHTML=rows.map(r=>`<tr><td><strong>${escHtml(r.nom_rp)}</strong></td><td>${escHtml(r.discord||'—')}</td><td>${escHtml(r.roblox||'—')}</td><td>${escHtml(ROLE_LABEL[r.profile_kind]||r.profile_kind)}</td><td>${escHtml(r.principal_name || 'Nouvelle personne')}</td></tr>`).join('');
      preview.style.display=''; importBtn.disabled=false;
      statusEl.textContent=`${rows.length} ligne(s) prête(s). Vérifiez la prévisualisation avant l'import.`;
    } catch(er){ statusEl.textContent='Erreur : '+errMsg(er); toast(errMsg(er),'error'); }
  };

  importBtn.onclick = async () => {
    if(!rows.length) return;
    if(!confirm(`Importer ${rows.length} ligne(s) dans le registre WL ? Les lignes seront créées une par une et les erreurs seront conservées dans le rapport.`)) return;
    importBtn.disabled=true; statusEl.textContent='Import en cours…';
    const groupPersons = {};
    const results=[];

    // Resolve existing persons referenced by a known person_id before creating anything.
    for(const r of rows){ if(r.person_group && r.person_id) groupPersons[r.person_group]=r.person_id; }

    for(const r of rows){
      try{
        let personId = r.person_id || groupPersons[r.person_group] || null;
        const parts=String(r.nom_rp).trim().split(/\s+/,2);
        const last=parts[0] || r.nom_rp;
        const first=parts[1] || parts[0] || r.nom_rp;
        const className=deriveClass(r.school_year,r.section);
        const payload={
          p_rp_last_name:last,
          p_rp_first_name:first,
          p_discord_username:r.discord || null,
          p_roblox_username:r.roblox || null,
          p_school_year:r.school_year || null,
          p_section:r.section || null,
          p_class_name:className,
          p_profile_kind:r.profile_kind,
          p_is_alt:String(r.is_alt).toLowerCase()==='true',
          p_club:null,
          p_function_name:kindFunction(r.profile_kind),
          p_school_email:null,
          p_person_id:personId
        };
        const {data,error}=await sb.rpc('midori_add_validated_wl',payload);
        if(error) throw error;
        const {error:fin}=await sb.rpc('midori_finalize_wl_profile',{
          p_registry_id:data,
          p_discord_username:payload.p_discord_username,
          p_roblox_username:payload.p_roblox_username,
          p_rp_status:'normal',
          p_reason:'Import WL en masse'
        });
        if(fin) throw fin;
        try { await sb.rpc('midori_sync_wl_school_record', { p_registry_id: data }); } catch (syncError) { console.warn('Synchronisation WL → fiche scolaire non disponible:', syncError); }
        const {data:reg,error:regErr}=await sb.from('wl_registry').select('person_id,profile_id').eq('id',data).maybeSingle();
        if(regErr) throw regErr;
        if(r.person_group && reg?.person_id) groupPersons[r.person_group]=reg.person_id;
        await log('create','wl_registry',data,{bulk_import:true,source_name:r.nom_rp});
        results.push({name:r.nom_rp,ok:true});
      }catch(er){ results.push({name:r.nom_rp,ok:false,error:errMsg(er)}); }
    }
    const ok=results.filter(x=>x.ok).length, bad=results.length-ok;
    statusEl.innerHTML=`✅ ${ok} importée(s) · ❌ ${bad} erreur(s). ` + (bad ? 'Les erreurs doivent être vérifiées dans le détail ci-dessous.' : 'Le lot est terminé.');
    body.innerHTML=results.map(x=>`<tr><td colspan="4"><strong>${escHtml(x.name)}</strong></td><td>${x.ok ? '<span class="tag green">Importé</span>' : '<span class="tag red">Erreur</span> '+escHtml(x.error)}</td></tr>`).join('');
    importBtn.disabled=true;
  };
}

async function renderMigration(p) {
  if (!['admin','recruteur_wl'].includes(p.role)) throw new Error('Accès réservé aux recruteurs WL et administrateurs.');
  const { data: profiles, error: pr } = await sb.rpc('midori_migration_search_profiles', { p_search: '' });
  if (pr) throw pr;
  const { data: people, error: pe } = await sb.from('midori_people').select('id,discord_username,roblox_username,active').eq('active', true).order('created_at', { ascending:false }).limit(500);
  if (pe) throw pe;
  const { data: linkedProfiles, error: lp } = await sb.from('profiles').select('id,person_id,full_name,is_alt,rp_status,discord_username,roblox_username').limit(1000);
  if (lp) throw lp;
  const profileCount = {};
  (linkedProfiles || []).forEach(x => { if (x.person_id) profileCount[x.person_id] = (profileCount[x.person_id] || 0) + 1; });
  const profileNames = {};
  (linkedProfiles || []).forEach(x => { if (!x.person_id) return; (profileNames[x.person_id] ||= []).push(`${x.full_name || 'Sans nom'}${x.is_alt ? ' [ALT]' : ' [PRINCIPAL]'}`); });

  qs('#app').innerHTML = head('Migration des profils', 'Corrigez les anciens profils sans supprimer leurs WL ni leurs comptes.') +
    `<div class="notice" style="margin-bottom:15px">🛡️ <strong>Migration manuelle :</strong> aucun regroupement automatique. Le profil garde son identité RP, son historique et sa WL. Seul son rattachement ou ses informations sont corrigés.</div>` +
    `<div class="grid g2">` +
      `<div class="card"><h3>🔎 Profil à migrer</h3><p class="muted">Recherchez par nom RP, Discord, Roblox ou e-mail.</p><input id="migProfileSearch" class="search" placeholder="Nom RP, Discord, Roblox…"><select id="migProfileSelect" size="9" style="width:100%;margin-top:10px"><option value="">— Sélectionner un profil —</option></select><div id="migProfileInfo" class="notice" style="margin-top:10px;display:none"></div></div>` +
      `<div class="card"><h3>👤 Personne cible</h3><p class="muted">Choisissez la personne qui possède déjà le compte/personnages concernés.</p><input id="migPersonSearch" class="search" placeholder="Nom RP, Discord ou Roblox…"><select id="migPersonSelect" size="9" style="width:100%;margin-top:10px"><option value="">— Rechercher une personne —</option></select><div id="migPersonInfo" class="notice" style="margin-top:10px;display:none"></div></div>` +
    `</div>` +
    `<div class="card" style="margin-top:15px"><div class="toolbar"><div><h3>🔗 Rattacher le profil</h3><p class="muted">Aucune donnée n'est supprimée. Le profil devient simplement un profil supplémentaire de la personne cible.</p></div><button id="migLink" class="btn primary" disabled>🔗 Rattacher le profil</button></div></div>` +
    `<div class="card" style="margin-top:15px"><h3>✏️ Corriger un ancien profil</h3><p class="muted">Les anciens faux pseudos ne servent plus d'identifiants de connexion. Renseignez séparément Discord, Roblox et e-mail.</p><button id="migEdit" class="btn secondary" disabled>Modifier les informations</button></div>` +
    modal('migEditModal','Modifier le profil',`<form id="migEditForm" class="form"><input type="hidden" name="profile_id"><div class="field"><label>Nom complet / RP</label><input name="full_name" required></div><div class="field"><label>Pseudo Discord</label><input name="discord_username"></div><div class="field"><label>Pseudo Roblox</label><input name="roblox_username"></div><div class="field"><label>Classe</label><input name="class_name"></div><div class="field"><label>Type de profil</label><select name="profile_kind"><option value="student">Élève</option><option value="professor">Professeur</option><option value="surveillant">Surveillant</option><option value="psychologue">Psychologue</option><option value="infirmiere">Infirmière</option></select></div><div class="field"><label>Personnage</label><select name="is_alt"><option value="false">Principal</option><option value="true">ALT PERSO</option></select></div><div class="field" id="migRpStatusField"><label>Statut RP (élève uniquement)</label><select name="rp_status"><option value="normal">🟢 Normal</option><option value="delinquant">🔴 Délinquant</option><option value="parfait">⭐ Parfait</option></select></div><div class="field" id="migRpStatusReasonField"><label>Motif du changement (élève uniquement)</label><input name="rp_status_reason"></div><div class="field full"><label>E-mail scolaire / identifiant du portail</label><input name="school_email" type="email"></div><div class="field full"><button class="btn primary">Enregistrer les corrections</button></div></form>`);

  const pSearch=qs('#migProfileSearch'), pSelect=qs('#migProfileSelect'), personSearch=qs('#migPersonSearch'), personSelect=qs('#migPersonSelect');
  const pInfo=qs('#migProfileInfo'), personInfo=qs('#migPersonInfo'), linkBtn=qs('#migLink'), editBtn=qs('#migEdit');
  const allProfiles=profiles||[], allPeople=people||[]; let selectedProfile=null, selectedPerson=null;
  const renderProfiles=()=>{ const q=pSearch.value.trim().toLowerCase(); const rows=allProfiles.filter(x=>!q||`${x.full_name||''} ${x.discord_username||''} ${x.roblox_username||''} ${x.school_email||''}`.toLowerCase().includes(q)); pSelect.innerHTML=rows.length?'<option value="">— Sélectionner un profil —</option>'+rows.map(x=>`<option value="${esc(x.profile_id)}">${esc(x.full_name||'Sans nom')} · ${esc(x.roblox_username||'Roblox non renseigné')}${x.is_alt?' · ALT':''} · ${isStudentProfile(x) ? esc(rpStatusLabel(x.rp_status)) : 'sans statut RP'}</option>`).join(''):'<option value="">Aucun profil trouvé</option>'; };
  const renderPeople=()=>{ const q=personSearch.value.trim().toLowerCase(); const rows=allPeople.filter(x=>!q||`${x.discord_username||''} ${x.roblox_username||''} ${(profileNames[x.id]||[]).join(' ')}`.toLowerCase().includes(q)); personSelect.innerHTML=rows.length?'<option value="">— Sélectionner une personne —</option>'+rows.map(x=>`<option value="${esc(x.id)}">${esc((profileNames[x.id]||['Personne sans profil']).join(' • '))} · ${esc(x.discord_username||'Discord non renseigné')} · ${esc(x.roblox_username||'Roblox non renseigné')} · ${profileCount[x.id]||0} profil(s)</option>`).join(''):'<option value="">Aucune personne trouvée</option>'; };
  renderProfiles(); renderPeople();
  const requestedProfile = new URLSearchParams(location.search).get('profile');
  if (requestedProfile && allProfiles.some(x=>String(x.profile_id)===String(requestedProfile))) { pSelect.value=requestedProfile; pSelect.dispatchEvent(new Event('change')); }
  pSearch.oninput=renderProfiles; personSearch.oninput=renderPeople;
  pSelect.onchange=()=>{ selectedProfile=allProfiles.find(x=>String(x.profile_id)===String(pSelect.value))||null; editBtn.disabled=!selectedProfile; if(selectedProfile){pInfo.style.display='';pInfo.innerHTML=`<strong>${esc(selectedProfile.full_name||'Sans nom')}</strong><br>Discord : ${esc(selectedProfile.discord_username||'—')} · Roblox : ${esc(selectedProfile.roblox_username||'—')}<br>E-mail portail : ${esc(selectedProfile.school_email||'—')}<br>${isStudentProfile(selectedProfile) ? `Statut RP : ${rpStatusBadge(selectedProfile.rp_status)}<br>` : ''}Personne actuelle : ${esc((profileNames[selectedProfile.person_id]||[]).join(' • ')||selectedProfile.person_id||'non liée')}`;}else pInfo.style.display='none'; linkBtn.disabled=!(selectedProfile&&selectedPerson&&String(selectedProfile.person_id)!==String(selectedPerson.id)); };
  personSelect.onchange=()=>{ selectedPerson=allPeople.find(x=>String(x.id)===String(personSelect.value))||null; personInfo.style.display=selectedPerson?'':'none'; if(selectedPerson) personInfo.innerHTML=`<strong>Personne cible</strong><br>${esc((profileNames[selectedPerson.id]||[]).join(' • ')||'Aucun profil')}<br>Discord : ${esc(selectedPerson.discord_username||'—')} · Roblox : ${esc(selectedPerson.roblox_username||'—')}<br>${profileCount[selectedPerson.id]||0} profil(s) déjà rattaché(s)`; linkBtn.disabled=!(selectedProfile&&selectedPerson&&String(selectedProfile.person_id)!==String(selectedPerson.id)); };
  linkBtn.onclick=async()=>{ if(!selectedProfile||!selectedPerson)return; if(!confirm(`Rattacher « ${selectedProfile.full_name||'ce profil'} » à « ${(profileNames[selectedPerson.id]||[]).join(', ')||'cette personne'} » ?\n\nAucun profil ne sera supprimé.`))return; try{const {error}=await sb.rpc('midori_migrate_link_profile',{p_profile_id:selectedProfile.profile_id,p_target_person_id:selectedPerson.id});if(error)throw error;toast('Profil rattaché.');location.reload();}catch(e){toast(errMsg(e),'error')}};
  editBtn.onclick=()=>{if(!selectedProfile)return;const f=qs('#migEditForm');f.profile_id.value=selectedProfile.profile_id;f.full_name.value=selectedProfile.full_name||'';f.discord_username.value=selectedProfile.discord_username||'';f.roblox_username.value=selectedProfile.roblox_username||'';f.class_name.value=selectedProfile.class_name||'';f.profile_kind.value=selectedProfile.profile_kind||selectedProfile.role||'student';f.is_alt.value=String(!!selectedProfile.is_alt);f.rp_status.value=selectedProfile.rp_status||'normal';f.rp_status_reason.value='';f.school_email.value=selectedProfile.school_email||'';const migIsStudent=isStudentProfile(selectedProfile);qs('#migRpStatusField').style.display=migIsStudent?'':'none';qs('#migRpStatusReasonField').style.display=migIsStudent?'':'none';openModal('migEditModal');closeBindings();};
  qs('#migEditForm').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target);try{const {error}=await sb.rpc('midori_migrate_update_profile',{p_profile_id:f.get('profile_id'),p_full_name:String(f.get('full_name')||'').trim(),p_discord_username:String(f.get('discord_username')||'').trim()||null,p_roblox_username:String(f.get('roblox_username')||'').trim()||null,p_class_name:String(f.get('class_name')||'').trim()||null,p_profile_kind:String(f.get('profile_kind')||'student'),p_is_alt:f.get('is_alt')==='true',p_school_email:String(f.get('school_email')||'').trim().toLowerCase()||null});if(error)throw error;if(String(f.get('profile_kind')||'student')==='student'){const {error:se}=await sb.rpc('midori_set_rp_status',{p_profile_id:f.get('profile_id'),p_status:f.get('rp_status'),p_reason:String(f.get('rp_status_reason')||'').trim()||null});if(se)throw se;}try{const wr=await sb.from('wl_registry').select('id').eq('profile_id',f.get('profile_id')).eq('active',true).maybeSingle();if(wr.data?.id)await sb.rpc('midori_sync_wl_school_record',{p_registry_id:wr.data.id});}catch(syncError){console.warn('Synchronisation WL → fiche après correction indisponible:',syncError);}toast('Profil corrigé.');closeModal('migEditModal');location.reload();}catch(e){toast(errMsg(e),'error')}};
}

async function renderProfileManagement(p) {
  if (!['admin','recruteur_wl'].includes(p.role)) throw new Error('Accès réservé aux recruteurs WL et administrateurs.');
  const { data: profiles, error } = await sb.rpc('midori_migration_search_profiles', { p_search: '' });
  if (error) throw error;
  const allProfiles = profiles || [];
  const activeRows = allProfiles.filter(x => x.active !== false);
  qs('#app').innerHTML = head('Gestion des profils', 'Nettoyez et corrigez les anciens profils un par un sans supprimer leurs données.') +
    `<div class="notice" style="margin-bottom:15px">🛠️ Utilisez cette page pour corriger les anciens pseudos Discord/Roblox, le nom RP, la classe ou l’e-mail scolaire. La migration sert ensuite uniquement à rattacher plusieurs profils à la même personne.</div>` +
    `<div class="toolbar"><input id="pmSearch" class="search" placeholder="Rechercher par nom RP, Discord, Roblox ou e-mail…"><span class="muted" id="pmCount"></span></div>` +
    `<div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Profil</th><th>Discord</th><th>Roblox</th><th>Type</th><th>Principal / ALT</th><th>E-mail scolaire</th><th>État</th><th>Actions</th></tr></thead><tbody id="pmRows"></tbody></table></div></div>` +
    modal('pmEditModal','Modifier le profil',`<form id="pmEditForm" class="form"><input type="hidden" name="profile_id"><div class="field"><label>Nom complet / RP</label><input name="full_name" required></div><div class="field"><label>Pseudo Discord</label><input name="discord_username"></div><div class="field"><label>Pseudo Roblox</label><input name="roblox_username"></div><div class="field"><label>Classe</label><input name="class_name"></div><div class="field"><label>Type de profil</label><select name="profile_kind"><option value="student">Élève</option><option value="professor">Professeur</option><option value="surveillant">Surveillant</option><option value="psychologue">Psychologue</option><option value="infirmiere">Infirmière</option></select></div><div class="field"><label>Personnage</label><select name="is_alt"><option value="false">Principal</option><option value="true">ALT PERSO</option></select></div><div class="field" id="pmStatusField"><label>Statut RP (élève uniquement)</label><select name="rp_status"><option value="normal">🟢 Normal</option><option value="delinquant">🔴 Délinquant</option><option value="parfait">⭐ Parfait</option></select></div><div class="field" id="pmReasonField"><label>Motif du changement (élève uniquement)</label><input name="rp_status_reason"></div><div class="field full"><label>E-mail scolaire / identifiant du portail</label><input name="school_email" type="email"></div><div class="field full"><button class="btn primary">💾 Enregistrer les corrections</button></div></form>`);
  const search=qs('#pmSearch'), tbody=qs('#pmRows'), count=qs('#pmCount');
  const render=()=>{ const q=search.value.trim().toLowerCase(); const rows=activeRows.filter(x=>!q||`${x.full_name||''} ${x.discord_username||''} ${x.roblox_username||''} ${x.school_email||''} ${x.class_name||''}`.toLowerCase().includes(q)); count.textContent=`${rows.length} profil(s) affiché(s)`; tbody.innerHTML=rows.map(x=>`<tr><td><strong>${esc(x.full_name||'Sans nom')}</strong></td><td>${esc(x.discord_username||'—')}</td><td>${esc(x.roblox_username||'—')}</td><td>${esc(ROLE_LABEL[x.profile_kind]||ROLE_LABEL[x.role]||x.profile_kind||'—')}</td><td>${x.is_alt?'<span class="tag yellow">🟣 ALT</span>':'<span class="tag">Principal</span>'}</td><td>${esc(x.school_email||'—')}</td><td>${x.active===false?'<span class="tag red">Inactif</span>':'<span class="tag green">Actif</span>'}</td><td><button class="btn secondary small" data-pm-edit="${esc(x.profile_id)}">✏️ Modifier</button> <a class="btn secondary small" href="migration.html?profile=${encodeURIComponent(x.profile_id)}">🔗 Migration</a></td></tr>`).join('')||tableEmpty(8,'Aucun profil trouvé.');
    qsa('[data-pm-edit]').forEach(b=>b.onclick=()=>{const x=allProfiles.find(v=>String(v.profile_id)===String(b.dataset.pmEdit)); if(!x)return; const f=qs('#pmEditForm'); f.profile_id.value=x.profile_id; f.full_name.value=x.full_name||''; f.discord_username.value=x.discord_username||''; f.roblox_username.value=x.roblox_username||''; f.class_name.value=x.class_name||''; f.profile_kind.value=x.profile_kind||x.role||'student'; f.is_alt.value=String(!!x.is_alt); f.rp_status.value=x.rp_status||'normal'; f.rp_status_reason.value=''; f.school_email.value=x.school_email||''; const student=isStudentProfile(x); qs('#pmStatusField').style.display=student?'':'none'; qs('#pmReasonField').style.display=student?'':'none'; openModal('pmEditModal'); closeBindings();});
  };
  search.oninput=render;
  qs('#pmEditForm').onsubmit=async e=>{e.preventDefault(); const f=new FormData(e.target); try { const kind=String(f.get('profile_kind')||'student'); const {error:ue}=await sb.rpc('midori_migrate_update_profile',{p_profile_id:f.get('profile_id'),p_full_name:String(f.get('full_name')||'').trim(),p_discord_username:String(f.get('discord_username')||'').trim()||null,p_roblox_username:String(f.get('roblox_username')||'').trim()||null,p_class_name:String(f.get('class_name')||'').trim()||null,p_profile_kind:kind,p_is_alt:f.get('is_alt')==='true',p_school_email:String(f.get('school_email')||'').trim().toLowerCase()||null}); if(ue)throw ue; if(kind==='student'){const {error:se}=await sb.rpc('midori_set_rp_status',{p_profile_id:f.get('profile_id'),p_status:f.get('rp_status'),p_reason:String(f.get('rp_status_reason')||'').trim()||null}); if(se)throw se;} try { const wr=await sb.from('wl_registry').select('id').eq('profile_id',f.get('profile_id')).eq('active',true).maybeSingle(); if(wr.data?.id) await sb.rpc('midori_sync_wl_school_record',{p_registry_id:wr.data.id}); } catch(syncError) { console.warn('Synchronisation WL → fiche après modification indisponible:',syncError); } toast('Profil corrigé.'); closeModal('pmEditModal'); location.reload(); } catch(e){toast(errMsg(e),'error');}};
  const wanted=new URLSearchParams(location.search).get('profile'); if(wanted){search.value=''; const x=allProfiles.find(v=>String(v.profile_id)===String(wanted)); if(x){render(); setTimeout(()=>qs(`[data-pm-edit="${CSS.escape(wanted)}"]`)?.click(),0);}}
  render();
}

async function renderAccess(p) {
  if (!['admin','recruteur_wl'].includes(p.role)) throw new Error('Accès réservé à l’administration et aux recruteurs WL.');
  const recruiterView = p.role === 'recruteur_wl';
  const [profs, students, teachers, supervisors, people] = await Promise.all([
    rows('profiles', 'id,email,username,full_name,role,active,student_id,professor_id,supervisor_id,person_id,school_email,access_status,created_at', { order: 'created_at', ascending: false }),
    rows('students', 'id,username,full_name', { order: 'full_name' }),
    rows('professors', 'id,username,full_name,subject', { order: 'full_name' }),
    rows('supervisors', 'id,username,full_name', { order: 'full_name' }),
    rows('midori_people', 'id,auth_user_id,active', { order: 'created_at', ascending: false })
  ]);

  const queryUser = new URLSearchParams(location.search).get('username') || '';
  const preStudent = students.find(x => x.username === queryUser);
  const preTeacher = teachers.find(x => x.username === queryUser);
  const preSupervisor = supervisors.find(x => x.username === queryUser);

  qs('#app').innerHTML = head('Accès & comptes', 'Identifiants du portail et gestion des comptes.') +
    (recruiterView ? `<div class="notice" style="margin-bottom:15px">🔐 <strong>Vue recruteur WL :</strong> vous pouvez consulter les e-mails/identifiants et générer un nouveau mot de passe temporaire pour les comptes non-administrateurs. Les mots de passe existants ne sont jamais lisibles ni stockés en clair.</div>` : '') +
    `<div class="grid g2">
      <div class="card">
        <h3 id="accessFormTitle">Créer / lier un accès</h3>
        <form id="accessForm" class="form" style="margin-top:12px">
          <input type="hidden" name="id" value="">
          <div class="field full"><label>E-mail du compte Supabase</label><input name="email" type="email" placeholder="prenom@midori.fr" required><small id="emailHint" class="muted">Pour une création, utilisez l’e-mail du compte créé dans Supabase Authentication.</small></div>
          <div class="field"><label>Rôle</label><select id="accessRole" name="role"><option value="student">Élève</option><option value="professor">Professeur</option><option value="surveillant">Surveillant</option><option value="psychologue">Psychologue</option><option value="infirmiere">Infirmière</option><option value="admin">Administration</option></select></div>
          <div class="field"><label>Fiche à relier</label><select id="accessLink"><option value="">Aucune fiche / personnel santé / admin</option></select></div>
          <div class="field full"><label>Identifiant du portail</label><input id="accessUsername" name="username" value="${esc(queryUser)}" placeholder="Généré automatiquement depuis l’e-mail" readonly><small class="muted">L’identifiant de connexion est l’e-mail du compte. Le pseudo Roblox/Discord appartient à la fiche RP et ne sert pas à se connecter.</small></div>
          <div class="field"><label>Nom affiché</label><input id="accessName" name="full_name" value="${esc(preStudent?.full_name || preTeacher?.full_name || preSupervisor?.full_name || '')}" placeholder="Nom et prénom" required></div>
          <input type="hidden" name="active" value="true"><div class="field full"><div id="accessHint" class="notice">Choisissez un rôle puis, pour un élève, professeur ou surveillant, la fiche correspondante.</div></div>
          <div class="field full actions"><button id="accessSubmit" class="btn primary" type="submit">Créer / mettre à jour le profil</button><button id="accessCancel" class="btn secondary" type="button" style="display:none">Annuler la modification</button></div>
        </form>
      </div>
      <div class="card">
        <h3>Gestion des accès</h3>
        <p class="muted" style="margin-top:8px">« Modifier » change le profil du portail et sa fiche liée.</p>
        <p class="muted">« Supprimer définitivement » efface le profil, les données liées, les traces du portail et le compte Supabase Authentication. Cette action est irréversible.</p>
      </div>
    </div>` +
    `<div class="card" style="margin-top:15px"><h3>Comptes portail</h3><div class="table-wrap" style="margin-top:10px"><table class="table"><thead><tr><th>E-mail / identifiant</th><th>Ancien identifiant technique</th><th>Nom</th><th>Rôle</th><th>État</th><th>Créé</th><th>Actions</th></tr></thead><tbody>${profs.map(x => `<tr><td>${esc(x.school_email || x.email || '—')}</td><td>${esc(x.username)}</td><td>${esc(x.full_name)}</td><td>${badge(ROLE_LABEL[x.role] || x.role)}</td><td>${x.active ? '<span class="tag">Actif</span>' : '<span class="tag red">Révoqué</span>'}</td><td>${dtFR(x.created_at)}</td><td><div class="actions"><button class="btn secondary small" data-edit-profile="${esc(x.id)}">Modifier</button><button type="button" class="btn secondary small" data-change-email="${esc(x.id)}" data-current-email="${esc(x.email || x.school_email || '')}">✉️ E-mail</button>${!recruiterView && x.person_id && !people.find(pp => String(pp.id) === String(x.person_id))?.auth_user_id ? `<button type="button" class="btn secondary small" data-create-auth="${esc(x.id)}" data-person-id="${esc(x.person_id)}">👤 Créer compte</button>` : ''}${x.person_id && people.find(pp => String(pp.id) === String(x.person_id))?.auth_user_id && (!recruiterView || x.role !== 'admin') ? `<button type="button" class="btn secondary small" data-reset-password="${esc(x.id)}">🔑 Réinitialiser</button>` : ''}${!recruiterView ? `<button type="button" class="btn secondary small" data-relink-auth="${esc(x.id)}">🔗 Relier Auth</button>` : ''}${!recruiterView && String(x.id) !== String(p.id) ? `<button class="btn danger small" data-delete-profile="${esc(x.id)}" data-profile-email="${esc(x.email || '')}">🗑️ Supprimer définitivement</button>` : ''}</div></td></tr>`).join('') || tableEmpty(7)}</tbody></table></div></div>`;

  const form = qs('#accessForm');
  const formTitle = qs('#accessFormTitle');
  const submitBtn = qs('#accessSubmit');
  const cancelBtn = qs('#accessCancel');
  const emailInput = form.elements.email;
  const idInput = form.elements.id;
  const roleSelect = qs('#accessRole');
  const linkSelect = qs('#accessLink');
  const usernameInput = qs('#accessUsername');
  const nameInput = qs('#accessName');
  const hint = qs('#accessHint');
  if (recruiterView) {
    const formCard = form.closest('.card');
    if (formCard) formCard.innerHTML = `<h3>🔐 Comptes des membres du portail</h3><p class="muted" style="margin-top:8px">La création/modification des rôles reste réservée à l'administration.</p>`;
  }

  const rebuildLinkOptions = (selectedId = '') => {
    const role = roleSelect.value;
    let source = [];
    if (role === 'student') source = students.map(x => ({ id: x.id, username: x.username, full_name: x.full_name, label: `${x.full_name} · ${x.username}` }));
    if (role === 'professor') source = teachers.map(x => ({ id: x.id, username: x.username, full_name: x.full_name, label: `${x.full_name} · ${x.subject || 'Professeur'}` }));
    if (role === 'surveillant') source = supervisors.map(x => ({ id: x.id, username: x.username, full_name: x.full_name, label: `${x.full_name} · ${x.username}` }));
    linkSelect.innerHTML = `<option value="">Aucune fiche / personnel santé / admin</option>` + source.map(x => `<option value="${esc(x.id)}" data-username="${esc(x.username)}" data-name="${esc(x.full_name)}">${esc(x.label)}</option>`).join('');
    if (selectedId) linkSelect.value = selectedId;
    hint.textContent = role === 'student' ? 'La fiche élève sélectionnée sera reliée au compte.' : role === 'professor' ? 'La fiche professeur sélectionnée sera reliée au compte. Pensez ensuite à lui affecter ses classes.' : role === 'surveillant' ? 'La fiche surveillant sélectionnée sera reliée au compte.' : role === 'psychologue' ? 'Aucune fiche de personnel supplémentaire n’est nécessaire.' : role === 'infirmiere' ? 'Aucune fiche de personnel supplémentaire n’est nécessaire.' : 'Ce compte aura les droits d’administration du portail.';
  };

  const resetForm = () => {
    form.reset();
    idInput.value = '';
    emailInput.readOnly = false;
    emailInput.style.opacity = '';
    formTitle.textContent = 'Créer / lier un accès';
    submitBtn.textContent = 'Créer / mettre à jour le profil';
    cancelBtn.style.display = 'none';
    const pre = preStudent || preTeacher || preSupervisor;
    if (preStudent) roleSelect.value = 'student';
    else if (preTeacher) roleSelect.value = 'professor';
    else if (preSupervisor) roleSelect.value = 'surveillant';
    rebuildLinkOptions(pre?.id || '');
    if (pre) { linkSelect.value = pre.id; usernameInput.value = pre.username; nameInput.value = pre.full_name; }
  };

  const startEdit = profile => {
    idInput.value = profile.id;
    emailInput.value = profile.email || '';
    emailInput.readOnly = false;
    emailInput.style.opacity = '';
    roleSelect.value = profile.role || 'student';
    rebuildLinkOptions(profile.student_id || profile.professor_id || profile.supervisor_id || '');
    usernameInput.value = profile.username || '';
    nameInput.value = profile.full_name || '';
    formTitle.textContent = `Modifier l’accès — ${profile.full_name || profile.username || 'compte'}`;
    submitBtn.textContent = 'Enregistrer les modifications';
    cancelBtn.style.display = '';
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  resetForm();
  roleSelect.onchange = () => {
    rebuildLinkOptions();
    if (!['student','professor','surveillant'].includes(roleSelect.value)) linkSelect.value = '';
  };
  linkSelect.onchange = () => {
    const o = linkSelect.selectedOptions[0];
    if (!o) return;
    nameInput.value = o.dataset.name || '';
    if (emailInput.value) usernameInput.value = emailInput.value.split('@')[0];
  };
  emailInput.oninput = () => { if (!idInput.value) usernameInput.value = String(emailInput.value || '').split('@')[0]; };
  cancelBtn.onclick = resetForm;

  form.onsubmit = async e => {
    e.preventDefault();
    if (recruiterView) { toast('La création et la modification des rôles sont réservées à l’administration.', 'error'); return; }
    try {
      const fd = new FormData(form);
      const editingId = String(fd.get('id') || '').trim();
      const role = String(fd.get('role') || 'student');
      if (!editingId) fd.set('username', String(fd.get('email') || '').split('@')[0] || 'compte');
      const linkId = linkSelect.value || null;
      const linkPayload = {
        student_id: role === 'student' ? linkId : null,
        professor_id: role === 'professor' ? linkId : null,
        supervisor_id: role === 'surveillant' ? linkId : null
      };

      if (editingId) {
        if (editingId === String(p.id) && role !== 'admin') throw new Error('Vous ne pouvez pas retirer votre propre rôle administrateur ici.');
        fd.set('active', 'true');

        const newEmail = String(fd.get('email') || '').trim().toLowerCase();
        if (!newEmail.endsWith('@midori.fr')) {
          throw new Error('L’e-mail d’accès doit obligatoirement être une adresse @midori.fr.');
        }

        const oldProfile = profs.find(x => String(x.id) === editingId);
        const oldEmail = String(oldProfile?.email || '').trim().toLowerCase();

        if (newEmail !== oldEmail) {
          const { data: emailResult, error: emailError } = await sb.functions.invoke('admin-update-user-email', {
            body: { user_id: editingId, new_email: newEmail }
          });
          if (emailError) {
            let message = errMsg(emailError);
            try {
              const ctx = await emailError.context?.json?.();
              if (ctx?.error) message = ctx.error;
            } catch (_) {}
            throw new Error(message);
          }
          if (emailResult?.error) throw new Error(emailResult.error);
        }

        const r = await update('profiles', editingId, {
          email: newEmail,
          username: String(fd.get('username') || '').trim(),
          full_name: String(fd.get('full_name') || '').trim(),
          role,
          active: true,
          ...linkPayload
        });
        await log('update', 'profile', r.id, { username: r.username, role: r.role, active: r.active });
        toast('Accès modifié.');
      } else {
        const r = await sb.rpc('admin_create_profile_linked', {
          p_email: fd.get('email'),
          p_username: fd.get('username'),
          p_full_name: fd.get('full_name'),
          p_role: role,
          p_active: true,
          p_student_id: role === 'student' ? linkId : null,
          p_professor_id: role === 'professor' ? linkId : null,
          p_supervisor_id: role === 'surveillant' ? linkId : null
        });
        if (r.error) throw r.error;
        let profileId = r.data?.id || (Array.isArray(r.data) ? r.data[0]?.id : null);
        if (!profileId) {
          const fr = await sb.from('profiles').select('id').eq('email', fd.get('email')).maybeSingle();
          if (fr.error) throw fr.error;
          profileId = fr.data?.id || null;
        }
        if (profileId) await update('profiles', profileId, linkPayload);
        await log('create', 'profile', profileId, { username: fd.get('username'), role });
        toast('Accès créé / mis à jour.');
      }
      location.reload();
    } catch (er) {
      toast(errMsg(er), 'error');
    }
  };

  qsa('[data-edit-profile]').forEach(b => b.onclick = () => {
    const profile = profs.find(x => String(x.id) === String(b.dataset.editProfile));
    if (profile) startEdit(profile);
  });

  const generateTempPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
    const values = new Uint32Array(14);
    crypto.getRandomValues(values);
    return Array.from(values, v => chars[v % chars.length]).join('');
  };

  qsa('[data-create-auth]').forEach(b => b.onclick = async () => {
    const profileId = b.dataset.createAuth;
    const personId = b.dataset.personId;
    const profile = profs.find(x => String(x.id) === String(profileId));
    const name = profile?.full_name || profile?.username || 'cet utilisateur';
    const suggestedEmail = profile?.school_email || profile?.email || '';
    const email = prompt(`Adresse scolaire du compte pour ${name}:`, suggestedEmail);
    if (email === null) return;
    const normalized = email.trim().toLowerCase();
    if (!normalized.endsWith('@midori.fr')) {
      toast('L’e-mail doit se terminer par @midori.fr.', 'error');
      return;
    }
    const temporaryPassword = generateTempPassword();
    if (!confirm(`Créer le compte Supabase pour ${name} ?\n\nE-mail : ${normalized}\n\nUn mot de passe temporaire sera généré et affiché une seule fois.`)) return;
    try {
      b.disabled = true;
      b.textContent = 'Création…';
      const { data, error } = await sb.functions.invoke('admin-create-user', {
        body: { person_id: personId, profile_id: profileId, email: normalized, password: temporaryPassword }
      });
      if (error) {
        let message = errMsg(error);
        try { const ctx = await error.context?.json?.(); if (ctx?.error) message = ctx.error; } catch (_) {}
        throw new Error(message);
      }
      if (data?.error) throw new Error(data.error);
      alert(`COMPTE CRÉÉ\n\nIdentifiant : ${normalized}\nMot de passe temporaire : ${temporaryPassword}\n\n⚠️ Copiez-le maintenant : il ne sera pas enregistré dans le portail.`);
      toast('Compte Supabase créé.');
      location.reload();
    } catch (er) {
      b.disabled = false;
      b.textContent = '👤 Créer compte';
      toast(errMsg(er), 'error');
    }
  });

  qsa('[data-reset-password]').forEach(b => b.onclick = async () => {
    const profileId = b.dataset.resetPassword;
    const profile = profs.find(x => String(x.id) === String(profileId));
    const name = profile?.full_name || profile?.username || 'cet utilisateur';
    if (!confirm(`Réinitialiser le mot de passe de ${name} ?\n\nUn nouveau mot de passe temporaire sera généré.`)) return;
    try {
      b.disabled = true;
      b.textContent = 'Réinitialisation…';
      const { data, error } = await sb.functions.invoke('admin-reset-user-password', {
        body: { profile_id: profileId }
      });
      if (error) {
        let message = errMsg(error);
        try { const ctx = await error.context?.json?.(); if (ctx?.error) message = ctx.error; } catch (_) {}
        throw new Error(message);
      }
      if (data?.error) throw new Error(data.error);
      alert(`NOUVEAU MOT DE PASSE\n\nCompte : ${data?.email || profile?.school_email || profile?.email || '—'}\nMot de passe temporaire : ${data?.temporary_password || '—'}\n\n⚠️ Copiez-le maintenant : il ne sera pas enregistré dans le portail.`);
      toast('Mot de passe réinitialisé.');
      b.disabled = false;
      b.textContent = '🔑 Réinitialiser';
    } catch (er) {
      b.disabled = false;
      b.textContent = '🔑 Réinitialiser';
      toast(errMsg(er), 'error');
    }
  });

  qsa('[data-change-email]').forEach(b => b.onclick = async () => {
    const id = b.dataset.changeEmail;
    const currentEmail = b.dataset.currentEmail || '';
    const profile = profs.find(x => String(x.id) === String(id));
    const name = profile?.full_name || profile?.username || 'cet utilisateur';
    const newEmail = prompt(`Nouvel e-mail Midori pour ${name}\n\nAdresse actuelle : ${currentEmail}\n\nEntrez une adresse @midori.fr :`, currentEmail);
    if (newEmail === null) return;
    const normalized = newEmail.trim().toLowerCase();
    if (!normalized) return;
    if (!normalized.endsWith('@midori.fr')) {
      toast('L’e-mail doit se terminer par @midori.fr.', 'error');
      return;
    }
    if (normalized === currentEmail.toLowerCase()) {
      toast('Aucun changement.');
      return;
    }
    try {
      b.disabled = true;
      b.textContent = 'Modification…';
      const { data: sessionData, error: sessionError } = await sb.auth.getSession();
      if (sessionError) throw sessionError;
      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) throw new Error('Votre session administrateur a expiré. Déconnectez-vous puis reconnectez-vous.');

      const { data, error } = await sb.functions.invoke('admin-update-user-email', {
        body: { user_id: id, new_email: normalized },
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (error) {
        let message = errMsg(error);
        try {
          const ctx = await error.context?.json?.();
          if (ctx?.error) message = ctx.error;
        } catch (_) {}
        throw new Error(message);
      }
      if (data?.error) throw new Error(data.error);
      toast(`E-mail modifié : ${normalized}`);
      const row = b.closest('tr');
      const emailCell = row?.querySelector('td');
      if (emailCell) emailCell.textContent = normalized;
      b.dataset.currentEmail = normalized;
      b.disabled = false;
      b.textContent = '✉️ E-mail';
    } catch (er) {
      console.error('Modification e-mail :', er);
      b.disabled = false;
      b.textContent = '✉️ E-mail';
      toast(errMsg(er), 'error');
    }
  });

  qsa('[data-relink-auth]').forEach(b => b.onclick = async () => {
    const profileId = b.dataset.relinkAuth;
    const profile = profs.find(x => String(x.id) === String(profileId));
    const name = profile?.full_name || profile?.username || 'cet utilisateur';

    const authEmail = prompt(
      `Adresse du NOUVEAU compte Supabase Authentication pour ${name}\n\n` +
      `Le compte doit déjà avoir été créé dans Authentication → Users.\n` +
      `Utilisez son adresse @midori.fr :`,
      ''
    );

    if (authEmail === null) return;

    const normalized = authEmail.trim().toLowerCase();
    if (!normalized) return;

    if (!normalized.endsWith('@midori.fr')) {
      toast('Le compte Auth doit utiliser une adresse @midori.fr.', 'error');
      return;
    }

    if (!confirm(`Relier le profil « ${name} » au compte Auth ${normalized} ?\n\nLes données du profil Midori seront conservées.`)) {
      return;
    }

    try {
      b.disabled = true;
      b.textContent = 'Liaison…';

      const { data: sessionData, error: sessionError } = await sb.auth.getSession();
      if (sessionError) throw sessionError;

      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) {
        throw new Error('Votre session administrateur a expiré. Déconnectez-vous puis reconnectez-vous.');
      }

      const { data, error } = await sb.functions.invoke('admin-relink-profile', {
        body: {
          profile_id: profileId,
          auth_email: normalized
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (error) {
        let message = errMsg(error);
        try {
          const ctx = await error.context?.json?.();
          if (ctx?.error) message = ctx.error;
        } catch (_) {}
        throw new Error(message);
      }

      if (data?.error) throw new Error(data.error);

      toast(`Compte Auth relié : ${normalized}`);
      setTimeout(() => location.reload(), 700);
    } catch (er) {
      console.error('Liaison profil / Auth :', er);
      b.disabled = false;
      b.textContent = '🔗 Relier Auth';
      toast(errMsg(er), 'error');
    }
  });

  // V17.7 : plus de bouton de révocation/réactivation. Les suppressions de comptes sont définitives.

  qsa('[data-delete-profile]').forEach(b => b.onclick = async () => {
    const id = b.dataset.deleteProfile;
    const email = b.dataset.profileEmail || 'ce compte';
    const first = confirm(`⚠️ SUPPRESSION DÉFINITIVE ET TOTALE\n\nLe profil ${email}, toutes ses données liées dans le portail et son compte Supabase Authentication seront supprimés.\n\nLes historiques WL/RP et les journaux du portail liés à ce profil seront également supprimés.\n\nCette action est irréversible. Continuer ?`);
    if (!first) return;
    const second = prompt('Pour confirmer la suppression définitive, tapez SUPPRIMER');
    if (second !== 'SUPPRIMER') { toast('Suppression annulée.', 'error'); return; }
    try {
      b.disabled = true;
      b.textContent = 'Suppression…';
      await hardDelete('profile', id);
      toast('Compte supprimé définitivement.');
      location.reload();
    } catch (er) {
      b.disabled = false;
      b.textContent = '🗑️ Supprimer définitivement';
      toast(errMsg(er), 'error');
    }
  });
}

async function renderLogs() {
  const list = await rows('activity_logs', 'id,action,entity,entity_id,details,created_at,profiles(full_name,username)', { order: 'created_at', ascending: false, limit: 500 });
  qs('#app').innerHTML = head('Journal d’activité', 'Traçabilité des principales actions du portail.') + `<div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Auteur</th><th>Action</th><th>Objet</th><th>Détails</th></tr></thead><tbody>${list.map(x => `<tr><td>${dtFR(x.created_at)}</td><td>${esc(x.profiles?.full_name || 'Système')}</td><td>${badge(x.action)}</td><td>${esc(x.entity || '—')}</td><td><pre style="white-space:pre-wrap;font:inherit">${esc(JSON.stringify(x.details || {}, null, 2))}</pre></td></tr>`).join('') || tableEmpty(5)}</tbody></table></div></div>`;
}

async function renderProfile(p) {
  qs('#app').innerHTML = head('Mon profil', 'Informations de votre compte portail.') + `<div class="card"><div class="grid g2"><div><p><strong>Nom :</strong> ${esc(p.full_name)}</p><p><strong>Identifiant du portail :</strong> ${esc(p.email)}</p><p><strong>E-mail :</strong> ${esc(p.email)}</p><p><strong>Rôle :</strong> ${esc(ROLE_LABEL[p.role] || p.role)}</p></div><div>${p.student_id ? '<span class="tag">Compte lié à une fiche élève</span>' : ''}${p.professor_id ? '<span class="tag">Compte lié à une fiche professeur</span>' : ''}${p.supervisor_id ? '<span class="tag">Compte lié à une fiche surveillant</span>' : ''}<div class="notice" style="margin-top:12px">Pour modifier un mot de passe, utilisez la gestion des utilisateurs de Supabase Authentication.</div></div></div></div>`;
}

async function renderProfSpace(p) {
  const prof = await professorRow(p);
  const classes = await rows('professor_classes', 'class_id,classes(name)', { order: 'created_at' });
  const ownClasses = classes.filter(x => x.class_id && x.classes);
  const tt = await rows('timetable', 'id,day_of_week,start_time,end_time,room,class_id,professor_id,subjects(name),classes(name)', { order: 'day_of_week' });
  const ownTt = tt.filter(x => x.professor_id === prof.id);
  qs('#app').innerHTML = head('Espace professeur', 'Votre espace de travail pédagogique.') + `<div class="hero"><h2>Bonjour ${esc(p.full_name)}.</h2><p>${esc(prof.subject || 'Professeur')} · ${ownClasses.length} classe(s) assignée(s)</p><div class="actions"><a href="prof-attendance.html" class="btn secondary">📝 Faire l’appel</a><a href="prof-grades.html" class="btn secondary">💯 Saisir une note</a><a href="prof-homework.html" class="btn secondary">📓 Donner un devoir</a></div></div><div class="grid g3" style="margin-top:15px">${statCard('Classes', ownClasses.length, '🏫')}${statCard('Cours planifiés', ownTt.length, '🗓️')}${statCard('Matière', prof.subject || '—', '📚')}</div><div class="card" style="margin-top:15px"><h3>Vos classes</h3><div class="list" style="margin-top:10px">${ownClasses.map(c => `<div class="item"><strong>${esc(c.classes.name)}</strong><span>Classe assignée</span></div>`).join('') || '<div class="empty">Aucune classe assignée. Demandez à l’administration de vous rattacher une classe.</div>'}</div></div>`;
}
async function renderProfResources(p) {
  const prof = await professorRow(p); const sub = await rows('subjects', 'id,name', { order: 'name' }); const list = await rows('resources', 'id,title,description,url,subject_id,professor_id,created_at', { order: 'created_at', ascending: false }); const own = list.filter(r => r.professor_id === prof.id);
  qs('#app').innerHTML = head('Ressources', 'Vos documents et liens de cours.') + `<div class="toolbar"><button id="ra" class="btn primary">+ Ajouter</button></div><div class="list">${own.map(r => `<div class="card"><div class="toolbar"><div><h3>${esc(r.title)}</h3><span class="muted">${esc(sub.find(s => s.id === r.subject_id)?.name || '')} · ${dtFR(r.created_at)}</span></div><a class="btn secondary small" href="${esc(r.url)}" target="_blank">Ouvrir</a></div><p>${esc(r.description || '')}</p></div>`).join('') || '<div class="card empty">Aucune ressource.</div>'}</div>` + modal('rm', 'Ressource', `<form id="rf" class="form"><div class="field"><label>Titre</label><input name="title" required></div><div class="field"><label>Matière</label><select name="subject_id">${opts(sub)}</select></div><div class="field full"><label>URL</label><input name="url" type="url" required></div><div class="field full"><label>Description</label><textarea name="description"></textarea></div><div class="field full"><button class="btn primary">Enregistrer</button></div></form>`); qs('#ra').onclick = () => openModal('rm'); closeBindings(); qs('#rf').onsubmit = async e => { e.preventDefault(); const f = new FormData(e.target); try { const r = await add('resources', { professor_id: prof.id, title: f.get('title'), subject_id: f.get('subject_id') || null, url: f.get('url'), description: f.get('description') || null }); await log('create', 'resource', r.id, null); toast('Ressource ajoutée.'); location.reload(); } catch (er) { toast(errMsg(er), 'error'); } };
}
async function renderProfTimetable(p) {
  const prof = await professorRow(p);
  const list = await rows('timetable', 'day_of_week,start_time,end_time,room,classes(name),subjects(name),professor_id', { order: 'day_of_week' });
  const own = list.filter(x => x.professor_id === prof.id);
  const days = ['', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  qs('#app').innerHTML = head('Emploi du temps', 'Vos cours planifiés.') + `<div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Jour</th><th>Horaire</th><th>Classe</th><th>Matière</th><th>Salle</th></tr></thead><tbody>${own.map(r => `<tr><td>${days[r.day_of_week]}</td><td>${String(r.start_time).slice(0,5)}–${String(r.end_time).slice(0,5)}</td><td>${esc(r.classes?.name || '')}</td><td>${esc(r.subjects?.name || '')}</td><td>${esc(r.room || '—')}</td></tr>`).join('') || tableEmpty(5)}</tbody></table></div></div>`;
}

async function renderSupervisorSpace(p) { const s = await supervisorRow(p); const [rep, san] = await Promise.all([sb.from('supervisor_reports').select('id', { count: 'exact', head: true }).eq('supervisor_id', s.id), sb.from('sanctions').select('id', { count: 'exact', head: true }).eq('supervisor_id', s.id)]); if (rep.error) throw rep.error; if (san.error) throw san.error; qs('#app').innerHTML = head('Espace surveillant', 'Surveillance, incidents et vie scolaire.') + `<div class="hero"><h2>Bonjour ${esc(p.full_name)}.</h2><p>Vous assurez le suivi quotidien des élèves.</p><div class="actions"><a href="supervisor-absences.html" class="btn secondary">⏱️ Voir les absences</a><a href="supervisor-reports.html" class="btn secondary">📄 Rédiger un rapport</a><a href="supervisor-sanctions.html" class="btn secondary">⚖️ Enregistrer une sanction</a></div></div><div class="grid g2" style="margin-top:15px">${statCard('Vos rapports', rep.count || 0, '📄')}${statCard('Vos sanctions', san.count || 0, '⚖️')}</div>`; }
async function renderSupervisorReports(p) {
  const students = await rows('students', 'id,full_name,class_name', { order: 'full_name' });
  const supervisors = await rows('supervisors', 'id,full_name', { order: 'full_name' });
  const list = await rows('supervisor_reports', 'id,student_id,supervisor_id,date,category,description,severity,status,created_at,supervisors(full_name)', { order: 'date', ascending: false, limit: 500 });
  const ownSupervisor = p.role === 'surveillant' ? await supervisorRow(p) : null;
  const visible = ownSupervisor ? list.filter(x => x.supervisor_id === ownSupervisor.id) : list;
  const canCreate = p.role === 'admin' || p.role === 'surveillant';
  qs('#app').innerHTML = head('Rapports surveillants', 'Signalements, incidents et suivi de vie scolaire.') +
    (canCreate ? `<div class="toolbar"><button id="sra" class="btn primary">+ Nouveau rapport</button></div>` : '') +
    `<div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Élève</th><th>Catégorie</th><th>Gravité</th><th>Statut</th><th>Surveillant</th><th>Description</th></tr></thead><tbody>${visible.map(x=>`<tr><td>${dateFR(x.date)}</td><td>${esc(students.find(s=>s.id===x.student_id)?.full_name||'Élève')}</td><td>${esc(x.category)}</td><td>${badge(x.severity)}</td><td>${badge(x.status)}</td><td>${esc(x.supervisors?.full_name||'—')}</td><td>${esc(x.description)}</td></tr>`).join('')||tableEmpty(7)}</tbody></table></div></div>` +
    (canCreate ? modal('srm', 'Nouveau rapport', `<form id="srf" class="form"><div class="field full"><label>Élève</label><select name="student_id" required>${opts(students,'id','full_name')}</select></div><div class="field"><label>Date</label><input name="date" type="date" value="${today()}" required></div><div class="field"><label>Catégorie</label><input name="category" required placeholder="Incident, comportement, retard collectif…"></div><div class="field"><label>Gravité</label><select name="severity"><option>Faible</option><option>Modérée</option><option>Importante</option></select></div><div class="field"><label>Statut</label><select name="status"><option>Ouvert</option><option>Traité</option><option>Archivé</option></select></div>${p.role==='admin'?`<div class="field full"><label>Surveillant concerné</label><select name="supervisor_id" required>${opts(supervisors,'id','full_name')}</select></div>`:''}<div class="field full"><label>Description</label><textarea name="description" required></textarea></div><div class="field full"><button class="btn primary">Enregistrer</button></div></form>`) : '');
  if(canCreate){qs('#sra').onclick=()=>openModal('srm');closeBindings();qs('#srf').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target);try{const supervisor_id= p.role==='surveillant' ? ownSupervisor.id : f.get('supervisor_id');const r=await add('supervisor_reports',{student_id:f.get('student_id'),supervisor_id,date:f.get('date'),category:f.get('category'),description:f.get('description'),severity:f.get('severity'),status:f.get('status')});await log('create','supervisor_report',r.id,null);toast('Rapport enregistré.');location.reload()}catch(er){toast(errMsg(er),'error')}};}
}
async function renderSupervisorSanctions(p) { qs('#app').innerHTML = head('Sanctions', 'Les sanctions que vous avez enregistrées.') + `<a class="btn primary" href="discipline.html">Ouvrir la discipline</a>`; }
async function renderSupervisorAbsences(p) { await renderAbsences(p); }

async function studentRow(p) { if (!p.student_id) throw new Error('Votre compte n’est pas encore lié à une fiche élève.'); const r = await sb.from('students').select('*').eq('id', p.student_id).single(); if (r.error) throw r.error; return r.data; }
async function renderStudentSpace(p) { const s = await studentRow(p); const [a, g, h, pts] = await Promise.all([sb.from('absences').select('id,type,justifie', { count: 'exact' }).eq('student_id', s.id), sb.from('grades').select('value,coefficient').eq('student_id', s.id), sb.from('homework').select('id,class_id').eq('class_id', s.class_id), sb.from('student_points').select('points').eq('student_id', s.id)]); if (a.error) throw a.error; if (g.error) throw g.error; if (h.error) throw h.error; if (pts.error) throw pts.error; const total = (pts.data || []).reduce((n,x)=>n+Number(x.points||0),0); const validGrades = (g.data || []).filter(x => x.value != null); const avg = validGrades.length ? (validGrades.reduce((n,x)=>n+Number(x.value)*Number(x.coefficient||1),0)/validGrades.reduce((n,x)=>n+Number(x.coefficient||1),0)).toFixed(2) : '—'; qs('#app').innerHTML = head('Espace élève', 'Votre vie scolaire à Midori High.') + `<div class="hero"><h2>Bienvenue, ${esc(s.full_name)}.</h2><p>${esc(s.class_name || 'Classe non renseignée')} · réputation : ${esc(reputation(total))}</p><div class="actions"><a href="student-grades.html" class="btn secondary">💯 Mes notes</a><a href="student-homework.html" class="btn secondary">📓 Mes devoirs</a><a href="student-timetable.html" class="btn secondary">🗓️ Mon emploi du temps</a></div></div><div class="grid g4" style="margin-top:15px">${statCard('Absences', a.count || 0, '⏱️')}${statCard('Moyenne', `${avg}/20`, '💯')}${statCard('Réputation', `${total} pts`, '⭐')}${statCard('Devoirs', h.data?.length || 0, '📓')}</div>`; }
async function renderStudentGrades(p) { await renderGrades({ ...p, role:'student' }); }
async function renderStudentHomework(p) { await renderHomework({ ...p, role:'student' }); }
async function renderStudentTimetable(p) { const s = await studentRow(p); const list = await rows('timetable', 'day_of_week,start_time,end_time,room,classes(name),professors(full_name),subjects(name),class_id', { order:'day_of_week' }); const own = list.filter(x=>x.class_id===s.class_id); const days=['','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']; qs('#app').innerHTML=head('Mon emploi du temps','Planning de votre classe.')+`<div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Jour</th><th>Horaire</th><th>Matière</th><th>Professeur</th><th>Salle</th></tr></thead><tbody>${own.map(r=>`<tr><td>${days[r.day_of_week]}</td><td>${String(r.start_time).slice(0,5)}–${String(r.end_time).slice(0,5)}</td><td>${esc(r.subjects?.name||'')}</td><td>${esc(r.professors?.full_name||'')}</td><td>${esc(r.room||'—')}</td></tr>`).join('')||tableEmpty(5)}</tbody></table></div></div>`; }
async function renderStudentAttendance(p) { const s=await studentRow(p); const list=await rows('attendance','id,student_id,date,status,arrival_time,reason,comment,timetable_id,justified,timetable(subjects(name),classes(name),start_time,end_time)',{order:'date',ascending:false,limit:300}); const own=list.filter(x=>x.student_id===s.id || x.timetable?.classes?.name===s.class_name); qs('#app').innerHTML=head('Mes absences','Votre historique de présence.')+`<div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Matière</th><th>Statut</th><th>Heure</th><th>Motif</th><th>Justifié</th></tr></thead><tbody>${own.map(r=>`<tr><td>${dateFR(r.date)}</td><td>${esc(r.timetable?.subjects?.name||'')}</td><td>${r.status==='absent'?'<span class="tag red">Absent</span>':r.status==='retard'?'<span class="tag yellow">Retard</span>':'<span class="tag">Présent</span>'}</td><td>${esc(r.arrival_time?String(r.arrival_time).slice(0,5):'—')}</td><td>${esc(r.reason||'—')}</td><td>${r.justified?'Oui':'Non'}</td></tr>`).join('')||tableEmpty(6)}</tbody></table></div></div>`; }

async function renderStudentPoints(p){
  const s=await studentRow(p);
  const pts=await rows('student_points','id,points,reason,category,comment,created_at',{order:'created_at',ascending:false,limit:300});
  const mine=pts.filter(x=>x.student_id===s.id);
  const total=mine.reduce((n,x)=>n+Number(x.points||0),0);
  qs('#app').innerHTML=head('Ma réputation','Historique des points attribués à votre personnage.')+`<div class="grid g3">${statCard('Total',`${total} pts`,'⭐')}${statCard('Réputation',reputation(total),'🏅')}${statCard('Mouvements',mine.length,'📜')}</div><div class="card" style="margin-top:15px"><h3>Historique</h3><div class="table-wrap" style="margin-top:10px"><table class="table"><thead><tr><th>Date</th><th>Points</th><th>Motif</th><th>Commentaire</th></tr></thead><tbody>${mine.map(x=>`<tr><td>${dtFR(x.created_at)}</td><td><strong>${Number(x.points)>0?'+':''}${Number(x.points)}</strong></td><td>${esc(x.reason)}</td><td>${esc(x.comment||'—')}</td></tr>`).join('')||tableEmpty(4)}</tbody></table></div></div>`;
}
async function renderStudentAppointments(p) { const s=await studentRow(p); const list=await rows('appointments','id,student_id,practitioner_id,practitioner_role,type,appointment_date,appointment_time,duration,status,reason,profiles(full_name,role)',{order:'appointment_date',ascending:true}); const own=list.filter(x=>x.student_id===s.id); qs('#app').innerHTML=head('Mes rendez-vous','Suivi infirmerie et psychologie.')+`<div class="list">${own.map(x=>`<div class="card"><h3>${esc(x.type)}</h3><p class="muted" style="margin-top:5px">${dateFR(x.appointment_date)} à ${String(x.appointment_time||'').slice(0,5)} · ${esc(x.status)}</p><p style="margin-top:7px">${esc(x.reason||'Aucun motif communiqué')}</p><p class="muted" style="margin-top:6px">Professionnel : ${esc(x.profiles?.full_name||'—')}</p></div>`).join('')||'<div class="card empty">Aucun rendez-vous.</div>'}</div>`; }
async function renderStudentClubs(p) { const s=await studentRow(p); const [clubs,members,requests]=await Promise.all([rows('clubs','*',{order:'name'}),rows('club_members','club_id,student_id,role,joined_at',{order:'joined_at'}),rows('club_requests','club_id,status,message,created_at',{order:'created_at',ascending:false})]); const mine=members.filter(m=>m.student_id===s.id); qs('#app').innerHTML=head('Mes clubs','Vie associative et candidatures RP.')+`<div class="grid g2"><div class="card"><h3>Clubs ouverts</h3><div class="list" style="margin-top:10px">${clubs.filter(c=>c.status==='Actif').map(c=>`<div class="item"><div><strong>${esc(c.name)}</strong><span>${esc(c.description||'')}</span></div><button class="btn secondary small" data-request-club="${esc(c.id)}">Postuler</button></div>`).join('')||'<div class="empty">Aucun club actif.</div>'}</div></div><div class="card"><h3>Mes adhésions</h3><div class="list" style="margin-top:10px">${mine.map(m=>`<div class="item"><strong>${esc(clubs.find(c=>c.id===m.club_id)?.name||'Club')}</strong><span>${esc(m.role||'Membre')} · depuis ${dateFR(m.joined_at?.slice(0,10))}</span></div>`).join('')||'<div class="empty">Vous n’êtes membre d’aucun club.</div>'}</div></div></div>`+modal('crm','Candidature club',`<form id="crf" class="form"><input type="hidden" name="club_id"><div class="field full"><label>Message de motivation</label><textarea name="message" required></textarea></div><div class="field full"><button class="btn primary">Envoyer la candidature</button></div></form>`); qsa('[data-request-club]').forEach(b=>b.onclick=()=>{qs('#crf').club_id.value=b.dataset.requestClub;openModal('crm')}); closeBindings(); qs('#crf').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target);try{const r=await add('club_requests',{club_id:f.get('club_id'),student_id:s.id,message:f.get('message'),status:'En attente'});await log('create','club_request',r.id,null);toast('Candidature envoyée.');closeModal('crm');location.reload()}catch(er){toast(errMsg(er),'error')}}; }

async function renderAppointments(p, role) {
  const students=await rows('students','id,full_name,class_name,rp_status',{order:'full_name'}); const list=await rows('appointments','id,student_id,practitioner_id,practitioner_role,type,appointment_date,appointment_time,duration,status,reason,confidential_note,created_at,students(full_name,class_name,rp_status)',{order:'appointment_date',ascending:true,limit:500}); const own=list.filter(x=>x.practitioner_id===p.id);
  qs('#app').innerHTML=head('Rendez-vous', role==='psychologue'?'Suivi psychologique confidentiel.':'Rendez-vous infirmerie et suivi santé.')+`<div class="toolbar"><button id="apa" class="btn primary">+ Nouveau rendez-vous</button></div><div class="list">${own.map(x=>`<div class="card"><div class="toolbar"><div><h3>${esc(x.students?.full_name||'Élève')} ${rpStatusBadge(x.students?.rp_status)}</h3><span class="muted">${dateFR(x.appointment_date)} à ${String(x.appointment_time||'').slice(0,5)} · ${esc(x.type)} · ${esc(x.status)}</span></div>${badge(x.status)}</div><p>${esc(x.reason||'')}</p></div>`).join('')||'<div class="card empty">Aucun rendez-vous.</div>'}</div>`+modal('apm','Nouveau rendez-vous',`<form id="apf" class="form"><div class="field full"><label>Élève</label><select name="student_id" required>${opts(students,'id','full_name')}</select></div><div class="field"><label>Type</label><select name="type">${role==='psychologue'?'<option>Psychologie</option>':'<option>Infirmerie</option><option>Consultation</option>'}</select></div><div class="field"><label>Date</label><input name="appointment_date" type="date" value="${today()}" required></div><div class="field"><label>Heure</label><input name="appointment_time" type="time" required></div><div class="field"><label>Durée (min)</label><input name="duration" type="number" value="20" min="5"></div><div class="field"><label>Statut</label><select name="status"><option>Prévu</option><option>Terminé</option><option>Annulé</option></select></div><div class="field full"><label>Motif</label><textarea name="reason"></textarea></div><div class="field full"><button class="btn primary">Enregistrer</button></div></form>`);
  qs('#apa').onclick=()=>openModal('apm'); closeBindings(); qs('#apf').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target);try{const r=await add('appointments',{student_id:f.get('student_id'),practitioner_id:p.id,practitioner_role:role,type:f.get('type'),appointment_date:f.get('appointment_date'),appointment_time:f.get('appointment_time'),duration:Number(f.get('duration')||20),status:f.get('status'),reason:f.get('reason')||null});await log('create','appointment',r.id,null);toast('Rendez-vous créé.');location.reload()}catch(er){toast(errMsg(er),'error')}};
}
async function renderHealthRecords(p, role) {
  const students=await rows('students','id,full_name,class_name,rp_status',{order:'full_name'}); const table=role==='psychologue'?'psych_records':'medical_records'; const selectFields = role === 'psychologue' ? 'id,student_id,record_date,subject,notes,confidential_note,psychologue_id,created_at,students(full_name,class_name,rp_status)' : 'id,student_id,record_date,record_type,summary,confidential_note,nurse_id,created_at,students(full_name,class_name,rp_status)';
  const list=await rows(table,selectFields,{order:'record_date',ascending:false,limit:500}); const own=list.filter(x=>(role==='psychologue'?x.psychologue_id:x.nurse_id)===p.id);
  qs('#app').innerHTML=head(role==='psychologue'?'Dossiers confidentiels':'Dossiers infirmerie','Accès réservé au professionnel concerné.')+`<div class="notice" style="margin-bottom:15px">🔒 Les autres rôles du portail ne peuvent pas lire vos notes confidentielles.</div><div class="toolbar"><button id="hra" class="btn primary">+ Ajouter une note</button></div><div class="list">${own.map(x=>`<div class="card"><h3>${esc(x.students?.full_name||'Élève')} ${rpStatusBadge(x.students?.rp_status)}</h3><span class="muted">${dateFR(x.record_date)} · ${esc(role==='psychologue'?x.subject||'Suivi':x.record_type||'Visite')}</span><p style="margin-top:8px;white-space:pre-wrap">${esc(role==='psychologue'?x.notes||'':x.summary||'')}</p></div>`).join('')||'<div class="card empty">Aucun dossier.</div>'}</div>`+modal('hrm', 'Nouvelle note confidentielle', `<form id="hrf" class="form"><div class="field full"><label>Élève</label><select name="student_id" required>${opts(students,'id','full_name')}</select></div><div class="field"><label>Date</label><input name="record_date" type="date" value="${today()}" required></div><div class="field"><label>${role==='psychologue'?'Objet':'Type'}</label><input name="kind" required></div><div class="field full"><label>${role==='psychologue'?'Notes confidentielles':'Résumé de visite'}</label><textarea name="note" required></textarea></div><div class="field full"><label>Note confidentielle complémentaire</label><textarea name="confidential_note"></textarea></div><div class="field full"><button class="btn primary">Enregistrer</button></div></form>`);
  qs('#hra').onclick=()=>openModal('hrm');closeBindings();qs('#hrf').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target);try{let r;if(role==='psychologue')r=await add('psych_records',{student_id:f.get('student_id'),psychologue_id:p.id,record_date:f.get('record_date'),subject:f.get('kind'),notes:f.get('note'),confidential_note:f.get('confidential_note')||null});else r=await add('medical_records',{student_id:f.get('student_id'),nurse_id:p.id,record_date:f.get('record_date'),record_type:f.get('kind'),summary:f.get('note'),confidential_note:f.get('confidential_note')||null});await log('create',table,r.id,null);toast('Note enregistrée.');location.reload()}catch(er){toast(errMsg(er),'error')}};
}
async function renderPsychSpace(p){ const ap=await sb.from('appointments').select('id',{count:'exact',head:true}).eq('practitioner_id',p.id);if(ap.error)throw ap.error;qs('#app').innerHTML=head('Espace psychologue','Suivi confidentiel des élèves.')+`<div class="hero"><h2>Bonjour ${esc(p.full_name)}.</h2><p>Vos rendez-vous et notes confidentielles sont accessibles ici.</p><div class="actions"><a class="btn secondary" href="psych-appointments.html">🧠 Rendez-vous</a><a class="btn secondary" href="psych-records.html">🔒 Dossiers</a></div></div><div class="grid g2" style="margin-top:15px">${statCard('Rendez-vous',ap.count||0,'🧠')}${statCard('Confidentialité','Activée','🔒')}</div>`; }
async function renderNurseSpace(p){ const ap=await sb.from('appointments').select('id',{count:'exact',head:true}).eq('practitioner_id',p.id);if(ap.error)throw ap.error;qs('#app').innerHTML=head('Espace infirmière','Infirmerie et suivi santé RP.')+`<div class="hero"><h2>Bonjour ${esc(p.full_name)}.</h2><p>Gérez les rendez-vous et dossiers d’infirmerie.</p><div class="actions"><a class="btn secondary" href="nurse-appointments.html">🩺 Rendez-vous</a><a class="btn secondary" href="nurse-records.html">🔒 Dossiers</a></div></div><div class="grid g2" style="margin-top:15px">${statCard('Rendez-vous',ap.count||0,'🩺')}${statCard('Accès','Confidentiel','🔒')}</div>`; }

async function renderStudentClubRequestsAdmin() {}

async function init() {
  const page = location.pathname.split('/').pop() || 'dashboard.html';
  if (page === 'index.html' || page === '') return;
  const roles = PAGE_ROLES[page] || [];
  const ctx = await guard(roles);
  if (!ctx) return;
  await loadPortalFunctions(ctx.profile);

  // Pour un compte disposant de plusieurs fonctions, le mode sélectionné est un espace séparé.
  // Cela évite d'afficher ou d'utiliser les outils WL depuis l'espace CPE,
  // tout en gardant un seul compte de connexion.
  const wlPages = new Set(['wl.html', 'profiles.html']);
  const mode = portalModeFor(ctx.profile);
  if (wlPages.has(page) && mode !== 'wl') {
    location.href = HOME[ctx.profile.role] || 'dashboard.html';
    return;
  }
  if (!wlPages.has(page) && page !== 'profile.html' && mode === 'wl' && page === 'dashboard.html') {
    location.href = 'wl.html';
    return;
  }

  shell(ctx.profile);
  try {
    switch (page) {
      case 'dashboard.html': await renderDashboard(); break;
      case 'messages.html': await renderMessages(ctx.profile); break;
      case 'homework-submissions.html': await renderHomeworkSubmissions(ctx.profile); break;
      case 'announcements.html': await renderAnnouncements(ctx.profile); break;
      case 'students.html': await renderStudents(); break;
      case 'student-profile.html': await renderStudentProfile(ctx.profile, ctx.profile.role === 'admin'); break;
      case 'professors.html': await renderProfessors(); break;
      case 'supervisors.html': await renderSupervisors(); break;
      case 'classes.html': await renderClasses(); break;
      case 'subjects.html': await renderSubjects(); break;
      case 'timetable.html': await renderTimetable(); break;
      case 'attendance.html': await renderAttendance(ctx.profile); break;
      case 'prof-attendance.html': await renderAttendance(ctx.profile, true); break;
      case 'absences.html': await renderAbsences(ctx.profile); break;
      case 'grades.html': await renderGrades(ctx.profile); break;
      case 'prof-grades.html': await renderGrades(ctx.profile, true); break;
      case 'student-grades.html': await renderStudentGrades(ctx.profile); break;
      case 'homework.html': await renderHomework(ctx.profile); break;
      case 'prof-homework.html': await renderHomework(ctx.profile, true); break;
      case 'student-homework.html': await renderStudentHomework(ctx.profile); break;
      case 'points.html': await renderPoints(); break;
      case 'discipline.html': await renderDiscipline(ctx.profile); break;
      case 'clubs.html': await renderAdminClubs(); break;
      case 'events.html': await renderEvents(ctx.profile); break;
      case 'access.html': await renderAccess(ctx.profile); break;
      case 'profile-management.html': await renderProfileManagement(ctx.profile); break;
      case 'wl-import.html': await renderWLImport(ctx.profile); break;
      case 'migration.html': await renderMigration(ctx.profile); break;
      case 'wl.html': if (new URLSearchParams(location.search).get('view') === 'profiles') await renderProfileManagement(ctx.profile); else await renderWLRegistry(ctx.profile); break;
      case 'profiles.html': await renderProfilesChooser(ctx.profile); break;
      case 'logs.html': await renderLogs(); break;
      case 'profile.html': await renderProfile(ctx.profile); break;
      case 'prof-space.html': await renderProfSpace(ctx.profile); break;
      case 'prof-resources.html': await renderProfResources(ctx.profile); break;
      case 'prof-timetable.html': await renderProfTimetable(ctx.profile); break;
      case 'supervisor-space.html': await renderSupervisorSpace(ctx.profile); break;
      case 'supervisor-absences.html': await renderSupervisorAbsences(ctx.profile); break;
      case 'supervisor-sanctions.html': await renderDiscipline(ctx.profile); break;
      case 'supervisor-reports.html': await renderSupervisorReports(ctx.profile); break;
      case 'student-space.html': await renderStudentSpace(ctx.profile); break;
      case 'student-timetable.html': await renderStudentTimetable(ctx.profile); break;
      case 'student-attendance.html': await renderStudentAttendance(ctx.profile); break;
      case 'student-points.html': await renderStudentPoints(ctx.profile); break;
      case 'student-appointments.html': await renderStudentAppointments(ctx.profile); break;
      case 'student-clubs.html': await renderStudentClubs(ctx.profile); break;
      case 'psych-space.html': await renderPsychSpace(ctx.profile); break;
      case 'psych-appointments.html': await renderAppointments(ctx.profile, 'psychologue'); break;
      case 'psych-records.html': await renderHealthRecords(ctx.profile, 'psychologue'); break;
      case 'nurse-space.html': await renderNurseSpace(ctx.profile); break;
      case 'nurse-appointments.html': await renderAppointments(ctx.profile, 'infirmiere'); break;
      case 'nurse-records.html': await renderHealthRecords(ctx.profile, 'infirmiere'); break;
      default: qs('#app').innerHTML = `<div class="card error">Page non configurée.</div>`;
    }
    try { await enhanceClassFilteredTables(); } catch (enhanceError) { console.warn('Filtres de classes non appliqués:', enhanceError); }
  } catch (er) {
    console.error('Midori High — erreur page', page, er);
    qs('#app').innerHTML = head(TITLE[page] || 'Portail', 'Une erreur a empêché le chargement de cette page.') + `<div class="card"><div class="notice error"><strong>Erreur détectée :</strong><br>${esc(errMsg(er))}</div><p class="muted" style="margin-top:12px">Si l'erreur concerne Supabase, vérifiez d'abord les fonctions et permissions installées pour cette version.</p><button class="btn secondary" onclick="location.reload()">Réessayer</button></div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (location.pathname.split('/').pop() === 'index.html' || location.pathname.endsWith('/')) initLogin();
  else init();
});
