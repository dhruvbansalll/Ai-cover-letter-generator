# AI Cover Letter Generator 🚀

An intelligent web application that leverages the Google Gemini API to generate professional, tailored cover letters in seconds. This tool is designed to help job seekers streamline their application process by creating compelling content based on their resume and a specific job description.

![AI Cover Letter Generator Screenshot]
<img width="1915" height="864" alt="image" src="https://github.com/user-attachments/assets/b1c3ffb5-5e4b-4329-a879-2d7d90ebfd04" />

---

## ✨Features

-   **AI-Powered Generation:** Utilizes a powerful language model to write human-like, relevant cover letters.
-   **Dynamic Content Tailoring:** Analyzes the provided resume and job description to highlight the most relevant skills and experiences.
-   **Simple Interface:** A clean, two-panel layout for easy input of job details and resume text.
-   **One-Click Copy:** Instantly copy the generated cover letter to your clipboard.
-   **Fully Responsive:** Looks and works great on all devices, from mobile phones to desktops.
-   **Loading & Error States:** Clear feedback is provided to the user during API calls and in case of errors.

---

## 🛠️ Technologies Used

This project is built with a modern, efficient tech stack:

-   **Frontend:** React, Vite
-   **Styling:** Tailwind CSS
-   **AI:** Google Gemini API
-   **Deployment:** Netlify

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini API](https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white)

---

## ⚙️ Setup and Local Installation

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ai-cover-letter-generator.git](https://github.com/your-username/ai-cover-letter-generator.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd ai-cover-letter-generator
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    -   Create a new file named `.env.local` in the root of the project.
    -   Add your Google Gemini API key to this file:
        ```
        VITE_GEMINI_API_KEY=your_api_key_here
        ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 🔮 Future Improvements

I have several ideas for enhancing this project further:

-   [ ] **User Authentication:** Add Firebase Auth to allow users to sign up and save their resumes.
-   [ ] **Firestore Integration:** Save previously generated cover letters to a user's account in a Firestore database.
-   [ ] **Tone Selection:** Add a dropdown to let the user select a tone (e.g., "Professional," "Enthusiastic," "Formal").
-   [ ] **PDF Export:** Implement a feature to download the generated cover letter as a PDF file.
