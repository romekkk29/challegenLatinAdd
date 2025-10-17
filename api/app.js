// Constants
const PORT = 3000;

// Configure the server
const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const app = express();
app.use(express.json());
app.use(cors());

// Open or create the SQLite database
const db = new Database('latinad.sqlite');

// Initialize tables if not present
function initializeDatabase() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            full_name TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS displays (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            user_id INTEGER,
            price_per_day REAL NOT NULL,
            resolution_height INTEGER NOT NULL,
            resolution_width INTEGER NOT NULL,
            type TEXT NOT NULL,
            picture_url TEXT,
            rules TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date DATE NOT NULL,
            value INTEGER NOT NULL
        );

        INSERT OR IGNORE INTO users (id,email,password,full_name)
	        VALUES (1,'admin@latinad.com','1234567890','System Admin');

        INSERT INTO sales (date, value)
        SELECT date_val, value_val
        FROM (
            SELECT DATE('2025-01-01') AS date_val, 847 AS value_val UNION ALL
            SELECT DATE('2025-01-02'), 1023 UNION ALL
            SELECT DATE('2025-01-03'), 1315 UNION ALL
            SELECT DATE('2025-01-04'), 784 UNION ALL
            SELECT DATE('2025-01-05'), 1169 UNION ALL
            SELECT DATE('2025-01-06'), 1473 UNION ALL
            SELECT DATE('2025-01-07'), 659 UNION ALL
            SELECT DATE('2025-01-08'), 1427 UNION ALL
            SELECT DATE('2025-01-09'), 936 UNION ALL
            SELECT DATE('2025-01-10'), 1201 UNION ALL
            SELECT DATE('2025-01-11'), 1115 UNION ALL
            SELECT DATE('2025-01-12'), 1322 UNION ALL
            SELECT DATE('2025-01-13'), 1005 UNION ALL
            SELECT DATE('2025-01-14'), 783 UNION ALL
            SELECT DATE('2025-01-15'), 1490 UNION ALL
            SELECT DATE('2025-01-16'), 1310 UNION ALL
            SELECT DATE('2025-01-17'), 890 UNION ALL
            SELECT DATE('2025-01-18'), 725 UNION ALL
            SELECT DATE('2025-01-19'), 1422 UNION ALL
            SELECT DATE('2025-01-20'), 1306 UNION ALL
            SELECT DATE('2025-01-21'), 1188 UNION ALL
            SELECT DATE('2025-01-22'), 944 UNION ALL
            SELECT DATE('2025-01-23'), 1123 UNION ALL
            SELECT DATE('2025-01-24'), 1479 UNION ALL
            SELECT DATE('2025-01-25'), 1287 UNION ALL
            SELECT DATE('2025-01-26'), 973 UNION ALL
            SELECT DATE('2025-01-27'), 1365 UNION ALL
            SELECT DATE('2025-01-28'), 1067 UNION ALL
            SELECT DATE('2025-01-29'), 894 UNION ALL
            SELECT DATE('2025-01-30'), 1230 UNION ALL
            SELECT DATE('2025-01-31'), 1156
        ) AS new_data
        WHERE NOT EXISTS (
            SELECT 1 FROM sales s WHERE s.date = new_data.date_val
        );
    `);
}

initializeDatabase();

// Query function
function query(text, params = []) {
    const stmt = db.prepare(text);
    if (/^\s*SELECT/i.test(text)) {
        return stmt.all(...params);
    } else {
        return stmt.run(...params);
    }
}

// Helpers
function encodeToBase64(str) {
    return Buffer.from(str).toString('base64');
}

function decodeFromBase64(encodedStr) {
    return Buffer.from(encodedStr, 'base64').toString('utf-8');
}

async function getUserIdFromToken(req, res) {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        const decoded = decodeFromBase64(token);
        const parts = decoded.split("-");
        const user = {
            id: parts[0],
            email: parts[1]
        };

        const userInDb = query('SELECT * FROM users WHERE email = ? AND id = ?', [user.email, user.id]);
        if (userInDb.length === 0) {
            res.status(401).send('Unauthorized');
            return -1;
        }
        return user.id;
    } catch (err) {
        console.error(err);
        res.status(401).send('Error parsing token');
        return -1;
    }
}

function getDisplayImage(type) {
    if (type === 'outdoor') {
        return "https://5.imimg.com/data5/SELLER/Default/2022/8/EU/EM/YX/138202095/p10-outdoor-full-color-led-display-500x500.png";
    } else {
        return "https://res.cloudinary.com/dbihouiij/image/upload/c_scale,dpr_auto,f_auto,w_auto/v1/SiteImages/0000495_49-air-conditioned-all-weather-display";
    }
}

// ENDPOINTS

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    try {
        const result = query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (result.length === 0) {
            res.status(401).send('Incorrect user or password');
        } else {
            const user = result[0];
            const response = {
                name: user.full_name,
                email: user.email,
                token: encodeToBase64(user.id + "-" + user.email)
            };
            res.json(response);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error on login');
    }
});

// List displays
app.get('/display', async (req, res) => {
    try {
        const userId = await getUserIdFromToken(req, res);
        if (userId === -1) return;

        const pageSize = parseInt(req.query.pageSize);
        const offset = parseInt(req.query.offset) || 0;
        if (isNaN(pageSize) || pageSize <= 0 || isNaN(offset) || offset < 0) {
            return res.status(400).send('Invalid page size or offset');
        }

        let queryText = 'SELECT * FROM displays WHERE user_id = ?';
        const queryParams = [userId];

        if (req.query.type) {
            queryText += ' AND type = ?';
            queryParams.push(req.query.type);
        }

        if (req.query.name) {
            queryText += ' AND name LIKE ?';
            queryParams.push('%' + req.query.name + '%');
        }

        let countQueryText = 'SELECT COUNT(*) as count FROM displays WHERE user_id = ?';
        const countQueryParams = [userId];

        if (req.query.type) {
            countQueryText += ' AND type = ?';
            countQueryParams.push(req.query.type);
        }

        if (req.query.name) {
            countQueryText += ' AND name LIKE ?';
            countQueryParams.push('%' + req.query.name + '%');
        }

        const countResult = query(countQueryText, countQueryParams);
        const totalCount = countResult[0].count;

        queryText += ' LIMIT ? OFFSET ?';
        queryParams.push(pageSize, offset);

        const result = query(queryText, queryParams);
        res.json({ totalCount, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error listing displays');
    }
});

// Get single display
app.get('/display/:id', async (req, res) => {
    try {
        const userId = await getUserIdFromToken(req, res);
        if (userId === -1) return;

        const result = query('SELECT * FROM displays WHERE id = ? AND (user_id IS NULL OR user_id = ?)', [req.params.id, userId]);
        if (result.length === 0) {
            res.status(404).send('Not Found');
        } else {
            res.json(result[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting display');
    }
});

// Create display
app.post('/display', async (req, res) => {
    try {
        const userId = await getUserIdFromToken(req, res);
        if (userId === -1) return;

        const { name, description, price_per_day, resolution_height, resolution_width, type, rules } = req.body;
        if (!name || !description || !price_per_day || !resolution_height || !resolution_width || !type) {
            return res.status(400).send('Missing one or more required fields');
        }

        const picture_url = getDisplayImage(type);

        const result = query(
            'INSERT INTO displays (name, description, user_id, price_per_day, resolution_height, resolution_width, type, picture_url, rules) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, description, userId, price_per_day, resolution_height, resolution_width, type, picture_url, rules]
        );

        const inserted = query('SELECT * FROM displays WHERE id = ?', [result.lastInsertRowid]);
        res.json(inserted[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating display');
    }
});

// Update display
app.put('/display/:id', async (req, res) => {
    try {
        const userId = await getUserIdFromToken(req, res);
        if (userId === -1) return;

        const { name, description, price_per_day, resolution_height, resolution_width, type, rules } = req.body;
        if (!name || !description || !price_per_day || !resolution_height || !resolution_width || !type) {
            return res.status(400).send('Missing one or more required fields');
        }

        const picture_url = getDisplayImage(type);

        const result = query(
            'UPDATE displays SET name = ?, description = ?, price_per_day = ?, resolution_height = ?, resolution_width = ?, type = ?, picture_url = ?, rules = ? WHERE id = ? AND user_id = ?',
            [name, description, price_per_day, resolution_height, resolution_width, type, picture_url, rules, req.params.id, userId]
        );

        if (result.changes === 0) {
            res.status(404).send('Not Found');
        } else {
            const updated = query('SELECT * FROM displays WHERE id = ?', [req.params.id]);
            res.json(updated[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating display');
    }
});

// Delete display
app.delete('/display/:id', async (req, res) => {
    try {
        const userId = await getUserIdFromToken(req, res);
        if (userId === -1) return;

        const beforeDelete = query('SELECT * FROM displays WHERE id = ? AND user_id = ?', [req.params.id, userId]);
        if (beforeDelete.length === 0) {
            return res.status(404).send('Not Found');
        }
        query('DELETE FROM displays WHERE id = ? AND user_id = ?', [req.params.id, userId]);
        res.json(beforeDelete[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting display');
    }
});

// Get sale stats
app.get('/sales', async (req, res) => {
    try {
        const result = query('SELECT * FROM sales', []);
        if (result.length === 0) {
            res.status(404).send('Not Found');
        } else {
            res.json(result);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting sales');
    }
});

// Start app
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});