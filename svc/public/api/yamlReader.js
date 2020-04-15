const fs = require('fs')
const YAML = require('yamljs');

export class FileReader {
  getContent(filepath){
    return fs.readFileSync(filepath)
  }
}

export const fileReader = new FileReader()

// 👿 extends / roszerzanie / dziedziczenie = A JEST B
// 😇 kompozycja / zawieranie = A ZAWIERA B

// composition over inheritance

// export class YAMLReader {
export class YamlReader {
  constructor(fileReader){
    this.fileReader = fileReader
  }

  getContent(filepath){ // JSON[]
    const content = this.fileReader.getContent(filepath)
    console.log('content', content)
    // CUSTOM LOGIC
    return content.length
  }
}

export const yamlReader = new YamlReader(fileReader)