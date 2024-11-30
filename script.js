// Basic JavaScript to highlight active link in the sidebar
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.nav-links a.active').classList.remove('active');
        this.classList.add('active');
    });
});

function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('collapsed');
}


document.getElementById("broken-access-control").addEventListener("click", function() {
    window.location.href = "broken-access.html";
});
