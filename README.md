# AI Resume Analyzer

AI Resume Analyzer is a modern web app that helps job seekers evaluate their resumes against a job description. It uploads a PDF resume, converts it to an image preview, and generates ATS-style feedback using AI.

## Features

- Upload and analyze PDF resumes
- Convert PDF resumes to image previews for AI processing
- Generate structured feedback for ATS compatibility and resume improvement
- View a detailed breakdown of resume strengths and weaknesses
- Clean, modern UI built with React Router and Tailwind CSS

## Screenshots

![Home screen](docs/screenshots/resume_01.png)

![Resume feedback view](docs/screenshots/resume_02.png)

![Resume analysis detail](docs/screenshots/resume_03.png)

## Tech Stack

- React Router
- TypeScript
- Tailwind CSS
- Zustand
- PDF.js
- Puter AI / storage APIs

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

### Production Build

```bash
npm run build
```

## Project Structure

```text
app/
  components/
  lib/
  routes/
constants/
public/
```

## Notes

This project uses browser-side PDF conversion and AI-powered feedback generation. Make sure your environment has access to the required Puter services for full functionality.

## License

This project is for educational and demo purposes.
