# DivTinder Frontend

- Create a Vite + React application
- Remove unwanted code from the boilerplate
- Install TailwindCSS (see Tailwind docs)
- Install DesiUI

**Routing & Layout**
- Install `react-router-dom`
- Create `BrowserRouter` > `Routes` > `Route=/` > `Body` > Route Children
- Create an `Outlet` in your Body component
- Create a Footer
- Import Navbar and use in App component

**Authentication**
- Create a Login Page
- Signup New User
- If token is not present, redirect user to login page
- You should not be able to access other routes without login
- Logout Feature

**API & State Management**
- Install `axios`
- For CORS: install `cors` in backend, add middleware with configurations (`origin`, `credentials: true`)
- When making API calls, pass `axios` options: `{ withCredentials: true }`
- Install `react-redux` + `@reduxjs/toolkit` ([Redux Toolkit Quick Start](https://redux-toolkit.js.org/tutorials/quick-start))
- Setup `configureStore` > `Provider` > `createSlice` > add reducer to store
- Add Redux DevTools in Chrome
- Login and verify data in the store
- NavBar should update as soon as user logs in
- Refactor code: add constants file & create a components folder

**Feed & Profile**
- Get the feed and add it to the store
- Build the user card on feed
- Edit Profile Feature
- Show Toast Message on profile save

**Connections**
- New Page: See all my connections
- New Page: See all my connection requests
- Feature: Accept/Reject connection request
- Send/Ignore the user card from the feed

**Testing**
- E2E

# Deployment

- Signup on AWS
- Launch instance
- `chmod 400 <secret>.pem`
- `ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com`
- Install Node version 16.17.0
- Git clone your repository

**Frontend**
  - `npm install` (install dependencies)
  - `npm run build`
  - `sudo apt update`
  - `sudo apt install nginx`
  - `sudo systemctl start nginx`
  - `sudo systemctl enable nginx`
  - Copy build files from `dist/` to `/var/www/html/`
  - `sudo scp -r dist/* /var/www/html/`
  - Enable port 80 on your instance

**Backend**
  - Update DB password
  - Allow EC2 instance public IP on MongoDB server
  - `npm install pm2 -g`
  - `pm2 start npm --name "devTinder-backend" -- start`
  - `pm2 logs`
  - `pm2 list`, `pm2 flush <name>`, `pm2 stop <name>`, `pm2 delete <name>`
  - Configure nginx: `/etc/nginx/sites-available/default`
  - Restart nginx: `sudo systemctl restart nginx`
  - Modify the BASEURL in frontend

# Nginx Configuration

**Frontend:**  
`http://43.204.96.49/`

**Backend:**  
`http://43.204.96.49:7777/`

**Domain Mapping:**  
- Domain name: `devtinder.com` → `43.204.96.49`
- Frontend: `devtinder.com`
- Backend: `devtinder.com:7777` → `devtinder.com/api`

**Sample nginx config:**
```nginx
server {
    server_name 43.204.96.49;

    location /api/ {
        proxy_pass http://localhost:7777/;  # Pass the request to the Node.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /var/www/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

**Notes:**
- Make sure port 80 is open on your AWS instance.
- Restart nginx after any config changes:  
  `sudo systemctl restart nginx`
- Update your frontend's BASEURL to `/api` for