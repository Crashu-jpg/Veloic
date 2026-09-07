import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const FOUNDER_PASSCODE = process.env.FOUNDER_PASSCODE || 'veloic2026';

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory + persisted storage helper
interface MessageRecord {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  createdAt: string;
  read: boolean;
}

function loadMessages(): MessageRecord[] {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read messages file:', err);
  }
  return [];
}

function saveMessages(messages: MessageRecord[]) {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save messages file:', err);
  }
}

let messagesCache: MessageRecord[] = loadMessages();

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Public submission endpoint for visitors (no authentication needed)
  app.post('/api/messages', (req, res) => {
    try {
      const { name, email, topic, message } = req.body;

      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Message content is required.' });
      }

      const newRecord: MessageRecord = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: typeof name === 'string' && name.trim() ? name.trim() : 'Anonymous Visitor',
        email: typeof email === 'string' ? email.trim() : '',
        topic: typeof topic === 'string' && topic.trim() ? topic.trim() : 'General Inquiry',
        message: message.trim(),
        createdAt: new Date().toISOString(),
        read: false,
      };

      messagesCache.unshift(newRecord);
      saveMessages(messagesCache);

      console.log(`[Veloic Desk] New message received from: "${newRecord.name}" (${newRecord.email || 'No email'}) - Topic: "${newRecord.topic}"`);

      return res.status(201).json({
        success: true,
        id: newRecord.id,
        message: 'Your message has been delivered directly to the Veloic founder desk.',
      });
    } catch (err) {
      console.error('Error handling message submission:', err);
      return res.status(500).json({ error: 'Internal server error processing message.' });
    }
  });

  // Public unread count endpoint (allows the UI to display a subtle indicator for founder)
  app.get('/api/messages/count', (req, res) => {
    const unreadCount = messagesCache.filter((m) => !m.read).length;
    res.json({ total: messagesCache.length, unread: unreadCount });
  });

  // Founder Inbox fetch endpoint (secured with simple passcode check)
  app.post('/api/founder/messages', (req, res) => {
    const { passcode } = req.body;

    if (passcode !== FOUNDER_PASSCODE) {
      return res.status(401).json({ error: 'Invalid founder passcode.' });
    }

    return res.json({
      success: true,
      count: messagesCache.length,
      messages: messagesCache,
    });
  });

  // Mark message as read
  app.post('/api/founder/messages/:id/read', (req, res) => {
    const { passcode } = req.body;
    if (passcode !== FOUNDER_PASSCODE) {
      return res.status(401).json({ error: 'Invalid founder passcode.' });
    }

    const { id } = req.params;
    const msg = messagesCache.find((m) => m.id === id);
    if (msg) {
      msg.read = true;
      saveMessages(messagesCache);
    }
    return res.json({ success: true });
  });

  // Delete message
  app.delete('/api/founder/messages/:id', (req, res) => {
    const { passcode } = req.body;
    if (passcode !== FOUNDER_PASSCODE) {
      return res.status(401).json({ error: 'Invalid founder passcode.' });
    }

    const { id } = req.params;
    messagesCache = messagesCache.filter((m) => m.id !== id);
    saveMessages(messagesCache);
    return res.json({ success: true });
  });

  // Direct Vercel Deployment Zip Download (Compiled Static Files)
  app.get('/api/download-vercel-zip', (req, res) => {
    const zipPath = path.join(process.cwd(), 'public', 'veloic-dist.zip');
    if (fs.existsSync(zipPath)) {
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="veloic-dist-deploy.zip"');
      return res.sendFile(zipPath);
    }
    return res.status(404).json({ error: 'Deploy zip not found.' });
  });

  // Direct Download for Complete Source Code Zip
  app.get('/api/download-source-zip', (req, res) => {
    const zipPath = path.join(process.cwd(), 'public', 'veloic-source-code.zip');
    if (fs.existsSync(zipPath)) {
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="veloic-source-code.zip"');
      return res.sendFile(zipPath);
    }
    return res.status(404).json({ error: 'Source code zip not found.' });
  });

  // Vite middleware for development vs. static dist serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Veloic Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
