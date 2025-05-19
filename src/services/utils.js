export function elementOrParentsHaveClass(className, el) {
  let clickedInClass = false

  function checkElement(el) {
    if (compareHtmlClasses(className.split(' '), el.classList)) {
      clickedInClass = true
    } else if (el.parentElement) {
      checkElement(el.parentElement)
    }
  }

  checkElement(el)

  return clickedInClass
}

function compareHtmlClasses(targetClasses, classList) {
  let currentIndex = 0
  let maxIndex = targetClasses.length - 1
  let fullMatch = true

  while (fullMatch && currentIndex <= maxIndex) {
    const targetClass = targetClasses[currentIndex]
    if (classList.contains(targetClass)) {
      currentIndex++
    } else {
      fullMatch = false
    }
  }

  return fullMatch
}
