
//add items to the local storage
export const addToStorage = (key, value) =>{
  return localStorage.setItem(key, JSON.stringify(value))
}


//get the item by key or name from storage
export const getFromStorage = (key) =>{
    return JSON.parse(localStorage.getItem(key))
  }

  //update the local storage datas
  export const updateInStorage = (key, value) =>{
    let data = getFromStorage(key)
     data = value
    return localStorage.setItem(key, JSON.stringify(data))
  }

  //delete all items in the local storage
  export const deleteFromStorage = (key) =>{
    return localStorage.removeItem(key)
  }

  //clearing all the data in the local storage
  export const clearStorage = () =>{
    return localStorage.clear()
  }