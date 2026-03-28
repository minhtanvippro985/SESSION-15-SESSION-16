// --- 1. Khởi tạo dữ liệu mẫu ---
let tasks = [
    { text: "Học JavaScript cơ bản", completed: true, isEditing: false },
    { text: "Quét dọn nhà cửa", completed: false, isEditing: false },
    { text: "Mua thực phẩm cuối tuần", completed: false, isEditing: false }
];

// Truy vấn DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const completedCount = document.getElementById('completedCount');
const totalCount = document.getElementById('totalCount');

// --- 2. Hàm Render (Vẽ giao diện) ---
function renderTasks() {
    taskList.innerHTML = ''; 

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <div class="empty-state-text">Chưa có công việc nào. Hãy thêm công việc mới!</div>
            </div>`;
    }

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        if (task.isEditing) {

            taskItem.innerHTML = `
                <input type="text" class="edit-input" id="edit-${index}" value="${task.text}">
                <div class="task-actions">
                    <button class="btn-save" onclick="saveEdit(${index})">💾 Lưu</button>
                    <button class="btn-cancel" onclick="toggleEdit(${index})">❌ Hủy</button>
                </div>
            `;
            setTimeout(() => document.getElementById(`edit-${index}`).focus(), 0);
        } else {

           
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                    onclick="toggleComplete(${index})">
                <span class="task-text" style="${task.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
                    ${task.text}
                </span>
                <div class="task-actions">
                    <button class="btn-edit" onclick="toggleEdit(${index})">✏️ Sửa</button>
                    <button class="btn-delete" onclick="deleteTask(${index})">🗑️ Xóa</button>
                </div>
            `;
        }
        taskList.appendChild(taskItem);
    });

    updateFooter();
}


function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
        alert("Vui lòng nhập tên công việc!");
        return;
    }
    tasks.push({ text: text, completed: false, isEditing: false });
    taskInput.value = '';
    taskInput.focus();
    renderTasks();
}


function deleteTask(index) {
    if (confirm(`Bạn có chắc muốn xóa: "${tasks[index].text}"?`)) {
        tasks.splice(index, 1);
        renderTasks(); 
    }
}


function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function toggleEdit(index) {
    tasks[index].isEditing = !tasks[index].isEditing;
    renderTasks();
}

function saveEdit(index) {
    const input = document.getElementById(`edit-${index}`);
    if (input.value.trim() === "") {
        alert("Không được để trống!");
        return;
    }
    tasks[index].text = input.value.trim();
    tasks[index].isEditing = false;
    renderTasks();
}


function updateFooter() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    totalCount.innerText = total;
    completedCount.innerText = completed;

    const badgeArea = document.getElementById('congratsBadge');
    if (total > 0 && total === completed) {
        badgeArea.innerHTML = '<div class="all-done-badge">✅ Hoàn thành tất cả!</div>';
    } else {
        badgeArea.innerHTML = '';
    }
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });


renderTasks();