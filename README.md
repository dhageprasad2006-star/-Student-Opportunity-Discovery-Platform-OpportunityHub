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

## Google Cloud Run

1. Create/select a Google Cloud project.
2. Enable Cloud Run and Cloud Build.
3. Upload/push this repository to GitHub.
4. Build and deploy the container to Cloud Run.
5. Ensure the service listens on the `PORT` environment variable. This project already uses `process.env.PORT || 8080`.
6. Submit the Cloud Run HTTPS URL.

Example Cloud CLI flow:

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud run deploy opportunityhub --source . --region asia-south1 --allow-unauthenticated
```

## Hackathon submission checklist

- [ ] Public GitHub repository
- [ ] Working Google Cloud Run URL
- [ ] Public LinkedIn/Instagram post
- [ ] Project poster
- [ ] README documentation
- [ ] Screenshots/demo

## Important
The sample opportunity URLs are placeholders for the hackathon MVP. Replace them with real opportunity URLs before the final demo/submission if you want the external links to lead to real opportunities.

## Project idea for presentation
Problem → scattered student opportunities

Solution → one platform with profile, discovery, filters, recommendations and bookmarks

Impact → reduces search effort and helps students find opportunities relevant to their skills and interests.
