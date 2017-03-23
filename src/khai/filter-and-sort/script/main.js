'use strict'
const searchTextBox = document.getElementById('search-textbox')
const searchColumn = document.getElementById('search-column')
const caseSensitiveCheckbox = document.getElementById('case-sensitive-checkbox')
const sortOrder = document.getElementById('sort-order')
const sortColumn = document.getElementById('sort-column')
const getList = () => Array.from(document.querySelectorAll('table tbody tr'))

searchTextBox.addEventListener('keydown', filter, false)
searchTextBox.addEventListener('change', filter, false)
searchTextBox.addEventListener('paste', setTimeout.bind(window, filter), false)
searchColumn.addEventListener('change', filter, false)
caseSensitiveCheckbox.addEventListener('change', filter, false)

sortOrder.addEventListener('change', sort, false)
sortColumn.addEventListener('change', sort, false)

const sortfunc = {
  ascending: (a, b) => a < b,
  descending: (a, b) => a > b
}

function filter () {
  const list = getList()
  const getText = caseSensitiveCheckbox.checked
    ? string => string
    : string => string.toUpperCase()
  const text = getText(searchTextBox.value)
  const column = searchColumn.value
  const getContentElement = column === 'all'
    ? row => row
    : row => row.querySelector('.' + column)
  list.forEach(row => {
    const content = getContentElement(row)
    row.hidden = getText(content.textContent).indexOf(text) === -1
  })
}

function sort () {
  const list = getList()
  const order = sortfunc[sortOrder.value]
  const column = sortColumn.value
  const getColumnContent = tr => tr.querySelector('.' + column).textContent
  const tbody = document.querySelector('table tbody')
  list.sort(compare)
  list.forEach(tr => tr.remove())
  list.forEach(tr => tbody.appendChild(tr))
  function compare (tableRowA, tableRowB) {
    const a = getColumnContent(tableRowA)
    const b = getColumnContent(tableRowB)
    if (order(a, b)) return -1 // 'tableRowA' comes first
    if (order(b, a)) return 1 // 'tableRowB' comes first
    return 0 // whatever comes first
  }
}
