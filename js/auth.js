/* CampusFlow - FRONTEND DEMO MODE
 * - No login needed: every page opens directly.
 * - All /api/... calls are answered by a built-in mock (data kept in localStorage).
 * - Use the "Demo role" dropdown in the sidebar to switch Admin / Faculty / Student.
 */
(() => {
  const USERS = {
    ADMIN: { user_id: 1, name: 'Demo Admin', email: 'admin@campus.edu', role: 'ADMIN' },
    FACULTY: { user_id: 2, name: 'Demo Faculty', email: 'faculty@campus.edu', role: 'FACULTY' },
    STUDENT: { user_id: 3, name: 'Demo Student', email: 'student@campus.edu', role: 'STUDENT' }
  };
  const DB_KEY = 'campusflow_demo_db';
  const ROLE_KEY = 'campusflow_demo_role';

  // ---------- current demo role ----------
  let role = document.body.dataset.role || localStorage.getItem(ROLE_KEY) || 'ADMIN';
  if (!USERS[role]) role = 'ADMIN';
  localStorage.setItem(ROLE_KEY, role);
  const user = USERS[role];
  localStorage.setItem('campusflow_token', 'demo-token');
  localStorage.setItem('campusflow_user', JSON.stringify(user));

  // ---------- mock database ----------
  function seed() {
    return {
      nextId: 100,
      users: [
        { user_id: 1, name: 'Demo Admin', email: 'admin@campus.edu', role: 'ADMIN' },
        { user_id: 2, name: 'Dr. Meena Rao', email: 'faculty@campus.edu', role: 'FACULTY' },
        { user_id: 4, name: 'Prof. Arjun Nair', email: 'arjun@campus.edu', role: 'FACULTY' },
        { user_id: 3, name: 'Demo Student', email: 'student@campus.edu', role: 'STUDENT' },
        { user_id: 5, name: 'Priya S', email: 'priya@campus.edu', role: 'STUDENT' },
        { user_id: 6, name: 'Karthik M', email: 'karthik@campus.edu', role: 'STUDENT' },
        { user_id: 7, name: 'Divya R', email: 'divya@campus.edu', role: 'STUDENT' }
      ],
      announcements: [
        { announcement_id: 1, title: 'Semester exam timetable released', description: 'The end-semester timetable is now available on the notice board.', category: 'Academic', status: 'Active' },
        { announcement_id: 2, title: 'Annual Tech Fest', description: 'Registrations for the annual tech fest open this Monday.', category: 'Events', status: 'Active' },
        { announcement_id: 3, title: 'Library timing change', description: 'The library will stay open until 9 PM during exam weeks.', category: 'Facilities', status: 'Active' }
      ],
      rooms: [
        { room_id: 1, room_number: 'A-101', building: 'Main Block', floor: 1, room_type: 'Classroom', capacity: 60, status: 'Available' },
        { room_id: 2, room_number: 'A-204', building: 'Main Block', floor: 2, room_type: 'Seminar Hall', capacity: 120, status: 'Occupied' },
        { room_id: 3, room_number: 'B-Lab1', building: 'Science Block', floor: 0, room_type: 'Computer Lab', capacity: 40, status: 'Available' },
        { room_id: 4, room_number: 'B-305', building: 'Science Block', floor: 3, room_type: 'Classroom', capacity: 50, status: 'Available' },
        { room_id: 5, room_number: 'C-Aud', building: 'Auditorium', floor: 0, room_type: 'Auditorium', capacity: 500, status: 'Occupied' }
      ],
      complaints: [
        { complaint_id: 1, user_id: 3, title: 'Projector not working', description: 'The projector in A-101 does not turn on.', category: 'Facilities', location: 'Main Block, A-101', status: 'Pending', user_name: 'Demo Student', user_role: 'STUDENT', user_email: 'student@campus.edu' },
        { complaint_id: 2, user_id: 5, title: 'Water leakage in corridor', description: 'Water is leaking near the second floor washroom.', category: 'Facilities', location: 'Science Block, floor 2', status: 'In Progress', user_name: 'Priya S', user_role: 'STUDENT', user_email: 'priya@campus.edu' },
        { complaint_id: 3, user_id: 2, title: 'Broken lab chairs', description: 'Several chairs in Lab1 need repair.', category: 'Facilities', location: 'Science Block, Lab1', status: 'Resolved', user_name: 'Dr. Meena Rao', user_role: 'FACULTY', user_email: 'faculty@campus.edu' },
        { complaint_id: 4, user_id: 6, title: 'Poor street lighting near hostel', description: 'The path to the hostel is dark after 7 PM.', category: 'Safety', location: 'Hostel road', status: 'Pending', user_name: 'Karthik M', user_role: 'STUDENT', user_email: 'karthik@campus.edu' }
      ],
      lostFound: [
        { item_id: 1, item_type: 'Lost', item_name: 'Black backpack', description: 'Black backpack with a blue keychain, lost near the canteen.', status: 'Open' },
        { item_id: 2, item_type: 'Found', item_name: 'Scientific calculator', description: 'Casio calculator found in room B-305.', status: 'Open' },
        { item_id: 3, item_type: 'Lost', item_name: 'ID card', description: 'Student ID card, name starts with K.', status: 'Open' }
      ],
      od: [
        { request_id: 1, user_id: 3, user_name: 'Demo Student', user_role: 'STUDENT', purpose: 'Inter-college hackathon', destination: 'NIT Trichy', start_date: '2026-10-05', end_date: '2026-10-07', details: 'Representing the college in a 48-hour hackathon.', status: 'Pending', digital_signature: '' },
        { request_id: 2, user_id: 5, user_name: 'Priya S', user_role: 'STUDENT', purpose: 'Sports competition', destination: 'Anna University', start_date: '2026-09-20', end_date: '2026-09-21', details: 'State-level athletics meet.', status: 'Approved', digital_signature: 'Digitally signed by Demo Admin' }
      ],
      leave: [
        { request_id: 1, user_id: 3, user_name: 'Demo Student', user_role: 'STUDENT', reason: 'Medical appointment', start_date: '2026-10-02', end_date: '2026-10-02', details: 'Doctor consultation.', status: 'Pending', digital_signature: '' },
        { request_id: 2, user_id: 2, user_name: 'Dr. Meena Rao', user_role: 'FACULTY', reason: 'Family function', start_date: '2026-10-10', end_date: '2026-10-11', details: 'Out of station.', status: 'Rejected', digital_signature: '' }
      ]
    };
  }
  let db;
  try { db = JSON.parse(localStorage.getItem(DB_KEY)); } catch (_) { db = null; }
  if (!db) db = seed();
  const save = () => { try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch (_) { /* ignore */ } };
  const newId = () => db.nextId++;
  const today = () => new Date().toISOString().slice(0, 10);

  // ---------- mock API ----------
  function route(method, path, body) {
    const parts = path.split('/').filter(Boolean);
    const [a, b, c] = parts;

    if (a === 'auth') {
      if (b === 'login') {
        const email = String(body.email || '').toLowerCase();
        const r = email.includes('admin') ? 'ADMIN' : email.includes('faculty') ? 'FACULTY' : 'STUDENT';
        localStorage.setItem(ROLE_KEY, r);
        return [200, { success: true, token: 'demo-token', user: { ...USERS[r], email: body.email || USERS[r].email } }];
      }
      return [200, { success: true, message: 'OK' }]; // register / logout
    }

    if (a === 'analytics') {
      const count = (r) => db.users.filter((u) => u.role === r).length;
      return [200, {
        success: true,
        analytics: {
          total_users: db.users.length,
          total_students: count('STUDENT'),
          total_faculty: count('FACULTY'),
          total_rooms: db.rooms.length,
          available_rooms: db.rooms.filter((r) => r.status === 'Available').length,
          total_complaints: db.complaints.length,
          active_complaints: db.complaints.filter((x) => x.status !== 'Resolved').length,
          resolved_complaints: db.complaints.filter((x) => x.status === 'Resolved').length,
          lost_items: db.lostFound.filter((x) => x.item_type === 'Lost').length,
          found_items: db.lostFound.filter((x) => x.item_type === 'Found').length
        }
      }];
    }

    if (a === 'users') {
      if (method === 'DELETE') {
        const id = Number(b);
        if (id === user.user_id) return [400, { success: false, message: 'You cannot delete your own account.' }];
        db.users = db.users.filter((u) => u.user_id !== id);
        save();
        return [200, { success: true }];
      }
      return [200, { success: true, users: db.users }];
    }

    if (a === 'announcements') {
      if (method === 'POST') {
        db.announcements.unshift({ announcement_id: newId(), title: body.title, description: body.description, category: body.category, status: 'Active' });
        save();
        return [201, { success: true }];
      }
      return [200, { success: true, announcements: db.announcements }];
    }

    if (a === 'rooms') {
      if (method === 'POST') {
        db.rooms.push({ room_id: newId(), room_number: body.room_number, building: body.building, floor: body.floor, room_type: body.room_type, capacity: body.capacity, status: 'Available' });
        save();
        return [201, { success: true }];
      }
      return [200, { success: true, rooms: db.rooms }];
    }

    if (a === 'complaints') {
      if (method === 'POST') {
        db.complaints.unshift({
          complaint_id: newId(), user_id: user.user_id, title: body.title, description: body.description,
          category: body.category, location: body.location, status: 'Pending',
          user_name: user.name, user_role: user.role, user_email: user.email
        });
        save();
        return [201, { success: true }];
      }
      if (b === 'my') return [200, { success: true, complaints: db.complaints.filter((x) => x.user_id === user.user_id) }];
      return [200, { success: true, complaints: db.complaints }];
    }

    if (a === 'lost-found') {
      if (method === 'POST') {
        db.lostFound.unshift({ item_id: newId(), item_type: body.item_type, item_name: body.item_name, description: body.description, status: 'Open' });
        save();
        return [201, { success: true }];
      }
      return [200, { success: true, items: db.lostFound }];
    }

    if (a === 'requests' && (b === 'od' || b === 'leave')) {
      const list = db[b];
      if (method === 'POST') {
        list.unshift({
          request_id: newId(), user_id: user.user_id, user_name: user.name, user_role: user.role,
          purpose: body.purpose, destination: body.destination, reason: body.reason,
          start_date: body.start_date, end_date: body.end_date, details: body.details,
          status: 'Pending', digital_signature: ''
        });
        save();
        return [201, { success: true }];
      }
      if (method === 'PUT') {
        const item = list.find((x) => x.request_id === Number(c));
        if (item) {
          item.status = body.status;
          item.digital_signature = body.status === 'Approved' ? `Digitally signed by ${user.name} on ${today()}` : '';
          save();
        }
        return [200, { success: true }];
      }
      return [200, { success: true, requests: user.role === 'ADMIN' ? list : list.filter((x) => x.user_id === user.user_id) }];
    }

    if (a === 'chat') {
      const q = String(body.message || '').toLowerCase();
      let answer = 'This is a demo assistant. Ask me about OD forms, leave permission, complaints or lost & found.';
      if (q.includes('od')) answer = 'Open "OD & Leave", fill the On-duty form with purpose, destination and dates, then submit. An admin reviews and signs it.';
      else if (q.includes('leave')) answer = 'Use the Leave permission form under "OD & Leave". You can attach a supporting document up to 5 MB.';
      else if (q.includes('complaint')) answer = 'Go to Complaints, choose a category, describe the issue and location, and submit. You can track the status there.';
      else if (q.includes('lost') || q.includes('found')) answer = 'Use Lost & Found to report an item you lost or found, with location and contact details.';
      return [200, { success: true, answer }];
    }

    return [404, { success: false, message: 'Not found (demo)' }];
  }

  const realFetch = window.fetch.bind(window);
  window.fetch = (input, init = {}) => {
    const url = typeof input === 'string' ? input : input.url;
    const match = url.match(/^(?:https?:\/\/localhost:5000)?\/api\/([^?#]*)/);
    if (!match) return realFetch(input, init);
    let body = {};
    try { body = init.body ? JSON.parse(init.body) : {}; } catch (_) { /* ignore */ }
    const [status, data] = route((init.method || 'GET').toUpperCase(), match[1], body);
    return Promise.resolve(new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } }));
  };

  // ---------- CampusFlow global (same shape as the original auth.js) ----------
  window.CampusFlow = {
    token: 'demo-token',
    user,
    loginPath: 'login.html',
    getAuthHeaders() {
      return { 'Content-Type': 'application/json', Authorization: 'Bearer demo-token' };
    },
    dashboardPath(r) {
      if (r === 'ADMIN') return 'admin-dashboard.html';
      if (r === 'FACULTY') return 'faculty-dashboard.html';
      return 'student-dashboard.html';
    },
    requireAuth() { return true; }, // demo: never redirects
    logout() { window.location.href = 'index.html'; }
  };
  window.logout = () => window.CampusFlow.logout();

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // ---------- sidebar: full navigation + demo role switcher ----------
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    const nav = sidebar.querySelector('nav');
    if (nav) {
      const items = [
        ['Dashboard', window.CampusFlow.dashboardPath(role)],
        ['Announcements', 'announcements.html'],
        ['Rooms', 'rooms.html'],
        ['Complaints', 'complaints.html'],
        ['Lost &amp; Found', 'lost-found.html'],
        [role === 'ADMIN' ? 'OD &amp; Leave Approvals' : 'OD &amp; Leave', 'requests.html']
      ];
      nav.innerHTML = items
        .map(([label, href]) => `<a href="${href}"${href === currentPage ? ' class="active"' : ''}>${label}</a>`)
        .join('');
    }

    const box = document.createElement('div');
    box.style.cssText = 'position:relative;z-index:1;font:12px Arial,sans-serif;margin-bottom:.75rem;';
    box.innerHTML = `
      <label for="demoRole" style="display:block;opacity:.7;margin-bottom:.3rem;letter-spacing:.08em;text-transform:uppercase;">Demo role</label>
      <select id="demoRole" style="width:100%;padding:.5rem;border-radius:3px;border:0;font:inherit;">
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <button id="demoReset" type="button" style="margin-top:.5rem;width:100%;padding:.4rem;background:transparent;color:#9fc6d8;border:1px solid #1f4b67;border-radius:3px;cursor:pointer;font:inherit;">Reset demo data</button>`;
    sidebar.insertBefore(box, sidebar.querySelector('button.btn'));
    const select = box.querySelector('#demoRole');
    select.value = role;
    select.addEventListener('change', () => {
      localStorage.setItem(ROLE_KEY, select.value);
      window.location.href = window.CampusFlow.dashboardPath(select.value);
    });
    box.querySelector('#demoReset').addEventListener('click', () => {
      localStorage.removeItem(DB_KEY);
      window.location.reload();
    });

    // Campus AI assistant (uses the mock /api/chat)
    const aiScript = document.createElement('script');
    aiScript.src = 'js/ai-widget.js';
    document.body.appendChild(aiScript);
  }

  // ---------- role-based bits ----------
  document.querySelectorAll('[data-roles]').forEach((element) => {
    if (!element.dataset.roles.split(',').includes(role)) element.remove();
  });

  const topbar = document.querySelector('.topbar');
  if (topbar) {
    const badge = document.createElement('div');
    badge.className = 'user-badge';
    badge.innerHTML = `
      <span class="user-avatar">${user.name.charAt(0)}</span>
      <span><strong>${user.name}</strong><small>${user.role}</small></span>`;
    topbar.appendChild(badge);
  }
})();
