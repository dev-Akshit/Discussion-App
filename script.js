document.addEventListener("DOMContentLoaded", () => {
    const questionList = document.querySelector(".question-list");
    const questionForm = document.getElementById("questionForm");
    const searchInput = document.getElementById("searchInput");

    // Array to store questions
    let questions = [];

    // Handle form submission to add a new question
    questionForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const question = document.getElementById("question").value;
        if (title && question) {
            const newQuestion = { title, question, responses: [] };
            questions.push(newQuestion);
            renderQuestionList();
            questionForm.reset();
        }
    });

    // Render question list
    function renderQuestionList(filteredQuestions = null) {
        const displayedQuestions = filteredQuestions || questions;
        questionList.innerHTML = "";
        displayedQuestions.forEach((question, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = question.title;
            listItem.addEventListener("click", () => {
                renderQuestionDetails(index);
            });
            questionList.appendChild(listItem);
        });
    }

    // Render question details and responses
    function renderQuestionDetails(index) {
        const question = questions[index];
        const rightPane = document.querySelector(".right-pane");
        rightPane.innerHTML = `
            <h2>${question.title}</h2>
            <p>${question.question}</p>
            <h3>Responses</h3>
            <ul class="responses-list"></ul>
            <form id="responseForm">
                <label for="name">Name:</label>
                <input type="text" id="name" required>
                <label for="comment">Comment:</label>
                <textarea id="comment" required></textarea>
                <button type="submit">Submit Response</button>
            </form>
            <button class="resolve-button">Resolve</button>
            <button class="back-button">Back to Questions</button>
        `;

        const responseForm = document.getElementById("responseForm");
        responseForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const comment = document.getElementById("comment").value;
            if (name && comment) {
                const newResponse = { name, comment };
                question.responses.push(newResponse);
                renderResponses(question.responses);
                responseForm.reset();
            }
        });

        const resolveButton = document.querySelector(".resolve-button");
        resolveButton.addEventListener("click", () => {
            questions.splice(index, 1);
            renderQuestionList();
            rightPane.innerHTML = `
                <div class="question-form">
                    <h2>New Question</h2>
                    <form id="questionForm">
                        <label for="title">Title:</label>
                        <input type="text" id="title" required>
                        <label for="question">Question:</label>
                        <textarea id="question" required></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            `;
        });

        const backButton = document.querySelector(".back-button");
        backButton.addEventListener("click", () => {
            renderQuestionList();
            rightPane.innerHTML = `
                <div class="question-form">
                    <h2>New Question</h2>
                    <form id="questionForm">
                        <label for="title">Title:</label>
                        <input type="text" id="title" required>
                        <label for="question">Question:</label>
                        <textarea id="question" required></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            `;
        });

        renderResponses(question.responses);
    }

    // Render responses list
    function renderResponses(responses) {
        const responsesList = document.querySelector(".responses-list");
        responsesList.innerHTML = "";
        responses.forEach((response) => {
            const listItem = document.createElement("li");
            listItem.className = "response-item";
            listItem.innerHTML = `<strong>${response.name}:</strong> ${response.comment}`;
            responsesList.appendChild(listItem);
        });
    }

    // Search functionality
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredQuestions = questions.filter(question =>
            question.title.toLowerCase().includes(searchTerm)
        );
        renderQuestionList(filteredQuestions);
    });

    // Initial rendering
    renderQuestionList();
});
