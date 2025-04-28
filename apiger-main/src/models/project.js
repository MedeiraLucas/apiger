class Project {
    static projects = []
    static lastId = 0
  
    constructor(name, description) {
      this.id = Project.lastId + 1
      this.name = name
      this.description = description
      Project.lastId = this.id 
    }
  
    save() {
      Project.projects.push(this) 
    }
  
    static fetchAll() {
      return Project.projects
    }
  
    static findById(id) {
      return Project.projects.find(project => project.id === id)
    }
  
    static delete(id) {
      Project.projects = Project.projects.filter(project => project.id !== id) //sistema de apontamente
    }
  }
  
  module.exports = Project