let employees = [
    { id: 1, name: "Nguyễn Văn A", email: "a.nguyen@example.com", dob: "1995-01-01", position: "Nhân viên" },
    { id: 2, name: "Trần Thị B", email: "b.tran@example.com", dob: "1993-03-12", position: "Trưởng nhóm" },
    { id: 3, name: "Lê Văn C", email: "c.le@example.com", dob: "1990-07-20", position: "Trưởng phòng" }
];

let editingId = null;

const form = document.getElementById('employeeForm');
const tbody = document.querySelector('tbody');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const formError = document.getElementById('formError');

function renderTable() {
    tbody.innerHTML = '';
    employees.forEach(emp => {
        const row = `<tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.dob.split('-').reverse().join('/')}</td>
            <td>${emp.position}</td>
            <td class="actions">
                <button type="button" class="btn btn-sm btn-edit" onclick="editEmployee(${emp.id})">Sửa</button>
                <button type="button" class="btn btn-sm btn-delete" onclick="deleteEmployee(${emp.id})">Xóa</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
   
    document.querySelector('.badge').innerText = `${employees.length} nhân viên`;
    document.querySelector('.footer span').innerText = `Tổng số nhân viên: ${employees.length}`;
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        dob: document.getElementById('dateOfBirth').value,
        position: document.getElementById('position').value
    };

    if (!data.name || !data.email || !data.dob || !data.position) {
        formError.innerText = "Vui lòng điền đầy đủ thông tin!";
        return;
    }
    if (!data.email.includes('@')) {
        formError.innerText = "Email không đúng định dạng!";
        return;
    }

    if (editingId) {
        employees = employees.map(emp => emp.id === editingId ? { id: editingId, ...data } : emp);
        cancelEdit();
    } else {
        const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
        employees.push({ id: newId, ...data });
    }
    form.reset();
    formError.innerText = "";
    renderTable();
});


function editEmployee(id) {
    const emp = employees.find(e => e.id === id);
    editingId = id;
    document.getElementById('fullName').value = emp.name;
    document.getElementById('email').value = emp.email;
    document.getElementById('dateOfBirth').value = emp.dob;
    document.getElementById('position').value = emp.position;
    
    formTitle.innerText = "Chỉnh Sửa Nhân Viên";
    submitBtn.innerText = "Cập Nhật";
    cancelBtn.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteEmployee(id) {
    const emp = employees.find(e => e.id === id);
    if (confirm(`Bạn có chắc muốn xóa nhân viên ${emp.name}?`)) {
        employees = employees.filter(e => e.id !== id);
        if (editingId === id) cancelEdit();
        renderTable();
    }
}

function cancelEdit() {
    editingId = null;
    form.reset();
    formTitle.innerText = "Thêm Nhân Viên Mới";
    submitBtn.innerText = "Thêm Nhân Viên";
    cancelBtn.classList.add('hidden');
    formError.innerText = "";
}

cancelBtn.addEventListener('click', cancelEdit);
renderTable();