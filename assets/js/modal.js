const taskModalFctn = (mod, title, description) => {
  var modal = document.getElementById(mod);
  
  modal.style.display = "block";
  modal.innerHTML = `
    <div class="modal--container">
      <div class="demo-container">
        <h2 class="title1">${title}</h2>
        <p class="text-body">${description}</p>
        <button class="icon-btn material-icons-outlined green" id="closeTaskModal" onclick="closeModal()">
            done
        </button>
      </div>
    </div>
  `
}

const closeModal = () => {
  var modal = document.getElementById('taskModal');
  modal.style.display = "none";
}
