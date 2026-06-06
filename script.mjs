// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getRevisionDates } from "./common.mjs";
import { getData, addData } from "./storage.mjs";

window.onload = function () {
  const userSelect = document.getElementById("user-select");
  const agendaList = document.getElementById("agenda-list");
  const topicForm = document.getElementById("topic-form");
  const topicNameInput = document.getElementById("topic-name");
  const startDateInput = document.getElementById("start-date");

  setDefaultDate(startDateInput);

  const users = getUserIds();

  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.innerText = `User ${userId}`;
    userSelect.appendChild(option);
  });

  userSelect.addEventListener("change", function () {
    const selectedUserId = userSelect.value;
    renderAgenda(selectedUserId, agendaList);
  });

  topicForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedUserId = userSelect.value;

    if (!selectedUserId) {
      return;
    }

    const revisionDates = getRevisionDates(startDateInput.value);

    const newAgendaItems = revisionDates.map((revisionDate) => {
      return {
        topicName: topicNameInput.value,
        revisionDate: revisionDate.date,
      };
    });

    addData(selectedUserId, newAgendaItems);

    topicForm.reset();
    setDefaultDate(startDateInput);
    renderAgenda(selectedUserId, agendaList);
  });
};

function setDefaultDate(startDateInput) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  startDateInput.value = `${year}-${month}-${day}`;
}

function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getUpcomingAgendaItems(agendaItems) {
  const todayString = getTodayString();

  const upcomingAgendaItems = agendaItems.filter((agendaItem) => {
    return agendaItem.revisionDate >= todayString;
  });

  upcomingAgendaItems.sort((a, b) => {
    return a.revisionDate.localeCompare(b.revisionDate);
  });

  return upcomingAgendaItems;
}

function renderAgenda(userId, agendaList) {
  agendaList.innerHTML = "";

  if (!userId) {
    return;
  }

  const agendaItems = getData(userId) || [];
  const upcomingAgendaItems = getUpcomingAgendaItems(agendaItems);

  if (upcomingAgendaItems.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.innerText = "No revision agenda found for this user.";
    agendaList.appendChild(emptyMessage);
    return;
  }

  upcomingAgendaItems.forEach((agendaItem) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${agendaItem.topicName}, ${agendaItem.revisionDate}`;
    agendaList.appendChild(listItem);
  });
}
