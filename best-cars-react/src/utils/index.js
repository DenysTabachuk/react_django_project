export function camelToSnake(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
  
export function convertToSnakeCase(data) {
    let convertedData = {}
    Object.keys(data).forEach(key => {
        convertedData[camelToSnake(key)] = data[key];
    });
    return convertedData;
}

export function snakeToCamel(str) {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}
  
export function convertToCamelCase(data) {
    let convertedData = {};
    Object.keys(data).forEach(key => {
        convertedData[snakeToCamel(key)] = data[key];
    });

    return convertedData;
}
  