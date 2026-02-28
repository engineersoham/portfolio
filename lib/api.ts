const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = {
  getGuestbook: () => fetch(`${API_URL}/api/guestbook`).then(r => r.json()),
  postGuestbook: (data: { name: string; message: string }) =>
    fetch(`${API_URL}/api/guestbook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  sendContact: (data: { name: string; email: string; message: string }) =>
    fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
};
