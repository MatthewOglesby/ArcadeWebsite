const headerOne = document.getElementById('headerOne')
const book = document.getElementById('book')
const bookOne = document.getElementById('bookOne')

book.addEventListener('click', function(){
    headerOne.style.display = 'flex'
    book.style.display = 'none'
    bookOne.style.display = 'flex'
})

bookOne.addEventListener('click', function(){
    headerOne.style.display = 'none'
    bookOne.style.display = 'none'
    book.style.display = 'flex'
})
