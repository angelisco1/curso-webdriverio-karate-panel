const draggable = document.getElementById('draggable')
const droppable = document.getElementById('droppable')

draggable.addEventListener('dragstart', (event) => {
  event.dataTransfer.setData('text/plain', 'draggable')
  draggable.classList.add('dragging')
  droppable.classList.add('iluminar')
})

draggable.addEventListener('dragend', (event) => {
  draggable.classList.remove('dragging')
  droppable.classList.remove('iluminar')
})

droppable.addEventListener('dragover', (event) => {
  event.preventDefault()
  droppable.classList.add('iluminacion-completa')
})

droppable.addEventListener('dragleave', () => {
  droppable.classList.remove('iluminacion-completa')
})

droppable.addEventListener('drop', (event) => {
  event.preventDefault()
  const id = event.dataTransfer.getData('text/plain')
  if (id === 'draggable') {
    droppable.style.position = 'relative'
    draggable.style.position = 'absolute'

    draggable.style.left = `${droppable.clientWidth - draggable.offsetWidth}px`
    draggable.style.left = `${droppable.clientHeight - draggable.offsetHeight}px`

    document.querySelector('#droppable > p').textContent = 'Soltado!'
    droppable.appendChild(draggable)
  }
  droppable.classList.remove('iluminacion-completa')
})