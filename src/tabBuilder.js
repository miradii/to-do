import { compose } from "ramda"
import { getProjectsTab } from "./ProjectsView"
import { getAllProjects } from "./ProjectRepo"
import { makeTodayTab } from "./TodayTabView"
//put all functions related to  tabviews in an object so i can write a generic function for showing them all
const tabs = {
  Projects: compose(getProjectsTab, getAllProjects),
  Today: compose(makeTodayTab, getAllProjects),
}
function buildTab(tabName) {
  return tabs[tabName]()
}

export { buildTab }
