

export const addToStorage = (key, value) =>{
  return localStorage.setItem(key, JSON.stringify(value))
}

export const getFromStorage = (key) =>{
    return JSON.parse(localStorage.getItem(key))
  }

  export const updateInStorage = (key, value) =>{
    let data = getFromStorage(key)
     data = value
    return localStorage.setItem(key, JSON.stringify(data))
  }

  export const deleteFromStorage = (key) =>{
    return localStorage.removeItem(key)
  }

  export const clearStorage = () =>{
    return localStorage.clear()
  }