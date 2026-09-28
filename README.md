# OpportunityHub – Student Opportunity Discovery Platform

FIT-FEST 2026 Hackathon MVP.

## Problem
Students often miss internships, hackathons, scholarships, certifications, competitions, workshops and courses because information is scattered across multiple sources.

## Solution
OpportunityHub brings student opportunities into one searchable platform. Students can create a profile, discover opportunities, filter them, receive simple skill/interest-based recommendations and bookmark useful opportunities.

## Features
- Student profile
- Education, skills and interests
- Opportunity search
- Category, location and mode filters
- Internships
- Hackathons
- Courses
- Certifications
- Scholarships
- Competitions
- Workshops
- Skill/interest-based recommendations
- Save/bookmark opportunities
- Opportunity details
- External opportunity links
- Responsive dashboard
- Google Cloud Run ready

## Technology
- React
- Vite
- Node.js
- Express
- HTML/CSS/JavaScript
- Browser localStorage for the MVP profile/bookmark data

## Run locally

Requirements:
- Node.js 20+ recommended
- VS Code

Commands:

```bash
npm install
npm run dev
```

Open:
http://localhost:5173

The Vite development server proxies `/api` to the Express server on port 8080.

## Production build

```bash
npm run build
npm start
```

Then open:
http://localhost:8080

## Docker

```bash
docker build -t opportunityhub .
docker run -p 8080:8080 opportunityhub
```

Open:
http://localhost:8080

```

Impact → reduces search effort and helps students find opportunities relevant to their skills and interests.
