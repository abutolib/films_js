let elList = document.querySelector('.js-list');
let elBookmarkList = document.querySelector('.js-bookmark-list');
let elForm = document.querySelector('.js-form');
let elInput = document.querySelector('.js-input');
let elSelect = document.querySelector('.js-select');
let elModal = document.querySelector('.js-modal');
let elModalIn = document.querySelector('.js-modal-inner');
let newOpenBtn = document.querySelector('.js-btn')
let bookmark = document.querySelector('.bookmark')
let addBookmark = document.querySelector('.js-bookmark')
let filmss = document.querySelector('.films')



const localData = JSON.parse(window.localStorage.getItem('bookmark'))


const bookmarkList = localData || []


const renderBookmark = function (array, node) {

  elBookmarkList.innerHTML = ""

  array.forEach((item) => {
    let elItemWrap = document.createElement('div')
    let elItem = document.createElement('li')
    let elImg = document.createElement('img')
    let elDiv = document.createElement('div')
    let elName = document.createElement('h5')
    const openBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')

    elItem.setAttribute('class', ' card list-item ')
    elItemWrap.setAttribute('class', ' col-4  p-0')
    elDiv.setAttribute('class', 'card-body')
    elImg.setAttribute('class', 'card-img-top ')
    elName.setAttribute('class', 'card-title')
    openBtn.setAttribute('class', 'js-btn btn btn-primary');
    deleteBtn.setAttribute('class', 'js-delete btn btn-primary ms-2');

    openBtn.dataset.filmId = item.id
    deleteBtn.dataset.filmId = item.id

    elImg.src = item.poster;
    elName.textContent = item.title;
    openBtn.textContent = 'MORE';
    deleteBtn.textContent = 'DELETE';

    elDiv.appendChild(elName)
    elDiv.appendChild(openBtn);
    elDiv.appendChild(deleteBtn);
    elItem.appendChild(elImg)
    elItem.appendChild(elDiv)
    elItemWrap.appendChild(elItem)

    node.appendChild(elItemWrap);
  })
}

const renderFilms = function (array, node) {

  node.innerHTML = "";

  array.forEach(item => {
    let elItemWrap = document.createElement('div')
    let elItem = document.createElement('li')
    let elImg = document.createElement('img')
    let elDiv = document.createElement('div')
    let elName = document.createElement('h5')
    const openBtn = document.createElement('button')
    const bookmarkBtn = document.createElement('button')

    elItem.setAttribute('class', ' card list-item ')
    elItemWrap.setAttribute('class', ' col-4  p-0')
    elDiv.setAttribute('class', 'card-body')
    elImg.setAttribute('class', 'card-img-top ')
    elName.setAttribute('class', 'card-title')
    openBtn.setAttribute('class', 'js-btn btn btn-primary');
    bookmarkBtn.setAttribute('class', 'js-bookmark btn btn-primary ms-2');

    openBtn.dataset.filmId = item.id
    bookmarkBtn.dataset.filmId = item.id

    elImg.src = item.poster;
    elName.textContent = item.title;
    openBtn.textContent = 'MORE';
    bookmarkBtn.textContent = 'BOOKMARK';

    elDiv.appendChild(elName)
    elDiv.appendChild(openBtn);
    elDiv.appendChild(bookmarkBtn);
    elItem.appendChild(elImg)
    elItem.appendChild(elDiv)
    elItemWrap.appendChild(elItem)

    node.appendChild(elItemWrap);


  });
}




let elItem = document.querySelector('.list-item');

elModal.addEventListener('click', function (evt) {
  if (evt.target.matches('.js-modal')) {
    elModal.classList.add('none')
    elModal.classList.remove('modal2')
    elModalIn.classList.remove('modal2-inner')
  }

})


elInput.addEventListener('input', function (evt) {
  const searchedVal = evt.target.value;
  const searchedFilms = films.filter((item => {
    return item.title.toLowerCase().includes(searchedVal)
  }))
  const searchedFilms2 = bookmarkList.filter((item => {
    return item.title.toLowerCase().includes(searchedVal)
  }))

  renderBookmark(searchedFilms2,elBookmarkList)
  elSelect.value = 'all'

  renderFilms(searchedFilms, elList)
})

const types = new Set()

films.forEach(item => {
  item.genres.forEach(el => {
    types.add(el)

  })
})

types.forEach(item => {

  let elOption = document.createElement('option')

  elOption.value = item;
  elOption.textContent = item;

  elSelect.appendChild(elOption)

})

elSelect.addEventListener('change', function (evt) {
  elInput.value = "";
  const selectedFilm = evt.target.value
  const newArr = films.filter(item => {
    return item.genres.includes(selectedFilm)
  })
  const newArr2 = films.filter(item => {
    return item.genres.includes(selectedFilm)
  })

  if (selectedFilm == 'all') {
    renderFilms(films, elList)
    renderBookmark(bookmarkList, elBookmarkList)
  }
  else {
    renderFilms(newArr, elList);
    renderBookmark(newArr2, elBookmarkList)
  }

})

renderFilms(films, elList)


elList.addEventListener('click', function (evt) {
  evt.preventDefault()

  if (evt.target.matches('.js-btn')) {
    const btnId = evt.target.dataset.filmId;
    const findedItem = films.find((item) => item.id == btnId)
    elModal.classList.remove('none')
    elModal.classList.add('modal2')
    elModalIn.classList.add('modal2-inner')
    let elModalImg = document.createElement('img')
    elModalImg.classList.add('img2')
    let elModalName = document.createElement('h5')
    elModalImg.src = findedItem.poster;
    elModalName.textContent = findedItem.title;

    elModalIn.innerHTML = ""
    elModalIn.appendChild(elModalImg)
    elModalIn.appendChild(elModalName)
  }
  if (evt.target.matches('.js-bookmark')) {
    const filmId = evt.target.dataset.filmId
    const findedFilm = films.find((film) => film.id == filmId)
    if (!bookmarkList.includes(findedFilm)) {
      bookmarkList.push(findedFilm)
    }
    window.localStorage.setItem('bookmark', JSON.stringify(bookmarkList))
    alert("Bookmarkga qo'shildi")
  }
})

elBookmarkList.addEventListener('click', function (evt) {

  if (evt.target.matches('.js-btn')) {
    const btnId = evt.target.dataset.filmId;
    const findedItem = films.find((item) => item.id == btnId)

    console.log(findedItem)

    elModal.classList.remove('none')
    elModal.classList.add('modal2')
    elModalIn.classList.add('modal2-inner')
    let elModalImg = document.createElement('img')
    elModalImg.classList.add('img2')
    let elModalName = document.createElement('h5')
    elModalImg.src = findedItem.poster;
    elModalName.textContent = findedItem.title;

    elModalIn.innerHTML = ""
    elModalIn.appendChild(elModalImg)
    elModalIn.appendChild(elModalName)
  }

  if (evt.target.matches('.js-delete')) {
    const filmId = evt.target.dataset.filmId

    const findedIndex = bookmarkList.findIndex((item) => item.id == filmId)

    bookmarkList.splice(findedIndex, 1);

    console.log(findedIndex);
    window.localStorage.setItem('bookmark', JSON.stringify(bookmarkList))
    renderBookmark(bookmarkList, elBookmarkList)

  }
})

bookmark.addEventListener('click', function (evt) {
  elList.classList.add('d-none')
  bookmark.classList.add('d-none')
  filmss.classList.remove('d-none')
  elBookmarkList.classList.remove('d-none')
  if (bookmarkList.length > 0) {
    renderBookmark(bookmarkList, elBookmarkList)
  }
  else {
    elBookmarkList.innerHTML = `<h1 class="text-center text-light" >Bookmarkda hech narsa yo'q </h1>`
  }

})

filmss.addEventListener('click', function () {
  elList.classList.remove('d-none')
  elBookmarkList.classList.add('d-none')
  bookmark.classList.remove('d-none')
  filmss.classList.add('d-none')
})







