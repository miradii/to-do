// I need a function that gets all the projects and returns the divs related to it
import Project from "./project"
// Project[] -> DomElement
function getProjectsTab(projectArray) {
  const containerDiv = document.createElement("div")
  containerDiv.className = "projects-container"
  console.log(projectArray)
  const allProjectTiles = projectArray.map(createProjectTile)
  allProjectTiles.forEach((tile) => containerDiv.appendChild(tile))
  return containerDiv
}
// Project -> DomElement
function createProjectTile(project) {
  console.log(project)
  const tileDiv = document.createElement("div")
  tileDiv.setAttribute("class", "project-tile")
  const squareDiv = document.createElement("div")
  squareDiv.className = "project-square"
  const nameList = createList(Project.getTaskNames(project))
  console.log(Project.getTaskNames(project))
  const titleH3 = document.createElement("h3")
  titleH3.className = "project-name"
  titleH3.innerText = project.title
  squareDiv.appendChild(nameList)
  tileDiv.appendChild(squareDiv)
  tileDiv.appendChild(titleH3)

  return tileDiv
}

// string[] -> DomElement
function createList(arrayOfNames) {
  const list = document.createElement("ul")
  const listElements = arrayOfNames.map(createListElement)
  listElements.forEach((li) => list.appendChild(li))
  return list
}
// string -> DomElement
function createListElement(name) {
  const listElement = document.createElement("li")
  listElement.innerText = name
  return listElement
}

export { getProjectsTab }
