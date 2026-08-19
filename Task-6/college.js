let students = JSON.parse(localStorage.getItem("collegeStudents")) || [
  { id: 1, name: "Aditya", roll: "AIML001", department: "AIML" },
  { id: 2, name: "Pragathi", roll: "AIML002", department: "AIML" }
];

let editingId = null;

const form = document.getElementById("studentForm");
const nameInput = document.getElementById("studentName");
const rollInput = document.getElementById("rollNo");
const departmentInput = document.getElementById("department");
const saveBtn = document.getElementById("saveBtn");
const updateBtn = document.getElementById("updateBtn");
const formTitle = document.getElementById("formTitle");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const student = {
    id: Date.now(),
    name: nameInput.value.trim(),
    roll: rollInput.value.trim(),
    department: departmentInput.value.trim()
  };

  students.push(student);
  saveData();
  renderStudents();
  resetForm();
});

function renderStudents() {
  const list = document.getElementById("studentList");
  const emptyMessage = document.getElementById("emptyMessage");
  const count = document.getElementById("count");

  list.innerHTML = "";
  count.textContent = `${students.length} Student${students.length === 1 ? "" : "s"}`;

  if (students.length === 0) {
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";

  students.forEach(student => {
    const row = document.createElement("div");
    row.className = "student-row";

    row.innerHTML = `
      <div class="student-info">
        <strong>${escapeHTML(student.name)}</strong>
        <span>Student Name</span>
      </div>

      <div class="student-info">
        <strong>${escapeHTML(student.roll)}</strong>
        <span>Roll Number</span>
      </div>

      <div class="student-info">
        <strong>${escapeHTML(student.department)}</strong>
        <span>Department</span>
      </div>

      <div class="actions">
        <button class="edit-btn" onclick="editStudent(${student.id})">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
      </div>
    `;

    list.appendChild(row);
  });
}

function editStudent(id) {
  const student = students.find(s => s.id === id);
  if (!student) return;

  editingId = id;
  nameInput.value = student.name;
  rollInput.value = student.roll;
  departmentInput.value = student.department;

  formTitle.textContent = "Update Student";
  saveBtn.disabled = true;
  updateBtn.disabled = false;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateStudent() {
  if (editingId === null) return;

  const index = students.findIndex(s => s.id === editingId);
  if (index === -1) return;

  students[index] = {
    id: editingId,
    name: nameInput.value.trim(),
    roll: rollInput.value.trim(),
    department: departmentInput.value.trim()
  };

  saveData();
  renderStudents();
  resetForm();
}

function deleteStudent(id) {
  const student = students.find(s => s.id === id);
  if (!student) return;

  if (!confirm(`Delete ${student.name}?`)) return;

  students = students.filter(s => s.id !== id);
  saveData();
  renderStudents();

  if (editingId === id) {
    resetForm();
  }
}

function resetForm() {
  form.reset();
  editingId = null;
  formTitle.textContent = "Add Student";
  saveBtn.disabled = false;
  updateBtn.disabled = true;
}

function saveData() {
  localStorage.setItem("collegeStudents", JSON.stringify(students));
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, function (char) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return entities[char];
  });
}

renderStudents();