// script.js

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.add("hidden");
    });

    document.getElementById(pageId).classList.remove("hidden");
}

let materials = [];
let schedules = [];

document.getElementById("uploadForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const subject = document.getElementById("subject").value;
    const file = document.getElementById("file").files[0];

    if (file) {
        const url = URL.createObjectURL(file);

        materials.push({
            subject: subject,
            name: file.name,
            url: url
        });

        displayMaterials();

        document.getElementById("message").textContent =
            "Material added successfully!";

        this.reset();
    }
});

function displayMaterials() {
    const list = document.getElementById("materialList");
    list.innerHTML = "";

    materials.forEach(function(material) {
        const li = document.createElement("li");
        const link = document.createElement("a");

        link.href = material.url;
        link.textContent = material.name;
        link.target = "_blank";
        link.rel = "noopener";

        li.append(
            document.createTextNode(material.subject + " - "),
            link
        );

        list.appendChild(li);
    });
}

function searchMaterials() {
    const query = document.getElementById("search").value.toLowerCase();
    const list = document.getElementById("materialList");

    list.innerHTML = "";

    materials
        .filter(function(material) {
            return material.subject.toLowerCase().includes(query) ||
                   material.name.toLowerCase().includes(query);
        })
        .forEach(function(material) {
            const li = document.createElement("li");
            const link = document.createElement("a");

            link.href = material.url;
            link.textContent = material.name;
            link.target = "_blank";
            link.rel = "noopener";

            li.append(
                document.createTextNode(material.subject + " - "),
                link
            );

            list.appendChild(li);
        });
}

document.getElementById("scheduleForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const task = document.getElementById("task").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    schedules.push({
        task: task,
        date: date,
        time: time
    });

    displaySchedules();
    this.reset();
});

function displaySchedules() {
    const list = document.getElementById("scheduleList");
    list.innerHTML = "";

    schedules.forEach(function(schedule, index) {
        const li = document.createElement("li");

        li.textContent = schedule.task + " | " +
                         schedule.date + " | " +
                         schedule.time + " ";

        const removeButton = document.createElement("button");
        removeButton.textContent = "Delete";

        removeButton.onclick = function() {
            schedules.splice(index, 1);
            displaySchedules();
        };

        li.appendChild(removeButton);
        list.appendChild(li);
    });
}