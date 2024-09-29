function showCycle(phase) {
    document.querySelectorAll('.phase').forEach(function(element) {
        element.style.display = 'none';
    });
    document.getElementById(phase).style.display = 'block';
}
