// ================================
// GOGGINS SYSTEM
// PART 1
// ================================

// Local Storage

let missions = JSON.parse(localStorage.getItem("missions")) || [];

let editIndex = -1;


// ================================
// DOM ELEMENTS
// ================================

const missionForm = document.getElementById("missionForm");

const missionTable = document.getElementById("missionTable");

const search = document.getElementById("search");

const filter = document.getElementById("filter");

const themeBtn = document.getElementById("themeBtn");

const todayDate = document.getElementById("todayDate");

const quote = document.getElementById("quote");

const totalMission = document.getElementById("totalMission");

const completedMission = document.getElementById("completedMission");

const pendingMission = document.getElementById("pendingMission");

const percentage = document.getElementById("percentage");

const progressBar = document.getElementById("progressBar");


// ================================
// TODAY DATE
// ================================

function loadDate(){

    const options = {

        weekday:"long",

        year:"numeric",

        month:"long",

        day:"numeric"

    };

    todayDate.innerHTML =
        new Date().toLocaleDateString("en-IN",options);

}

loadDate();


// ================================
// MOTIVATION QUOTES
// ================================

const quotes=[

"Discipline equals freedom.",

"Stay hard.",

"Pain unlocks a new level of you.",

"Don't stop when you're tired. Stop when you're done.",

"You are your only competition.",

"Small wins every day create big victories.",

"Suffer now and live the rest of your life as a champion.",

"Comfort is the enemy of greatness.",

"No excuses. Just execute.",

"The hardest worker always wins."

];

function loadQuote(){

    const random=Math.floor(Math.random()*quotes.length);

    quote.innerHTML=quotes[random];

}

loadQuote();


// ================================
// DARK MODE
// ================================

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.innerHTML='<i class="bi bi-sun-fill"></i>';

    }

    else{

        themeBtn.innerHTML='<i class="bi bi-moon-fill"></i>';

    }

});


// ================================
// SAVE LOCAL STORAGE
// ================================

function saveLocal(){

    localStorage.setItem(

        "missions",

        JSON.stringify(missions)

    );

}


// ================================
// DASHBOARD
// ================================

function updateDashboard(){

    let total=missions.length;

    let completed=missions.filter(

        mission=>mission.status==="Completed"

    ).length;

    let pending=total-completed;

    let percent=0;

    if(total!==0){

        percent=Math.round(

            (completed/total)*100

        );

    }

    totalMission.innerHTML=total;

    completedMission.innerHTML=completed;

    pendingMission.innerHTML=pending;

    percentage.innerHTML=percent+"%";

    progressBar.style.width=percent+"%";

    progressBar.innerHTML=percent+"%";

}


// ================================
// BADGE COLORS
// ================================

function priorityBadge(priority){

    if(priority==="High"){

        return '<span class="badge badge-high">High</span>';

    }

    if(priority==="Medium"){

        return '<span class="badge badge-medium">Medium</span>';

    }

    return '<span class="badge badge-low">Low</span>';

}

function statusBadge(status){

    if(status==="Completed"){

        return '<span class="badge badge-completed">Completed</span>';

    }

    return '<span class="badge badge-pending">Pending</span>';

}
// ================================
// DISPLAY MISSIONS
// ================================

function displayMissions(list = missions) {

    missionTable.innerHTML = "";

    list.forEach((mission, index) => {

        missionTable.innerHTML += `

        <tr class="fade-in">

            <td>${index + 1}</td>

            <td>${mission.title}</td>

            <td>${mission.category}</td>

            <td>${priorityBadge(mission.priority)}</td>

            <td>${statusBadge(mission.status)}</td>

            <td>${mission.deadline}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editMission(${index})">

                    <i class="bi bi-pencil-square"></i>

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteMission(${index})">

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    updateDashboard();

    saveLocal();

}



// ================================
// ADD / UPDATE MISSION
// ================================

missionForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = document.getElementById("title").value.trim();

    const deadline = document.getElementById("deadline").value;

    const category = document.getElementById("category").value;

    const priority = document.getElementById("priority").value;

    const status = document.getElementById("status").value;

    const notes = document.getElementById("notes").value.trim();



    if (title === "" || deadline === "") {

        alert("Please fill all required fields.");

        return;

    }



    const mission = {

        title,

        deadline,

        category,

        priority,

        status,

        notes

    };



    // UPDATE

    if (editIndex !== -1) {

        missions[editIndex] = mission;

        editIndex = -1;

    }

    // CREATE

    else {

        missions.push(mission);

    }



    missionForm.reset();

    displayMissions();

});



// ================================
// EDIT
// ================================

function editMission(index) {

    const mission = missions[index];



    document.getElementById("title").value = mission.title;

    document.getElementById("deadline").value = mission.deadline;

    document.getElementById("category").value = mission.category;

    document.getElementById("priority").value = mission.priority;

    document.getElementById("status").value = mission.status;

    document.getElementById("notes").value = mission.notes;



    editIndex = index;

}



// ================================
// DELETE
// ================================

function deleteMission(index) {

    const confirmDelete = confirm(

        "Delete this mission?"

    );



    if (confirmDelete) {

        missions.splice(index, 1);

        displayMissions();

    }

}



// ================================
// DELETE ALL MISSIONS
// ================================

function clearAllMissions() {

    const confirmAll = confirm(

        "Delete ALL missions?"

    );



    if (!confirmAll) return;



    missions = [];



    saveLocal();

    displayMissions();

}
// ================================
// SEARCH FUNCTION
// ================================

search.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = missions.filter((mission) => {

        return (

            mission.title.toLowerCase().includes(keyword) ||

            mission.category.toLowerCase().includes(keyword) ||

            mission.priority.toLowerCase().includes(keyword) ||

            mission.status.toLowerCase().includes(keyword)

        );

    });

    displayMissions(filtered);

});



// ================================
// FILTER
// ================================

filter.addEventListener("change", function () {

    const value = this.value;

    if (value === "All") {

        displayMissions();

        return;

    }

    const filtered = missions.filter((mission) => {

        return (

            mission.status === value ||

            mission.priority === value

        );

    });

    displayMissions(filtered);

});



// ================================
// AUTO LOAD DATA
// ================================

displayMissions();



// ================================
// ENTER KEY SUPPORT
// ================================

document.getElementById("title")

.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        e.preventDefault();

        missionForm.requestSubmit();

    }

});



// ================================
// RESET SEARCH/FILTER AFTER ADDING
// ================================

missionForm.addEventListener("submit", function () {

    search.value = "";

    filter.value = "All";

});



// ================================
// RANDOM QUOTE EVERY 30 SECONDS
// ================================

setInterval(loadQuote,30000);



// ================================
// SORT BY DEADLINE
// ================================

missions.sort((a,b)=>{

    return new Date(a.deadline)-new Date(b.deadline);

});

displayMissions();



// ================================
// EMPTY MESSAGE
// ================================

function displayMissions(list = missions){

    missionTable.innerHTML="";

    if(list.length===0){

        missionTable.innerHTML=`

        <tr>

            <td colspan="7" class="text-center text-muted py-4">

                No missions found.

            </td>

        </tr>

        `;

        updateDashboard();

        return;

    }

    list.forEach((mission,index)=>{

        missionTable.innerHTML+=`

        <tr class="fade-in">

            <td>${index+1}</td>

            <td>${mission.title}</td>

            <td>${mission.category}</td>

            <td>${priorityBadge(mission.priority)}</td>

            <td>${statusBadge(mission.status)}</td>

            <td>${mission.deadline}</td>

            <td>

                <button

                class="edit-btn"

                onclick="editMission(${index})">

                <i class="bi bi-pencil"></i>

                </button>

                <button

                class="delete-btn"

                onclick="deleteMission(${index})">

                <i class="bi bi-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    updateDashboard();

    saveLocal();

}



// ================================
// END OF PROJECT
// ================================