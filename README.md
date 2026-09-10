# NOVA RESET STUDIO — Ikigai Assessment

An interactive web experience designed to help users identify their strengths, interests, experience, and professional possibilities.

## Live Demo
[Take the Ikigai Test](https://arlyquantum.github.io/Nova-Reset-Studio/test.html)

## The Problem
Many people know they have skills and interests but struggle to connect them into a clear professional direction.

The goal of this project was to build a practical digital experience that could guide users through that discovery process and deliver a structured result.

## The Solution
NOVA RESET Ikigai is an interactive assessment that:

- collects user responses
- organizes strengths and interests
- generates a personalized professional report
- sends the result automatically by email
- connects a public frontend with a serverless backend

## How It Works

```text
User
  ↓
Ikigai Test
  ↓
Frontend Processing
  ↓
Structured JSON Data
  ↓
POST Request
  ↓
Vercel Serverless API
  ↓
Email Processing
  ↓
Personalized Report
```

## Features

- Interactive questionnaire
- Email validation
- Personalized report generation
- Frontend-to-backend communication
- Automated email delivery
- User feedback and error handling
- Public deployment
- Responsive interface

## Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API
- JSON
- GitHub Pages

## Backend

- Node.js
- JavaScript
- Vercel Serverless Functions
- Environment Variables
- Email automation
- CORS configuration

## Architecture

**Frontend repository:**
https://github.com/ArlyQuantum/Nova-Reset-Studio

**Backend repository:**
https://github.com/ArlyQuantum/nova-reset-backend

**Backend endpoint:**
/api/send-email

The frontend sends a POST request containing structured user and report data. The backend validates the request, processes the report, and delivers the result by email.

## What I Learned

This project helped me strengthen my understanding of:

- frontend and backend integration
- asynchronous JavaScript
- API communication
- serverless deployment
- environment variables
- debugging production issues
- user validation and feedback
- automated email workflows
- Development Process

The project evolved through several iterations:

1. Built the public assessment interface
2. Structured user and report data
3. Connected the frontend using fetch()
4. Created the serverless backend
5. Deployed the backend to Vercel
6. Added validation and error handling
7. Debugged syntax and connection issues
8. Successfully completed the full flow:
**Test → Backend → Email**

## Status

✅ Frontend deployed
✅ Backend deployed
✅ Email delivery working
✅ End-to-end flow tested successfully


## About NOVA RESET STUDIO

NOVA RESET STUDIO combines strategy, web development, automation, AI, content, and creative execution to turn ideas into practical digital solutions.

Discover. Connect. Build.
